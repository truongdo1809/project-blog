import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  handleToggle: (index: number) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  index,
  isOpen,
  handleToggle,
}) => {
  return (
    <li>
      <div
        className="py-3 px-4 text-center bg-white rounded-xl flex justify-between items-center mb-2"
        onClick={() => handleToggle(index)}
      >
        <p>{question}</p>
        <p>{isOpen ? <FaCaretUp /> : <FaCaretDown />}</p>
      </div>
      <ul
        className={` question  overflow-hidden  ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <li className="py-3 px-4 text-justify bg-white rounded-xl items-center mb-2 opacity-70">
          {answer}
        </li>
      </ul>
    </li>
  );
};

export default function ServicesFaq() {
  const [isOpen, setIsOpen] = useState(Array(4).fill(false));

  const handleToggle = (index: number) => {
    const newState = isOpen.map((item, i) => (i === index ? !item : false));
    setIsOpen(newState);
  };
  const faqData = [
    {
      question: "What is paid search management, and why do I need it?",
      answer:
        "In to am attended desirous raptures declared diverted confined at. Collected instantly remaining up certainly to necessary as. Over walk dull into son boy door went new. At or happiness commanded daughters as. Is handsome an declared at received in extended vicinity subjects. Into miss on he over been late pain an.",
    },
    {
      question: "How can paid search management benefit my business?",
      answer:
        "In to am attended desirous raptures declared diverted confined at. Collected instantly remaining up certainly to necessary as. Over walk dull into son boy door went new. At or happiness commanded daughters as. Is handsome an declared at received in extended vicinity subjects. Into miss on he over been late pain an.",
    },
    {
      question: "What platforms do you support for paid search management?",
      answer:
        "In to am attended desirous raptures declared diverted confined at. Collected instantly remaining up certainly to necessary as. Over walk dull into son boy door went new. At or happiness commanded daughters as. Is handsome an declared at received in extended vicinity subjects. Into miss on he over been late pain an.",
    },
    {
      question: "How do you optimize my paid search campaigns?",
      answer:
        "In to am attended desirous raptures declared diverted confined at. Collected instantly remaining up certainly to necessary as. Over walk dull into son boy door went new. At or happiness commanded daughters as. Is handsome an declared at received in extended vicinity subjects. Into miss on he over been late pain an.",
    },
  ];

  return (
    <section>
      <div className="banner-question bg-[url('https://i.imgur.com/DUdSjvb.jpg')] bg-cover bg-center">
        <div className="py-24 px-3 max-w-[658px] mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white">F.A.Q.</h2>
            <p className="text-white my-8">
              Rendered her for put improved concerns his. Ladies bed wisdom
              theirs mrs men months set. Everything so dispatched as it
              increasing pianoforte.
            </p>
          </div>

          <div>
            <ul>
              {faqData.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  isOpen={isOpen[index]}
                  handleToggle={handleToggle}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
