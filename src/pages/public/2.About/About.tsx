import { useState, useEffect, useRef } from 'react';
import {
  Truck,
  Shield,
  Users,
  MapPin,
  Award,
  Target,
  Heart,
  CheckCircle,
  Globe,
  Zap,
  Code,
  Database,
  Smartphone,
  TrendingUp,
  Package,
  Star,
  ArrowRight,
  Play,
  Pause,
  ChevronRight,
  Rocket,
  Cpu,
  Lock,
  BarChart3,
  Building2,
  Handshake,
  Lightbulb,
  Coffee,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AboutPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({
    deliveries: 0,
    customers: 0,
    cities: 0,
    successRate: 0,
  });

  const stats = [
    {
      icon: <Package className="w-6 h-6" />,
      number: 500,
      suffix: '+',
      label: 'Parcels Delivered',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Users className="w-6 h-6" />,
      number: 100,
      suffix: '+',
      label: 'Happy Customers',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      number: 64,
      suffix: '',
      label: 'Cities Covered',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      number: 99.5,
      suffix: '%',
      label: 'Success Rate',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const timeline = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'Fast Box was founded with a vision to revolutionize parcel delivery in Bangladesh.',
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      year: '2019',
      title: 'Expansion',
      description: 'Expanded to 20 cities with a growing team of 50+ delivery personnel.',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our mobile app and real-time tracking system.',
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      year: '2021',
      title: 'ISO Certification',
      description: 'Achieved ISO 9001:2015 certification for quality management.',
      icon: <Award className="w-5 h-5" />,
    },
    {
      year: '2022',
      title: 'Nationwide Coverage',
      description: 'Reached all 64 districts of Bangladesh with same-day delivery options.',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      year: '2023',
      title: 'Tech Innovation',
      description: 'Introduced AI-powered route optimization and automated sorting.',
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      year: '2024',
      title: 'New Horizons',
      description: 'Launched merchant platform and API integrations for e-commerce.',
      icon: <Code className="w-5 h-5" />,
    },
  ];

  const teamMembers = [
    {
      id: '1',
      name: 'Nifazur Rahman',
      role: 'Founder & Lead Developer',
      bio: 'Full-stack developer with passion for building scalable logistics solutions.',
      image: '',
      initials: 'NR',
      github: 'https://github.com/Nifazur',
      linkedin: 'https://www.linkedin.com/in/nifazur-rahman/',
      email: 'nifazurrahman2872@gmail.com',
    },
    {
      id: '2',
      name: 'Nifazur Rahman',
      role: 'Operations Manager',
      bio: 'Expert in logistics optimization with 8+ years of industry experience.',
      image: '',
      initials: 'NR',
      github: 'https://github.com/Nifazur',
      linkedin: 'https://www.linkedin.com/in/nifazur-rahman/',
      email: 'nifazurrahman2872@gmail.com',
    },
    {
      id: '3',
      name: 'Nifazur Rahman',
      role: 'Backend Architect',
      bio: 'Specialist in Node.js, MongoDB, and microservices architecture.',
      image: '',
      initials: 'NR',
      github: 'https://github.com/Nifazur',
      linkedin: 'https://www.linkedin.com/in/nifazur-rahman/',
      email: 'nifazurrahman2872@gmail.com',
    },
    {
      id: '4',
      name: 'Nifazur Rahman',
      role: 'UI/UX Designer',
      bio: 'Creating intuitive and beautiful user experiences for logistics.',
      image: '',
      initials: 'NR',
      github: 'https://github.com/Nifazur',
      linkedin: 'https://www.linkedin.com/in/nifazur-rahman/',
      email: 'nifazurrahman2872@gmail.com',
    },

  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Reliability',
      description: 'We ensure your packages reach their destination safely and on time, every single time.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Speed',
      description: 'From same-day to express shipping, we offer delivery options for every urgent need.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Care',
      description: 'Every package is handled with utmost care, treating your shipments as our own.',
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Continuously improving our technology and processes for better service.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'Trust',
      description: 'Building lasting relationships with customers through transparency and honesty.',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Coverage',
      description: 'Extensive network covering all major cities and remote areas across Bangladesh.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  ];

  const techStack = {
    frontend: [
      { name: 'React 18', icon: '⚛️' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Vite', icon: '⚡' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Redux Toolkit', icon: '🔄' },
      { name: 'React Router', icon: '🧭' },
    ],
    backend: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express.js', icon: '🚂' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Mongoose', icon: '📊' },
      { name: 'JWT Auth', icon: '🔐' },
      { name: 'Passport.js', icon: '🎫' },
    ],
    tools: [
      { name: 'Bun', icon: '🥟' },
      { name: 'Git', icon: '📚' },
      { name: 'ESLint', icon: '✅' },
      { name: 'Zod', icon: '🛡️' },
      { name: 'RTK Query', icon: '🔍' },
      { name: 'Vercel', icon: '▲' },
    ],
  };

  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure Authentication',
      description: 'JWT tokens with Google OAuth2 integration for seamless and secure login.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Role-Based Access',
      description: 'Dynamic roles for Admin, Sender, Receiver with automatic role assignment.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-Time Tracking',
      description: 'Live parcel tracking with detailed timeline and status updates.',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Smart Fee Calculation',
      description: 'Automated pricing based on weight, distance, and delivery speed.',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Division Management',
      description: 'Comprehensive coverage across all 64 districts of Bangladesh.',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Responsive Design',
      description: 'Seamless experience across desktop, tablet, and mobile devices.',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCounters({
          deliveries: Math.floor(50000 * easeOut),
          customers: Math.floor(10000 * easeOut),
          cities: Math.floor(64 * easeOut),
          successRate: Math.floor(99.5 * easeOut * 10) / 10,
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters({
            deliveries: 50000,
            customers: 10000,
            cities: 64,
            successRate: 99.5,
          });
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  // Auto-rotate stats on mobile
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-sm">
                    <Rocket className="w-3 h-3 mr-1" />
                    Est. 2018
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ISO 9001:2015 Certified
                  </Badge>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-primary">Delivering Trust,</span>
                  <br />
                  <span className="text-foreground">One Package at a Time</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Bangladesh's most trusted parcel delivery service, connecting businesses 
                  and individuals across the nation with reliable, fast, and secure 
                  delivery solutions since 2018.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Start Shipping Today
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Our Story
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background flex items-center justify-center text-primary-foreground text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">4.9/5</span> from 10,000+ reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-3xl p-8 lg:p-12">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl" />
                <div className="relative text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-2xl shadow-primary/25 mx-auto">
                    <Truck className="w-16 h-16 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-primary mb-2">Fast Box</h3>
                    <p className="text-muted-foreground">Swift & Reliable Delivery</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Same Day', value: 'Delivery' },
                      { label: 'Live', value: 'Tracking' },
                      { label: '24/7', value: 'Support' },
                      { label: 'Cash on', value: 'Delivery' },
                    ].map((item, i) => (
                      <div key={i} className="bg-background/80 backdrop-blur rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="font-semibold text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 px-4 bg-card border-y">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Stats */}
          <div className="hidden md:grid grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 text-white shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {index === 0 && `${counters.deliveries.toLocaleString()}${stat.suffix}`}
                  {index === 1 && `${counters.customers.toLocaleString()}${stat.suffix}`}
                  {index === 2 && `${counters.cities}${stat.suffix}`}
                  {index === 3 && `${counters.successRate}${stat.suffix}`}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mobile Stats Carousel */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Our Achievements</h3>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stats[activeStatIndex].color} rounded-2xl mb-4 text-white`}>
                  {stats[activeStatIndex].icon}
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {stats[activeStatIndex].number.toLocaleString()}{stats[activeStatIndex].suffix}
                </div>
                <div className="text-muted-foreground">{stats[activeStatIndex].label}</div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {stats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStatIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeStatIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">Our Journey</Badge>
                <h2 className="text-4xl font-bold mb-6">The Fast Box Story</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2018 by <span className="text-foreground font-semibold">Nifazur Rahman</span>, 
                    Fast Box began as a passion project to solve the logistics challenges faced by small 
                    businesses and individuals across Bangladesh.
                  </p>
                  <p>
                    What started as a small operation with just 5 delivery personnel and a single 
                    office in Dhaka has grown into a nationwide network serving over 10,000 customers 
                    across all 64 districts of Bangladesh.
                  </p>
                  <p>
                    Today, we're proud to be one of Bangladesh's most trusted delivery partners, 
                    leveraging cutting-edge technology including React, Node.js, and MongoDB to 
                    provide seamless parcel management experiences.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">Mission</h3>
                      <p className="text-sm text-muted-foreground">Fast, reliable, affordable</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">Vision</h3>
                      <p className="text-sm text-muted-foreground">Leading logistics partner</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-12 group"
                  >
                    <div className="absolute left-0 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {item.icon}
                    </div>
                    <div className="bg-card border rounded-xl p-4 hover:shadow-lg transition-all">
                      <Badge variant="secondary" className="mb-2">{item.year}</Badge>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">What Drives Us</Badge>
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every package we deliver
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center ${value.color} mb-6 group-hover:scale-110 transition-transform`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Code className="w-3 h-3 mr-1" />
              Technology
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Built with Modern Tech</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leveraging cutting-edge technologies to deliver the best experience
            </p>
          </div>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            {Object.entries(techStack).map(([key, items]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {items.map((tech, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                    >
                      <CardContent className="p-6 text-center">
                        <span className="text-4xl mb-3 block group-hover:scale-125 transition-transform">
                          {tech.icon}
                        </span>
                        <p className="font-medium text-sm">{tech.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* GitHub Links */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Explore our open-source repositories</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <a href="https://github.com/Nifazur/Parcel-Delivery-System-Frontend" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Frontend Repository
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/Nifazur/Parcel-Delivery-System" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Backend Repository
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Platform Features</Badge>
            <h2 className="text-4xl font-bold mb-4">Why Choose Fast Box?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive solution designed for modern logistics needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
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
            <Badge variant="outline" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              Our Team
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Meet the Creators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Fast Box's success
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20 group-hover:border-primary transition-colors">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xl font-bold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-2">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <CardContent className="p-12 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <Coffee className="w-4 h-4" />
                <span className="text-sm font-medium">Join 10,000+ Happy Customers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Fast Box?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Start shipping your parcels with Bangladesh's most trusted delivery service. 
                Fast, reliable, and always on time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-primary">
                  Create Free Account
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Stats */}
      <section className="py-12 px-4 border-t bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-center text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground text-2xl">50,000+</p>
              <p>Parcels Delivered</p>
            </div>
            <div className="w-px bg-border hidden sm:block" />
            <div>
              <p className="font-semibold text-foreground text-2xl">64</p>
              <p>Districts Covered</p>
            </div>
            <div className="w-px bg-border hidden sm:block" />
            <div>
              <p className="font-semibold text-foreground text-2xl">24/7</p>
              <p>Customer Support</p>
            </div>
            <div className="w-px bg-border hidden sm:block" />
            <div>
              <p className="font-semibold text-foreground text-2xl">99.5%</p>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;