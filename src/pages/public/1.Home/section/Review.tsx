import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

interface Review {
    id: string;
    name: string;
    role: string;
    rating: number;
    review: string;
    image: string;
    initials: string;
}

const reviews: Review[] = [
    {
        id: '1',
        name: 'Sarah Ahmed',
        role: 'Business Owner',
        rating: 5,
        review: 'Exceptional service! They delivered my important documents across the city in just 2 hours. The real-time tracking feature gave me peace of mind.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b2e5df33?w=150&h=150&fit=crop&crop=face',
        initials: 'SA'
    },
    {
        id: '2',
        name: 'Mohammad Rahman',
        role: 'E-commerce Manager',
        rating: 5,
        review: 'We have been using their services for over a year. Their reliability and customer service is outstanding. Our customers love the fast delivery.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        initials: 'MR'
    },
    {
        id: '3',
        name: 'Fatima Khan',
        role: 'Marketing Director',
        rating: 4,
        review: 'Professional and efficient delivery service. The SMS notifications keep us informed throughout the process. Great value for money.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        initials: 'FK'
    },
    {
        id: '4',
        name: 'James Wilson',
        role: 'Operations Head',
        rating: 5,
        review: 'Outstanding logistics partner! Their express delivery saved us multiple times. The team is very responsive and professional.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        initials: 'JW'
    }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    className={`w-5 h-5 ${index < rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-muted-foreground/30'
                        }`}
                />
            ))}
        </div>
    );
};

const Review: React.FC = () => {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // GSAP-style scroll animation
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

    // Carousel API setup
    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Auto-play functionality
    useEffect(() => {
        if (!api) return;

        const autoPlay = setInterval(() => {
            api.scrollNext();
        }, 4000);

        return () => clearInterval(autoPlay);
    }, [api]);

    return (
        <section className="w-full py-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2
                        className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 transition-all duration-1000 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        What Our Clients Say
                    </h2>
                    <div
                        className={`h-1 bg-primary rounded-full w-32 mx-auto mb-6 transition-all duration-1000 delay-200 ${isVisible
                                ? 'opacity-100 scale-x-100'
                                : 'opacity-0 scale-x-0'
                            }`}
                    ></div>
                    <p
                        className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                            }`}
                    >
                        Real stories from real customers who trust our delivery services
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    ref={sectionRef}
                    className={`relative transition-all duration-1000 delay-400 ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-12'
                        }`}
                >
                    <Carousel
                        setApi={setApi}
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {reviews.map((review) => (
                                <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 h-[400px]">
                                        <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                                            <div className="mb-6">
                                                <Avatar className="w-16 h-16 mx-auto mb-4 border-4 border-primary/20">
                                                    <AvatarImage src={review.image} alt={review.name} />
                                                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                                                        {review.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <h3 className="text-xl font-bold text-card-foreground mb-1">
                                                    {review.name}
                                                </h3>
                                                <Badge variant="secondary" className="text-sm">
                                                    {review.role}
                                                </Badge>
                                            </div>

                                            <StarRating rating={review.rating} />

                                            <blockquote className="text-muted-foreground leading-relaxed italic flex-grow flex items-center">
                                                "{review.review}"
                                            </blockquote>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110" />
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110" />
                    </Carousel>

                    <div className="flex justify-center space-x-2 mt-8">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${current === index
                                        ? 'bg-primary scale-125 w-8'
                                        : 'bg-muted hover:bg-primary/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;