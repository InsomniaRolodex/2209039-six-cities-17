import { Helmet } from 'react-helmet-async';
import Header from '../../header/header';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import FavoritesEmpty from './favorites-empty';
import FavoritesCards from './favorites-cards';
import { useAppSelector } from '../../hooks/use-app-dispatch';
import { getFavoriteCards } from '../../../store/selectors';

function Favorites(): JSX.Element {
  const favoriteCards = useAppSelector(getFavoriteCards);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--favorites ${favoriteCards.length ? '' : 'page__main--favorites-empty'}`}
        data-testid='favoritesPageComponent'
      >
        <div className="page__favorites-container container">
          {favoriteCards.length
            ? <FavoritesCards offers={favoriteCards}/>
            : <FavoritesEmpty />}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
