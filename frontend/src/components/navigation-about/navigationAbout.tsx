import { FC } from 'react';
import './navigation-about.css';

const NavigationAbout: FC = () => {
  return (
    <nav className='navigation-about'>
      <ul className='navigation-about__items'>
        <li className='navigation-about__item'>
          <a href='#about' className='navigation-about__link'>О проекте</a>
        </li>
        <li className='navigation-about__item'>
          <a href='#tech' className='navigation-about__link'>Технологии</a>
        </li>
        <li className='navigation-about__item'>
          <a href='#student' className='navigation-about__link'>Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationAbout;
