import PlaceCard from "./place-card";
import Offer from "../../types/types";

type PlaceCardListProps = {
  offers: Offer[];
  onHandleAcrtiveCardChange: (id: string | null) => void
}

function PlaceCardList ({offers, onHandleAcrtiveCardChange}: PlaceCardListProps) :JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard onHandleAcrtiveCardChange={onHandleAcrtiveCardChange} offer={offer} key={offer.id}/>)}
    </div>
  );
}

export default PlaceCardList
