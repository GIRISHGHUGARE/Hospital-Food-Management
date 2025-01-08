import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the user and state
export interface User {
    _id: string | null;
    email: string | null;
    role: string | null;
}

export interface AuthState {
    user: User;
    loading: boolean;
    error: string | null;
    token: string | null;  // Token to store the JWT
}

// Define the initial state using that type
const initialState: AuthState = {
    user: {
        _id: null,
        email: null,
        role: null,
    },
    loading: false,
    error: null,
    token: localStorage.getItem('authToken') || null, // Check localStorage for token on initial load
};

// Create the auth slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; user: User }>) => {
            const { token, user } = action.payload;
            state.user = user;
            state.token = token;
            state.loading = false;
            state.error = null;
            // You could save the token to localStorage here (if needed)
            localStorage.setItem('authToken', token);
        },
        logout: (state) => {
            // Reset the user object and token on logout
            state.user = {
                _id: null,
                email: null,
                role: null,
            };
            state.token = null;
            state.loading = false;
            state.error = null;
            // Clear token from localStorage on logout
            localStorage.removeItem('authToken');
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

// Export actions for usage in components
export const { login, logout, setLoading, setError } = authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectToken = (state: RootState) => state.auth.token;

// Export the reducer to be used in the store
export default authSlice.reducer;
