import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransactionFromDB,
  getUserTransactions,
  updateTransactionInDB,
} from '../../database';
import {errorMessage, successMessage} from '../../components/CustomToast';

interface Transaction {
  id: number;
  userId: number;
  amount: number;
  description: string;
  date: string;
}

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (userId: number, {rejectWithValue}) => {
    try {
      const transactions = await getUserTransactions(userId);
      return transactions;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (
    {
      userId,
      amount,
      description,
      date,
    }: {userId: number; amount: number; description: string; date: string},
    {rejectWithValue},
  ) => {
    try {
      const result = await addTransaction(userId, amount, description, date);

      if (!result.success) {
        throw new Error(result.error || 'Failed to add transaction');
      }

      return {id: result.insertedId, userId, amount, description, date};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId: number, {rejectWithValue}) => {
    try {
      let result = await deleteTransactionFromDB(transactionId);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (
    {
      id,
      amount,
      description,
      date,
    }: {id: number; amount: number; description: string; date: Date},
    {rejectWithValue},
  ) => {
    try {
      let result = await updateTransactionInDB(id, amount, description, date);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        successMessage('Expense added successfully');
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.error = action.payload as string;
        errorMessage('Failed to add Expense');
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          t => t.id !== action.payload,
        );
        successMessage('Expense deleted successfully');
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.payload as string;
        errorMessage('Failed to delete Expense');
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          t => t.id === action.payload.id,
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        successMessage('Expense updated successfully');
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.error = action.payload as string;
        errorMessage('Failed to update Expense');
      });
  },
});

export default transactionsSlice.reducer;
