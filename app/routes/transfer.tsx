// app/routes/transfer.tsx
import type { MetaFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { supabase } from "~/lib/supabase";
import { useStore } from "~/store/store";
import { DashboardCard } from "~/components/DashboardCard";
import { UserCombobox } from "~/components/UserCombobox";

export const meta: MetaFunction = () => {
  return [{ title: "Transfer ESSENCE" }, { name: "description", content: "Send ESSENCE to others" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const currentUserId = url.searchParams.get("userId");

  if (!currentUserId) return json([]);

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", currentUserId)
    .eq("type", "Transfer Out")
    .order("date", { ascending: false })
    .limit(5);

  return json(data || []);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const amount = Number(formData.get("amount"));
  const note = formData.get("note")?.toString();
  const recipientId = formData.get("recipient")?.toString();
  const senderId = formData.get("senderId")?.toString();

  if (!amount || amount <= 0) {
    return json({ error: "Enter a valid amount" }, { status: 400 });
  }
  if (!recipientId) {
    return json({ error: "Please select a recipient" }, { status: 400 });
  }
  if (!senderId) {
    return json({ error: "Sender ID is missing" }, { status: 400 });
  }

  const { data: sender, error: senderError } = await supabase
    .from("profiles")
    .select("id, balance, full_name")
    .eq("id", senderId)
    .single();

  const { data: recipient, error: recipientError } = await supabase
    .from("profiles")
    .select("id, balance, full_name")
    .eq("id", recipientId)
    .single();

  if (senderError || !sender) return json({ error: "Sender not found" }, { status: 404 });
  if (recipientError || !recipient) return json({ error: "Recipient not found" }, { status: 404 });

  if (sender.balance < amount) return json({ error: "Insufficient balance" }, { status: 400 });

  const senderNewBalance = sender.balance - amount;
  const recipientNewBalance = recipient.balance + amount;

  const { error: updateSender } = await supabase
    .from("profiles")
    .update({ balance: senderNewBalance })
    .eq("id", senderId);

  if (updateSender) return json({ error: "Failed to update sender balance" }, { status: 500 });

  const { error: updateRecipient } = await supabase
    .from("profiles")
    .update({ balance: recipientNewBalance })
    .eq("id", recipientId);

  if (updateRecipient) return json({ error: "Failed to update recipient balance" }, { status: 500 });

  const { data: txn, error: txnErr } = await supabase
    .from("transactions")
    .insert({
      user_id: senderId,
      type: "Transfer Out",
      narration: `Transfer to ${recipient.full_name}${note ? ` - ${note}` : ""}`,
      debit: amount,
      credit: null,
      balance: senderNewBalance,
    })
    .select()
    .single();

  await supabase.from("transactions").insert({
    user_id: recipientId,
    type: "Transfer In",
    narration: `Transfer from ${sender.full_name}${note ? ` - ${note}` : ""}`,
    debit: null,
    credit: amount,
    balance: recipientNewBalance,
  });

  if (txnErr || !txn) return json({ error: "Transfer saved but transaction not logged." }, { status: 500 });

  return json({
    success: true,
    message: `Sent ${amount} ESSENCE to ${recipient.full_name}`,
  });
}

export default function TransferRoute() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const isSubmitting = navigation.state === "submitting";
  const transfers = useLoaderData<typeof loader>() as any[];

  const {
    currentUser,
    users,
  } = useStore((state) => ({
    currentUser: state.currentUser,
    users: state.users,
  }));

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Transfer ESSENCE</h1>

      {currentUser && (
        <DashboardCard
          title="Your Balance"
          value={`${currentUser.balance.toLocaleString()} ESSENCE`}
        />
      )}

      <Form method="post" className="space-y-4">
        <input type="hidden" name="senderId" value={currentUser?.id} />
        <div>
          <label className="block font-medium">Recipient</label>
          <UserCombobox
            users={users.filter(u => u.id !== currentUser?.id)}
            selectedUserId={recipient}
            onChange={setRecipient}
          />
          <input type="hidden" name="recipient" value={recipient} />
        </div>

        <div>
          <label className="block font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Note (optional)</label>
          <textarea
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !recipient}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Transferring..." : "Send"}
        </button>

        {actionData?.error && (
          <p className="text-red-600 mt-2">{actionData.error}</p>
        )}
        {actionData?.success && (
          <p className="text-green-600 mt-2">{actionData.message}</p>
        )}
      </Form>

      <div>
        <h2 className="text-lg font-semibold mt-8">Recent Transfers</h2>
        <ul className="mt-4 space-y-2">
          {transfers.map((t) => (
            <li key={t.id} className="p-3 border rounded shadow-sm">
              <div className="text-sm text-gray-600">{t.narration}</div>
              <div className="text-right font-semibold text-red-600">
                -{t.debit} ESSENCE
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
