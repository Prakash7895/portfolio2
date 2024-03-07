import { CSSProperties, FC } from 'react';
import Cube from './Cube';

interface ILionLeg {
  legNum: number;
  wrapperClassName?: string;

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
}) => {
  const backGradient = `linear-gradient(
        to bottom,
        #783d2a 0,
        #0000  ${height}px`;
  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <Cube
        // opacity={0.7}
        borderColor='#fff'
        width={`${width}px`}
        height={`${height}px`}
        length={`${length}px`}
        style={{
          ...(style ?? {}),
        }}
        frontStyle={{
          backgroundImage: `
            linear-gradient(
              to top,
              #e4ddb7 ${height / 5}px,
              transparent ${height / 5}px ${height}px
            )
            ${[1, 2].includes(legNum) ? ', ' + backGradient : ''}
          `,
        }}
        leftStyle={{
          backgroundImage: `
              linear-gradient(
                to right,
                #e4ddb7 ${height / 5}px,
                transparent ${height / 5}px ${height}px
              )
            `,
        }}
        rightStyle={{
          backgroundImage: `
              linear-gradient(
                to left,
                #e4ddb7 ${height / 5}px,
                transparent ${height / 5}px ${height}px
              )
            `,
        }}
        backStyle={{
          backgroundImage: `
              linear-gradient(
                to top,
                #e4ddb7 ${height / 5}px,
                transparent ${height / 5}px ${height}px
              )
              ${[3, 4].includes(legNum) ? ', ' + backGradient : ''}
            `,
        }}
      />
    </div>
  );
};

export default LionLeg;
