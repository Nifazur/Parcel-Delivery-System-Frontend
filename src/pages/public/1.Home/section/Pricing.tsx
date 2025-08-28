import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingPlan {
    id: string;
    name: string;
    price: number;
    currency: string;
    features: string[];
    isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
    {
        id: "basic",
        name: "Basic Delivery",
        price: 60,
        currency: "৳",
        features: ["3-5 business days", "Up to 1kg", "SMS notifications", "Basic tracking"],
    },
    {
        id: "standard",
        name: "Standard Delivery",
        price: 100,
        currency: "৳",
        features: [
            "1-2 business days",
            "Up to 3kg",
            "SMS + Email alerts",
            "Real-time tracking",
            "COD available",
        ],
        isPopular: true,
    },
    {
        id: "express",
        name: "Express Delivery",
        price: 150,
        currency: "৳",
        features: [
            "Same day delivery",
            "Up to 5kg",
            "Priority handling",
            "Live GPS tracking",
            "Guaranteed delivery",
        ],
    },
];

const Pricing: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
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

    const handleChoosePlan = (planId: string) => {
        console.log("Selected plan:", planId);
        // Add your plan selection logic here
    };

    return (
        <section className="w-full py-16 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 transition-all duration-1000 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        Choose Your Plan
                    </h2>
                    <p
                        className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        Select the perfect delivery option that fits your needs and budget.
                        All plans include our reliable service guarantee.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
                    {pricingPlans.map((plan, index) => (
                        <Card
                            key={plan.id}
                            id={plan.id}
                            className={`relative bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-12'
                                } ${plan.isPopular
                                    ? "border-2 border-primary shadow-xl scale-105"
                                    : "border border-border hover:border-primary/50"
                                }`}
                            style={{
                                transitionDelay: `${400 + index * 150}ms`,
                            }}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <CardContent className="p-8 text-center">
                                {/* Plan Name */}
                                <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-8">
                                    {plan.name}
                                </h3>

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-center">
                                        <span className="text-5xl md:text-6xl font-bold text-primary">
                                            {plan.currency}
                                            <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                                                {plan.price}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div
                                            key={featureIndex}
                                            className={`flex items-center text-left transition-all duration-500 ${isVisible
                                                    ? 'opacity-100 translate-x-0'
                                                    : 'opacity-0 -translate-x-4'
                                                }`}
                                            style={{
                                                transitionDelay: `${600 + index * 150 + featureIndex * 100}ms`,
                                            }}
                                        >
                                            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 transform hover:scale-110 transition-transform duration-200">
                                                <Check className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Choose Plan Button */}
                                <Button
                                    onClick={() => handleChoosePlan(plan.id)}
                                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${plan.isPopular
                                            ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                                            : "bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground"
                                        }`}
                                >
                                    Choose Plan
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Additional Info */}
                <div
                    className={`text-center mt-12 transition-all duration-1000 delay-700 ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                >
                    <p className="text-muted-foreground">
                        All prices are in Bangladeshi Taka (৳). Need a custom solution?{" "}
                        <button className="text-primary hover:underline font-semibold transition-all duration-200 hover:text-primary/80">
                            Contact us
                        </button>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;