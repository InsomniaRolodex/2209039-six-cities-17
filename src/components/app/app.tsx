import { AppRoute, AuthorizationStatus } from '../const';
import Favorites from '../pages/favorites/favorites';
import MainPage from '../pages/main-page/main-page';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import OfferPage from '../pages/offer-page/offer-page';
import PageNotFound from '../pages/page-not-found/page-not-found';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../hooks/use-app-dispatch';
import { useEffect } from 'react';
import { loadFavoriteOffers, loadOffersAsyncThunk } from '../../store/api-actions';
import { SpinnerElement } from '../spinner/spinner-element';
import { getLoadingStatus } from '../../store/selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getLoadingStatus);
  useEffect(() => {
    dispatch(loadOffersAsyncThunk());
    dispatch(loadFavoriteOffers());
  }, [dispatch]);

  if (isLoading) {
    return < SpinnerElement />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
