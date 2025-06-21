import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState, useEffect, useMemo } from "react";
import { ClientOnly } from "~/components/ClientOnly";
import { useStore } from "~/store/store";
import { DashboardCard } from "~/components/DashboardCard";
import type { User as StoreUser } from '~/types/admin'; // Use the main User type
import { supabase } from "~/lib/supabase"; // Import Supabase client
import { UserCombobox } from "~/components/UserCombobox"; // Import the new Combobox

// Simple icon placeholder
const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

export const meta: MetaFunction = () => {
  return [
    { title: "Life Economy - Transfer ESSENCE" },
    { name: "description", content: "Transfer ESSENCE to other users" },
  ];
};

// Local type for recent transfers display
type RecentTransfer = {
  id: string;
  amount: number;
  recipientId: string;
  recipientName: string;
  note?: string;
  timestamp: string;
};

// Action function to handle the transfer
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const amount = Number(formData.get("amount"));
  const recipientId = formData.get("recipient") as string;
  const note = formData.get("note") as string;
  const senderId = formData.get("senderId") as string;

  // Basic Input Validation
  if (!amount || amount <= 0) {
    return json({ error: "Please enter a valid amount" }, { status: 400 });
  }
  if (!recipientId) {
    return json({ error: "Please select a recipient" }, { status: 400 });
  }
  if (!senderId) {
    return json({ error: "Sender information missing. Please refresh." }, { status: 400 });
  }

  // --- Database Interaction ---
  try {
    // Fetch sender and recipient profiles
    const { data: senderProfile, error: senderError } = await supabase
      .from('profiles')
      .select('id, balance, full_name')
      .eq('id', senderId)
      .single();

    if (senderError || !senderProfile) {
      console.error("Error fetching sender profile:", senderError);
      return json({ error: "Sender profile not found." }, { status: 404 });
    }

    const { data: recipientProfile, error: recipientError } = await supabase
      .from('profiles')
      .select('id, balance, full_name')
      .eq('id', recipientId)
      .single();

    if (recipientError || !recipientProfile) {
      console.error("Error fetching recipient profile:", recipientError);
      return json({ error: "Recipient profile not found." }, { status: 404 });
    }

    // Check for sufficient funds
    if (senderProfile.balance < amount) {
      return json({ error: "Insufficient funds." }, { status: 400 });
    }

    // Perform the transfer using a database function or transaction
    // For simplicity and to avoid complex server-side transactions in this example,
    // we'll use a single RPC call to a Supabase function if you have one set up.
    // If not, you'd need to handle this with multiple updates, which is less safe
    // without proper transaction management.
    // Assuming a Supabase function 'transfer_essence' exists:
    // CREATE OR REPLACE FUNCTION transfer_essence(sender_id uuid, recipient_id uuid, amount numeric, note text)
    // RETURNS uuid AS $$ ... $$ LANGUAGE plpgsql;

    // If you don't have an RPC function, you'd do this:
    // WARNING: This is NOT atomic and can lead to inconsistencies if one update fails!
    // Consider implementing a database function for atomicity.

    // Update sender balance
    const { error: senderUpdateError } = await supabase
      .from('profiles')
      .update({ balance: senderProfile.balance - amount })
      .eq('id', senderId);

    if (senderUpdateError) {
      console.error("Error updating sender balance:", senderUpdateError);
      // Log a security event for failed transfer attempt
      // addSecurityLog({ action: 'Transfer Failed', details: `Failed to update sender balance for ${senderId} sending ${amount} to ${recipientId}. Error: ${senderUpdateError.message}`, category: 'transfer', severity: 'error' });
      return json({ error: "Transfer failed during sender update." }, { status: 500 });
    }

    // Update recipient balance
    const { error: recipientUpdateError } = await supabase
      .from('profiles')
      .update({ balance: recipientProfile.balance + amount })
      .eq('id', recipientId);

    if (recipientUpdateError) {
      console.error("Error updating recipient balance:", recipientUpdateError);
      // IMPORTANT: In a real app, you'd need to ROLLBACK the sender update here!
      // This highlights why a database function is preferred for atomicity.
      // Log a security event for failed transfer attempt
      // addSecurityLog({ action: 'Transfer Failed', details: `Failed to update recipient balance for ${recipientId} receiving ${amount} from ${senderId}. Error: ${recipientUpdateError.message}`, category: 'transfer', severity: 'error' });
      return json({ error: "Transfer failed during recipient update." }, { status: 500 });
    }

    // Insert transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: senderId, // The user initiating the transaction (sender)
        type: 'Transfer Out',
        narration: `Transfer to ${recipientProfile.full_name}${note ? ` - Note: ${note}` : ''}`,
        debit: amount,
        credit: null,
        balance: senderProfile.balance - amount, // Sender's balance after debit
      })
      .select() // Select the inserted row to get the generated ID and timestamp
      .single();

     // Insert transaction record for the recipient (credit)
     // This is a separate record from the recipient's perspective
     const { data: recipientTransaction, error: recipientTransactionError } = await supabase
       .from('transactions')
       .insert({
         user_id: recipientId, // The user receiving the transaction (recipient)
         type: 'Transfer In',
         narration: `Transfer from ${senderProfile.full_name}${note ? ` - Note: ${note}` : ''}`,
         debit: null,
         credit: amount,
         balance: recipientProfile.balance + amount, // Recipient's balance after credit
       })
       .select()
       .single();


    if (transactionError || recipientTransactionError || !transaction || !recipientTransaction) {
      console.error("Error inserting transaction record:", transactionError || recipientTransactionError);
       // IMPORTANT: Again, need rollback logic here if using separate updates!
       // Log a security event for failed transaction logging
       // addSecurityLog({ action: 'Transfer Failed', details: `Failed to log transaction for ${senderId} sending ${amount} to ${recipientId}. Error: ${transactionError?.message || recipientTransactionError?.message}`, category: 'transfer', severity: 'error' });
      return json({ error: "Transfer completed, but failed to log transaction." }, { status: 500 });
    }


    // Return success data
    return json({
      success: true,
      message: `Successfully transferred ${amount} ESSENCE to ${recipientProfile.full_name}`,
      transaction: { // Return the sender's transaction details for client-side update
        id: transaction.id,
        amount,
        senderId,
        recipientId,
        recipientName: recipientProfile.full_name,
        note,
        timestamp: transaction.date, // Use the timestamp from the database
      },
      // Optionally return recipient transaction details if needed client-side
      // recipientTransaction: { ... }
    });

  } catch (error) {
    console.error("Unexpected error during transfer:", error);
    // Log a security event for unexpected transfer error
    // addSecurityLog({ action: 'Transfer Failed', details: `Unexpected error during transfer for ${senderId} sending ${amount} to ${recipientId}. Error: ${error instanceof Error ? error.message : String(error)}`, category: 'transfer', severity: 'error' });
    return json({ error: "An unexpected error occurred during the transfer." }, { status: 500 });
  }
}

// Main component wrapper for ClientOnly
export default function Transfer() {
  const fallback = (
    <div className="mx-auto max-w-4xl space-y-8 animate-pulse">
      <div className="h-8 w-1/3 rounded bg-muted"></div>
      {/* Placeholder for Balance Card */}
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="h-4 w-1/4 rounded bg-muted"></div>
          <div className="h-6 w-6 rounded bg-muted"></div>
        </div>
        <div className="mt-2">
          <div className="h-7 w-1/3 rounded bg-muted"></div>
        </div>
      </div>
      {/* Placeholder for Form */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="space-y-6">
          <div className="h-6 w-1/4 rounded bg-muted"></div>
          <div className="h-10 w-full rounded bg-muted"></div>
          <div className="h-10 w-full rounded bg-muted"></div>
          <div className="h-6 w-1/4 rounded bg-muted"></div>
          <div className="h-10 w-full rounded bg-muted"></div>
          <div className="h-6 w-1/4 rounded bg-muted"></div>
          <div className="h-20 w-full rounded bg-muted"></div>
          <div className="flex justify-center">
            <div className="h-10 w-32 rounded bg-muted"></div>
          </div>
        </div>
      </div>
      {/* Placeholder for Recent Transfers */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="h-6 w-1/4 rounded bg-muted mb-4"></div>
        <div className="space-y-4">
          <div className="h-16 w-full rounded bg-muted"></div>
          <div className="h-16 w-full rounded bg-muted"></div>
        </div>
      </div>
    </div>
  );

  return (
    <ClientOnly fallback={fallback}>
      {() => <TransferContent />}
    </ClientOnly>
  );
}

// Component containing the actual logic, rendered only on the client
function TransferContent() {
  // Fetch state and actions from Zustand store
  const {
    currentUser,
    users: allUsers, // Rename to allUsers for clarity
    updateUserBalance,
    addTransaction,
    addSecurityLog // Assuming addSecurityLog is in your store
  } = useStore((state) => ({
    currentUser: state.currentUser,
    users: state.users,
    updateUserBalance: state.updateUserBalance,
    addTransaction: state.addTransaction,
    addSecurityLog: state.addSecurityLog,
  }));

  // Local UI state
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [recentTransfers, setRecentTransfers] = useState<RecentTransfer[]>([]);
  const [formKey, setFormKey] = useState<number>(0); // For resetting the form
  // State to track client-side update status for feedback
  const [clientUpdateStatus, setClientUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Derive the list of possible recipients (excluding current user)
  const recipientUsers = useMemo(() => {
    if (!currentUser) return [];
    return allUsers.filter(u => u.id !== currentUser.id);
  }, [allUsers, currentUser]);


  // Effect to process the action result from the server
  useEffect(() => {
    // Reset client status when actionData changes (before processing)
    setClientUpdateStatus('idle');

    if (actionData?.success && actionData.transaction && currentUser) {
      const { amount, senderId, recipientId, note, timestamp, id: transactionId } = actionData.transaction;

      // Verify the action corresponds to the current user
      if (senderId !== currentUser.id) {
        console.warn("Received transfer success action data, but senderId doesn't match currentUser.id. Ignoring.");
        return;
      }

      // Get recipient details from the store (or use recipientName from actionData)
      const recipient = allUsers.find(u => u.id === recipientId);
      const recipientName = recipient?.fullName || actionData.transaction.recipientName || `User ${recipientId}`;


      // Attempt to update the sender's balance in the store
      // Note: The backend is the source of truth for the final balance.
      // We should ideally refetch the user profile or rely on a subscription
      // for the most accurate balance. For now, we'll update based on the
      // amount sent, assuming the backend succeeded.
      const newSenderBalance = currentUser.balance - amount;
      updateUserBalance(senderId, newSenderBalance);

      // Set client status to success
      setClientUpdateStatus('success');

      // Add Transaction Record for the sender
      addTransaction({
        userId: senderId,
        type: 'Transfer Out',
        narration: `Transfer to ${recipientName}${note ? ` - Note: ${note}` : ''}`,
        debit: amount,
        credit: null,
        balance: newSenderBalance, // Use the calculated new balance
      });

      // Add Security Log entry
      addSecurityLog({
        action: 'Transfer Sent',
        details: `Sent ${amount} ESSENCE to ${recipientName} (ID: ${recipientId}). Tx ID: ${transactionId}`,
        category: 'transfer',
        severity: 'info',
      });

      // Update local state for "Recent Transfers Sent" display
      setRecentTransfers(prev => [
        {
          id: transactionId,
          amount,
          recipientId,
          recipientName: recipientName,
          note,
          timestamp: new Date(timestamp).toISOString() // Ensure ISO string format
        },
        ...prev.slice(0, 2) // Keep only the 3 most recent
      ]);

      // Reset the form
      setFormKey(prev => prev + 1);
      setSelectedUserId(""); // Reset selected user ID

    } else if (actionData?.error) { // Error from backend action
        // Backend returned an error, set client status accordingly
        setClientUpdateStatus('error');
        // Log a security event for failed transfer attempt (client-side)
        addSecurityLog({
          action: 'Transfer Failed (Client)',
          details: `Transfer attempt failed. Error: ${actionData.error}`,
          category: 'transfer',
          severity: 'warning',
        });
    }
  }, [actionData, currentUser, allUsers, updateUserBalance, addTransaction, addSecurityLog]);


  // --- Render JSX ---
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold">Transfer ESSENCE</h1>

      {/* Current Balance Card */}
      {currentUser && (
        <DashboardCard
          title="Your Current Balance"
          value={`${currentUser.balance.toLocaleString()} ESSENCE`}
          icon={<WalletIcon />}
          className="border-blue-500 dark:border-blue-700"
        />
      )}

      {/* Transfer Form Container */}
      <div className="rounded-lg border bg-card p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        {/* Action Feedback Display */}
        {clientUpdateStatus === 'success' && actionData?.success ? (
          <div className="mb-6 rounded-md bg-green-50 p-4 text-green-800 dark:bg-green-900 dark:text-green-50">
            <p className="font-medium">Transfer successful!</p>
            {actionData.transaction && (
              <p className="mt-2 text-sm">
                Transaction ID: {actionData.transaction.id}
              </p>
            )}
          </div>
        ) : clientUpdateStatus === 'error' && actionData?.error ? ( // Error from backend action
          <div className="mb-6 rounded-md bg-red-50 p-4 text-red-800 dark:bg-red-900 dark:text-red-50">
            <p className="font-medium">{actionData.error}</p>
          </div>
        ) : null}


        {/* Transfer Form */}
        <Form key={formKey} method="post" className="space-y-6">
          {/* Hidden input for sender ID */}
          {currentUser && <input type="hidden" name="senderId" value={currentUser.id} />}

          {/* Recipient Search and Selection using Combobox */}
          <div>
            <label htmlFor="recipient" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
              Select Recipient
            </label>
            <UserCombobox
              users={recipientUsers}
              selectedUserId={selectedUserId}
              onSelectUser={setSelectedUserId}
              disabled={isSubmitting}
            />
            {/* Hidden input to send the selected recipient ID to the action */}
            <input type="hidden" name="recipient" value={selectedUserId} />
          </div>

          {/* Selected Recipient Preview */}
          {selectedUserId && recipientUsers.find(u => u.id === selectedUserId) && (
            <div className="flex items-center gap-4 rounded-md border p-4 dark:border-gray-700">
              <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300">
                 {recipientUsers.find(u => u.id === selectedUserId)?.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{recipientUsers.find(u => u.id === selectedUserId)?.fullName}</h3>
              </div>
            </div>
          )}

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
              Amount (ESSENCE)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min="1"
              step="1"
              className="block w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 sm:text-sm"
              placeholder="Enter amount"
              required
              max={currentUser?.balance} // Client-side check against store balance
            />
             {currentUser && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Available: {currentUser.balance.toLocaleString()} ESSENCE
                </p>
             )}
          </div>

          {/* Note Input */}
          <div>
            <label htmlFor="note" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
              Note (Optional)
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              className="block w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 sm:text-sm"
              placeholder="Add a note about this transfer"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || !selectedUserId || !currentUser || currentUser.balance <= 0}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-950"
            >
              {isSubmitting ? "Processing..." : "Transfer ESSENCE"}
            </button>
          </div>
        </Form>
      </div>

      {/* Recent Transfers List (Local State) */}
      <div className="rounded-lg border bg-card p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Transfers Sent</h2>
        <div className="space-y-4">
          {recentTransfers.length > 0 ? (
            recentTransfers.map((transfer) => {
              const recipientUser = allUsers.find(u => u.id === transfer.recipientId);
              const recipientName = recipientUser?.fullName || transfer.recipientName;
              const recipientInitial = recipientName.charAt(0).toUpperCase();

              return (
                <div key={transfer.id} className="flex items-center justify-between rounded-md border p-4 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300">
                        {recipientInitial}
                     </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{recipientName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(transfer.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600 dark:text-red-400">
                      -{transfer.amount.toLocaleString()} ESSENCE
                    </p>
                    {transfer.note && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]" title={transfer.note}>
                        {transfer.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No recent transfers sent.</p>
          )}
        </div>
      </div>
    </div>
  );
}
