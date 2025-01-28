import { Location } from './locations';
import { CITY_LIST } from '../const';
import { CityNames } from '../../types/types';

type LocationsListProps = {
  currentCity: CityNames;
}

function LocationsList ({currentCity}: LocationsListProps) :JSX.Element {
  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'
        data-testid='locationsListComponent'
      >
        {CITY_LIST.map((city) => <Location city={city} currentCity={currentCity} key={city}/>)}
      </ul>
    </section>
  );
}

export {LocationsList};
