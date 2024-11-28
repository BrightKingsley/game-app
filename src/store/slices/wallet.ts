import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  amount: number;
  type: 'top-up' | 'withdrawal' | 'purchase'; // Extend as needed
  date?: string; // You can add date for better tracking
}

interface WalletState {
  balance: number;
  transactions: Transaction[];
}

const initialState: WalletState = {
  balance: 0,
  transactions: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletDetails: (
      state,
      action: PayloadAction<{balance: number; transactions: Transaction[]}>,
    ) => {
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload; // Update balance with the top-up amount
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload); // Add new transaction to the list
    },
    clearTransactions: state => {
      state.transactions = []; // Clear transactions if needed
    },
  },
});

// Export actions
export const {
  setWalletDetails,
  updateBalance,
  addTransaction,
  clearTransactions,
} = walletSlice.actions;

// Export reducer
export default walletSlice;
