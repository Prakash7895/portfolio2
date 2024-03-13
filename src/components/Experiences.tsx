import React from 'react';
import Cube from './Cube';
import Triangle from './Triangle';

const Experiences = () => {
  const height = 100;
  const width = 30;
  const length = 200;

  const triangleWidth = 2 * width;
  const triangleHeight = 3 * width;

  const arr = Array.from({ length: 3 }, () => 0).map((_, i) => {
    return i;
  });

  return (
    <>
      <div
        style={{
          transformOrigin: '0% 0%',
          transform: 'rotateY(45deg)',
        }}
      >
        {arr.map((idx) => {
          return (
            <React.Fragment key={idx}>
              <Cube
                // opacity={0.7}
                width={`${width}px`}
                borderColor='#fff'
                length={`${length}px`}
                height={`${height}px`}
                style={{
                  transformOrigin: '0% 0%',
                  transform: `translateZ(calc((${idx} * ${height}px) + (${idx} * ${height}px * sin(45deg)))) translateX(calc(${idx} * ${height}px * cos(45deg)))`,
                }}
                frontStyle={{
                  width: `calc(${width}px * sin(45deg))`,
                  transform: `skewY(45deg) translate(-${(7 / 50) * width}px, ${
                    (7 / 50) * width
                  }px)`,
                }}
                backStyle={{
                  width: `calc(${width}px * sin(45deg))`,
                  transform: `skewY(-45deg) translate(-${
                    (7 / 50) * width
                  }px, -${(7 / 50) * width}px)`,
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
                // opacity={0.7}
                width={`${width}px`}
                borderColor='#fff'
                length={`${length}px`}
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
        <Cube
          // opacity={0.7}
          width={`${width}px`}
          borderColor='#fff'
          length={`${length}px`}
          height={`${height}px`}
          style={{
            transformOrigin: '0% 0%',
            transform: `translateZ(calc((${arr.length} * ${height}px) + (${arr.length} * ${height}px * sin(45deg)))) translateX(calc(${arr.length} * ${height}px * cos(45deg)))`,
          }}
          frontStyle={{
            width: `calc(${width}px * sin(45deg))`,
            transform: `skewY(45deg) translate(-${(7 / 50) * width}px, ${
              (7 / 50) * width
            }px)`,
          }}
          backStyle={{
            width: `calc(${width}px * sin(45deg))`,
            transform: `skewY(-45deg) translate(-${(7 / 50) * width}px, -${
              (7 / 50) * width
            }px)`,
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
        <Triangle
          borderColor='#fff'
          length={length}
          width={triangleWidth}
          height={triangleHeight}
          style={{
            transform: `translate(calc((${triangleWidth / 2}px - (${
              width / 2
            }px * sin(45deg))) * -1 + (${
              arr.length
            } * ${height}px * sin(45deg))), 0px)
            translateZ(calc(${(arr.length + 1) * height}px + (${
              arr.length * height
            }px * cos(45deg)) - (${width}px * sin(45deg))))
            `,
          }}
        />
      </div>
    </>
  );
};

export default Experiences;
