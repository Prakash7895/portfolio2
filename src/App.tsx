import { useEffect, useState } from 'react';
import Ground from './components/Ground';
import Lion from './components/Lion';
import AxisControl from './components/AxisControl';

function App() {
  const [steps, setSteps] = useState(0);

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
      <AxisControl />
      <div id='scene' className='relative w-full h-full'>
        <Ground />
        {/* <Lion
          height={100}
          width={90}
          length={110}
          steps={steps}
          setSteps={setSteps}
        /> */}
      </div>
    </>
  );
}

export default App;
