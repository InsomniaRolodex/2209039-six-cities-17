import { AuthorizationStatus, DEFAULT_CITY, NameSpace, SortItem } from '../components/const';
import { makeFakeComments, makeFakeOfferInfo, makeFakeOffers, makeFakeUserInfo } from '../mocks/mocks';
import { findCityCards, getAuthorizationStatus, getCurrentCity, getCurrentFilter, getFavoriteCardById, getFavoriteCards, getLoadingStatus, getNearbyCards, getOffer, getOfferId, getOffers, getReviews, getSortingType, getUserInfo, isAuth } from './selectors';

describe('Selectors Offer', () => {
  const state = {
    [NameSpace.Offer]: {
      offersList: [makeFakeOffers()],
      cardsLoading: false,
      isError: false,
      city: DEFAULT_CITY,
      currentSort: SortItem.Popular,
      offerInfo: makeFakeOfferInfo(),
      offerError: false,
      nearbyOffers: [makeFakeOffers()],
      comments: [makeFakeComments()],
      favoriteOffers: [makeFakeOffers()],
    }
  };
  it('should return current filter from state', () => {
    const { currentSort } = state[NameSpace.Offer];
    const result = getCurrentFilter(state);
    expect(result).toEqual(currentSort);
  });

  it('should return offers from state', () => {
    const {offersList} = state[NameSpace.Offer];
    const result = getOffers(state);
    expect(result).toEqual(offersList);
  });

  it('should return loading status from state', () => {
    const {cardsLoading} = state[NameSpace.Offer];
    const result = getLoadingStatus(state);
    expect(result).toEqual(cardsLoading);
  });

  it('should find city cards', () => {
    const result = findCityCards(state);
    expect(result).toEqual([]);
  });

  it('should return offer from state', () => {
    const result = getOffer(state);
    expect(result).toEqual(state[NameSpace.Offer].offerInfo);
  });

  it('should return nearby cards from state', () => {
    const result = getNearbyCards(state);
    expect(result).toEqual(state[NameSpace.Offer].nearbyOffers);
  });

  it('should return reviews from state', () => {
    const result = getReviews(state);
    expect(result).toEqual(state[NameSpace.Offer].comments);
  });

  it('should return offer id form state', () => {
    const result = getOfferId(state);
    expect(result).toEqual(state[NameSpace.Offer].offerInfo.id);
  });

  it('should return current city from state', () => {
    const result = getCurrentCity(state);
    expect(result).toEqual(state[NameSpace.Offer].city.name);
  });

  it('should return sorting type form state', () => {
    const result = getSortingType(state);
    expect(result).toEqual(state[NameSpace.Offer].currentSort);
  });

  it('should return favorite cards from state', () => {
    const result = getFavoriteCards(state);
    expect(result).toEqual(state[NameSpace.Offer].favoriteOffers);
  });

  it('should return favorite card id from state', () => {
    const result = getFavoriteCardById(state, makeFakeOffers().id);
    expect(result).toBe(true);
  });
});

describe('Selectors User', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: makeFakeUserInfo(),
      isAuthError: false,
    }
  };

  it('should check if user is authorized', () => {
    const result = isAuth(state);
    expect(result).toBe(true);
  });

  it('should return user info from state', () => {
    const result = getUserInfo(state);
    expect(result).toEqual(state[NameSpace.User].userInfo);
  });

  it('should return authorization status form state', () => {
    const result = getAuthorizationStatus(state);
    expect(result).toEqual(state[NameSpace.User].authorizationStatus);
  });
});

