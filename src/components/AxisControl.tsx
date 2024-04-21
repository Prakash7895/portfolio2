import { useEffect, useState } from 'react';

const AxisControl = () => {
  const [xAngle, setXAngle] = useState(80);
  const [yAngle, setYAngle] = useState(0);
  const [zAngle, setZAngle] = useState(0);
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(-10000);
  const [zAxis, setZAxis] = useState(-3800);

  useEffect(() => {
    const ground = document.getElementById('scene');
    if (ground) {
      const currStyle = `rotateX(${xAngle ?? 20}deg) rotateY(${
        yAngle ?? 50
      }deg) rotateZ(${
        zAngle ?? 0
      }deg) translate(${xAxis}px, ${yAxis}px) translateZ(${zAxis}px)`;

      ground.style.transform = currStyle;

      ground.animate(
        [
          { transform: `${currStyle} rotateZ(0deg)` },
          { transform: `${currStyle} rotateZ(360deg)` },
        ],
        {
          duration: 40000,
          easing: 'linear',
          fill: 'forwards',
          iterations: Infinity,
        }
      );
    }
    const root = document.getElementById('root');

    document.body?.addEventListener('scroll', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('SCROLL', e);
    });
  }, [xAngle, yAngle, zAngle, xAxis, yAxis, zAxis]);

  return (
    <>
      <label className='absolute top-0 z-40 w-1/3 text-white'>
        Y rotate: {yAngle}
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
        X rotate: {xAngle}
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
        Z rotate: {zAngle}
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
      <label className='absolute top-36 z-40 w-1/3 text-white'>
        X Axis: {xAxis}
        <input
          id='range'
          type='range'
          min='-1000'
          max='1000'
          defaultValue={xAxis}
          className='w-full'
          onInput={(e) => setXAxis(parseInt((e.target as any).value))}
        />
      </label>
      <label className='absolute top-48 z-40 w-1/3 text-white'>
        Y Axis: {yAxis}
        <input
          id='range'
          type='range'
          min='-20000'
          max='1000'
          defaultValue={yAxis}
          className='w-full'
          onInput={(e) => setYAxis(parseInt((e.target as any).value))}
        />
      </label>
      <label className='absolute top-60 z-40 w-1/3 text-white'>
        Z Axis: {zAxis}
        <input
          id='range'
          type='range'
          min='-5000'
          max='1000'
          defaultValue={zAxis}
          className='w-full'
          onInput={(e) => setZAxis(parseInt((e.target as any).value))}
        />
      </label>
    </>
  );
};

export default AxisControl;
