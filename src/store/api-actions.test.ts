import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AppThunkDispatch, extractActionsType, makeFakeCommentPost, makeFakeComments, makeFakeOfferInfo, makeFakeOffers } from '../mocks/mocks';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { checkAuthStatus, fetchNearbyCards, fetchOfferComments, getOfferInfo, loadFavoriteOffers, loadOffersAsyncThunk, loginAction, logoutAction, postCommentToOffer, uploadFavoriteStatus } from './api-actions';
import { APIRoute } from '../components/const';
import { AuthData, PostComment } from '../types/types';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFER: {
        offersList: [],
        favoriteOffers: [],
        comments: [],
        nearbyOffers: [],
        offerInfo: null
      }
    });
  });

  describe('checkAuthStatus', () => {
    it('should dispatch checkAuthStatus.fulfilled with thunk checkAuthStatus', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);
      await store.dispatch(checkAuthStatus());
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        checkAuthStatus.pending.type,
        checkAuthStatus.fulfilled.type
      ]);
    });
  });

  describe('loadOffersAsyncThunk', () => {
    it('should should dispatch "loadOffersAsyncThunk.pending" and "loadOffersAsyncThunk.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffers()];
      mockAxiosAdapter.onGet(APIRoute.Cards).reply(200, mockOffers);

      await store.dispatch(loadOffersAsyncThunk());

      const actions = store.getActions();
      const extractedActions = extractActionsType(actions);
      const loadOffersAsyncThunkFulfilled = actions.at(1) as ReturnType<typeof loadOffersAsyncThunk.fulfilled>;

      expect(extractedActions).toEqual([
        loadOffersAsyncThunk.pending.type,
        loadOffersAsyncThunk.fulfilled.type
      ]);

      expect(loadOffersAsyncThunkFulfilled).toEqual(mockOffers);
    });

    it('should should dispatch "loadOffersAsyncThunk.pending" and "loadOffersAsyncThunk.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cards).reply(400, []);

      await store.dispatch(loadOffersAsyncThunk());

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        loadOffersAsyncThunk.pending.type,
        loadOffersAsyncThunk.rejected.type
      ]);
    });
  });

  describe('getOfferInfo', () => {
    it('should should dispatch "getOfferInfo.pending" and "getOfferInfo.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeOfferInfo();
      const id = mockOffer.id;
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${id}`).reply(200, mockOffer);

      await store.dispatch(getOfferInfo(id));

      const actions = store.getActions();
      const extractedActions = extractActionsType(actions);
      const getOfferInfoFulfilled = actions.at(1) as ReturnType<typeof getOfferInfo.fulfilled>;

      expect(extractedActions).toEqual([
        getOfferInfo.pending.type,
        getOfferInfo.fulfilled.type
      ]);

      expect(getOfferInfoFulfilled).toEqual(mockOffer);
    });

    it('should should dispatch "getOfferInfo.pending" and "getOfferInfo.rejected" when server response 400', async () => {
      const id = makeFakeOfferInfo().id;
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${id}`).reply(400, []);

      await store.dispatch(getOfferInfo(id));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        getOfferInfo.pending.type,
        getOfferInfo.rejected.type
      ]);
    });
  });

  describe('fetchNearbyCards', () => {
    it('should should dispatch "fetchNearbyCards.pending" and "fetchNearbyCards.fulfilled" when server response 200', async () => {
      const id = makeFakeOfferInfo().id;
      const mockOffers = [makeFakeOffers()];
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${id}/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchNearbyCards(id));

      const actions = store.getActions();
      const extractedActions = extractActionsType(actions);
      const fetchNearbyCardsFulfilled = actions.at(1) as ReturnType<typeof fetchNearbyCards.fulfilled>;

      expect(extractedActions).toEqual([
        fetchNearbyCards.pending.type,
        fetchNearbyCards.fulfilled.type
      ]);

      expect(fetchNearbyCardsFulfilled).toEqual(mockOffers);
    });

    it('should should dispatch "fetchNearbyCards.pending" and "fetchNearbyCards.rejected" when server response 400', async () => {
      const id = makeFakeOfferInfo().id;
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${id}/nearby`).reply(400, []);

      await store.dispatch(getOfferInfo(id));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        fetchNearbyCards.pending.type,
        fetchNearbyCards.rejected.type
      ]);
    });
  });

  describe('loadFavoriteOffers', () => {
    it('should should dispatch "loadFavoriteOffers.pending" and "loadFavoriteOffers.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffers()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(loadFavoriteOffers());

      const actions = store.getActions();
      const extractedActions = extractActionsType(actions);
      const loadFavoriteOffersFulfilled = actions.at(1) as ReturnType<typeof loadFavoriteOffers.fulfilled>;

      expect(extractedActions).toEqual([
        loadFavoriteOffers.pending.type,
        loadFavoriteOffers.fulfilled.type
      ]);

      expect(loadFavoriteOffersFulfilled).toEqual(mockOffers);
    });

    it('should should dispatch "loadFavoriteOffers.pending" and "loadFavoriteOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(loadFavoriteOffers());

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        loadFavoriteOffers.pending.type,
        loadFavoriteOffers.rejected.type
      ]);
    });
  });

  describe('fetchOfferComments', () => {
    it('should should dispatch "fetchOfferComments.pending" and "fetchOfferComments.fulfilled" when server response 200', async () => {
      const id = makeFakeOffers().id;
      const mockCommetns = [makeFakeComments()];
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${id}`).reply(200, mockCommetns);

      await store.dispatch(fetchOfferComments(id));

      const actions = store.getActions();
      const extractedActions = extractActionsType(actions);
      const fetchOfferCommentsFulfilled = actions.at(1) as ReturnType<typeof fetchOfferComments.fulfilled>;

      expect(extractedActions).toEqual([
        fetchOfferComments.pending.type,
        fetchOfferComments.fulfilled.type
      ]);

      expect(fetchOfferCommentsFulfilled).toEqual(mockCommetns);
    });

    it('should should dispatch "fetchOfferComments.pending" and "fetchOfferComments.rejected" when server response 400', async () => {
      const id = makeFakeOffers().id;
      mockAxiosAdapter.onGet(`${APIRoute.Cards}/${id}`).reply(400, []);

      await store.dispatch(fetchOfferComments(id));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        fetchOfferComments.pending.type,
        fetchOfferComments.rejected.type
      ]);
    });
  });

  describe('postCommentToOffer', () => {
    it('should should dispatch "postCommentToOffer.pending" and "postCommentToOffer.fulfilled" when server response 200', async () => {
      const id = makeFakeOffers().id;
      const fakeComment: PostComment = makeFakeCommentPost();
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(200);

      await store.dispatch(postCommentToOffer(fakeComment));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        postCommentToOffer.pending.type,
        postCommentToOffer.fulfilled.type
      ]);
    });

    it('should should dispatch "postCommentToOffer.pending" and "postCommentToOffer.rejected" when server response 400', async () => {
      const id = makeFakeOffers().id;
      const fakeComment: PostComment = makeFakeCommentPost();
      mockAxiosAdapter.onPost(`${APIRoute.Cards}/${id}`).reply(400);

      await store.dispatch(postCommentToOffer(fakeComment));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        postCommentToOffer.pending.type,
        postCommentToOffer.rejected.type
      ]);
    });
  });

  describe('uploadFavoriteStatus', () => {
    it('should should dispatch "uploadFavoriteStatus.pending" and "uploadFavoriteStatus.fulfilled" when server response 200', async () => {
      const id = makeFakeOffers().id;
      const isFavorite = makeFakeOffers().isFavorite;
      const updatedStatus = Number(!isFavorite);
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${updatedStatus}`).reply(200);

      await store.dispatch(uploadFavoriteStatus({offerId: id, wasFavorite: isFavorite}));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        uploadFavoriteStatus.pending.type,
        uploadFavoriteStatus.fulfilled.type
      ]);
    });

    it('should should dispatch "uploadFavoriteStatus.pending" and "uploadFavoriteStatus.rejected" when server response 400', async () => {
      const id = makeFakeOffers().id;
      const isFavorite = makeFakeOffers().isFavorite;
      const updatedStatus = Number(!isFavorite);
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${updatedStatus}`).reply(400);

      await store.dispatch(uploadFavoriteStatus({offerId: id, wasFavorite: isFavorite}));

      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        postCommentToOffer.pending.type,
        postCommentToOffer.rejected.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('should should dispatch "loginAction.pending" and "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { email: 'test@test.com', password: 'password1'};
      const fakeServerReply = { token: 'secret'};
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 200', async () => {

      mockAxiosAdapter.onPost(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);
    });

    it('should call "droptoken" with logoutAction', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      const mockSaveToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockSaveToken).toBeCalledTimes(1);
    });
  });

});
