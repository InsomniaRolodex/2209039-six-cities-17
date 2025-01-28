import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import Offer, { CityNames, LoggedUser, OfferForPage, SotringOption } from '../types/types';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { AuthorizationStatus, DEFAULT_CITY, SortItem } from '../components/const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeCityChange = (): CityNames => 'Dusseldorf';

export const makeFakeSortingChange = (): SotringOption => ('Price: low to high');

export const makeFakeOffers = (): Offer => ({
  id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: false,
  isPremium: false,
  rating: 4,
  previewImage: 'https://url-to-image/image.png'
} as Offer);

export const makeFakeOfferInfo = (): OfferForPage => ({
  id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: false,
  isPremium: false,
  rating: 4,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: [
    'Heating'
  ],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false
  },
  images: [
    'https://url-to-image/image.png'
  ],
  maxAdults: 4
} as OfferForPage);

export const makeFakeCommentPost = () => ({
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4
});

export const makeFakeComments = () => ({
  id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
  date: '2019-05-08T14:13:56.569Z',
  user: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false
  },
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4
});

export const makeFakeUserInfo = (): LoggedUser => (
  {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false,
    email: 'Oliver.conner@gmail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  } as LoggedUser
);

export const makeFakeAuthData = () => (
  {
    email: 'Oliver.conner@gmail.com',
    password: 'password1'
  }
);

export const extractActionsType = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  OFFER: {
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
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: makeFakeUserInfo(),
    isAuthError: false,
  },
  ...initialState ?? {}
});
