import { useEffect, useState } from 'react';

const steps = 25;

const AxisControl = () => {
  const [xAngle, setXAngle] = useState(80);
  const [yAngle, setYAngle] = useState(0);
  const [zAngle, setZAngle] = useState(0);
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(-10000);
  const [zAxis, setZAxis] = useState(-3800);
  const [stepData, setStepData] = useState<{
    yStep: number;
    zStep: number;
    zRotateStep?: number;
  } | null>(null);

  useEffect(() => {
    const ground = document.getElementById('scene');
    if (ground) {
      const currStyle = `rotateX(${xAngle ?? 20}deg) rotateY(${
        yAngle ?? 50
      }deg) rotateZ(${
        zAngle ?? 0
      }deg) translate(${xAxis}px, ${yAxis}px) translateZ(${zAxis}px)`;

      ground.style.transform = currStyle;
    }
  }, [xAngle, yAngle, zAngle, xAxis, yAxis, zAxis]);

  const getNextCoordinate = (
    val: number,
    step: number,
    min: number,
    max: number,
    add?: boolean
  ) => {
    return add
      ? val >= max
        ? Math.min(val, max)
        : val + step
      : val <= min
      ? Math.max(val, min)
      : val - step;
  };

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      const { deltaY } = e;

      if (stepData) {
        if (yAxis < -1600 && zAngle === 0) {
          setYAxis((p) =>
            getNextCoordinate(p, stepData.yStep, -10000, -1600, deltaY > 0)
          );
          setZAxis((p) =>
            getNextCoordinate(p, stepData.zStep, -3800, -600, deltaY > 0)
          );
        } else {
          const yStep = (-900 - -1600) / steps;
          setYAxis((p) =>
            getNextCoordinate(p, yStep, -10000, -900, deltaY > 0)
          );
          if (!stepData.zRotateStep) {
            const zRotateStep = Math.floor(90 / steps);
            setStepData((p) => ({
              ...p!,
              zRotateStep,
            }));
            setZAngle((p) =>
              getNextCoordinate(p, zRotateStep, 0, 90, deltaY > 0)
            );
          } else {
            setZAngle((p) =>
              getNextCoordinate(p, stepData.zRotateStep ?? 0, 0, 90, deltaY > 0)
            );
          }
        }
      } else {
        const yStep = Math.floor((Math.abs(yAxis) - 1600) / steps);
        const zStep = Math.floor((Math.abs(zAxis) - 600) / steps);

        setStepData({ yStep, zStep });
        setYAxis((p) => getNextCoordinate(p, yStep, -10000, -1600, deltaY > 0));
        setZAxis((p) => getNextCoordinate(p, zStep, -3800, -600, deltaY > 0));
      }
    }

    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [stepData, yAxis, zAxis, zAngle]);

  return (
    <>
      <label className='absolute top-0 z-40 w-1/3 text-white'>
        Y rotate: {yAngle}
        <input
          value={yAngle}
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
          value={xAngle}
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
          value={zAngle}
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
          value={xAxis}
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
          value={yAxis}
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
          value={zAxis}
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
