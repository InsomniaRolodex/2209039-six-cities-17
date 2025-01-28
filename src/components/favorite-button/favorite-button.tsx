import { useNavigate } from 'react-router-dom';
import { OfferId } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../hooks/use-app-dispatch';
import { getFavoriteCardById, isAuth } from '../../store/selectors';
import { uploadFavoriteStatus } from '../../store/api-actions';
import { AppRoute } from '../const';

type FavoriteButtonProps = {
  className: 'offer' | 'place-card';
  offerId: OfferId;
}

function FavoriteButton({className, offerId}: FavoriteButtonProps): JSX.Element {
  const iconWidth = className === 'offer' ? 31 : 18;
  const iconHeight = className === 'offer' ? 33 : 19;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorized = useAppSelector(isAuth);
  const isFavorite = useAppSelector((state) => getFavoriteCardById(state, offerId));

  const handleFavoriteClick = () => {
    if (authorized) {
      dispatch(uploadFavoriteStatus({offerId, wasFavorite: isFavorite}));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={`${className}__bookmark-button button ${isFavorite && authorized ? `${className}__bookmark-button--active` : ''}`}
      type='button'
      onClick={handleFavoriteClick}
      data-testid='favButton'
    >
      <svg className={`${className}__bookmark-icon`} width={iconWidth} height={iconHeight} data-testid='icon'>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden' data-testid='buttonText'>{isFavorite && authorized ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoriteButton;
