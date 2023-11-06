import { FC } from 'react';
import SectionHeader from '../section-header/SectionHeader';
import './tech.css';

const Tech: FC = () => {
  return (
    <section className='tech' id='tech'>
      <div className='tech__container'>
        <SectionHeader text={'Технологии'} />
        <h3 className='tech__title'>7 технологий</h3>
        <p className='tech__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='tech__cards'>
          <li className='tech__card'>HTML</li>
          <li className='tech__card'>CSS</li>
          <li className='tech__card'>JS</li>
          <li className='tech__card'>React</li>
          <li className='tech__card'>Git</li>
          <li className='tech__card'>Express.js</li>
          <li className='tech__card'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Tech;
