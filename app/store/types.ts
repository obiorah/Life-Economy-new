import type { MarketplaceItem, PurchaseRecordWithBuyerDetails } from "~/types/market"; // Import types from market

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  role: 'User' | 'Admin' | 'Super Admin';
  // Add other user-related fields as needed
}

export interface Transaction {
  id: string;
  user_id: string; // Changed from userId to user_id to match database column
  created_at: string; // Changed from 'date' to 'created_at'
  type: 'Minting' | 'Transfer' | 'Purchase' | 'Reward' | 'Adjustment'; // e.g., 'Minting', 'Transfer', 'Purchase'
  narration: string;
  debit: number | null; // Amount debited (e.g., for purchases, transfers out)
  credit: number | null; // Amount credited (e.g., for minting, transfers in, rewards)
  balance_after: number;
}

export interface StoreState {
  currentUser: User | null;
  users: User[];
  transactions: Transaction[];
  marketplaceItems: MarketplaceItem[]; // Add marketplaceItems to state type
  purchaseRecords: PurchaseRecordWithBuyerDetails[]; // Add purchaseRecords to state type

  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  updateUserBalance: (userId: string, newBalance: number) => void;
  addTransaction: (transaction: Transaction) => void; // New action

  setMarketplaceItems: (items: MarketplaceItem[]) => void; // Add action type
  updateMarketplaceItem: (item: MarketplaceItem) => void; // Add action type
  deleteMarketplaceItem: (itemId: string) => void; // Add action type

  setPurchaseRecords: (records: PurchaseRecordWithBuyerDetails[]) => void; // Add action type
  addPurchaseRecord: (record: PurchaseRecordWithBuyerDetails) => void; // Add action type
  // Add other state and actions as needed
}
