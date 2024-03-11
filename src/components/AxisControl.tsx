import { useEffect, useState } from 'react';

const AxisControl = () => {
  const [xAngle, setXAngle] = useState(70);
  const [yAngle, setYAngle] = useState(0);
  const [zAngle, setZAngle] = useState(30);

  useEffect(() => {
    const ground = document.getElementById('scene');
    if (ground) {
      ground.style.transform = `rotateX(${xAngle ?? 20}deg) rotateY(${
        yAngle ?? 50
      }deg) rotateZ(${zAngle ?? 0}deg) translate(0px, 0px)`;
    }
  }, [xAngle, yAngle, zAngle]);

  return (
    <>
      <label className='absolute top-0 z-40 w-1/3 text-white'>
        Y rotate:
        <input
          id='range'
          type='range'
          min='0'
          max='360'
          defaultValue={yAngle}
          className='w-full'
          onInput={(e) => setYAngle(parseInt((e.target as any).value))}
        />
      </label>
      <label className='absolute top-12 z-40 w-1/3 text-white'>
        X rotate:
        <input
          id='range'
          type='range'
          min='0'
          max='360'
          defaultValue={xAngle}
          className='w-full'
          onInput={(e) => setXAngle(parseInt((e.target as any).value))}
        />
      </label>
      <label className='absolute top-24 z-40 w-1/3 text-white'>
        Z rotate:
        <input
          id='range'
          type='range'
          min='0'
          max='360'
          defaultValue={zAngle}
          className='w-full'
          onInput={(e) => setZAngle(parseInt((e.target as any).value))}
        />
      </label>
    </>
  );
};

export default AxisControl;
