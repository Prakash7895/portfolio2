import { useEffect, useRef } from 'react';
import Cube from './Cube';

const Projects = () => {
  const side = 150;

  const ref = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     const t = ref.current?.getAnimations();
  //     if (!t?.length) {
  //       console.log('TTt', t);
  //       ref.current?.animate(
  //         [{ transform: 'rotateZ(0deg)' }, { transform: 'rotateZ(360deg)' }],
  //         {
  //           duration: 3000,
  //           iterations: Infinity,
  //         }
  //       );
  //     }
  //   }, []);

  return (
    <div>
      <div
        ref={ref}
        onClick={(e) => {
          const t = e.currentTarget.getAnimations();
          console.log('T', t);

          t[0].pause();
        }}
      >
        <Cube
          bgColor='#f7a'
          opacity={0.6}
          borderColor='#fff'
          width={`${side}px`}
          height={`${side}px`}
          length={`${side}px`}
          style={{
            transformOrigin: '0% 0%',
            // transform: 'translateZ(130px) rotateX(35deg) rotateY(315deg)',
            transform: 'translateZ(350px)',
          }}
          leftStyle={{
            transform:
              'translate(0px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
          }}
          rightStyle={{
            transform: `rotateX(90deg) translate(${side}px, -${2 * side}px)`,
          }}
          topStyle={{
            transformOrigin: '0% 0%',
            transform:
              'translate(0px, 0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg)',
          }}
          bottomStyle={{
            transformOrigin: '0% 0%',
            transform:
              'translate(0px, 0px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg)',
          }}
          frontStyle={{
            transformOrigin: '0% 0%',
            transform: `translate(-${side}px, ${-2 * side}px)`,
          }}
        />
      </div>
      <Cube borderColor='#fff' opacity={0.7} />
    </div>
  );
};

export default Projects;
