import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SpecialtyItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

const specialties: SpecialtyItem[] = [
  {
    id: "01",
    number: "01",
    title: "Easy to order",
    description:
      "Quick and simple process that lets customers place orders effortlessly within seconds anytime, anywhere.",
  },
  {
    id: "02",
    number: "02",
    title: "Cash on delivery",
    description:
      "Customers can securely pay upon receiving items, ensuring safety, trust, and convenient flexible payment options.",
  },
  {
    id: "03",
    number: "03",
    title: "Live tracking",
    description:
      "Real-time updates allow customers to monitor package location and delivery progress anytime with ease.",
  },
];

const OurSpecialties = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    },
    {
      threshold: 0.1,  
      rootMargin: "50px", 
    }
  );

  const currentSection = sectionRef.current;
  if (currentSection) observer.observe(currentSection);

  return () => {
    if (currentSection) observer.unobserve(currentSection);
  };
}, []);

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 transition-all duration-800 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            Our specialties
          </h2>
          <p 
            className={`text-muted-foreground text-lg md:text-xl max-w-md mx-auto transition-all duration-800 delay-200 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            We provide simple ordering, secure payment, and real-time tracking to ensure a seamless and reliable delivery experience.
          </p>
        </div>

        {/* Specialties Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {specialties.map((specialty, index) => (
            <Card
              key={specialty.id}
              className={`specialty-card group border-0 bg-card hover:bg-accent/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${300 + index * 150}ms`,
              }}
            >
              <CardContent className="p-8">
                {/* Number */}
                <div className="mb-6">
                  <span className="text-6xl md:text-7xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                    {specialty.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {specialty.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {specialty.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurSpecialties;