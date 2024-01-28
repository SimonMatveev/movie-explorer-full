import { FC } from 'react';
import SectionHeader from '../section-header/SectionHeader';
import './about.css';

const About: FC = () => {
  return (
    <section className='about' id='about'>
      <SectionHeader text={'О проекте'} />
      <div className='about__content'>
        <h3 className='about__title'>Дипломный проект включал 5 этапов</h3>
        <p className='about__text'>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
          финальные доработки.
        </p>
        <h3 className='about__title'>На выполнение диплома ушло 5 недель</h3>
        <p className='about__text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
          чтобы успешно защититься.
        </p>
      </div>
      <div className='about__table'>
        <p className='about__table-cell about__table-cell_col_black'>1 неделя</p>
        <p className='about__table-cell about__table-cell_col_gray'>4 недели</p>
        <p className='about__table-cell  about__table-cell_data'>Back-end</p>
        <p className='about__table-cell about__table-cell_data'>Front-end</p>
      </div>
    </section>
  );
};

export default About;
