import React from 'react';
import Cube from './Cube';

const Experiences = () => {
  const height = 300;
  const width = 100;

  const arr = Array.from({ length: 10 }, () => 0).map((_, i) => {
    return i;
  });

  return (
    <div
      style={{
        transformOrigin: '0% 0%',
        transform: 'translateZ(120px) rotateY(45deg) ',
      }}
    >
      {arr.map((idx) => {
        return (
          <React.Fragment key={idx}>
            <Cube
              opacity={0.7}
              width={`${width}px`}
              borderColor='#fff'
              height={`${height}px`}
              style={{
                transformOrigin: '0% 0%',
                transform: `translateZ(calc((${idx} * ${height}px) + (${idx} * ${height}px * sin(45deg)))) translateX(calc(${idx} * ${height}px * cos(45deg)))`,
              }}
              frontStyle={{
                width: `calc(${width}px * sin(45deg))`,
                transform: 'skewY(45deg) translate(-14px, 14px)',
              }}
              backStyle={{
                width: `calc(${width}px * sin(45deg))`,
                transform: 'skewY(-45deg) translate(-14px, -14px)',
              }}
              bottomStyle={{
                transformOrigin: '0% 0%',
                transform: 'rotateY(45deg)',
                width: `calc(${width}px`,
              }}
              topStyle={{
                transformOrigin: '0% 0%',
                transform: 'rotateY(45deg)',
              }}
              rightStyle={{
                transform: `translateZ(calc(-1 * (${width}px - (${width}px * sin(45deg))))) translateX(calc(${width}px * sin(45deg)))`,
              }}
            />
            <Cube
              opacity={0.7}
              width={`${width}px`}
              borderColor='#fff'
              height={`${height}px`}
              style={{
                transformOrigin: '0% 0%',
                transform: `translateZ(calc((${
                  idx + 1
                } * ${height}px) + (${idx} * ${height}px * sin(45deg)))) translateX(calc(${idx} * ${height}px * cos(45deg))) rotateY(45deg)`,
              }}
            />
          </React.Fragment>
        );
      })}
      {/* <Cube
        opacity={0.7}
        width={`600px`}
        borderColor='#fff'
        length='600px'
        height={`${200}px`}
        style={{
          transformOrigin: '0% 0%',
          transform: `translateZ(0px) rotateY(0deg)`,
        }}
        frontStyle={{
          transform: 'skew(-45deg)',
        }}
        backStyle={{
          transform: 'skew(45deg) translateX(-200px)',
        }}
        leftStyle={{
          transform: 'rotateY(45deg)',
          width: 'calc(200px / sin(45deg))',
        }}
        rightStyle={{
          transform: 'rotateY(45deg)',
          width: 'calc(200px / sin(45deg))',
        }}
        topStyle={{
            transform:"translateX(200px)"
        }}
      /> */}
    </div>
  );
};

export default Experiences;
