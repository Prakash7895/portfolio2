import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import Cube from './Cube';

interface IProject {
  id: number;
  content: ReactNode;
  style?: CSSProperties;
  openProjectId: number;
  onClick: (id: number) => void;
  shadowColor?: string;
  cubeColor?: string;
}

const Project: FC<IProject> = ({
  content,
  style,
  id,
  openProjectId,
  onClick,
  cubeColor = '#f7a',
  shadowColor = '#f7d',
}) => {
  const side = 150;

  const ref = useRef<HTMLDivElement>(null);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [playState, setPlayState] = useState<AnimationPlayState>('running');
  const [animationType, setAnimationType] = useState<'rotate' | 'move-up'>(
    'rotate'
  );
  const [isAnimating, setIsAnimating] = useState(false);

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
        setIsAnimating(false);
        setIsOpen(true);
        setIsFullyOpen(true);
      } else {
        animateCube(true, callback);
      }
    };
  };

  const parentCubeStartPoint =
    'translateZ(130px) rotateX(35deg) rotateY(315deg)';

  const moveUpDuration = 0.5; //in seconds

  const animateCube = (reverse = false, callback?: Function) => {
    if (ref.current) {
      const parentCube = ref.current?.getElementsByClassName(
        'parent-cube'
      )[0] as HTMLDivElement;

      const endPoint =
        'translateZ(130px) rotateX(0deg) rotateY(360deg) translateZ(350px)';

      const pAnimste = parentCube.animate(
        reverse
          ? [
              {
                transform: endPoint,
              },
              { transform: parentCubeStartPoint },
            ]
          : [
              { transform: parentCubeStartPoint },
              {
                transform: endPoint,
              },
            ],
        {
          duration: moveUpDuration * 1000,
          fill: 'forwards',
          easing: 'ease-in',
        }
      );

      pAnimste.onfinish = () => {
        if (reverse) {
          if (callback) {
            callback();
          }
        } else {
          animateSides();
        }
      };
    }
  };

  const reverseAnimateCube = (callback: Function) => {
    animateSides(true, callback);
  };

  useEffect(() => {
    console.log('openProjectId', openProjectId);
    console.log('isOpen', isOpen);
    console.log('id', id);
    if (openProjectId !== id && isOpen) {
      ref.current?.click();
    }
  }, [openProjectId, id]);

  return (
    <div style={style}>
      <div
        ref={ref}
        style={{
          animationName:
            animationType === 'rotate' ? 'rotate-project-box' : 'move-up-box',
          animationDuration:
            animationType === 'rotate' ? '3s' : `${moveUpDuration}s`,
          animationIterationCount: animationType === 'rotate' ? 'infinite' : 1,
          animationTimingFunction:
            animationType === 'rotate' ? 'linear' : 'ease-out',
          animationPlayState:
            animationType === 'rotate' ? playState : 'running',
        }}
        onClick={() => {
          if (isAnimating) {
            return;
          }
          setIsAnimating(true);
          setPlayState('paused');
          setAnimationType('move-up');

          if (isOpen) {
            onClick(-1);
            setIsFullyOpen(false);
            setTimeout(() => {
              reverseAnimateCube(() => {
                setAnimationType('rotate');
                setPlayState('running');
                setIsOpen(false);
                setIsAnimating(false);
              });
            }, 500);
          } else {
            animateCube();
            onClick(id);
          }
        }}
      >
        <Cube
          bgColor={cubeColor}
          opacity={0.6}
          borderColor='#fff'
          width={`${side}px`}
          height={`${side}px`}
          length={`${side}px`}
          className='parent-cube'
          style={{
            transformOrigin: '0% 0%',
            transform: parentCubeStartPoint,
          }}
          frontStyle={{
            boxShadow: `0px 0px 10px 5px ${shadowColor}`,
          }}
          topStyle={{
            boxShadow: `0px 0px 10px 5px ${shadowColor}`,
          }}
          backStyle={{
            boxShadow: `0px 0px 10px 5px ${shadowColor}`,
          }}
          bottomStyle={{
            boxShadow: `0px 0px 10px 5px ${shadowColor}`,
          }}
          leftStyle={{
            boxShadow: `0px 0px 10px 5px ${shadowColor}`,
          }}
          rightStyle={{
            boxShadow: `0px 0px 10px 5px ${shadowColor}`,
          }}
        />
        <div
          className='project-content'
          style={{
            backgroundColor: cubeColor,
            transitionProperty: 'all',
            transitionDuration: '0.5s',
            transitionTimingFunction: 'linear',
            opacity: isFullyOpen ? 1 : 0,
            width: `${2 * side}px`,
            height: `${3 * side}px`,
            transform: `translateZ(${
              side + 405
            }px) translateX(-${side}px) translateY(-${
              (3 / 2) * side
            }px) rotateX(-90deg)`,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Project;
