import {render, screen} from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-components';
import FavoriteButton from './favorite-button';
import { makeFakeStore } from '../../mocks/mocks';
import { createMemoryHistory, MemoryHistory } from 'history';


describe('Component: Favorite Button', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const buttonElementTestId = 'favButton';
    const buttonIconTestId = 'icon';
    const buttonTextTestId = 'buttonText';
    const testClassName = 'offer';
    const testOfferId = '123';
    const withHistoryComponent = withHistory(<FavoriteButton className={testClassName} offerId={testOfferId}/>, mockHistory);


    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(buttonElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buttonIconTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buttonTextTestId)).toBeInTheDocument();
  });
});
