import Axis from './Axis';
import Boundary from './Boundary';
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
      <Projects />

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
