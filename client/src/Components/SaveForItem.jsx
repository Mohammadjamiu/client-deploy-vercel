import React from 'react';
import { Link } from 'react-router-dom';

const SaveForItem = ({ pagelink, item, icon, bgcolor, buttoncolor, description }) => {
  return (
    <div className={`mb-4 p-2 flex flex-col-2 gap-5 py-5 pb-6 rounded-lg w-full ${bgcolor} border-[rgba(47,47,47,0.3)] backdrop-blur-sm`}>
      <div className='text-4xl flex justify-center items-center'>{icon}</div>
      <div className='w-full'>
        <h3 className={`font-bold text-lg dark:text-white`}>Save For A {item}.</h3>
        <p className='mb-3 text-[15px] dark:text-white font-light'>{description}</p>
        {/* Use the Link component to navigate to the pagelink */}
        <Link to={pagelink} className={`text-center inline-block rounded px-[6px] py-1 text-white font-semibold ${buttoncolor} hover:bg-[#d66b32] hover:rounded`}>
          Start now!
        </Link>
      </div>
    </div>
  );
};

export default SaveForItem;
