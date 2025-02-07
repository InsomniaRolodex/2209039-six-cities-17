import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/use-app-dispatch';
import { getUserInfo } from '../../store/selectors';
import HeaderNavLogged from './header-nav-logged';
import HeaderNavNotLogged from './header-nav-not-logged';

function Header(): JSX.Element {
  const user = useAppSelector(getUserInfo);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo-link" to="/">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </Link>
          <div className="header__left">
          </div>
          <nav className="header__nav">
            {user ? <HeaderNavLogged user={user} /> : <HeaderNavNotLogged />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
