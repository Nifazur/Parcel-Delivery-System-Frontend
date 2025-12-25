import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How can I track my parcel?',
    answer: 'You can track your parcel by entering your tracking ID on our tracking page. You will receive real-time updates about your parcel location and delivery status.',
  },
  {
    id: '2',
    question: 'What are the delivery timeframes?',
    answer: 'We offer multiple delivery options: Express (same day), Standard (1-2 days), and Basic (3-5 days). Delivery time depends on the service you choose and your location.',
  },
  {
    id: '3',
    question: 'How is the delivery fee calculated?',
    answer: 'Delivery fees are based on parcel weight, destination division, and delivery speed. You can see the exact fee when creating a parcel in your dashboard.',
  },
  {
    id: '4',
    question: 'Can I cancel my parcel after booking?',
    answer: 'Yes, you can cancel your parcel before it is dispatched. Once dispatched, cancellation may incur charges. Check your dashboard for cancellation options.',
  },
  {
    id: '5',
    question: 'What items are prohibited for delivery?',
    answer: 'We do not deliver hazardous materials, illegal items, perishable goods without proper packaging, weapons, or explosives. Contact support for specific item queries.',
  },
  {
    id: '6',
    question: 'How do I create an account?',
    answer: 'Click on Register in the top navigation, fill in your details, and verify your email. You can also sign up using your Google account for faster registration.',
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Frequently Asked Questions
          </h2>
          <div
            className={`h-1 bg-primary rounded-full w-32 mx-auto mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          ></div>
          <p
            className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Find answers to common questions about our delivery services
          </p>
        </div>

        {/* FAQ Items */}
        <div ref={sectionRef} className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${400 + index * 100}ms`,
              }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-accent/50 transition-colors"
              >
                <span className="text-lg font-semibold text-card-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-primary transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-200 hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;