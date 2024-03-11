import Bar from './Bar';

const Boundary = () => {
  return (
    <div
      style={{
        transform: 'translate(300px, 300px)',
      }}
      className='text-white'
    >
      <Bar />
    </div>
  );
};

export default Boundary;
