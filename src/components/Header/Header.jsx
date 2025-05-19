// src/components/Header/Header.jsx
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import './Header.css';

const Header = () => {
  const { user, isSignedIn } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress.includes('admin');
  
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/e/e5/Official_logo_of_VNRVJIET.png" 
            alt="VNRVJIET Logo" 
            className="h-12 w-12 mr-2 inline-block"
          />
          Anti-Ragging Portal
        </Link>

        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          {isSignedIn && (
            <>
              <NavLink to="/" label="Home" />
              <NavLink to="/report" label="Report Incident" />
              {isAdmin && <NavLink to="/admin" label="Admin Dashboard" />}
              <div className="flex items-center space-x-4 mt-2 md:mt-0">
                <span className="text-sm hidden md:inline-block bg-blue-800 px-3 py-1 rounded-full">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonBox: "h-10 w-10",
                      avatarBox: "rounded-full border-2 border-white"
                    }
                  }}
                />
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link 
    to={to} 
    className="px-3 py-2 rounded-md hover:bg-blue-800 transition-colors font-medium"
  >
    {label}
  </Link>
);

export default Header;