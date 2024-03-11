import Cube from './Cube';

const Bar = () => {
  return (
    <div>
      <Cube
        // opacity={0.7}
        width='50px'
        height='210px'
        length='20px'
        borderColor='#fff'
        bgColor='#ccc'
        style={{
          transform: 'translate(0px, 0px)',
        }}
        frontStyle={{
          backgroundImage: 'linear-gradient(to top, #999, #ccc)',
        }}
        backStyle={{
          backgroundImage: 'linear-gradient(to top, #999, #ccc)',
        }}
        leftStyle={{
          backgroundImage: 'linear-gradient(to right, #999, #ccc)',
        }}
        rightStyle={{
          backgroundImage: 'linear-gradient(to left, #999, #ccc)',
        }}
      />
      <Cube
        // opacity={0.7}
        width={`${50 / Math.SQRT2}px`}
        height={`${50 / Math.SQRT2}px`}
        length='20px'
        borderColor='#fff'
        bgColor='#ccc'
        style={{
          transform: ' translateZ(210px) rotateY(45deg) translateY(0.1px)',
          transformOrigin: '0% 0%',
        }}
      />
      <Cube
        // opacity={0.7}
        width='150px'
        height='30px'
        length='10px'
        borderColor='#fff'
        bgColor='#ccc'
        style={{
          transform: 'translateZ(45px) translateY(-10px) translateX(-50px)',
        }}
        frontStyle={{
          backgroundImage: 'radial-gradient(#999, #ccc)',
        }}
        backStyle={{
          backgroundImage: 'radial-gradient(#999, #ccc)',
        }}
      />
      <Cube
        width='150px'
        height='30px'
        length='10px'
        borderColor='#fff'
        bgColor='#ccc'
        style={{
          transform: 'translateZ(115px) translateY(-10px) translateX(-50px)',
        }}
        frontStyle={{
          backgroundImage: 'radial-gradient(#999, #ccc)',
        }}
        backStyle={{
          backgroundImage: 'radial-gradient(#999, #ccc)',
        }}
      />
    </div>
  );
};

export default Bar;
