import { useNavigate } from 'react-router';
import './not-found.css'
import { FC } from 'react';

const NotFound: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  return (
    <section className='not-found'>
      <div className='not-found__content'>
        <h1 className='not-found__status'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <button onClick={handleClick} className='not-found__link'>Назад</button>
    </section>
  );
}

export default NotFound;
