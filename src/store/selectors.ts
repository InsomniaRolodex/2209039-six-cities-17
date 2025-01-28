import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { sortCards } from '../utils';
import Offer, { OfferId } from '../types/types';
import { NameSpace } from '../components/const';

export const getCurrentFilter = (state: Pick<Pick<State, NameSpace.Offer>, NameSpace.Offer>) => state[NameSpace.Offer].currentSort;
export const getOffers = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offersList;
export const getLoadingStatus = ((state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].cardsLoading);
export const findCityCards = (state: Pick<State, NameSpace.Offer>):Offer[] => getOffers(state).filter((card) => card.city.name === state[NameSpace.Offer].city.name);
export const getOffer = ((state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offerInfo);
export const getNearbyCards = ((state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].nearbyOffers);
export const getReviews = ((state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].comments);
export const getOfferId = ((state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offerInfo?.id);
export const getCurrentCity = ((state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].city.name);
export const getSortingType = ((state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].currentSort);
export const getFavoriteCards = ((state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].favoriteOffers);
export const getFavoriteCardById = ((state: Pick<State, NameSpace.Offer>, id: OfferId) => state[NameSpace.Offer].favoriteOffers
  .findIndex((offer) => offer.id === id) !== -1);
export const getOfferErrorStatus = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offerError;


export const isAuth = ((state: Pick<State, NameSpace.User>) => state[NameSpace.User].authorizationStatus === 'AUTH');
export const getUserInfo = ((state: Pick<State, NameSpace.User>) => state[NameSpace.User].userInfo);
export const getAuthorizationStatus = ((state: Pick<State, NameSpace.User>) => state[NameSpace.User].authorizationStatus);

export const getSortedCards = createSelector(
  [findCityCards, getCurrentFilter],
  (cards, filter) => sortCards(cards, filter)
);
