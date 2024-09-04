
import React from 'react';
import { EyeOff, Eye, DollarSign, CirclePlus, Car, Telescope, House } from 'lucide-react';
import SaveForItem from '../Components/SaveForItem';

const HomePage = () => {


  return (
    <div className={`home_page  w-full m-auto `}>
      <div className='home_section_cards mt-6 '>
        <div className='px-5 py-5 pb-6 rounded-lg max-w-full bg-[#ff550059]  dark:bg-[#813615] border border-[#ff5500] backdrop-blur-sm'>
          <span className="hello-greeting font-bold  text-lg dark:text-white">Hello, Amigo's 👋</span>
          <div className="savings_balance mt-4">
            <p className='inline-block font-semibold text-sm  dark:text-white'>Total Savings <Eye className='inline' /><EyeOff className='inline hidden' /> </p>
            <div className='flex text-center'>
              <DollarSign className='w-4 mt-[2px] dark:text-white' /> <span className="amount font-semibold text-lg dark:text-white">0.<sub>00</sub></span>
            </div>
            <div className="top_up flex justify-center items-center mt-4">
              <a href="" className='text-center inline-block rounded w-full px-4 py-2 text-white bg-amigo-primary-100 font-semibold hover:bg-amigo-primary-200 hover:rounded'>Top Up <CirclePlus className='ml-2 inline' /></a>
            </div>
          </div>
        </div>
      </div>
      <section className="create_savings_target mt-10 ">
        <h2 className='font-bold text-xl dark:text-white'>Create a savings target.</h2>
        <span className='mb-6 inline-block text-amigo-grey dark:text-[#6b6b6b] text-[15px] font-light'>What's the dream you hope to achieve?</span>
      
        <SaveForItem pagelink={'/save-for-car'} icon={<Car className='h-16 w-16 ml-2 text-amigo-primary-100 dark:text-white' />} item={'Car'} description={'Are you hoping to ride your dream car with ease?'} bgcolor={`bg-[#ff550069] dark:bg-[#fa6a2cc0]`} buttoncolor={'bg-amigo-primary-100'} />
        <SaveForItem pagelink={'/save-for-house'} icon={<House className='h-16 w-16 ml-2 text-[#866bd1] dark:text-white' />} item={'House'} description={'Are you hoping to live in your dream house with ease?'} bgcolor={`bg-[#dedae9] dark:bg-[#866bd1ef]`} buttoncolor={`bg-[#8567da] dark:bg-[#7149df]`} />
         <SaveForItem pagelink={'/save-for-something-else'} icon={<Telescope className='h-16 w-16 ml-2 text-amigo-primary-100 dark:text-white' />} item={'Something Else'} description={'Do you have something else you want to save for?'} bgcolor={`bg-[#ff550069] dark:bg-[#fa6a2cc0]`} buttoncolor={'bg-amigo-primary-100'}/>

    </section>
    
    </div>
  );
};

export default HomePage;
