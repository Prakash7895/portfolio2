import { CSSProperties, FC } from 'react';

interface ICube {
  className?: string;
  id?: string;
  width?: string;
  height?: string;
  length?: string;
  bgColor?: string;
  borderColor?: string;
  rightStyle?: CSSProperties;
  leftStyle?: CSSProperties;
  topStyle?: CSSProperties;
  bottomStyle?: CSSProperties;
  frontStyle?: CSSProperties;
  backStyle?: CSSProperties;
  style?: CSSProperties;
  opacity?: number;
}

const Cube: FC<ICube> = ({
  className,
  id,
  height = '8rem',
  width = '13rem',
  length = '18rem',
  bgColor = '#c8834f',
  borderColor = '#c8834f',
  backStyle = {},
  bottomStyle = {},
  frontStyle = {},
  leftStyle = {},
  rightStyle = {},
  topStyle = {},
  style = {},
  opacity = 1,
}) => {
  return (
    <div
      className={`cube ${className ?? ''}`}
      id={id}
      style={{
        width: width,
        height: length,
        ...style,
      }}
    >
      <div className='container w-full h-full relative flex justify-center items-center'>
        {/* left wall */}
        <div
          className='left-0 border'
          style={{
            width: height,
            height: length,
            transformOrigin: 'left top',
            transform: `rotateY(-90deg)`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
            ...leftStyle,
          }}
        ></div>
        {/* right wall */}
        <div
          className='right-0 border'
          style={{
            width: height,
            height: length,
            transformOrigin: 'right top',
            transform: `rotateY(90deg)`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
            ...rightStyle,
          }}
        ></div>
        {/* top wall */}
        <div
          className='border'
          style={{
            width: width,
            height: length,
            transform: `translateZ(${height})`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
            ...topStyle,
          }}
        ></div>
        {/* bottom wall */}
        <div
          className='border'
          style={{
            width: width,
            height: length,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
            ...bottomStyle,
          }}
        ></div>
        {/* front wall */}
        <div
          className='bottom-0 border'
          style={{
            width: width,
            height: height,
            transformOrigin: 'left bottom',
            transform: `rotateX(-90deg)`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
            ...frontStyle,
          }}
        ></div>
        {/* back wall */}
        <div
          className='top-0 border'
          style={{
            width: width,
            height: height,
            transformOrigin: 'left top',
            transform: `rotateX(90deg)`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
            ...backStyle,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Cube;
