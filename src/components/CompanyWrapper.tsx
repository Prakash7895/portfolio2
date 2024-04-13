import { useRef } from 'react';
import Company from './Company';
import Cube from './Cube';

const CompanyWrapper = () => {
  const ref = useRef<HTMLDivElement>(null);

  const animate = () => {
    const topWall = ref.current?.getElementsByClassName(
      'top-wall'
    )[0] as HTMLDivElement;

    topWall.animate(
      [
        { transform: topWall.style.transform + ' rotateX(0deg)' },
        { transform: topWall.style.transform + ' rotateX(135deg)' },
      ],
      {
        duration: 500,
        fill: 'forwards',
        easing: 'ease-in',
      }
    );
  };
  return (
    <div ref={ref}>
      <button
        style={{
          color: 'red',
          fontSize: '40px',
          transform: 'translateZ(200px) rotateX(-90deg)',
        }}
        onClick={animate}
      >
        Click Me
      </button>
      {/* <div>
        <div
          style={{
            width: '80px',
            height: '0px',
            backgroundColor: 'red',
            transform: 'translateZ(200px) rotateX(-90deg)',
            boxShadow: '0px -50px 0px 30px #12ff32',
          }}
        ></div>
        <div
          style={{
            width: '80px',
            height: '0px',
            backgroundColor: 'red',
            transform: 'translateZ(200px) rotateX(-90deg)',
            boxShadow: '0px -50px 0px 30px #12ff32',
          }}
        ></div>
      </div> */}
      <Company id='codvo' />
      <Cube
        width='150px'
        length='150px'
        height='100px'
        opacity={0.8}
        borderColor='#fff'
        style={{
          transform: 'rotateZ(90deg)',
        }}
        topStyle={{
          transformOrigin: 'top center',
        }}
      />
    </div>
  );
};

export default CompanyWrapper;
