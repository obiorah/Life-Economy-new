export interface User {
  id: string;
  fullName: string;
  balance: number;
  // Add other properties as needed for your application
  // e.g., email?: string; role?: string;
}

export interface Transaction {
  userId: string;
  type: 'Transfer Out' | 'Transfer In' | 'Activity' | 'Expense' | 'Purchase';
  narration: string;
  debit: number | null;
  credit: number | null;
  balance: number; // Balance after this transaction
  timestamp?: string; // ISO string
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  sellerId: string; // ID of the user selling the item
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseRecord {
  id: string;
  itemId: string;
  buyerId: string;
  quantity: number;
  totalPrice: number;
  purchasedAt: string;
}

export interface PurchaseRecordWithBuyerDetails extends PurchaseRecord {
  buyerName: string; // Full name of the buyer
  itemName: string; // Name of the purchased item
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  ipAddress: string;
  details: string;
  category: string;
  severity: 'info' | 'warning' | 'error';
}
