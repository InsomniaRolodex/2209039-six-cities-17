import { AuthorizationStatus } from '../../components/const';
import { makeFakeAuthData, makeFakeUserInfo } from '../../mocks/mocks';
import { checkAuthStatus, loginAction, logoutAction } from '../api-actions';
import { requireAuthorization, userPorcessSlice } from './user-process';

const defaultState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  isAuthError: false,
};

describe('UserProcess Slice', () => {
  it('shloud return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultState;

    const result = userPorcessSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultState;

    const result = userPorcessSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set authorization status', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null,
      isAuthError: false,
    };

    const result = userPorcessSlice.reducer(
      defaultState,
      requireAuthorization({status: AuthorizationStatus.NoAuth})
    );

    expect(result).toEqual(expectedState);
  });

  it('should set authrization status auth and set user info', () => {
    const mockUserInfo = makeFakeUserInfo();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUserInfo,
      isAuthError: false,
    };
    const result = userPorcessSlice.reducer(
      defaultState,
      checkAuthStatus.fulfilled(mockUserInfo, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set authrization status no auth', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null,
      isAuthError: false,
    };

    const result = userPorcessSlice.reducer(
      defaultState,
      checkAuthStatus.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set authrization status auth, set isAuthError = false and set user info', () => {
    const mockUserInfo = makeFakeUserInfo();
    const mockAuthData = makeFakeAuthData();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUserInfo,
      isAuthError: false,
    };

    const result = userPorcessSlice.reducer(
      {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
        isAuthError: true,
      },
      loginAction.fulfilled(mockUserInfo, '', mockAuthData)
    );

    expect(result).toEqual(expectedState);
  });

  it('should throw auth error and set noauth status', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null,
      isAuthError: true,
    };

    const result = userPorcessSlice.reducer(
      defaultState,
      loginAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should delete user info and set no auth status', () => {
    const mockUserInfo = makeFakeUserInfo();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null,
      isAuthError: false,
    };

    const result = userPorcessSlice.reducer(
      {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUserInfo,
        isAuthError: false,
      },
      logoutAction.fulfilled
    );

    expect(result).toEqual(expectedState);
  });
});
