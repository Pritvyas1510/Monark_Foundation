// src/components/FAQSection.jsx
import { FiArrowDown } from "react-icons/fi";
const FAQSection = () => {
  const faqs = [
    {
      question: "How much of my donation goes directly to the projects?",
      answer:
        "We maintain high efficiency — 88–92% of every rupee goes directly to field projects and beneficiaries. Remaining amount covers essential administration and fundraising costs.",
    },
    {
      question: "Can I choose which project to support?",
      answer:
        "Yes! You can direct your donation to any specific initiative — education, water, healthcare, food security, or others. Just mention it during donation or contact us.",
    },
    {
      question: "Is my donation tax-deductible in India?",
      answer:
        "Yes, Monark Foundation is registered under 80G & 12A. Indian donors receive tax exemption benefit under Section 80G of Income Tax Act.",
    },
    {
      question: "How can I volunteer with you?",
      answer:
        "We welcome volunteers for field work, content creation, fundraising, digital marketing, and more. Fill the volunteer form or write to us at volunteer@monarkfoundation.org",
    },
  ];

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-3">
            Common Questions
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-white/10 hover:border-primary/20 transition-all"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-text-main dark:text-gray-500 font-bold text-lg select-none">
                <span>{faq.question}</span>
                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180 text-primary">
                 <FiArrowDown />
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;