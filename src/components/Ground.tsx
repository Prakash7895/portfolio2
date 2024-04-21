import Axis from './Axis';
import Boundary from './Boundary';
import CompanyWrapper from './CompanyWrapper';
import Experiences from './Experiences';
import Projects from './Projects';

const Ground = () => {
  return (
    <div
      id='ground-floor'
      className='ground-floor w-[5000px] h-[5000px] flex justify-center items-center'
    >
      <Axis />
      {/* <Boundary /> */}
      {/* <Experiences /> */}
      {/* <Projects /> */}
      <CompanyWrapper />
    </div>
  );
};

export default Ground;
