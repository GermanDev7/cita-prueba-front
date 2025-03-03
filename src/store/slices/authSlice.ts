import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Userdata } from '../../services/authAPI';

interface AuthState {
    token: string | null;
    role: 'admin' | 'doctor' | 'patient' | null;
    userData: Partial<Userdata> | null;
}

const initialState: AuthState = {
    token: null,
    role: null,
    userData: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<AuthState>) {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.userData = action.payload.userData;
        },
        logout(state) {
            state.token = null;
            state.role = null;
            state.userData = null;
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;