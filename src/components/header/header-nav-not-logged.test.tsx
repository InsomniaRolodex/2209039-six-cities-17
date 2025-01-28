import {render, screen} from '@testing-library/react';
import { makeFakeStore } from '../../mocks/mocks';
import { withStore, withHistory } from '../../mocks/mock-components';
import HeaderNavNotLogged from './header-nav-not-logged';

describe('Component: Header Nav Logged', () => {
  it('should render correctly', () => {
    const headerTextElement = 'Sign in';
    const navListTestId = 'navList';

    const {withStoreComponent} = withStore(<HeaderNavNotLogged/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(navListTestId)).toBeInTheDocument();
    expect(screen.getByText(headerTextElement)).toBeInTheDocument();

  });
});
