import { FC, useEffect, useRef } from 'react';
import Cube from './Cube';
import LionLeg from './LionLeg';

interface ILion {
  width: number;
  height: number;
  length: number;
  steps: number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
}

const sin = (degree: number) => {
  return Math.sin(Math.PI * (degree / 180));
};
const cos = (degree: number) => {
  return Math.cos(Math.PI * (degree / 180));
};

const numRegex = /-?\d+/g;

const Lion: FC<ILion> = ({ height, length, width, steps, setSteps }) => {
  const lionRef = useRef<HTMLDivElement>(null);

  const maneWidth = width + 10;
  const maneLength = (length * 3) / 4;
  const maneHeight = (height * 3) / 4;

  const faceLength = length * 0.3;
  const faceSkewAngle = 30;
  const faceWidth = maneWidth;
  const faceHeight = maneHeight;

  const earwidth = width / 3;
  const earHeight = height * 0.2;
  const earLength = length * 0.1;

  const mouthWidth = width / 2;
  const mouthHeight = height * 0.2;
  const mouthLength = length * 0.2;

  const legHeight = height * 0.4;
  const legWidth = width * 0.25;
  const legLength = width * 0.25;

  useEffect(() => {
    if (steps > 0) {
      const rootEl: any = document.querySelector(':root')!;
      if (
        lionRef.current &&
        !lionRef.current.classList.contains('lion-animate-class')
      ) {
        const leftFrontLeg = document.getElementById('left-front-leg');
        const rightFrontLeg = document.getElementById('right-front-leg');
        const leftBackLeg = document.getElementById('left-back-leg');
        const rightBackLeg = document.getElementById('right-back-leg');
        const groundFloor = document.getElementById('ground-floor');

        rootEl.style.setProperty('--lionStepSize', `${steps}px`);

        lionRef.current.classList.add('lion-animate-class');
        leftFrontLeg?.classList.add('left-front-leg');
        rightFrontLeg?.classList.add('right-front-leg');
        leftBackLeg?.classList.add('left-back-leg');
        rightBackLeg?.classList.add('right-back-leg');
        groundFloor?.classList.add('ground-animate-class');
        setSteps(0);
      }
    }
  }, [steps, lionRef]);

  return (
    <div
      id='lion'
      ref={lionRef}
      onAnimationEnd={() => {
        lionRef.current!.classList.remove('lion-animate-class');
        const rootEl: any = document.querySelector(':root');
        const rr = getComputedStyle(rootEl);
        const lionPosY = +(
          rr.getPropertyValue('--lionPosY').match(numRegex)?.join('') || 0
        );
        const lionPosX = +(
          rr.getPropertyValue('--lionPosX').match(numRegex)?.join('') || 0
        );
        const lionStepSize = +(
          rr.getPropertyValue('--lionStepSize').match(/\d/g)?.join('') || 0
        );
        const lionAngleZ = +(
          rr.getPropertyValue('--lionAngleZ').match(/\d/g)?.join('') || 0
        );

        console.log('lionPosX:', lionPosX, 'lionPosY:', lionPosY);
        console.log('lionAngleZ', lionAngleZ);

        const newPosY = Math.round(lionPosY + lionStepSize * cos(lionAngleZ));
        const newPosX = Math.round(lionPosX + lionStepSize * sin(lionAngleZ));

        console.log('newPosX:', newPosX, 'newPosY:', newPosY);
        console.log('-------------');

        const leftFrontLeg = document.getElementById('left-front-leg');
        const rightFrontLeg = document.getElementById('right-front-leg');
        const leftBackLeg = document.getElementById('left-back-leg');
        const rightBackLeg = document.getElementById('right-back-leg');
        const groundFloor = document.getElementById('ground-floor');

        rootEl.style.setProperty('--lionPosY', `${newPosY}px`);
        rootEl.style.setProperty('--lionPosX', `${newPosX}px`);
        rootEl.style.setProperty('--lionStepSize', `0px`);

        leftFrontLeg?.classList.remove('left-front-leg');
        rightFrontLeg?.classList.remove('right-front-leg');
        leftBackLeg?.classList.remove('left-back-leg');
        rightBackLeg?.classList.remove('right-back-leg');

        groundFloor?.classList.remove('ground-animate-class');
      }}
    >
      <div
        style={{
          transform: `translateZ(${(legHeight * 2) / 3}px)`,
        }}
        className='body face'
      >
        <Cube
          height={`${height}px`}
          width={`${width}px`}
          length={`${length}px`}
          borderColor='#783d2a'
          backStyle={{
            backgroundImage: `
              linear-gradient(
                to top,
                #0000 16px,
                #783d2a 16px,
                #0000 ${height}px
              ),
              linear-gradient(
                to bottom,
                #c8834f ${height - 20}px,
                transparent ${height - 20}px ${height}px
              ),
              linear-gradient(
                to right,
                transparent ${legWidth}px,
                #e4ddb7 ${legWidth}px ${width - legWidth}px,
                transparent ${width - legWidth}px ${width}px
              )
              `,
          }}
          frontStyle={{
            backgroundColor: '#83432f',
          }}
        />
      </div>
      <div
        style={{
          transform: `translateZ(${(legHeight * 2) / 3}px)`,
        }}
        className='mane face'
      >
        <Cube
          //   borderColor='#783d2a'
          bgColor='#783d2a'
          width={`${maneWidth}px`}
          height={`${maneHeight}px`}
          length={`${maneLength}px`}
          style={{
            transform: `translateY(${(length - maneLength) / 2}px) translateZ(${
              height - maneHeight + (maneWidth - width) / 2
            }px)`,
          }}
        />
        <Cube
          style={{
            transform: `translateY(${
              length / 2 + faceLength / 2
            }px) translateZ(${
              height - maneHeight + (maneWidth - width) / 2
            }px)`,
          }}
          borderColor='#783d2a'
          bgColor='#783d2a'
          width={`${faceWidth}px`}
          height={`${faceHeight}px`}
          length={`${faceLength}px`}
          rightStyle={{
            transform: `skewX(-${faceSkewAngle}deg)`,
          }}
          leftStyle={{
            transform: `skewX(${faceSkewAngle}deg)`,
          }}
          topStyle={{
            transformOrigin: '0% 0%',
            height: `calc(${faceLength}px / cos(${faceSkewAngle}deg))`,
            transform: `rotateX(${faceSkewAngle}deg) translateY(${2}px) translateZ(${-2}px)`,
          }}
          bottomStyle={{
            transformOrigin: '0% 0%',
            height: `calc(${faceLength}px / cos(${faceSkewAngle}deg))`,
            transform: `rotateX(${faceSkewAngle}deg) translateY(${2}px) translateZ(${-2}px)`,
          }}
          frontStyle={{
            transform: `translateY(calc(${faceLength}px * tan(${faceSkewAngle}deg) * -1))`,
          }}
        />
        <div
          className='bg-[#914730]'
          style={{
            width: `${faceWidth}px`,
            height: `${faceHeight}px`,
            transform: `rotateX(-90deg) translateZ(${
              length / 2 + faceLength
            }px) translateY(calc(-${
              faceHeight / 2 + height - maneHeight + (maneWidth - width) / 2
            }px - ${faceLength}px * tan(${faceSkewAngle}deg)))`,
          }}
        >
          <div className='w-2/3 h-2/3 bg-[#c8834f] flex flex-col justify-start items-start'>
            <div className='w-2.5 h-3 bg-[#783d2a] top-0'></div>
            <div className='flex-1 top-3 w-full'>
              <div className='bg-black w-1/3 h-7 top-1 left-1.5'>
                <div className='bg-[#e4ddb7] w-2 h-2 top-0.5 left-(calc(50% - 4px))'></div>
              </div>
              <div className='bg-black w-1/3 h-7 top-1 right-1.5'>
                <div className='bg-[#e4ddb7] w-2 h-2 top-0.5 left-(calc(50% - 4px))'></div>
              </div>
            </div>
          </div>
        </div>
        <Cube
          bgColor='#e4ddb7'
          borderColor='#783d2a'
          width={`${mouthWidth}px`}
          height={`${mouthHeight}px`}
          length={`${mouthLength}px`}
          style={{
            transform: `translateZ(${height / 2}px) translateY(calc(${
              mouthLength / 2 + length / 2
            }px + ${faceLength}px))`,
          }}
          frontStyle={{
            borderWidth: 0,
            backgroundImage: `
              linear-gradient(
                #000 0 ${mouthHeight / 2}px,
                #e4ddb7 ${mouthHeight / 2}px ${mouthHeight}px
              )
            `,
          }}
          topStyle={{
            backgroundImage: `
            linear-gradient(
                to top,
                #000 0 ${mouthLength / 2}px,
                #c8834f ${mouthLength / 2}px ${mouthLength}px
              )
            `,
          }}
          rightStyle={{
            borderWidth: 0,
            borderLeftWidth: '1px',
            backgroundImage: `
            linear-gradient(
                to right,
                transparent 0 ${mouthHeight / 2}px,
                #e4ddb7 ${mouthHeight / 2}px ${mouthHeight}px
              ),
            linear-gradient(
                to top,
                #000 0 ${mouthLength / 2}px,
                #c8834f ${mouthLength / 2}px ${mouthLength}px
              )
            `,
          }}
          leftStyle={{
            borderWidth: 0,
            borderRightWidth: '1px',
            backgroundImage: `
                linear-gradient(
                    to left,
                    transparent 0 ${mouthHeight / 2}px,
                    #e4ddb7 ${mouthHeight / 2}px ${mouthHeight}px
                  ),
                linear-gradient(
                    to top,
                    #000 0 ${mouthLength / 2}px,
                    #c8834f ${mouthLength / 2}px ${mouthLength}px
                  )
                `,
          }}
        />
      </div>
      <div
        style={{
          transform: `translateZ(${(legHeight * 2) / 3}px)`,
        }}
        className='ears face'
      >
        <Cube
          width={`${earwidth}px`}
          height={`${earHeight}px`}
          length={`${earLength}px`}
          style={{
            transform: `translateY(${
              length / 2 + faceLength - earLength / 2
            }px) translateZ(calc(${height}px + (${faceLength}px * tan(${faceSkewAngle}deg)) + ${
              (maneWidth - width) / 2
            }px)) translateX(${earwidth - earwidth / 5}px)`,
          }}
          frontStyle={{
            backgroundImage: `
              linear-gradient(
                to bottom, 
                #c8834f ${3}px, 
                transparent ${3}px ${earHeight}px
              ),
              linear-gradient(
                to right,
                transparent 5px,
                #e4ddb7 5px ${earwidth - 5}px,
                transparent ${earwidth - 5}px ${earwidth}px
              )`,
          }}
        />
        <Cube
          width={`${earwidth}px`}
          height={`${earHeight}px`}
          length={`${earLength}px`}
          style={{
            transform: `translateY(${
              length / 2 + faceLength - earLength / 2
            }px) translateZ(calc(${height}px + (${faceLength}px * tan(${faceSkewAngle}deg)) + ${
              (maneWidth - width) / 2
            }px)) translateX(-${earwidth - earwidth / 5}px)`,
          }}
          frontStyle={{
            backgroundImage: `
              linear-gradient(
                to bottom, 
                #c8834f ${3}px, 
                transparent ${3}px ${earHeight}px
              ),
              linear-gradient(
                to right,
                transparent 5px,
                #e4ddb7 5px ${earwidth - 5}px,
                transparent ${earwidth - 5}px ${earwidth}px
              )`,
          }}
        />
      </div>
      <div className='legs face'>
        <LionLeg
          id='left-front-leg'
          legNum={1}
          width={legWidth}
          height={legHeight}
          length={legLength}
          style={{
            transform: `translateX(-${
              width / 2 - legWidth / 2 + 1
            }px) translateY(-${length / 2 - legLength / 2 - 1}px)`,
          }}
        />
        <LionLeg
          id='right-front-leg'
          legNum={2}
          width={legWidth}
          height={legHeight}
          length={legLength}
          style={{
            transform: `translateX(${width / 2 - legWidth / 2}px) translateY(-${
              length / 2 - legLength / 2 - 1
            }px)`,
            // animation: `rot-right-leg-front 0.3s 0.05s ease-in-out infinite alternate`,
          }}
        />
        <LionLeg
          id='left-back-leg'
          legNum={3}
          width={legWidth}
          height={legHeight}
          length={legLength}
          style={{
            transform: `translateX(${width / 2 - legWidth / 2}px) translateY(${
              length / 2 - legLength / 2 + 1
            }px)`,
            // animation: `rot-left-leg-back 0.3s ease-in-out 0.075s infinite alternate`,
          }}
        />
        <LionLeg
          id='right-back-leg'
          legNum={4}
          wrapperClassName='leg-left-front face'
          width={legWidth}
          height={legHeight}
          length={legLength}
          style={{
            transform: `translateX(-${
              width / 2 - legWidth / 2 + 1
            }px) translateY(${length / 2 - legLength / 2 + 1}px)`,
            // animation: `rot-right-leg-back 0.3s ease-in-out 0.125s infinite alternate`,
          }}
        />
      </div>
    </div>
  );
};

export default Lion;
