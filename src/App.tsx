import { useEffect, useState } from 'react';
import Ground from './components/Ground';
import Lion from './components/Lion';

function App() {
  const [xAngle, setXAngle] = useState(60);
  const [yAngle, setYAngle] = useState(0);
  const [zAngle, setZAngle] = useState(30);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const ground = document.getElementById('scene');
    if (ground) {
      ground.style.transform = `rotateX(${xAngle ?? 20}deg) rotateY(${
        yAngle ?? 50
      }deg) rotateZ(${zAngle ?? 0}deg)`;
    }
  }, [xAngle, yAngle, zAngle]);

  useEffect(() => {
    const rootEl: any = document.querySelector(':root');
    const rr = getComputedStyle(rootEl);

    const angleStep = 10;

    function handler(e: KeyboardEvent) {
      const lionAngleZ = +(
        rr.getPropertyValue('--lionAngleZ').match(/\d/g)?.join('') || 0
      );

      if (e.key === 'ArrowUp') {
        setSteps((p) => p + 10);
      } else if (e.key === 'ArrowLeft') {
        rootEl.style.setProperty(
          '--lionAngleZ',
          `${(lionAngleZ - angleStep + 360) % 360}deg`
        );
      } else if (e.key === 'ArrowRight') {
        rootEl.style.setProperty(
          '--lionAngleZ',
          `${(lionAngleZ + angleStep + 360) % 360}deg`
        );
      }
    }
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

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
        <Lion
          height={120}
          width={90}
          length={128}
          steps={steps}
          setSteps={setSteps}
        />
      </div>
    </>
  );
}

export default App;
