import { FC } from 'react';
import './portfolio.css';

const Portfolio: FC = () => {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h3 className='portfolio__title'>Портфолио</h3>
        <ul className='portfolio__items'>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://github.com/SimonMatveev/react-mesto-api-full-gha' target='_blank'>Адаптивный сайт (с JS)</a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://github.com/SimonMatveev/russian-travel' target='_blank'>Адаптивный сайт (Вёрстка)</a>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://github.com/SimonMatveev/cagematch-plus' target='_blank'>Расширение для браузера</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
