import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,

  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Footer = () => {
  const location = useLocation()
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const dashboardPaths = ['/common-user', '/user', '/admin', '/receiver', '/sender'];

    const isDashboard = dashboardPaths.some(path =>
        location.pathname.startsWith(path)
    );

    if (isDashboard) {
        return null;
    }

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Tracking', path: '/tracking' },
    { name: 'Services', path: '/services' }
  ];

  const services = [
    { name: 'Express Delivery', path: '/express' },
    { name: 'Standard Shipping', path: '/standard' },
    { name: 'International', path: '/international' },
    { name: 'Same Day Delivery', path: '/same-day' },
    { name: 'Bulk Orders', path: '/bulk' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-background border-t mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-primary rounded-full p-2 mr-3">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                FAST BOX
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for fast, reliable, and secure delivery services. 
              We ensure your packages reach their destination safely and on time.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>info@fastbox.com</span>
              </div>
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>123 Delivery Street, Shipping City, SC 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
              <button
                onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                className="md:hidden p-1 rounded-md hover:bg-muted transition-colors duration-200"
                aria-label="Toggle quick links"
              >
                {isQuickLinksOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            <ul className={`space-y-2 ${isQuickLinksOpen ? 'block' : 'hidden md:block'}`}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Our Services</h3>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="md:hidden p-1 rounded-md hover:bg-muted transition-colors duration-200"
                aria-label="Toggle services"
              >
                {isServicesOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            <ul className={`space-y-2 ${isServicesOpen ? 'block' : 'hidden md:block'}`}>
              {services.map((service) => (
                <li key={service.path}>
                  <NavLink
                    to={service.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {service.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Stay Connected</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-3">Follow us:</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="p-2 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center text-sm text-muted-foreground">
              <span>© 2025 Fast Box. All rights reserved.</span>
              <span>Made with for fast delivery.</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <NavLink
                to="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/cookies"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Cookie Policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;