import { CSSProperties, FC } from 'react';
import Cube from './Cube';

interface ILionLeg {
  legNum: number;
  wrapperClassName?: string;
  id?: string;
  width: number;
  height: number;
  length: number;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
}

const LionLeg: FC<ILionLeg> = ({
  legNum,
  wrapperClassName,
  height,
  length,
  width,
  style,
  wrapperStyle,
  id,
}) => {
  const backGradient = `linear-gradient(
        to top,
        #783d2a 0,
        #0000  ${height}px`;

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <Cube
        id={id}
        // opacity={0.7}
        borderColor='#fff'
        width={`${width}px`}
        height={`${height}px`}
        length={`${length}px`}
        style={{
          ...(style ?? {}),
          transform: `translateZ(${height + 1}px) rotateX(180deg) ${
            style?.transform ?? ''
          } `,
        }}
        frontStyle={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              #e4ddb7 ${height / 5}px,
              transparent ${height / 5}px ${height}px
            )
            ${[3, 4].includes(legNum) ? ', ' + backGradient : ''}
          `,
          border: 0,
        }}
        leftStyle={{
          backgroundImage: `
              linear-gradient(
                to left,
                #e4ddb7 ${height / 5}px,
                transparent ${height / 5}px ${height}px
              )
            `,
        }}
        rightStyle={{
          backgroundImage: `
              linear-gradient(
                to right,
                #e4ddb7 ${height / 5}px,
                transparent ${height / 5}px ${height}px
              )
            `,
        }}
        backStyle={{
          backgroundImage: `
              linear-gradient(
                to bottom,
                #e4ddb7 ${height / 5}px,
                transparent ${height / 5}px ${height}px
              )
              ${[1, 2].includes(legNum) ? ', ' + backGradient : ''}
            `,
        }}
        topStyle={{
          backgroundImage: 'linear-gradient(#e4ddb7, #e4ddb7)',
        }}
      />
    </div>
  );
};

export default LionLeg;
