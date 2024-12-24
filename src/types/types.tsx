export type CityNames = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
  name: CityNames;
  location: {
  latitude: number;
  longitude: number;
  zoom: number;
  };
  };
  location: {
  latitude: number;
  longitude: number;
  zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  };


export type FormDataType = {
  rating: number | null;
  comment: string;
};

export type City = {
  name: CityNames;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}
export type Card = {
  id: string;
  latitude: number;
  longitude: number;
};

export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type InitialState = {
  city: CityNames;
  offersList: Offer[];
};


export type Reviews = Review[];

export default Offer;
