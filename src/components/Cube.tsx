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
          className='left-0 border left-wall'
          style={{
            width: height,
            height: length,
            ...leftStyle,
            transformOrigin: 'left top',
            transform: `rotateY(-90deg) ${leftStyle.transform ?? ''}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
          }}
        ></div>
        {/* right wall */}
        <div
          className='right-0 border right-wall'
          style={{
            width: height,
            height: length,
            ...rightStyle,
            transformOrigin: 'right top',
            transform: `rotateY(90deg) ${rightStyle.transform ?? ''}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
          }}
        ></div>
        {/* top wall */}
        <div
          className='border top-wall'
          style={{
            width: width,
            height: length,
            transform: `translateZ(${height}) ${topStyle.transform ?? ''}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
            ...topStyle,
          }}
        ></div>
        {/* bottom wall */}
        <div
          className='border bottom-wall'
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
          className='bottom-0 border front-wall'
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
            width: width,
            height: height,
            ...frontStyle,
            transformOrigin: frontStyle.transformOrigin ?? 'left bottom',
            transform: `rotateX(-90deg) ${frontStyle.transform ?? ''}`,
            opacity: opacity,
          }}
        ></div>
        {/* back wall */}
        <div
          className='top-0 border back-wall'
          style={{
            width: width,
            height: height,
            ...backStyle,
            transformOrigin: backStyle.transformOrigin ?? 'right top',
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
