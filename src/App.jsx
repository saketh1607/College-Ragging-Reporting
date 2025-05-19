import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  ClerkProvider, 
  SignedIn, 
  SignedOut,
  useUser,
  useClerk
} from '@clerk/clerk-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';

// DEBUGGING: Create a global event to track redirects
window.addEventListener('popstate', () => {
  console.log('Navigation event detected. Current path:', window.location.pathname);
});

// Verify environment variable loading
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

// Main routing component
const AppRoutes = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (isLoaded && isSignedIn && user) {
  //     const email = user.primaryEmailAddress?.emailAddress?.toLowerCase();
      
  //     // If user is saketh1607@gmail.com and not on admin page, redirect to admin
  //     if (email === 'saketh1607@gmail.com' && location.pathname !== '/admin') {
  //       navigate('/admin', { replace: true });
  //     }
  //     // If not admin but trying to access admin page, redirect to 404
  //     else if (email !== 'saketh1607@gmail.com' && location.pathname === '/admin') {
  //       navigate('/404', { replace: true });
  //     }
  //   }
  // }, [isLoaded, isSignedIn, user, location.pathname, navigate]);
  useEffect(() => {
  if (isLoaded && isSignedIn && user) {
    const email = user.primaryEmailAddress?.emailAddress?.toLowerCase();

    const isAdmin = email === 'saketh1607@gmail.com';
    const isCollegeUser = email.endsWith('@vnrvjiet.in');

    // Allow only admin and vnrvjiet users; else redirect to 404
    if (!isAdmin && !isCollegeUser) {
      navigate('/404', { replace: true });
    }

    // Redirect admin to /admin
    if (isAdmin && location.pathname !== '/admin') {
      navigate('/admin', { replace: true });
    }

    // Prevent non-admins from accessing /admin
    if (!isAdmin && location.pathname === '/admin') {
      navigate('/404', { replace: true });
    }
  }
}, [isLoaded, isSignedIn, user, location.pathname, navigate]);


  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <Routes>
      {/* Login Route */}
      <Route 
        path="/login" 
        element={
          isSignedIn ? (
            <Navigate to={user?.primaryEmailAddress?.emailAddress?.toLowerCase() === 'saketh1607@gmail.com' ? '/admin' : '/'} replace />
          ) : (
            <Login />
          )
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          isSignedIn ? (
            user?.primaryEmailAddress?.emailAddress?.toLowerCase() === 'saketh1607@gmail.com' ? 
            <Navigate to="/admin" replace /> : 
            <Home />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      
      <Route 
        path="/report" 
        element={
          isSignedIn ? (
            user?.primaryEmailAddress?.emailAddress?.toLowerCase() === 'saketh1607@gmail.com' ? 
            <Navigate to="/admin" replace /> : 
            <ReportForm />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          isSignedIn ? (
            user?.primaryEmailAddress?.emailAddress?.toLowerCase() === 'saketh1607@gmail.com' ? 
            <AdminDashboard /> : 
            <Navigate to="/404" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Error Routes */}
      <Route 
        path="/404" 
        element={
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-600">404 - Page Not Found</h2>
            <p className="mt-4 text-gray-600">
              The page you are looking for doesn't exist or you don't have permission to access it.
            </p>
            <button
              onClick={() => navigate(isSignedIn ? '/' : '/login')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isSignedIn||user?.primaryEmailAddress?.emailAddress?.toLowerCase() === 'saketh1607@gmail.com'||user?.primaryEmailAddress?.emailAddress?.toLowerCase().split('@')[1] === 'vnrvjiet.in' ? 'Back to Home' : 'Back to Login'}
            </button>
          </div>
        } 
      />
      
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

function App() {
  // Set up an error boundary for the whole app
  useEffect(() => {
    console.log("App mounted, checking location:", window.location.pathname);
    
    // Global error handler
    window.onerror = function(message, source, lineno, colno, error) {
      console.error("Global error:", { message, source, lineno, colno, error });
      return false;
    };
  }, []);

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
