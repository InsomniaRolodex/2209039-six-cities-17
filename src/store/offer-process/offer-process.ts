import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortItem } from '../../components/const';
import Offer, { City, CityNames, OfferForPage, Reviews, SotringOption } from '../../types/types';
import { fetchNearbyCards, fetchOfferComments, getOfferInfo, loadFavoriteOffers, loadOffersAsyncThunk, postCommentToOffer, uploadFavoriteStatus } from '../api-actions';
import { toast } from 'react-toastify';

export type offerProcess = {
  offersList: Offer[];
  cardsLoading: boolean;
  isError: boolean;
  city: City;
  currentSort: SotringOption;
  offerInfo: OfferForPage | null;
  offerError: boolean;
  nearbyOffers: Offer[];
  comments: Reviews;
  favoriteOffers: Offer[];
}

const initialState: offerProcess = {
  offersList: [],
  cardsLoading: false,
  isError: false,
  city: DEFAULT_CITY,
  currentSort: SortItem.Popular,
  offerInfo: null,
  offerError: false,
  nearbyOffers: [],
  comments: [],
  favoriteOffers: [],
};

export const offerProcessSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityNames>) => {
      state.city.name = action.payload;
      state.currentSort = initialState.currentSort;
    },
    changeSorting: (state, action: PayloadAction<SotringOption>) => {
      state.currentSort = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadOffersAsyncThunk.pending, (state) => {
        state.cardsLoading = true;
      })
      .addCase(loadOffersAsyncThunk.fulfilled, (state, action) => {
        state.cardsLoading = false;
        state.offersList = action.payload;
      })
      .addCase(loadOffersAsyncThunk.rejected, (state) => {
        state.cardsLoading = false;
        state.isError = true;
        toast.warn('Error while loading offers');
      })
      .addCase(getOfferInfo.fulfilled, (state, action) => {
        state.offerInfo = action.payload;
        state.offerError = false;
      })
      .addCase(getOfferInfo.rejected, (state) => {
        state.offerInfo = null;
        state.offerError = true;
        toast.warn('Error while loading offer information');
      })
      .addCase(fetchNearbyCards.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postCommentToOffer.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(loadFavoriteOffers.pending, (state) => {
        state.cardsLoading = true;
      })
      .addCase(loadFavoriteOffers.fulfilled, (state, action) => {
        state.cardsLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(loadFavoriteOffers.rejected, (state) => {
        state.isError = true;
      })
      .addCase(uploadFavoriteStatus.rejected, (state) => {
        state.cardsLoading = false;
        state.isError = true;
        toast.warn('Error while uploading offers status');
      })
      .addCase(uploadFavoriteStatus.fulfilled,(state, action) => {
        state.cardsLoading = false;
        if(action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          const favoriteIndex = state.favoriteOffers.findIndex((card) => card.id === action.payload.id);
          state.favoriteOffers.splice(favoriteIndex, 1);
        }
      });
  }
});

export const { changeCity, changeSorting } = offerProcessSlice.actions;
