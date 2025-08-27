import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Truck, 
  Shield, 
  Clock, 
  Users, 
  MapPin, 
  Award, 
  Target, 
  Heart,
  CheckCircle,
  Globe
} from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  number: string;
  label: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  initials: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: <Truck className="w-8 h-8" />,
    number: "50K+",
    label: "Deliveries Completed"
  },
  {
    icon: <Users className="w-8 h-8" />,
    number: "10K+",
    label: "Happy Customers"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    number: "64",
    label: "Cities Covered"
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: "99.5%",
    label: "Success Rate"
  }
];

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    initials: 'AH'
  },
  {
    id: '2',
    name: 'Sarah Rahman',
    role: 'Operations Manager',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b2e5df33?w=150&h=150&fit=crop&crop=face',
    initials: 'SR'
  },
  {
    id: '3',
    name: 'Mohammad Ali',
    role: 'Technology Lead',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    initials: 'MA'
  },
  {
    id: '4',
    name: 'Fatima Khan',
    role: 'Customer Success',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    initials: 'FK'
  }
];

const values: Value[] = [
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Reliability",
    description: "We ensure your packages reach their destination safely and on time, every time."
  },
  {
    icon: <Clock className="w-12 h-12 text-primary" />,
    title: "Speed",
    description: "Fast delivery options from same-day to express shipping to meet your urgent needs."
  },
  {
    icon: <Heart className="w-12 h-12 text-primary" />,
    title: "Care",
    description: "Every package is handled with care, treating your shipments as if they were our own."
  },
  {
    icon: <Globe className="w-12 h-12 text-primary" />,
    title: "Coverage",
    description: "Extensive network covering all major cities and towns across Bangladesh."
  }
];

const AboutPage: React.FC = () => {
  const [, setIsVisible] = useState(false);
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
      rootMargin: "50px",
    }
  );

  const currentSection = sectionRef.current; // copy ref

  if (currentSection) {
    observer.observe(currentSection);
  }

  return () => {
    if (currentSection) {
      observer.unobserve(currentSection);
    }
  };
}, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">
                  About FastBox
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
                  Delivering Trust, 
                  <span className="text-card-foreground"> One Package at a Time</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Since 2018, we've been Bangladesh's most trusted parcel delivery service, 
                  connecting businesses and individuals across the nation with reliable, 
                  fast, and secure delivery solutions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-xl">
                  Start Shipping
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl">
                  Contact Us
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <Truck className="w-32 h-32 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary">Swift & Reliable</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2018 by Ahmed Hassan, FastBox began as a small logistics 
                  startup with a big vision: to revolutionize parcel delivery in Bangladesh 
                  through technology and exceptional service.
                </p>
                <p>
                  What started with just 5 delivery personnel and a single office in Dhaka 
                  has grown into a nationwide network serving over 10,000 customers across 
                  64 cities and towns.
                </p>
                <p>
                  Today, we're proud to be one of Bangladesh's most trusted delivery partners, 
                  handling everything from important documents to valuable packages with the 
                  same level of care and commitment.
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-8">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-card-foreground font-semibold">ISO 9001:2015 Certified</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <Target className="w-12 h-12 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To provide fast, reliable, and affordable parcel delivery services 
                      that connect people and businesses across Bangladesh.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <Award className="w-12 h-12 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To become the leading logistics partner in Bangladesh, known for 
                      innovation, reliability, and exceptional customer service.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Core Values
            </h2>
            <div className="h-1 bg-primary rounded-full w-32 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These values guide everything we do and shape how we serve our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2"
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Meet Our Team
            </h2>
            <div className="h-1 bg-primary rounded-full w-32 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind FastBox's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card 
                key={member.id}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    {member.name}
                  </h3>
                  <Badge variant="secondary">
                    {member.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;