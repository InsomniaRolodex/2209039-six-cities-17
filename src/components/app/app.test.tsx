import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../mocks/mock-components';
import App from './app';
import { makeFakeStore, makeFakeUserInfo } from '../../mocks/mocks';
import { AppRoute, AuthorizationStatus } from '../const';
import { render, screen } from '@testing-library/react';

describe('Applicstion Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render Main Page when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const mainPageComponentTestId = 'mainPageComponent';

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageComponentTestId)).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render Login Page when user navigate to "/Login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const mainPageComponentTestId = 'loginPageComponent';

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageComponentTestId)).toBeInTheDocument();
  });

  it('should render Favorites Page when user navigate to "/Favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const mainPageComponentTestId = 'favoritesPageComponent';

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUserInfo(),
        isAuthError: false,
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageComponentTestId)).toBeInTheDocument();
  });

  it('should render Offer Page when user navigate to "/Offer"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const mainPageComponentTestId = 'offerPageComponent';

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Offer);

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageComponentTestId)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render PageNotFound Page when user navigate to "unknown route"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const unknownRoute = '/unknown-route';

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText(/Ошибка 404. Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
