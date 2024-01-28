import FirstScreen from '../first-screen/FirstScreen';
import About from '../about/About';
import NavigationAbout from '../navigation-about/navigationAbout';
import Portfolio from '../portfolio/Portfolio';
import Student from '../student/Student';
import Tech from '../tech/Tech';
import { FC } from 'react';

const Main: FC = () => {
  return (
    <main className='main'>
      <FirstScreen />
      <NavigationAbout />
      <About />
      <Tech />
      <Student />
      <Portfolio />
    </main>
  );
};

export default Main;
