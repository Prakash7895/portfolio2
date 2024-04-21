import AxisControl from './AxisControl';
import Ground from './Ground';

const Planet = () => {
  return (
    <>
      <AxisControl />
      <div
        id='scene'
        className='relative w-full h-full top-0 border-2 border-red-500 planet'
        // style={{
        //   transform: 'translateY(-8000px) translateZ(-2000px)',
        // }}
      >
        <Ground />
      </div>
    </>
  );
};

export default Planet;
