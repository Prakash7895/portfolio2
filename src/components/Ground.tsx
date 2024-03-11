import Axis from './Axis';
import Boundary from './Boundary';

const Ground = () => {
  return (
    <div
      id='ground-floor'
      className='ground-floor w-[1000%] h-[1000%] flex justify-center items-center'
    >
      <Axis />
      <Boundary />
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
