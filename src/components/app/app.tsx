import { AppRoute, AuthorizationStatus } from '../const';
import Favorites from '../pages/favorites/favorites';
import MainPage from '../pages/main-page/main-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import OfferPage from '../pages/offer-page/offer-page';
import PageNotFound from '../pages/page-not-found/page-not-found';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import {City} from '../../types/types';
import { useAppDispatch, useAppSelector } from '../hooks/use-app-dispatch';
import { useEffect } from 'react';
import { loadOffersAsyncThunk } from '../../store/api-actions';
import { SpinnerElement } from '../spinner/spinner-element';
import { getLoadingStatus, getOffers } from '../../store/selectors';

type AppScreenProps = {
  city: City;
}

function App ({ city}: AppScreenProps) : JSX.Element {
  const offers = useAppSelector(getOffers);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getLoadingStatus);
  useEffect(() => {
    dispatch(loadOffersAsyncThunk());
  }, [dispatch]);

  if (isLoading) {
    return < SpinnerElement/>;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage offers={offers} city={city}/>}
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
                <Favorites offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage city={city}/>}
          />
          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
