import { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Eye, UserCheck, Bell, FileText, Database, Globe, Baby, RefreshCw, Mail, Phone, MapPin, ChevronUp, Printer, Download, Menu, X, Clock, Hash, CheckCircle, AlertCircle, Server, Fingerprint, Settings, Trash2, Share2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('collection');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const dataTypes = [
    { type: 'Personal Information', examples: 'Name, email, phone number, address', icon: <UserCheck className="w-4 h-4" /> },
    { type: 'Payment Data', examples: 'Card details, billing address, transaction history', icon: <Lock className="w-4 h-4" /> },
    { type: 'Parcel Information', examples: 'Tracking data, delivery status, contents description', icon: <FileText className="w-4 h-4" /> },
    { type: 'Usage Data', examples: 'IP address, browser type, pages visited', icon: <Eye className="w-4 h-4" /> },
    { type: 'Device Information', examples: 'Device type, operating system, unique identifiers', icon: <Server className="w-4 h-4" /> },
  ];

  const sections = [
    {
      id: 'collection',
      icon: <Database className="w-5 h-5" />,
      title: 'Information We Collect',
      content: `We collect various types of information to provide and improve our delivery services. This data helps us process your shipments efficiently and enhance your experience.`,
      bullets: [
        'Account information: name, email, phone number, and passwords',
        'Delivery addresses for pickup and drop-off locations',
        'Payment information processed through secure payment gateways',
        'Parcel details including weight, dimensions, and contents',
        'Communication preferences and customer service interactions',
        'Device and browser information for platform optimization',
      ],
    },
    {
      id: 'usage',
      icon: <Settings className="w-5 h-5" />,
      title: 'How We Use Your Information',
      content: `Your information enables us to deliver exceptional service while maintaining platform security and improving our offerings.`,
      bullets: [
        'Process and fulfill your parcel shipments',
        'Send real-time tracking updates and delivery notifications',
        'Communicate about your account and service updates',
        'Respond to customer service inquiries and support requests',
        'Detect and prevent fraudulent or unauthorized activities',
        'Analyze usage patterns to improve our services',
        'Send promotional offers (with your consent)',
      ],
    },
    {
      id: 'security',
      icon: <Shield className="w-5 h-5" />,
      title: 'Information Security',
      content: `Protecting your data is our top priority. We employ industry-leading security measures to safeguard your personal information.`,
      bullets: [
        '256-bit SSL/TLS encryption for all data transmission',
        'PCI DSS compliant payment processing',
        'Regular security audits and penetration testing',
        'Multi-factor authentication options for accounts',
        'Strict access controls and employee training',
        'Secure data centers with 24/7 monitoring',
      ],
      highlight: 'Your data is encrypted both in transit and at rest',
    },
    {
      id: 'sharing',
      icon: <Share2 className="w-5 h-5" />,
      title: 'Information Sharing',
      content: `We are committed to keeping your data private. We only share information when necessary to provide our services or when required by law.`,
      bullets: [
        'Delivery partners to fulfill your shipments',
        'Payment processors to handle transactions securely',
        'Service providers who assist in platform operations',
        'Legal authorities when required by law or court order',
        'Business transfers in case of merger or acquisition',
      ],
      warning: 'We never sell your personal information to third parties',
    },
    {
      id: 'rights',
      icon: <UserCheck className="w-5 h-5" />,
      title: 'Your Rights & Choices',
      content: `You have full control over your personal data. We provide various tools and options to manage your information.`,
      bullets: [
        'Access and download your personal data anytime',
        'Update or correct inaccurate information',
        'Delete your account and associated data',
        'Opt out of marketing communications',
        'Restrict certain data processing activities',
        'Withdraw consent where applicable',
        'Lodge a complaint with supervisory authorities',
      ],
    },
    {
      id: 'cookies',
      icon: <Fingerprint className="w-5 h-5" />,
      title: 'Cookies & Tracking',
      content: `We use cookies and similar technologies to enhance your browsing experience and understand how you interact with our platform.`,
      bullets: [
        'Essential cookies for platform functionality',
        'Analytics cookies to understand usage patterns',
        'Preference cookies to remember your settings',
        'Marketing cookies for personalized advertising',
      ],
      subContent: 'You can manage cookie preferences through your browser settings or our cookie consent tool.',
    },
    {
      id: 'retention',
      icon: <Clock className="w-5 h-5" />,
      title: 'Data Retention',
      content: `We retain your information only for as long as necessary to provide our services and fulfill legal obligations.`,
      bullets: [
        'Active account data retained during account lifetime',
        'Transaction records kept for 7 years (legal requirement)',
        'Deleted accounts anonymized within 30 days',
        'Backup data purged within 90 days of deletion',
      ],
    },
    {
      id: 'international',
      icon: <Globe className="w-5 h-5" />,
      title: 'International Transfers',
      content: `Your data may be processed in countries where our service providers operate. We ensure adequate protection through appropriate safeguards.`,
      bullets: [
        'Standard contractual clauses with international partners',
        'Data processing agreements ensuring compliance',
        'Regular audits of international data handlers',
        'Adherence to local data protection regulations',
      ],
    },
    {
      id: 'children',
      icon: <Baby className="w-5 h-5" />,
      title: "Children's Privacy",
      content: `Our services are designed for users aged 18 and above. We do not knowingly collect data from minors.`,
      bullets: [
        'Services not intended for users under 18',
        'No intentional collection of children\'s data',
        'Immediate deletion upon discovery of minor\'s data',
        'Parents can report suspected violations',
      ],
      warning: true,
    },
    {
      id: 'changes',
      icon: <RefreshCw className="w-5 h-5" />,
      title: 'Policy Updates',
      content: `We may update this policy to reflect changes in our practices or legal requirements. We'll notify you of significant changes.`,
      bullets: [
        'Material changes communicated via email',
        'Updated date displayed at top of policy',
        'Previous versions available upon request',
        'Continued use implies acceptance of updates',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How can I access my personal data?',
      answer: 'You can access your data through your account dashboard under "Privacy Settings" or by contacting our support team. We\'ll provide a downloadable copy within 48 hours.',
    },
    {
      question: 'How do I delete my account?',
      answer: 'Navigate to Account Settings > Privacy > Delete Account. Your data will be anonymized within 30 days, except where legal retention is required.',
    },
    {
      question: 'Do you share my data with advertisers?',
      answer: 'We do not sell your personal data. We may use anonymized, aggregated data for analytics, but this cannot be used to identify you.',
    },
    {
      question: 'How long do you keep my delivery history?',
      answer: 'Delivery records are retained for 7 years to comply with legal and tax requirements. You can request earlier deletion of non-essential data.',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      const sectionElements = sections.map((s) => document.getElementById(s.id));
      const currentSection = sectionElements.find((el) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMobileNavOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="fixed bottom-24 right-4 z-40 lg:hidden bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Navigation */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-background/95 backdrop-blur-sm overflow-y-auto">
          <div className="p-6 pt-20">
            <h3 className="font-semibold text-lg mb-4">Quick Navigation</h3>
            <nav className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-emerald-600 text-white'
                      : 'hover:bg-muted'
                  }`}
                >
                  <span className="text-xs font-mono opacity-60">{String(index + 1).padStart(2, '0')}</span>
                  {section.icon}
                  <span className="text-sm">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="lg:flex lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="p-4 bg-card rounded-2xl border shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Contents
                  </h3>
                </div>
                <nav className="space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all text-sm ${
                        activeSection === section.id
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="text-xs font-mono opacity-60 w-5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Trust Badges */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">Trust & Compliance</span>
                </div>
                <div className="space-y-2 text-xs text-emerald-700 dark:text-emerald-300">
                  <p className="flex items-center gap-2">
                    <Lock className="w-3 h-3" /> SSL Encrypted
                  </p>
                  <p className="flex items-center gap-2">
                    <Shield className="w-3 h-3" /> GDPR Compliant
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> PCI DSS Certified
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0" ref={contentRef}>
            {/* Header */}
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="outline" className="text-xs font-mono border-emerald-300 text-emerald-700">
                  <Clock className="w-3 h-3 mr-1" />
                  Version 3.0
                </Badge>
                <Badge className="text-xs bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Badge>
              </div>

              <div className="flex items-start gap-5">
                <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/25">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                    Privacy Policy
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Your privacy matters to us. Learn how Fast Box collects, uses, and protects your personal information.
                  </p>
                </div>
              </div>
            </header>

            {/* Introduction Card */}
            <Card className="mb-10 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-emerald-500/20 rounded-xl">
                    <Lock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-3 text-emerald-900 dark:text-emerald-100">Our Commitment to Privacy</h2>
                    <p className="text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed">
                      At Fast Box, protecting your personal information is fundamental to our service. This Privacy Policy 
                      explains our data practices in clear, simple terms. We believe you should always know what data we collect, 
                      how we use it, and how we keep it safe. By using our services, you agree to the practices described here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Types Overview */}
            <Card className="mb-10">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-emerald-600" />
                  Data We Collect at a Glance
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dataTypes.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-muted/50 border border-border hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2 text-emerald-600">
                        {item.icon}
                        <span className="font-medium text-foreground">{item.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.examples}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    section.warning ? 'border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20' : ''
                  }`}>
                    <CardContent className="p-0">
                      {/* Section Header */}
                      <div className={`px-6 py-5 border-b ${
                        section.warning 
                          ? 'bg-amber-100/50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800' 
                          : 'bg-muted/30 border-border'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                            section.warning 
                              ? 'bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-200' 
                              : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600'
                          }`}>
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-muted-foreground">
                                Section {String(index + 1).padStart(2, '0')}
                              </span>
                              {section.warning && (
                                <Badge className="text-xs bg-amber-200 text-amber-800 hover:bg-amber-200">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Important
                                </Badge>
                              )}
                            </div>
                            <h2 className="text-xl font-bold">{section.title}</h2>
                          </div>
                        </div>
                      </div>

                      {/* Section Content */}
                      <div className="p-6 space-y-5">
                        <p className="text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>

                        {section.highlight && (
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                            <Lock className="w-4 h-4 text-emerald-600" />
                            <span className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm">{section.highlight}</span>
                          </div>
                        )}

                        <ul className="space-y-3">
                          {section.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="flex items-start gap-3">
                              <div className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${
                                section.warning ? 'bg-amber-500' : 'bg-emerald-500'
                              }`} />
                              <span className="text-foreground/80">{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {section.subContent && (
                          <p className="text-sm text-muted-foreground italic pl-4 border-l-2 border-emerald-300">
                            {section.subContent}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              ))}
            </div>

            {/* Your Rights Summary */}
            <Card className="mt-10 border-2 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 dark:bg-emerald-900 rounded-full mb-4">
                    <UserCheck className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Your Privacy Rights</h2>
                  <p className="text-muted-foreground">Quick actions you can take to manage your data</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all text-center group">
                    <Download className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-emerald-600" />
                    <span className="text-sm font-medium">Download Data</span>
                  </button>
                  <button className="p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all text-center group">
                    <Settings className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-emerald-600" />
                    <span className="text-sm font-medium">Privacy Settings</span>
                  </button>
                  <button className="p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all text-center group">
                    <Bell className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-emerald-600" />
                    <span className="text-sm font-medium">Notifications</span>
                  </button>
                  <button className="p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all text-center group">
                    <Trash2 className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-red-600" />
                    <span className="text-sm font-medium">Delete Account</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card className="mt-10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-emerald-600" />
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left hover:text-emerald-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="mt-10 bg-gradient-to-br from-muted/50 to-muted border-2" id="contact">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Privacy Concerns?</h2>
                  <p className="text-muted-foreground">
                    Our Data Protection Officer is here to help with any questions.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background border">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-3">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:privacy@fastbox.com" className="text-emerald-600 hover:underline text-sm">
                      privacy@fastbox.com
                    </a>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background border">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-3">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:+8801234567890" className="text-emerald-600 hover:underline text-sm">
                      +880 1234-567890
                    </a>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background border">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-3">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Delivery Street, Dhaka 1000
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    <strong>Response Time:</strong> We respond to all privacy inquiries within 48 business hours.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Fast Box. All rights reserved.</p>
              <p className="mt-1">This privacy policy is effective as of January 1, 2024</p>
              <div className="mt-4 flex justify-center gap-4">
                <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-emerald-600 transition-colors">Cookie Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-emerald-600 transition-colors">GDPR Rights</a>
              </div>
            </footer>
          </main>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-40 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default PrivacyPolicy;