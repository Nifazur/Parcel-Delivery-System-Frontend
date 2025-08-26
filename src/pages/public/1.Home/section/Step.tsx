
import { CalendarRange, Package, Truck, Send } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const Step = () => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Booking',
      description: 'Customer confirms order and provides details through our simple, fast, and secure booking system.',
      icon: CalendarRange,
      color: 'bg-primary'
    },
    {
      step: 'Step 2',
      title: 'Packing',
      description: 'Our team carefully packs items with protective materials ensuring safe handling and zero damage.',
      icon: Package,
      color: 'bg-primary'
    },
    {
      step: 'Step 3',
      title: 'Transportation',
      description: 'Goods are transported efficiently using trusted routes, ensuring speed, safety, and reliable tracking service.',
      icon: Truck,
      color: 'bg-primary'
    },
    {
      step: 'Step 4',
      title: 'Delivery',
      description: 'Package reaches the customer’s doorstep on time, with guaranteed accuracy, care, and satisfaction.',
      icon: Send,
      color: 'bg-primary'
    }
  ];


    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.step-item');
            gsap.from(items, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

  return (
    <section
    ref={containerRef} 
    className="py-16 md:py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              HOW Fast box works
            </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-5">
            Discover how our platform works step by step, making booking, packing, and delivery simple and reliable.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center step-item">
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 md:w-24 md:h-24 ${step.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
                  </div>
                  
                  {/* Connecting Line - Hidden on last item and mobile */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 md:top-12 left-20 md:left-24 w-full h-0.5 bg-muted-foreground/20 -z-10">
                      <div className="absolute right-0 top-0 w-2 h-2 bg-muted-foreground/40 rounded-full transform translate-x-1 -translate-y-0.5"></div>
                    </div>
                  )}
                </div>

                {/* Step Label */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {step.step}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-primary/10 rounded-full">
            <span className="text-primary font-medium">Ready to get started?</span>
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step;