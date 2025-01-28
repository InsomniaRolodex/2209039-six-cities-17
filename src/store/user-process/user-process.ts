import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../components/const';
import { checkAuthStatus, loginAction, logoutAction } from '../api-actions';
import { LoggedUser } from '../../types/types';
import { toast } from 'react-toastify';

type userProcess = {
  authorizationStatus: string;
  userInfo: LoggedUser | null;
  isAuthError: boolean;
}

const initialState: userProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  isAuthError: false,
};

export const userPorcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action:PayloadAction<{status: string}>) => {
      const {status} = action.payload;
      state.authorizationStatus = status;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isAuthError = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isAuthError = true;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.warn('Error while authorization attempt');
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.userInfo = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { requireAuthorization } = userPorcessSlice.actions;
