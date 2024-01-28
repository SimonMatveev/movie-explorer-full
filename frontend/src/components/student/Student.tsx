import SectionHeader from '../section-header/SectionHeader';
import './student.css';
import photo from '../../images/student.png';
import { FC } from 'react';

const Student: FC = () => {
  return (
    <section className='student' id='student'>
      <div className='student__container'>
        <SectionHeader text={'Студент'} />
        <div className='student__content'>
          <p className='student__name'>Глеб</p>
          <p className='student__description'>Фронтенд-разработчик, 24 года</p>
          <p className='student__text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            consequatur laboriosam, magni eius nam aspernatur? Corporis incidunt et porro?
            Error harum eaque optio, molestias sunt deleniti autem pariatur accusamus
            facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <a
            className='student__github'
            href='https://github.com/SimonMatveev'
            target='_blank'
          >
            Github
          </a>
          <div className='student__img-container'>
            <img className='student__img' src={photo} alt='Фото' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Student;
