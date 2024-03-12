import Bar from './Bar';

const Boundary = () => {
  const numOfBars = 20;
  const barWidth = 150;
  const offset = 12.5;

  return (
    <div
      style={{
        transform: 'translate(0px, 0px)',
      }}
      className='text-white'
    >
      {Array.from({ length: numOfBars }).map((_, idx) => (
        <Bar
          key={idx}
          x={(-1 * numOfBars * barWidth) / 2 + idx * barWidth + barWidth / 2}
          y={(-1 * numOfBars * barWidth) / 2 + offset}
        />
      ))}
      <div
        style={{
          transform: `translateX(-${
            (1 * numOfBars * barWidth) / 2 - offset
          }px) rotateZ(-90deg)`,
        }}
      >
        {Array.from({ length: numOfBars }).map((_, idx) => (
          <Bar
            key={idx}
            x={(-1 * numOfBars * barWidth) / 2 + idx * barWidth + barWidth / 2}
            y={0}
          />
        ))}
      </div>
      <div
        style={{
          transform: `translateY(${
            (1 * numOfBars * barWidth) / 2 - offset
          }px) rotateZ(180deg)`,
        }}
      >
        {Array.from({ length: numOfBars }).map((_, idx) => (
          <Bar
            key={idx}
            x={(-1 * numOfBars * barWidth) / 2 + idx * barWidth + barWidth / 2}
            y={0}
          />
        ))}
      </div>
      <div
        style={{
          transform: `translateX(${
            (1 * numOfBars * barWidth) / 2 - offset
          }px) rotateZ(90deg)`,
        }}
      >
        {Array.from({ length: numOfBars }).map((_, idx) => (
          <Bar
            key={idx}
            x={(-1 * numOfBars * barWidth) / 2 + idx * barWidth + barWidth / 2}
            y={0}
          />
        ))}
      </div>
    </div>
  );
};

export default Boundary;
