import { useEffect, useState } from 'react';
import Ground from './components/Ground';
import Cube from './components/Cube';

function App() {
  const [xAngle, setXAngle] = useState(70);
  const [yAngle, setYAngle] = useState(0);
  const [zAngle, setZAngle] = useState(0);

  useEffect(() => {
    const ground = document.getElementById('scene');
    if (ground) {
      ground.style.transform = `rotateX(${xAngle ?? 20}deg) rotateY(${
        yAngle ?? 50
      }deg) rotateZ(${zAngle ?? 0}deg)`;
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
      <div
        id='scene'
        className='relative border border-green-500 w-full h-full'
      >
        <Ground />
        <div id='lion'>
          <div className='body face'>
            <Cube
              height='5rem'
              width='5.5rem'
              length='8rem'
              borderColor='#123'
              backStyle={{
                backgroundImage: `
                linear-gradient(
                  to bottom,
                  #0000 1rem,
                  #783d2a 1rem,
                  #0000 5rem
                ),
                linear-gradient(
                  to top,
                  #c8834f 3.5rem, 
                  transparent 3.5rem 5rem
                ),
                linear-gradient(
                  to right,
                  transparent 1rem,
                  #e4ddb7 1rem 4.5rem,
                  transparent 4.5rem 5rem
                )`,
              }}
            />
          </div>
          <div className='mane face'>
            <Cube
              borderColor='#783d2a'
              bgColor='#783d2a'
              width='6rem'
              height='4.5rem'
              length='6rem'
              style={{
                transform: `translateY(1rem) translateZ(0.75rem)`,
              }}
              opacity={0.8}
            />
            {/* <Cube borderColor='#fff' /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
