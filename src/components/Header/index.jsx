import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Header() {
  const { user, isSignedIn } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress.includes('admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#a1b5e7] text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:text-white transition-colors duration-200">
          <img 
            src="https://vnrvjiet.ac.in/assets/images/Header-Logo.png" 
            alt="VNRVJIET Logo" 
            className="h-12 w-auto"
          />
          <span className="hidden sm:inline">VNRVJIET Anti-Ragging Portal</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-base">
          {isSignedIn && (
            <>
              <Link to="/" className="hover:text-white/80 transition">Home</Link>
              <Link to="/report" className="hover:text-white/80 transition">Report Incident</Link>
              {isAdmin && (
                <Link to="/admin" className="hover:text-white/80 transition">Admin Dashboard</Link>
              )}
             
            </>
          )}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          {isSignedIn && (
            <span className="hidden md:inline-block text-sm text-white/70">
              {user.primaryEmailAddress?.emailAddress}
            </span>
          )}
          <UserButton afterSignOutUrl="/login" userProfileMode="none" />
          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isSignedIn && (
        <div className="md:hidden bg-[#a1b5e7] px-6 py-4 space-y-4 text-base shadow-inner transition-all">
          <Link to="/" className="block bg-white/10 hover:bg-white/20 rounded px-4 py-2">Home</Link>
          <Link to="/report" className="block bg-white/10 hover:bg-white/20 rounded px-4 py-2">Report Incident</Link>
          {isAdmin && (
            <Link to="/admin" className="block bg-white/10 hover:bg-white/20 rounded px-4 py-2">Admin Dashboard</Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
