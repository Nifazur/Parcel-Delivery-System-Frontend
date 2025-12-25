import { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  Video,
  Users,
  Package,
  Search,
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Send,
  Headphones,
  CreditCard,
  MapPin,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  MessageSquare,
  Smartphone,
  TrendingUp,
  Star,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [feedbackGiven, setFeedbackGiven] = useState<Record<number, 'up' | 'down' | null>>({});

  const supportChannels = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Get instant answers from our support team',
      availability: '24/7 Available',
      responseTime: 'Instant',
      action: 'Start Chat',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      online: true,
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: '8AM - 10PM Daily',
      responseTime: '< 2 min wait',
      action: 'Call Now',
      phone: '+880 1234-567890',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      online: true,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Always Open',
      responseTime: '< 24 hours',
      action: 'Send Email',
      email: 'support@fastbox.com',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
      online: true,
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'WhatsApp',
      description: 'Message us on WhatsApp',
      availability: '24/7 Available',
      responseTime: '< 5 min',
      action: 'Open WhatsApp',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      online: true,
    },
  ];

  const helpCategories = [
    {
      id: 'getting-started',
      icon: <Zap className="w-5 h-5" />,
      title: 'Getting Started',
      description: 'New to Fast Box? Start here',
      articles: 12,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      id: 'shipping',
      icon: <Package className="w-5 h-5" />,
      title: 'Shipping & Delivery',
      description: 'Tracking, delivery, and shipping info',
      articles: 24,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      id: 'payments',
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Payments & Pricing',
      description: 'Billing, refunds, and pricing',
      articles: 15,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      id: 'account',
      icon: <Users className="w-5 h-5" />,
      title: 'Account & Profile',
      description: 'Manage your account settings',
      articles: 10,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      id: 'tracking',
      icon: <MapPin className="w-5 h-5" />,
      title: 'Tracking & Updates',
      description: 'Real-time tracking information',
      articles: 8,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      id: 'security',
      icon: <Shield className="w-5 h-5" />,
      title: 'Security & Privacy',
      description: 'Keep your account secure',
      articles: 6,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  ];

  const popularArticles = [
    {
      title: 'How to track your parcel in real-time',
      category: 'Tracking',
      views: '12.5K',
      helpful: 98,
    },
    {
      title: 'Understanding delivery charges and fees',
      category: 'Pricing',
      views: '8.2K',
      helpful: 95,
    },
    {
      title: 'How to cancel or modify a shipment',
      category: 'Shipping',
      views: '6.8K',
      helpful: 92,
    },
    {
      title: 'Setting up your merchant account',
      category: 'Account',
      views: '5.4K',
      helpful: 97,
    },
    {
      title: 'Packaging guidelines for safe delivery',
      category: 'Shipping',
      views: '4.9K',
      helpful: 94,
    },
  ];

  const faqItems = [
    {
      category: 'shipping',
      question: 'How do I track my parcel?',
      answer: 'You can track your parcel by entering your tracking ID on our tracking page. You\'ll receive real-time updates via SMS and email. You can also track through our mobile app or by calling our support line with your tracking number.',
    },
    {
      category: 'shipping',
      question: 'What are the delivery timeframes?',
      answer: 'Express delivery takes 1-2 business days within major cities, Standard delivery takes 2-4 business days, and Economy shipping takes 4-7 business days. Delivery times may vary based on location and weather conditions.',
    },
    {
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards (Visa, Mastercard, Amex), mobile banking (bKash, Nagad, Rocket), bank transfers, and cash on delivery for eligible orders. All online payments are secured with SSL encryption.',
    },
    {
      category: 'payments',
      question: 'How do I get a refund for a cancelled order?',
      answer: 'Refunds for cancelled orders are processed within 7-14 business days to your original payment method. If you paid via mobile banking, the refund will be credited to your account. For COD orders, you\'ll receive a store credit.',
    },
    {
      category: 'shipping',
      question: 'Can I change the delivery address after booking?',
      answer: 'Yes, you can modify the delivery address before the parcel is dispatched. Once dispatched, changes may incur additional fees. Contact our support team immediately to request address changes.',
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your registered email, and we\'ll send you a password reset link. The link expires in 24 hours. If you don\'t receive the email, check your spam folder or contact support.',
    },
    {
      category: 'shipping',
      question: 'What items are prohibited from shipping?',
      answer: 'Prohibited items include hazardous materials, explosives, weapons, illegal substances, live animals, perishable goods without proper packaging, and items that violate local laws. Attempting to ship prohibited items may result in account suspension.',
    },
    {
      category: 'payments',
      question: 'Why was my payment declined?',
      answer: 'Payment declines can occur due to insufficient funds, incorrect card details, expired cards, or bank security blocks. Try a different payment method or contact your bank. Our support team can help troubleshoot payment issues.',
    },
  ];

  const videoTutorials = [
    {
      title: 'How to Book Your First Parcel',
      duration: '3:45',
      views: '25K',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      title: 'Using the Mobile App for Tracking',
      duration: '2:30',
      views: '18K',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      title: 'Setting Up Business Account',
      duration: '5:15',
      views: '12K',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      title: 'Packaging Tips for Safe Delivery',
      duration: '4:20',
      views: '15K',
      thumbnail: '/api/placeholder/320/180',
    },
  ];

  const systemStatus = {
    overall: 'operational',
    services: [
      { name: 'Website', status: 'operational' },
      { name: 'Mobile App', status: 'operational' },
      { name: 'API', status: 'operational' },
      { name: 'Tracking System', status: 'operational' },
    ],
  };

  const filteredFaqs = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    setFeedbackGiven(prev => ({ ...prev, [index]: type }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background pt-16 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl mb-6 shadow-lg shadow-primary/25">
              <Headphones className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              How Can We Help?
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Search our knowledge base or connect with our support team
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <Search className="absolute left-5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for help articles, FAQs, guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-32 py-6 text-lg rounded-2xl border-2 border-border focus:border-primary shadow-lg"
                />
                <Button className="absolute right-2 rounded-xl">
                  Search
                </Button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['Track parcel', 'Refund policy', 'Delivery charges', 'Cancel order'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="text-sm text-primary hover:underline"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        {/* Support Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {supportChannels.map((channel, index) => (
            <Card 
              key={index} 
              className={`${channel.bgColor} ${channel.borderColor} border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${channel.color} text-white shadow-lg`}>
                    {channel.icon}
                  </div>
                  {channel.online && (
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <span className="text-xs text-green-600 font-medium">Online</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1">{channel.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {channel.availability}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Response: {channel.responseTime}
                  </span>
                  <Button size="sm" variant="ghost" className="group-hover:bg-background">
                    {channel.action}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Categories & Articles */}
          <div className="lg:col-span-2 space-y-8">
            {/* Help Categories */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Browse by Topic</h2>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {helpCategories.map((category) => (
                  <Card 
                    key={category.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-primary/50"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${category.bgColor} ${category.color}`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {category.description}
                          </p>
                          <span className="text-xs text-primary font-medium flex items-center">
                            {category.articles} articles
                            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: 'all', label: 'All Topics' },
                  { id: 'shipping', label: 'Shipping' },
                  { id: 'payments', label: 'Payments' },
                  { id: 'account', label: 'Account' },
                ].map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="rounded-full"
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {filteredFaqs.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border rounded-xl px-4 data-[state=open]:bg-muted/50"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-11">
                      <p className="text-muted-foreground mb-4">{item.answer}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Was this helpful?</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleFeedback(index, 'up')}
                            className={`p-2 rounded-lg transition-colors ${
                              feedbackGiven[index] === 'up'
                                ? 'bg-green-100 text-green-600'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleFeedback(index, 'down')}
                            className={`p-2 rounded-lg transition-colors ${
                              feedbackGiven[index] === 'down'
                                ? 'bg-red-100 text-red-600'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Popular Articles</h3>
                </div>
                <div className="space-y-3">
                  {popularArticles.map((article, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono text-muted-foreground mt-0.5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {article.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Video className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Video Tutorials</h3>
                </div>
                <div className="space-y-3">
                  {videoTutorials.slice(0, 3).map((video, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="relative w-20 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{video.duration}</span>
                          <span>•</span>
                          <span>{video.views} views</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-3" size="sm">
                  View All Videos <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-green-800 dark:text-green-200">System Status</h3>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    All Operational
                  </Badge>
                </div>
                <div className="space-y-2">
                  {systemStatus.services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <span className="text-sm text-green-800 dark:text-green-200">{service.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-xs text-green-600">Operational</span>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="#" className="text-xs text-green-700 dark:text-green-300 hover:underline mt-3 inline-flex items-center">
                  View Status Page <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </CardContent>
            </Card>

            {/* Download Apps */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Get the App</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Track parcels and get support on the go
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    App Store
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.18 23L12 13.77 20.82 23 22 21.81 12 11.41 2 21.81 3.18 23zM12 2L2 12.41 3.18 13.6 12 4.36l8.82 9.24L22 12.41 12 2z"/>
                    </svg>
                    Play Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form Section */}
        <Card className="mb-16">
          <CardContent className="p-0">
            <Tabs defaultValue="form" className="w-full">
              <div className="border-b px-6 pt-6">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="form">Send Message</TabsTrigger>
                  <TabsTrigger value="callback">Request Callback</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="form" className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">First Name</label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Last Name</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <Input placeholder="How can we help?" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea placeholder="Describe your issue in detail..." rows={5} />
                    </div>
                    <Button className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-4">Before You Contact Us</h3>
                    <ul className="space-y-3">
                      {[
                        'Check our FAQ section for instant answers',
                        'Include your tracking ID if parcel-related',
                        'Attach screenshots if reporting an issue',
                        'Provide your registered email address',
                      ].map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-1">Expected Response Time</p>
                      <p className="text-sm text-muted-foreground">
                        We typically respond within 2-4 hours during business hours.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="callback" className="p-6">
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input type="tel" placeholder="+880 1XXX-XXXXXX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Time</label>
                    <Input type="time" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Topic</label>
                    <Input placeholder="What would you like to discuss?" />
                  </div>
                  <Button className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Request Callback
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    We'll call you within 30 minutes during operating hours (8AM-10PM)
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="mb-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 overflow-hidden">
          <CardContent className="p-8 md:p-12 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Rated 4.9/5 by our customers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Still Need Assistance?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Our dedicated support team is available 24/7 to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-primary">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +880 1234-567890
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Locations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Visit Our Offices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { city: 'Dhaka (HQ)', address: '123 Delivery Street, Gulshan 2', phone: '+880 1234-567890', hours: 'Mon-Sat: 9AM-6PM' },
              { city: 'Chittagong', address: '456 Commerce Road, Agrabad', phone: '+880 1234-567891', hours: 'Mon-Sat: 9AM-6PM' },
              { city: 'Sylhet', address: '789 Business Avenue, Zindabazar', phone: '+880 1234-567892', hours: 'Mon-Sat: 9AM-6PM' },
            ].map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{office.city}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{office.address}</p>
                      <p className="text-sm text-muted-foreground">{office.phone}</p>
                      <p className="text-xs text-muted-foreground mt-2">{office.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;