import { useState } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [activeTab, setActiveTab] = useState('student');
  const navigate = useNavigate();
  const { user } = useUser();

  // Check if user is already logged in
  if (user) {
    const email = user.primaryEmailAddress?.emailAddress?.toLowerCase();
    if (email === 'saketh1607@gmail.com') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Tab Navigation */}
        <div className="flex rounded-lg overflow-hidden shadow-sm">
          <button
            className={`flex-1 py-3 px-4 text-center text-lg transition-colors duration-200 ${
              activeTab === 'student'
                ? 'bg-[#335BF1] text-white font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('student')}
          >
            Student Login
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center text-lg transition-colors duration-200 ${
              activeTab === 'admin'
                ? 'bg-[#335BF1] text-white font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Login
          </button>
        </div>

        {/* Login Form Container */}
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          {/* Info Alert */}
          {activeTab === 'student' ? (
            <div className="bg-[#FFF9E3] border-l-4 border-[#F5C521] p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-[#F5C521]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[#946C00]">
                    Please use your VNRVJIET college email (@vnrvjiet.in) to sign in.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#EEF4FF] border-l-4 border-[#335BF1] p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-[#335BF1]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[#335BF1]">
                    Admin access is restricted. Use authorized credentials only.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Clerk SignIn Component */}
          <SignIn 
            routing="hash"
            redirectUrl={activeTab === 'admin' ? '/admin' : '/'}
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "w-full h-[40px] border border-gray-300 text-gray-600 hover:bg-gray-50 font-normal rounded-lg mb-2",
                dividerRow: "hidden",
                dividerText: "hidden",
                formFieldInput: "w-full h-[40px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#335BF1] focus:border-[#335BF1]",
                formFieldLabel: "text-gray-700 font-medium",
                formButtonPrimary: "w-full h-[40px] bg-[#335BF1] hover:bg-[#2347DC] text-white font-medium rounded-lg",
                footerActionText: "text-gray-600",
                footerActionLink: "text-[#335BF1] hover:text-[#2347DC] font-medium",
                identityPreviewText: "text-gray-600",
                identityPreviewEditButton: "text-[#335BF1] hover:text-[#2347DC]"
              },
              layout: {
                socialButtonsPlacement: "top",
                showOptionalFields: false
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login; 