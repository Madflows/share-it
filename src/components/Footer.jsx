import React from 'react'
import Status from './Status';

const Footer = () => {
  return (
    <footer className='py-4 min-h-[300px] flex flex-col gap-3 items-center relative justify-center'>
      <Status />
      <div className='relative z-20 text-white'>Created with 💖 by <a href="https://twitter.com/madflows_" target={"_blank"} rel="noreferrer" className='font-bold decoration-thick decoration-emerald-200 hover:decoration-emerald-500 transition decoration-2 underline'>Madflows</a></div>
      <span className='text-sm text-white'>Proud member of <span className="font-semibold text-emerald-600">#genzietechies</span></span>
    </footer>
  );
}

export default Footer
