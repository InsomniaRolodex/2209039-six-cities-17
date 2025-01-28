import {render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-components';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';


describe('component: Auth Screen', () => {
  it('should render correctly', () => {
    const signInText = 'Sign in';
    const {withStoreComponent} = withStore(<LoginForm/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(signInText)).toBeInTheDocument();
  });

  it('should render correctly when user types login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'test';
    const expectedPasswordValue = 'password1';

    const {withStoreComponent} = withStore(<LoginForm/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
