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
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine. It encourages you to maintain proper posture throughout the day."
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, it is designed to fit a wide range of body shapes and ages with adjustable straps."
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Regular use can help reduce strain and improve posture, which may relieve mild back discomfort."
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Some models include smart sensors and vibration reminders, depending on the version."
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can sign up with your email or phone number to receive restock notifications."
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
