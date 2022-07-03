import desktopDivider from './assets/pattern-divider-desktop.svg';
import mobileDivider from './assets/pattern-divider-mobile.svg';
import diceIcon from './assets/icon-dice.svg';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import './App.css';

function App() {
  const [advice, setAdvice] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const randomAdvice = async () => {
    setIsLoading(true);
    const response = await fetch('https://api.adviceslip.com/advice');
    const adviceData = await response.json();

    setAdvice(adviceData);
    setIsLoading(false);
  };

  useEffect(() => {
    randomAdvice();
  }, []);

  return (
    <>
      <div className='h-screen bg-darkBlue flex items-center justify-center flex-col'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className='w-72 md:w-[500px] h-fit bg-darkGrayishBlue p-8 md:p-12 text-center rounded-lg'>
              <h2 className='text-neonGreen text-sm mb-5'>ADVICE #{advice.slip.id}</h2>
              <p className='text-lightCyan mb-10 font-extrabold'>“{advice.slip.advice}”</p>
              <img src={desktopDivider} alt='desktop divider' className='hidden md:flex' />
              <img src={mobileDivider} alt='mobile divider' className='md:hidden' />
            </div>
            <button
              className='h-12 w-12 bg-neonGreen -mt-5 rounded-full flex items-center justify-center shadow-neon'
              onClick={randomAdvice}
            >
              <img src={diceIcon} alt='dice' className='h-5 w-5' />
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
