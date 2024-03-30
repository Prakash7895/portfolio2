import { useRef, useState } from 'react';
import Cube from './Cube';

const Projects = () => {
  const side = 150;

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [playState, setPlayState] = useState<AnimationPlayState>('running');
  const [animationType, setAnimationType] = useState<'rotate' | 'move-up'>(
    'rotate'
  );

  const animateSides = (reverse = false, callback?: Function) => {
    const leftWall = ref.current?.getElementsByClassName(
      'left-wall'
    )[0] as HTMLDivElement;
    const rightWall = ref.current?.getElementsByClassName(
      'right-wall'
    )[0] as HTMLDivElement;
    const topWall = ref.current?.getElementsByClassName(
      'top-wall'
    )[0] as HTMLDivElement;
    const bottomWall = ref.current?.getElementsByClassName(
      'bottom-wall'
    )[0] as HTMLDivElement;
    const frontWall = ref.current?.getElementsByClassName(
      'front-wall'
    )[0] as HTMLDivElement;

    const time = 500;

    const options: any = {
      duration: time,
      fill: 'forwards',
      easing: 'ease-in',
    };

    const startPointLeftWall = { transform: 'rotateY(-90deg)' };
    const endPointLeftWall = {
      transform:
        'rotateY(-90deg) translate(0px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
    };
    leftWall.animate(
      reverse
        ? [endPointLeftWall, startPointLeftWall]
        : [startPointLeftWall, endPointLeftWall],
      options
    );

    const startPointRightWall = { transform: 'rotateY(90deg)' };
    const endPointRightWall = {
      transform: `rotateY(90deg) rotateX(90deg) translate(${side}px, -${
        2 * side
      }px)`,
    };
    rightWall.animate(
      reverse
        ? [endPointRightWall, startPointRightWall]
        : [startPointRightWall, endPointRightWall],
      options
    );

    const startPointTopWall = { transform: 'translateZ(150px)' };
    const endPointTopWall = {
      transformOrigin: '0% 0%',
      transform:
        'translateZ(150px) translate(0px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
    };
    topWall.animate(
      reverse
        ? [endPointTopWall, startPointTopWall]
        : [startPointTopWall, endPointTopWall],
      options
    );

    const startPointBottomWall = { transform: 'translate(0px, 0px)' };
    const endPointBottomWall = {
      transform: `translate(0px, 0px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg) translateY(${
        side / 2
      }px) translateZ(-${side / 2}px)`,
    };
    bottomWall.animate(
      reverse
        ? [endPointBottomWall, startPointBottomWall]
        : [startPointBottomWall, endPointBottomWall],
      options
    );

    const startPointFrontWall = {
      transform: 'rotateX(-90deg)',
    };
    const endPointFrontWall = {
      transform: `rotateX(-90deg) translate(-${side}px, ${
        -1 * side
      }px) translateZ(-${side}px)`,
    };
    const wallAnim = frontWall.animate(
      reverse
        ? [endPointFrontWall, startPointFrontWall]
        : [startPointFrontWall, endPointFrontWall],
      options
    );

    wallAnim.onfinish = () => {
      if (!reverse) {
        setIsOpen(true);
      } else {
        animateCube(true, callback);
      }
    };
  };

  const animateCube = (reverse = false, callback?: Function) => {
    if (ref.current) {
      if (reverse) {
        if (callback) {
          const parentCube = ref.current?.getElementsByClassName(
            'parent-cube'
          )[0] as HTMLDivElement;

          const pAnimste = parentCube.animate(
            [
              {
                transform:
                  'translateZ(130px) rotateX(0deg) rotateY(360deg) translateZ(350px)',
              },
              { transform: 'translateZ(130px) rotateX(35deg) rotateY(315deg)' },
            ],
            {
              duration: 500,
              fill: 'forwards',
              easing: 'ease-in',
            }
          );

          pAnimste.onfinish = () => {
            callback();
          };
        }
        return;
      }

      const parentCube = ref.current?.getElementsByClassName(
        'parent-cube'
      )[0] as HTMLDivElement;

      const pAnimste = parentCube.animate(
        [
          { transform: 'translateZ(130px) rotateX(35deg) rotateY(315deg)' },
          {
            transform:
              'translateZ(130px) rotateX(0deg) rotateY(360deg) translateZ(350px)',
          },
        ],
        {
          duration: 500,
          fill: 'forwards',
          easing: 'ease-in',
        }
      );

      pAnimste.onfinish = () => {
        animateSides();
      };
    }
  };

  const reverseAnimateCube = (callback: Function) => {
    animateSides(true, callback);
  };

  return (
    <div>
      <div
        ref={ref}
        style={{
          animationName:
            animationType === 'rotate' ? 'rotate-project-box' : 'move-up-box',
          animationDuration: animationType === 'rotate' ? '3s' : '0.5s',
          animationIterationCount: animationType === 'rotate' ? 'infinite' : 1,
          animationTimingFunction: 'linear',
          animationPlayState:
            animationType === 'rotate' ? playState : 'running',
        }}
        onClick={() => {
          setPlayState('paused');
          setAnimationType('move-up');
          if (isOpen) {
            reverseAnimateCube(() => {
              setAnimationType('rotate');
              setPlayState('running');
              setIsOpen(false);
            });
          } else {
            animateCube();
          }
        }}
      >
        <Cube
          bgColor='#f7a'
          opacity={0.6}
          borderColor='#fff'
          width={`${side}px`}
          height={`${side}px`}
          length={`${side}px`}
          className='parent-cube'
          style={{
            transformOrigin: '0% 0%',
            transform: 'translateZ(130px) rotateX(35deg) rotateY(315deg)',
          }}
        />
      </div>
      <Cube borderColor='#fff' opacity={0.7} />
    </div>
  );
};

export default Projects;
