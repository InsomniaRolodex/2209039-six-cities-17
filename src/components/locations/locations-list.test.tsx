import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-components';
import { LocationsList } from './locations-list';
import { makeFakeStore } from '../../mocks/mocks';

describe('Component: Loactions List', () => {

  it('should render correctly', () => {
    const expextedTestIdText = 'locationsListComponent';
    const testCity = makeFakeStore().OFFER.city.name;

    const {withStoreComponent} = withStore(<LocationsList currentCity={testCity}/>, makeFakeStore());

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expextedTestIdText)).toBeInTheDocument();
  });
});
