const Axis = () => {
  return (
    <>
      {/* x-axis */}
      <div
        className='border-t-4 border-red-500 w-[500%] flex justify-center items-center'
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        <p className='top-1 text-white -translate-x-96'>-X</p>
        <p className='top-1 text-white translate-x-96'>+X</p>
      </div>
      {/* y-axis */}
      <div
        className='border-4 border-green-500 h-[500%] flex justify-center items-center'
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        <p className='left-1.5 text-white -translate-y-96 w-5'>-Y</p>
        <p className='left-1.5 text-white translate-y-96'>+Y</p>
      </div>
    </>
  );
};

export default Axis;
