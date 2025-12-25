import { useState, useEffect, useRef } from 'react';
import { Package, Users, MapPin, Award } from 'lucide-react';

interface Stat {
  id: string;
  icon: React.ReactNode;
  number: number;
  label: string;
  suffix?: string;
}

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    {
      id: 'deliveries',
      icon: <Package className="w-8 h-8 text-primary-foreground" />,
      number: 50000,
      label: 'Parcels Delivered',
      suffix: '+',
    },
    {
      id: 'customers',
      icon: <Users className="w-8 h-8 text-primary-foreground" />,
      number: 10000,
      label: 'Happy Customers',
      suffix: '+',
    },
    {
      id: 'cities',
      icon: <MapPin className="w-8 h-8 text-primary-foreground" />,
      number: 64,
      label: 'Cities Covered',
      suffix: '',
    },
    {
      id: 'rate',
      icon: <Award className="w-8 h-8 text-primary-foreground" />,
      number: 99.5,
      label: 'Success Rate',
      suffix: '%',
    },
  ];

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
        threshold: 0.3,
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

  useEffect(() => {
    if (!isVisible) return;

    const animateCount = (stat: Stat) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.number / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(
          Math.round(increment * currentStep),
          stat.number
        );

        setCounts((prev) => ({
          ...prev,
          [stat.id]: currentValue,
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return timer;
    };

    const timers = stats.map((stat) => animateCount(stat));

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [isVisible]);

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-br from-primary to-primary/90">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-primary-foreground mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our Impact in Numbers
          </h2>
          <p
            className={`text-primary-foreground/80 text-lg md:text-xl transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Trusted by thousands across Bangladesh
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`text-center group transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${300 + index * 150}ms`,
              }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-foreground/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-primary-foreground/20 transition-all duration-300">
                {stat.icon}
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
                {counts[stat.id] || 0}
                {stat.suffix}
              </div>

              {/* Label */}
              <div className="text-primary-foreground/90 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-primary-foreground/90 text-lg mb-4">
            Join thousands of satisfied customers
          </p>
          <button className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Statistics;