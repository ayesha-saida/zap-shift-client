import React from 'react'
//import FAQSection from './AskFAQ'
import FAQSection from './AskFAQ'

const FAQ = () => {
  return (
       <div className='w-11/12 mx-auto pt-[40px]'>
        <div className='space-y-3 text-center'> 
        <h1 className='font-semibold text-3xl text-secondary'> Frequently Asked Question (FAQ)</h1>
        <p className='text-sm text-gray-500'>Enhance posture, mobility and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease! </p>
    </div>
      <FAQSection></FAQSection> 
    </div>
  )
}

export default FAQ