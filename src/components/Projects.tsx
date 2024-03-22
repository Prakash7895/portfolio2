import { useEffect, useRef } from 'react';
import Cube from './Cube';

const Projects = () => {
  const side = 150;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = ref.current?.getAnimations();
    if (!t?.length && ref.current) {
      console.log('TTt', t);
      ref.current.animate(
        [{ transform: 'rotateZ(0deg)' }, { transform: 'rotateZ(360deg)' }],
        {
          duration: 3000,
          iterations: Infinity,
        }
      );
    }
  }, []);

  const animateSides = () => {
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

    leftWall.animate(
      [
        { transform: 'rotateY(-90deg)' },
        {
          transform:
            'rotateY(-90deg) translate(0px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
        },
      ],
      {
        duration: time,
        fill: 'forwards',
        easing: 'ease-in',
      }
    );
    rightWall.animate(
      [
        { transform: 'rotateY(90deg)' },
        {
          transform: `rotateY(90deg) rotateX(90deg) translate(${side}px, -${
            2 * side
          }px)`,
        },
      ],
      {
        duration: time,
        fill: 'forwards',
        easing: 'ease-in',
      }
    );
    topWall.animate(
      [
        { transform: 'translateZ(150px)' },
        {
          transformOrigin: '0% 0%',
          transform:
            'translateZ(150px) translate(0px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
        },
      ],
      {
        duration: time,
        fill: 'forwards',
        easing: 'ease-in',
      }
    );
    bottomWall.animate(
      [
        { transform: '' },
        {
          transformOrigin: '0% 0%',
          transform:
            'translate(0px, 0px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg)',
        },
      ],
      {
        duration: time,
        fill: 'forwards',
        easing: 'ease-in',
      }
    );
    frontWall.animate(
      [
        { transform: 'rotateX(-90deg)' },
        {
          transformOrigin: '0% 0%',
          transform: `rotateX(-90deg) translate(-${side}px, ${-2 * side}px)`,
        },
      ],
      {
        duration: time,
        fill: 'forwards',
        easing: 'ease-in',
      }
    );
  };

  const animateCube = () => {
    if (ref.current) {
      const anim = ref.current.animate([{}, { transform: 'rotateZ(360deg)' }], {
        duration: 500,
        fill: 'forwards',
      });

      anim.onfinish = () => {
        console.log('anim', anim);
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
      };
    }
  };

  return (
    <div>
      <div
        ref={ref}
        onClick={(e) => {
          const t = e.currentTarget.getAnimations();
          console.log('T', t);

          t[0]?.pause();
          animateCube();
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
          // leftStyle={{
          //   transform:
          //     'translate(0px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
          // }}
          // rightStyle={{
          //   transform: `rotateX(90deg) translate(${side}px, -${2 * side}px)`,
          // }}
          // topStyle={{
          //   transformOrigin: '0% 0%',
          //   transform:
          //     'translate(0px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
          // }}
          // bottomStyle={{
          //   transformOrigin: '0% 0%',
          //   transform:
          //     'translate(0px, 0px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg)',
          // }}
          // frontStyle={{
          //   transformOrigin: '0% 0%',
          //   transform: `translate(-${side}px, ${-2 * side}px)`,
          // }}
        />
      </div>
      <Cube borderColor='#fff' opacity={0.7} />
    </div>
  );
};

export default Projects;
