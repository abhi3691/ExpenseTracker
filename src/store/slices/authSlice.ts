import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginUser, registerUser} from '../../database';
import {storeUser, getUser, clearUser} from '../../utils/mmkvHelper';
import {errorMessage, successMessage} from '../../components/CustomToast';

interface AuthState {
  user: {
    id: number | null;
    name: string | null;
    email: string | null;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: getUser(), // Retrieve user data from MMKV if available
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const user = await loginUser(email, password);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      storeUser(user); // Store user in MMKV
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for registration
export const register = createAsyncThunk(
  'auth/register',
  async (
    {
      name,
      email,
      password,
    }: {name: string | null; email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const userId = await registerUser(name || '', email, password);
      if (!userId) {
        throw new Error('Registration failed');
      }
      const user = {id: userId, name, email};
      storeUser(user); // Store user in MMKV
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice for auth logic
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.loading = false;
      state.error = null;
      successMessage('Logout successful');
      clearUser(); // Clear user data from MMKV on logout
    },
    setUser: (state, action) => {
      state.user = action.payload;
      storeUser(action.payload); // Store user in MMKV
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        successMessage('Login successful');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        errorMessage(state.error);
      })
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        successMessage('Registration successful');
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        errorMessage(state.error);
      });
  },
});

export const {logout, setUser} = authSlice.actions;
export default authSlice.reducer;
