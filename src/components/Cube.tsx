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
  height = '128px',
  width = '208px',
  length = '288px',
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
            ...leftStyle,
            width: height,
            height: length,
            transformOrigin: 'left top',
            transform: `rotateY(-90deg) ${leftStyle.transform ?? ''}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
          }}
        ></div>
        {/* right wall */}
        <div
          className='right-0 border'
          style={{
            ...rightStyle,
            width: height,
            height: length,
            transformOrigin: 'right top',
            transform: `rotateY(90deg) ${rightStyle.transform ?? ''}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
          }}
        ></div>
        {/* top wall */}
        <div
          className='border'
          style={{
            width: width,
            height: length,
            ...topStyle,
            transform: `translateZ(${height}) ${topStyle.transform ?? ''}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
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
            backgroundColor: bgColor,
            borderColor: borderColor,
            ...frontStyle,
            width: width,
            height: height,
            transformOrigin: 'left bottom',
            transform: `rotateX(-90deg) ${frontStyle.transform ?? ''}`,
            opacity: opacity,
          }}
        ></div>
        {/* back wall */}
        <div
          className='top-0 border'
          style={{
            ...backStyle,
            width: width,
            height: height,
            transformOrigin: 'right top',
            transform: `rotateX(90deg) rotateZ(180deg) translateY(-${height}) translateX(${width}) ${
              backStyle.transform ?? ''
            }`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Cube;
