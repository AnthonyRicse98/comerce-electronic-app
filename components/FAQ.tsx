'use client';

import { useEffect, useRef } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const meteorContainerRef = useRef<HTMLDivElement>(null);

  const faqData: FAQItem[] = [
    {
      question: "How do I get started with the platform?",
      answer: "Getting started is easy! Simply sign up for an account on our website, complete your profile, and follow the onboarding tutorial. If you need additional help, our support team is available 24/7 to assist you."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. For enterprise customers, we also offer invoice-based payments with flexible terms."
    },
    {
      question: "Is my data secure with your platform?",
      answer: "Absolutely. We employ industry-leading security measures including end-to-end encryption, regular security audits, and compliance with SOC 2, GDPR, and HIPAA regulations. Your data's security is our top priority."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time with no penalties. Your service will continue until the end of your current billing period, and you won't be charged again after that."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start your trial, and you can upgrade to a paid plan at any time."
    },
    {
      question: "How can I contact customer support?",
      answer: "Our support team is available via live chat on our website, email at support@example.com, or phone at +1-800-123-4567. For enterprise customers, we also provide a dedicated account manager."
    }
  ];

  useEffect(() => {
    // Setup meteor animation
    const container = meteorContainerRef.current;
    if (!container) return;

    const meteorCount = 10;
    
    for (let i = 0; i < meteorCount; i++) {
      const meteor = document.createElement('div');
      meteor.classList.add('meteor');
      
      const delay = Math.random() * 5;
      const duration = Math.random() * 6 + 3;
      const topPosition = Math.random() * 100;
      const leftPosition = Math.floor(Math.random() * 300) - 300;
      
      meteor.style.top = `${topPosition}%`;
      meteor.style.left = `${leftPosition}px`;
      meteor.style.animationDelay = `${delay}s`;
      meteor.style.animationDuration = `${duration}s`;
      
      if (i % 3 === 0) {
        meteor.style.background = 'rgba(99, 102, 241, 0.8)';
        meteor.style.boxShadow = '0 0 1px rgba(99, 102, 241, 0.3)';
      }
      
      container.appendChild(meteor);
    }

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  const toggleFAQ = (event: React.MouseEvent<HTMLButtonElement>) => {
    const item = (event.currentTarget as HTMLElement).closest('.faq-item');
    item?.classList.toggle('faq-open');
  };

  return (
    <section id="faq" className=" text-gray-200 min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-xs font-medium">
            SUPPORT
          </span>
          <h2 className="text-3xl font-bold text-white mt-4 mb-2">
            Frequently Asked Questions
          </h2>
          <div className="h-px w-16 bg-red-500/70 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </div>
        
        {/* FAQ Bento Grid */}
        <div className="relative bg-black/60 backdrop-blur-sm border border-gray-800/30 rounded-xl p-6 md:p-8 shadow-md overflow-hidden mb-8">
          <div 
            ref={meteorContainerRef}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="meteor" style={{ top: '30%', left: '-150px', animationDelay: '1s' }}></div>
            <div className="meteor" style={{ top: '50%', left: '-250px', animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div 
                  key={index}
                  className={`faq-item border-b border-gray-800/50 pb-4 ${
                    index === faqData.length - 1 ? '' : 'border-b'
                  }`}
                >
                  <button 
                    onClick={toggleFAQ}
                    className="flex justify-between items-center w-full text-left focus:outline-none"
                  >
                    <h3 className="text-lg font-medium text-white">
                      {faq.question}
                    </h3>
                    <span className="faq-icon text-white ml-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </span>
                  </button>
                  <div className="faq-content pt-2">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a 
            href="#" 
            className="inline-flex items-center px-5 py-2.5 bg-white  text-black font-medium rounded-lg text-sm border transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Contact Support
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes meteor {
          0% { transform: rotate(215deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
        }
        .meteor {
          position: absolute;
          height: 1px;
          width: 1px;
          border-radius: 9999px;
          background-color: rgba(209, 213, 219, 0.8);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
          transform: rotate(215deg);
          animation: meteor 5s linear infinite;
        }
        .meteor::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 1px;
          background: linear-gradient(to right, rgba(209, 213, 219, 0.8), transparent);
        }
        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .faq-open .faq-content {
          max-height: 500px;
        }
        .faq-icon {
          transition: transform 0.3s ease;
        }
        .faq-open .faq-icon {
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  );
};

export default FAQ;