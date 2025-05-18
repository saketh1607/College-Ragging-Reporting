import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

function Header() {
  const { user, isSignedIn } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress.includes('admin');
  
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            VNRVJIET Anti-Ragging Portal
          </Link>
        </div>
        
        <nav className="flex items-center space-x-4">
          {isSignedIn && (
            <>
              <Link to="/" className="hover:text-blue-200">Home</Link>
              <Link to="/report" className="hover:text-blue-200">Report Incident</Link>
              {isAdmin && (
                <Link to="/admin" className="hover:text-blue-200">Admin Dashboard</Link>
              )}
              <div className="ml-4 flex items-center">
                <span className="mr-2 text-sm hidden md:inline-block">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
                <UserButton />
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header; 