import { FC, useState } from 'react';
import Logo from '../logo/Logo';
import './header.css';
import { NavLink, Link, useLocation } from 'react-router-dom';

interface IHeaderProps {
  isLoggedIn: boolean;
}

const Header: FC<IHeaderProps> = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const onMain = location.pathname === '/';

  const handleMenu = () => {
    setIsMenuOpen(prev => !prev);
  }

  return (
    <header className='header'>
      <div className='header__container'>
        <Logo />
        <nav className='header__menu'>
          <ul className={`header__links${isLoggedIn ? ' header__links_auth' : ''}${isMenuOpen ? ' header__links_active' : ''}`}>
            {isLoggedIn ? <>
              <li className='header__item_mobile'>
                <NavLink to='.' className={({ isActive }) => `header__link header__link_auth${isActive ? ' header__link_active' : ''}`}>Главная</NavLink>
              </li>
              <li className='header__item'>
                <NavLink to='/movies' className={({ isActive }) => `header__link header__link_auth${isActive ? ' header__link_active' : ''}`}>Фильмы</NavLink>
              </li>
              <li className='header__item'>
                <NavLink to='/saved-movies' className={({ isActive }) => `header__link header__link_auth${isActive ? ' header__link_active' : ''}`}>Сохранённые фильмы</NavLink>
              </li>
              <li className='header__item header__item_profile'>
                <NavLink to='/profile' className={({ isActive }) => `header__link header__link_profile${isActive ? ' header__link_active' : ''}${!onMain ? ' header__link_profile_light' : ''}`}>Аккаунт</NavLink>
              </li>
            </> : <>
              <li className='header__item'>
                <Link to='/signup' className='header__link header__link_register'>Регистрация</Link>
              </li>
              <li className='header__item'>
                <Link to='/signin' className='header__link header__link_enter'>Войти</Link>
              </li>
            </>}
          </ul>
          {isLoggedIn && <button className={`header__burger${isMenuOpen ? ' header__burger_active' : ''}`} aria-label='Меню' onClick={handleMenu} />}
        </nav>
      </div>
    </header>
  );
}

export default Header;
