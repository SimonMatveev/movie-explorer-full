import { FC } from 'react';
import './footer.css';

const Footer: FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__content'>
          <p className='footer__year'>&copy; 2023</p>
          <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank'>Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/SimonMatveev' target='_blank'>Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
