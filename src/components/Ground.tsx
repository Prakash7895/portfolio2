import Axis from './Axis';
import Boundary from './Boundary';
import Company from './Company';
import Experiences from './Experiences';
import Projects from './Projects';

const Ground = () => {
  return (
    <div
      id='ground-floor'
      className='ground-floor w-[4000px] h-[4000px] flex justify-center items-center'
    >
      <Axis />
      {/* <Boundary /> */}
      {/* <Experiences /> */}
      {/* <Projects /> */}
      <Company id='codvo' />

      {/* <Cube
        opacity={0.7}
        borderColor='#fff'
        style={{
          transform: 'translate(0px, 0px)',
        }}
      /> */}
    </div>
  );
};

export default Ground;
