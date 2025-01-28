import {render, screen} from '@testing-library/react';
import HeaderNavLogged from './header-nav-logged';
import { makeFakeStore, makeFakeUserInfo } from '../../mocks/mocks';
import { withStore, withHistory } from '../../mocks/mock-components';
import { AuthorizationStatus } from '../const';

describe('Component: Header Nav Logged', () => {
  it('should render correctly', () => {
    const headerTextElement = 'Sign out';
    const navListTestId = 'navList';
    const testUser = makeFakeUserInfo();

    const {withStoreComponent} = withStore(<HeaderNavLogged user={testUser}/>, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUserInfo(),
        isAuthError: false,
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(navListTestId)).toBeInTheDocument();
    expect(screen.getByText(headerTextElement)).toBeInTheDocument();

  });
});
