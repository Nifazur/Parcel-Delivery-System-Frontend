import { useState, useEffect, useRef } from 'react';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Package, Shield, CreditCard, RefreshCcw, Copyright, Gavel, UserX, Edit3, Mail, Phone, MapPin, ChevronUp, Printer, Download, Menu, X, Clock, Hash, ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 'acceptance',
      icon: <CheckCircle className="w-5 h-5" />,
      title: 'Acceptance of Terms',
      content: `By accessing and using Fast Box services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you should not use our services.`,
      bullets: [
        'These terms apply to all users, including senders, receivers, and visitors',
        'We reserve the right to update these terms at any time',
        'Continued use of our services constitutes acceptance of any changes',
        'Users are responsible for reviewing terms periodically',
      ],
    },
    {
      id: 'services',
      icon: <Package className="w-5 h-5" />,
      title: 'Service Description',
      content: `Fast Box provides comprehensive parcel delivery services across Bangladesh. Our platform enables seamless shipping experiences for individuals and businesses alike.`,
      bullets: [
        'Parcel booking, tracking, and delivery services',
        'Express, standard, and economy shipping options',
        'Real-time tracking and notifications',
        'Delivery times are estimates and may vary due to external factors',
      ],
    },
    {
      id: 'accounts',
      icon: <Shield className="w-5 h-5" />,
      title: 'User Accounts',
      content: `Account creation requires accurate and complete information. Users bear full responsibility for maintaining account security and all activities under their credentials.`,
      bullets: [
        'Provide accurate and up-to-date information',
        'Maintain confidentiality of login credentials',
        'Report unauthorized access immediately',
        'Accounts may be suspended for violations',
      ],
    },
    {
      id: 'prohibited',
      icon: <XCircle className="w-5 h-5" />,
      title: 'Prohibited Items',
      content: `For safety and legal compliance, certain items are strictly prohibited from shipping through Fast Box services. Violations may result in severe consequences.`,
      bullets: [
        'Hazardous materials, explosives, and weapons',
        'Illegal substances and contraband',
        'Perishable goods without proper packaging',
        'Live animals and counterfeit goods',
        'Items violating local, national, or international laws',
      ],
      warning: true,
    },
    {
      id: 'liability',
      icon: <Scale className="w-5 h-5" />,
      title: 'Liability & Insurance',
      content: `Fast Box liability is limited to protect both parties while ensuring fair compensation for legitimate claims.`,
      bullets: [
        'Liability limited to declared value or actual loss (whichever is lower)',
        'Maximum liability capped at ৳50,000 per parcel',
        'Additional insurance available for valuable items',
        'No liability for force majeure events',
      ],
      highlight: '৳50,000 maximum liability per parcel',
    },
    {
      id: 'responsibilities',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'User Responsibilities',
      content: `Users must fulfill certain obligations to ensure smooth service delivery and maintain platform integrity.`,
      bullets: [
        'Provide accurate sender and receiver information',
        'Package items properly to prevent damage',
        'Declare correct value and contents',
        'Comply with all applicable laws and regulations',
        'Pay all fees and charges promptly',
      ],
    },
    {
      id: 'pricing',
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Pricing & Payment',
      content: `Transparent pricing ensures you know exactly what you're paying for. All fees are calculated based on multiple factors.`,
      bullets: [
        'Fees based on weight, dimensions, destination, and speed',
        'All prices displayed in Bangladeshi Taka (৳)',
        'Multiple payment methods accepted',
        'Secure payment processing through verified partners',
      ],
    },
    {
      id: 'cancellation',
      icon: <RefreshCcw className="w-5 h-5" />,
      title: 'Cancellation & Refunds',
      content: `Our cancellation policy is designed to be fair while covering operational costs already incurred.`,
      bullets: [
        'Full refund available before dispatch',
        'Partial refund with cancellation fee after dispatch',
        'In-transit parcels cannot be cancelled',
        'Refunds processed within 7-14 business days',
      ],
    },
    {
      id: 'ip',
      icon: <Copyright className="w-5 h-5" />,
      title: 'Intellectual Property',
      content: `All Fast Box content, branding, and technology are protected by intellectual property laws and may not be used without authorization.`,
      bullets: [
        'All content is property of Fast Box or licensors',
        'No reproduction without written permission',
        'Trademarks are registered and protected',
        'Unauthorized use may result in legal action',
      ],
    },
    {
      id: 'disputes',
      icon: <Gavel className="w-5 h-5" />,
      title: 'Dispute Resolution',
      content: `We believe in fair and efficient resolution of any disputes that may arise during service use.`,
      bullets: [
        'Good faith negotiation as first step',
        'Arbitration in accordance with Bangladesh law',
        'Exclusive jurisdiction in Dhaka courts',
        'Users waive objection to venue or jurisdiction',
      ],
    },
    {
      id: 'termination',
      icon: <UserX className="w-5 h-5" />,
      title: 'Account Termination',
      content: `Either party may terminate the service relationship under certain conditions. Understanding these terms protects your interests.`,
      bullets: [
        'We may suspend accounts for violations',
        'Users can terminate accounts anytime',
        'Outstanding fees remain payable after termination',
        'Certain provisions survive termination',
      ],
      warning: true,
    },
    {
      id: 'modifications',
      icon: <Edit3 className="w-5 h-5" />,
      title: 'Terms Modifications',
      content: `These terms may be updated to reflect changes in our services, legal requirements, or business practices.`,
      bullets: [
        'Terms may be modified at any time',
        'Material changes will be notified',
        'Continued use implies acceptance',
        'Review terms periodically',
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
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
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="fixed bottom-24 right-4 z-40 lg:hidden bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Navigation */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-background/95 backdrop-blur-sm overflow-y-auto">
          <div className="p-6 pt-20">
            <h3 className="font-semibold text-lg mb-4">Table of Contents</h3>
            <nav className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
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
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  Quick Navigation
                </h3>
                <nav className="space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all text-sm ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
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
                <Badge variant="outline" className="text-xs font-mono">
                  <Clock className="w-3 h-3 mr-1" />
                  Version 2.1
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Badge>
              </div>

              <div className="flex items-start gap-5">
                <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg shadow-primary/25">
                  <FileText className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                    Terms and Conditions
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Please read these terms carefully before using Fast Box services. By using our platform, you agree to be bound by these terms.
                  </p>
                </div>
              </div>
            </header>

            {/* Introduction Card */}
            <Card className="mb-10 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                    <Hash className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-3">Important Notice</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      This document outlines the complete terms governing your use of Fast Box parcel delivery services in Bangladesh. 
                      By creating an account, booking a parcel, or otherwise using our services, you acknowledge that you have read, 
                      understood, and agree to be legally bound by these terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    section.warning ? 'border-destructive/30 bg-destructive/5' : ''
                  }`}>
                    <CardContent className="p-0">
                      {/* Section Header */}
                      <div className={`px-6 py-5 border-b ${
                        section.warning 
                          ? 'bg-destructive/10 border-destructive/20' 
                          : 'bg-muted/30 border-border'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                            section.warning 
                              ? 'bg-destructive/20 text-destructive' 
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-muted-foreground">
                                Section {String(index + 1).padStart(2, '0')}
                              </span>
                              {section.warning && (
                                <Badge variant="destructive" className="text-xs">Important</Badge>
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
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-primary text-sm">{section.highlight}</span>
                          </div>
                        )}

                        <ul className="space-y-3">
                          {section.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="flex items-start gap-3">
                              <div className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${
                                section.warning ? 'bg-destructive' : 'bg-primary'
                              }`} />
                              <span className="text-foreground/80">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              ))}
            </div>

            {/* Contact Section */}
            <Card className="mt-12 bg-gradient-to-br from-muted/50 to-muted border-2" id="contact">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Questions About These Terms?</h2>
                  <p className="text-muted-foreground">
                    Our legal team is here to help clarify any concerns.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:legal@fastbox.com" className="text-primary hover:underline text-sm">
                      legal@fastbox.com
                    </a>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:+8801234567890" className="text-primary hover:underline text-sm">
                      +880 1234-567890
                    </a>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Delivery Street, Dhaka 1000
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acceptance Section */}
            <Card className="mt-8 border-primary/30 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="accept-terms"
                      checked={accepted}
                      onCheckedChange={(checked) => setAccepted(checked as boolean)}
                      className="w-5 h-5"
                    />
                    <label htmlFor="accept-terms" className="text-sm cursor-pointer">
                      I have read and agree to the Terms and Conditions
                    </label>
                  </div>
                  <Button className="sm:ml-auto gap-2" disabled={!accepted}>
                    Continue to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Fast Box. All rights reserved.</p>
              <p className="mt-1">These terms are effective as of January 1, 2024</p>
            </footer>
          </main>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-40 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default TermsAndConditions;