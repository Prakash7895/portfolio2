import { useEffect } from 'react';

const Stars = () => {
  useEffect(() => {
    const particles = document.querySelectorAll<HTMLDivElement>('.particles');
    particles.forEach((particle) => {
      const xNegative = Math.random() > 0.5 ? -1 : 1;
      const yNegative = Math.random() > 0.5 ? -1 : 1;

      const x = xNegative * (Math.random() * (window.innerWidth * 2));
      const y = yNegative * (Math.random() * (window.innerHeight * 2));

      const duration = 15 * 1000;

      const zAxis = 1500;

      const zPos = Math.random() * (zAxis - -5 * zAxis) + -5 * zAxis;

      particle.animate(
        [
          {
            transform: `translate(${x}px, ${y}px) translateZ(${zPos}px)`,
          },

          {
            transform: `translate(${x}px, ${y}px) translateZ(${2 * zAxis}px)`,
          },
        ],
        {
          duration: duration,
          iterations: Infinity,
          delay: Math.random() * duration,
          easing: 'ease-in',
        }
      );
    });
  }, []);

  const particles = Array.from({ length: 1000 }, (_, i) => i + 1).map((i) => {
    return (
      <div
        key={i}
        className={`w-[2px] h-[2px] rounded-full bg-gray-200 particles particle-${i}`}
      ></div>
    );
  });

  return <div className='absolute w-full h-full -z-[1000] -left-3'>{particles}</div>;
};

export default Stars;
