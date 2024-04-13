import { useRef, useState } from 'react';
import Company from './Company';
import Cube from './Cube';

const CompanyWrapper = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [animateCounter, setAnimateCounter] = useState(0);

  const animateShadow = () => {
    const shadowParent = ref.current?.getElementsByClassName(
      'company-box-shadow'
    )[0] as HTMLDivElement;

    const leftWall = shadowParent?.getElementsByClassName(
      'left-wall'
    )[0] as HTMLDivElement;
    const rightWall = shadowParent?.getElementsByClassName(
      'right-wall'
    )[0] as HTMLDivElement;
    const frontWall = shadowParent?.getElementsByClassName(
      'front-wall'
    )[0] as HTMLDivElement;
    const backWall = shadowParent?.getElementsByClassName(
      'back-wall'
    )[0] as HTMLDivElement;

    const options: any = {
      duration: 500,
      fill: 'forwards',
      easing: 'ease-in',
    };

    const arr2 = [
      { boxShadow: '0px 0px 0px 0px #12ff32', opacity: 0 },
      { boxShadow: '0px 0px 50px 30px #12ff32', opacity: 1 },
    ];

    leftWall.animate(isOpen ? [...arr2].reverse() : arr2, options);
    rightWall.animate(isOpen ? [...arr2].reverse() : arr2, options);
    frontWall.animate(isOpen ? [...arr2].reverse() : arr2, options);
    const anim = backWall.animate(isOpen ? [...arr2].reverse() : arr2, options);
    anim.onfinish = () => {
      setIsOpen((p) => !p);
    };
  };

  const animate = () => {
    const topWall = (
      ref.current?.getElementsByClassName('company-box')[0] as HTMLDivElement
    )?.getElementsByClassName('top-wall')[0] as HTMLDivElement;

    const arr1 = [
      { transform: topWall.style.transform + ' rotateX(0deg)' },
      { transform: topWall.style.transform + ' rotateX(135deg)' },
    ];

    const anim = topWall.animate(isOpen ? [...arr1].reverse() : arr1, {
      duration: 500,
      fill: 'forwards',
      easing: 'ease-in',
    });

    setTimeout(() => {
      if (!isOpen) {
        setAnimateCounter((p) => p + 1);
      }
    }, 200);

    if (!isOpen) {
      animateShadow();
    } else {
      anim.onfinish = () => {
        animateShadow();
      };
    }
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
      <Company
        id='codvo'
        style={{
          transform: 'translateZ(50px) translateX(55px) translateY(55px)',
        }}
        animateCounter={animateCounter}
        onClosed={() => {
          animate();
        }}
      />
      <Cube
        className='company-box-shadow'
        width='80px'
        length='80px'
        height='50px'
        opacity={1}
        borderColor='#12ff32'
        bgColor='#12ff32'
        style={{
          transform:
            'rotateZ(90deg) translateZ(25px) translateX(35px) translateY(-35px)',
        }}
        topStyle={{
          opacity: 0,
        }}
        bottomStyle={{
          opacity: 0,
        }}
        leftStyle={{
          boxShadow: '0px 0px 0px 0px #12ff32',
        }}
        rightStyle={{
          boxShadow: '0px 0px 0px 0px #12ff32',
        }}
        frontStyle={{
          boxShadow: '0px 0px 0px 0px #12ff32',
        }}
        backStyle={{
          boxShadow: '0px 0px 0px 0px #12ff32',
        }}
      />
      <Cube
        className='company-box'
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
