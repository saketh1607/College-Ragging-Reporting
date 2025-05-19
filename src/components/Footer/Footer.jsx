// src/components/Footer/Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-[#a1b5e7] text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 border-b border-blue-800 pb-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/report" label="Report Incident" />
              <FooterLink to="/admin" label="Admin Portal" />
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <PhoneIcon />
                <a href="tel:+919876543210" className="ml-2 hover:text-blue-200">
                  +91 98765 43210
                </a>
              </p>
              <p className="flex items-center">
                <EmailIcon />
                <a href="mailto:antiragging@vnrvjiet.in" className="ml-2 hover:text-blue-200">
                  antiragging@vnrvjiet.in
                </a>
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Emergency</h3>
            <p className="text-sm leading-relaxed">
              In case of immediate danger, contact college security or local police first.
            </p>
            <EmergencyButton />
          </div>
        </div>
        
        <div className="text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} VNRVJIET. All rights reserved.</p>
          <p className="mt-2">Committed to creating a safe campus environment</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }) => (
  <li>
    <Link to={to} className="hover:text-blue-200 transition-colors">
      {label}
    </Link>
  </li>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const EmergencyButton = () => (
  <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4 transition-all">
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    Emergency Contact
  </button>
);

export default Footer;