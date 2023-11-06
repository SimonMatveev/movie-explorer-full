import './logo.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import { FC } from 'react';

const Logo: FC = () => {
  return (
    <Link to='/' className='logo'>
      <img className='logo__img' src={logo} alt='Логотип' />
    </Link>
  );
}

export default Logo;
