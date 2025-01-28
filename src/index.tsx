import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthStatus, loadOffersAsyncThunk } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(loadOffersAsyncThunk());
store.dispatch(checkAuthStatus());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
        <ToastContainer />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
