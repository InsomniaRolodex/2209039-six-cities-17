import { Helmet } from 'react-helmet-async';
import Header from '../../header/header';
import MainPageEmpty from './main-page-empty';
import { LocationsList } from '../../locations/locations-list';
import { useAppSelector } from '../../hooks/use-app-dispatch';
import { getCurrentCity, getOffers } from '../../../store/selectors';
import MainConatainer from './main-container';

function MainPage(): JSX.Element {
  const offerCards = useAppSelector(getOffers);
  const currentCity = useAppSelector(getCurrentCity);
  const cardsByCity = offerCards.filter((card) => card.city.name === currentCity);

  return (
    <div className='page page--gray page--main'>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className={cardsByCity.length ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}
        data-testid='mainPageComponent'
      >
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <LocationsList currentCity={currentCity} />
        </div>
        <div className='cities'>
          {cardsByCity.length
            ? <MainConatainer />
            : <MainPageEmpty />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
