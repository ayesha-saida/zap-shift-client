import { useState } from 'react'

const AskFAQ = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
  return (
<div className='w-11/12 mx-auto'>
  <div className=" border-b-gray-300 pt-5">
      <button className="w-full bg-[#f4eded] px-4 py-5 text-left border-none outline-none cursor-pointer flex justify-between items-center hover:bg-[#f0e7e7] rounded-xl" onClick={() => setOpen(!open)}>
        {question}
        <span className={`transition-transform duration-200  ${open ? "rotate-180" : "rotate-0"}`}>⌄</span>
      </button>

      {open && <div className="bg-white p-5 text-sm">{answer}</div>}
    </div>
    </div>
  )
}

export default function FAQSection() {
  const faqData = [
    {
      "question": "How are ride fares calculated?",
      "answer": "Fares are based on distance, estimated travel time, current traffic, and any ongoing surge pricing."
    },
    {
      "question": "Can I schedule a ride in advance?",
      "answer": "Yes, you can schedule a ride by selecting the 'Schedule' option and choosing your desired time and date."
    },
    {
      "question": "What payment methods are accepted?",
      "answer": "We accept cash, credit/debit cards, mobile wallets, and in-app balance depending on your region."
    },
    {
      "question": "How do I report an issue with a ride or delivery?",
      "answer": "Go to 'Support' in the app, choose the relevant ride or delivery, and submit your complaint."
    },
    {
      "question": "What items are prohibited for delivery?",
      "answer": "Hazardous materials, flammable items, illegal goods, and perishable food items are not allowed."
    }
  ];

  return (
    <div className="w-full max-w-[800px] mx-auto">
      {faqData.map((item, index) => (
        < AskFAQ key={index} {...item} />
      ))}
    </div>
  );
}
