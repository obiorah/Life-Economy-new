import { create } from 'zustand';
import type { StoreState, User, Transaction, MarketplaceItem, PurchaseRecordWithBuyerDetails } from './types'; // Import MarketplaceItem and PurchaseRecordWithBuyerDetails

export const useStore = create<StoreState>((set) => ({
  currentUser: null,
  users: [], // Initialize with an empty array
  transactions: [], // Initialize with an empty array
  marketplaceItems: [], // Initialize marketplaceItems as an empty array
  purchaseRecords: [], // Initialize purchaseRecords as an empty array

  setCurrentUser: (user) => set({ currentUser: user }),

  setUsers: (users) => set({ users }), // Add setUsers setter
  addUser: (user) => set((state) => ({
    users: [...state.users, user],
  })),

  updateUserBalance: (userId, newBalance) => set((state) => ({
    users: state.users.map((user) =>
      user.id === userId ? { ...user, balance: newBalance } : user
    ),
    currentUser: state.currentUser?.id === userId
      ? { ...state.currentUser, balance: newBalance }
      : state.currentUser,
  })),

  setTransactions: (transactions) => set({ transactions }), // Add setTransactions setter
  addTransaction: (transaction) => set((state) => ({
    transactions: [...state.transactions, transaction],
  })),

  setMarketplaceItems: (items) => set({ marketplaceItems: items }), // Add action to set marketplace items
  updateMarketplaceItem: (updatedItem) => set((state) => ({ // Add action to update a single marketplace item
    marketplaceItems: state.marketplaceItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ),
  })),
  deleteMarketplaceItem: (itemId) => set((state) => ({ // Add action to delete a marketplace item
    marketplaceItems: state.marketplaceItems.filter(item => item.id !== itemId),
  })),

  setPurchaseRecords: (records) => set({ purchaseRecords: records }), // Add action to set purchase records
  addPurchaseRecord: (record) => set((state) => ({ // Add action to add a purchase record
    purchaseRecords: [record, ...state.purchaseRecords], // Add new record to the beginning
  })),
}));
