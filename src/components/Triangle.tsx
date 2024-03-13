import { CSSProperties, FC } from 'react';

interface ITriangle {
  id?: string;
  width?: number;
  height?: number;
  length?: number;
  bgColor?: string;
  opacity?: number;
  className?: string;
  borderColor?: string;
  style?: CSSProperties;
  topStyle?: CSSProperties;
  backStyle?: CSSProperties;
  leftStyle?: CSSProperties;
  frontStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  bottomStyle?: CSSProperties;
}

const Triangle: FC<ITriangle> = ({
  className,
  id,
  height = 200,
  width = 200,
  length = 200,
  bgColor = '#c8834f',
  borderColor = '#c8834f',
  backStyle = {},
  bottomStyle = {},
  frontStyle = {},
  leftStyle = {},
  rightStyle = {},
  style = {},
  opacity = 1,
}) => {
  let angle = Math.atan(height / (width / 2));
  angle = (angle * 180) / Math.PI;

  return (
    <div
      className={`triangle cube ${className ?? ''}`}
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
            width: `${Math.sqrt(
              Math.pow(height, 2) + Math.pow(width / 2, 2)
            )}px`,
            height: `${length}px`,
            ...leftStyle,
            transformOrigin: 'left top',
            transform: `rotateY(-${angle}deg) ${leftStyle.transform ?? ''}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
          }}
        ></div>
        {/* right wall */}
        <div
          className='right-0 border'
          style={{
            width: `${Math.sqrt(
              Math.pow(height, 2) + Math.pow(width / 2, 2)
            )}px`,
            height: `${length}px`,
            ...rightStyle,
            transformOrigin: 'right top',
            transform: `rotateY(${angle}deg) ${rightStyle.transform ?? ''}`,
            backgroundColor: bgColor,
            borderColor: borderColor,
            opacity: opacity,
          }}
        ></div>
        {/* bottom wall */}
        <div
          className='border'
          style={{
            width: `${width}px`,
            height: `${length}px`,
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
            borderColor: 'transparent',
            width: 0,
            height: 0,
            ...frontStyle,
            transformOrigin: frontStyle.transformOrigin ?? 'left bottom',
            transform: `rotateX(-90deg) ${frontStyle.transform ?? ''}`,
            opacity: opacity,
            borderLeft: `${width / 2}px solid transparent`,
            borderRight: `${width / 2}px solid transparent`,
            borderBottom: `${height}px solid ${bgColor}`,
            borderBottomColor: bgColor,
          }}
        ></div>
        {/* back wall */}
        <div
          className='top-0 border'
          style={{
            width: 0,
            height: 0,
            ...backStyle,
            transformOrigin: backStyle.transformOrigin ?? 'right top',
            transform: `rotateX(90deg) rotateZ(180deg) translateY(-${height}px) translateX(${width}px) ${
              backStyle.transform ?? ''
            }`,
            borderColor: 'transparent',
            opacity: opacity,
            borderLeft: `${width / 2}px solid transparent`,
            borderRight: `${width / 2}px solid transparent`,
            borderBottom: `${height}px solid ${bgColor}`,
            borderBottomColor: bgColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Triangle;
