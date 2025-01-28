import { SortItem } from '../../components/const';
import { makeFakeCityChange, makeFakeCommentPost, makeFakeComments, makeFakeOfferInfo, makeFakeOffers, makeFakeSortingChange } from '../../mocks/mocks';
import { OfferId } from '../../types/types';
import { fetchNearbyCards, fetchOfferComments, getOfferInfo, loadFavoriteOffers, loadOffersAsyncThunk, postCommentToOffer, uploadFavoriteStatus } from '../api-actions';
import { changeCity, changeSorting, offerProcess, offerProcessSlice } from './offer-process';

const defaultState: offerProcess = {
  offersList: [],
  cardsLoading: false,
  isError: false,
  city: {
    name: 'Paris',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 12,
    }
  },
  currentSort: SortItem.Popular,
  offerInfo: null,
  offerError: false,
  nearbyOffers: [],
  comments: [],
  favoriteOffers: [],
};

describe('OfferProcess Slice', () => {
  it('shloud return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultState;

    const result = offerProcessSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultState;

    const result = offerProcessSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set cardsLoading false and fill offers list', () => {
    const mockOffers = makeFakeOffers();
    const expectedState = {
      offersList: [mockOffers],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      loadOffersAsyncThunk.fulfilled(
        [mockOffers], '', undefined
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should set cardsLoading true', () => {
    const expectedState = {
      offersList: [],
      cardsLoading: true,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      loadOffersAsyncThunk.pending
    );

    expect(result).toEqual(expectedState);
  });

  it('should set cardsLoading = false, isError = true', () => {
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: true,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer({
      offersList: [],
      cardsLoading: true,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    },
    loadOffersAsyncThunk.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should fill offerInfo and set offerError = false', () => {
    const mockOfferInfo = makeFakeOfferInfo();
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: mockOfferInfo,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      getOfferInfo.fulfilled(
        mockOfferInfo, '', ''
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should set offerInfo = null and offerError = true', () => {
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: true,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer({
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: true,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    },
    getOfferInfo.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should change sorting option', () => {
    const mockSortingChange = makeFakeSortingChange();
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: mockSortingChange,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      changeSorting(mockSortingChange)
    );

    expect(result).toEqual(expectedState);
  });

  it('should change city name and return sorting option to default', () => {
    const mockCityChange = makeFakeCityChange();
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: mockCityChange,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      undefined,
      changeCity(mockCityChange)
    );

    expect(result).toEqual(expectedState);
  });

  it('should fill nearby cards', () => {
    const mockOffers = makeFakeOffers();
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [mockOffers],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      fetchNearbyCards.fulfilled(
        [mockOffers], '', ''
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should get comments', () => {
    const mockComments = makeFakeComments();
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [mockComments],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      fetchOfferComments.fulfilled(
        [mockComments], '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set cardsLoading true', () => {
    const expectedState = {
      offersList: [],
      cardsLoading: true,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      loadFavoriteOffers.pending
    );

    expect(result).toEqual(expectedState);
  });

  it('should fill favoriteOffers and set cardsLoading = false', () => {
    const mockOffers = makeFakeOffers();
    mockOffers.isFavorite = true;

    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [mockOffers],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      loadFavoriteOffers.fulfilled(
        [mockOffers], '', undefined
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should set isError = true', () => {
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: true,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      loadFavoriteOffers.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set cardsLoading = false and isError = true', () => {
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: true,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      {
        offersList: [],
        cardsLoading: true,
        isError: false,
        city: {
          name: 'Paris',
          location: {
            latitude: 52.35514938496378,
            longitude: 4.673877537499948,
            zoom: 12,
          }
        },
        currentSort: SortItem.Popular,
        offerInfo: null,
        offerError: false,
        nearbyOffers: [],
        comments: [],
        favoriteOffers: [],
      },
      uploadFavoriteStatus.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should fill comments array', () => {
    const mockCommentPost = makeFakeCommentPost();
    const mockComments = makeFakeComments();
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [mockCommentPost],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer(
      defaultState,
      postCommentToOffer.fulfilled(
        mockComments, '', mockCommentPost
      )
    );
    expect(result).toEqual(expectedState);
  });

  it('should add offer to favorites and set cardsLoading = false', () => {
    const mockOffer = makeFakeOffers();
    const offerId: OfferId = mockOffer.id;
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [mockOffer],
    };

    const result = offerProcessSlice.reducer({
      offersList: [],
      cardsLoading: true,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    },
    uploadFavoriteStatus.fulfilled(
      mockOffer, '', { offerId, wasFavorite: false}
    ));

    expect(result).toEqual(expectedState);
  });

  it('should remove offer from favorites and set cardsLoading = false', () => {
    const mockOffer = makeFakeOffers();
    mockOffer.isFavorite = true;
    const offerId: OfferId = mockOffer.id;
    const expectedState = {
      offersList: [],
      cardsLoading: false,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [],
    };

    const result = offerProcessSlice.reducer({
      offersList: [],
      cardsLoading: true,
      isError: false,
      city: {
        name: 'Paris',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 12,
        }
      },
      currentSort: SortItem.Popular,
      offerInfo: null,
      offerError: false,
      nearbyOffers: [],
      comments: [],
      favoriteOffers: [mockOffer],
    },
    uploadFavoriteStatus.fulfilled(
      mockOffer, '', { offerId, wasFavorite: false}
    ));

    expect(result).toEqual(expectedState);
  });


});
