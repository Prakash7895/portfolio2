import Planet from './components/Planet';
import Stars from './components/Stars';

function App() {
  return (
    <div id='root-div' className='w-full h-full fixed'>
      <Stars />
      <Planet />
    </div>
  );
}

export default App;
