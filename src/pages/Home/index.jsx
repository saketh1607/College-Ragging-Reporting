// src/pages/Home/Home.jsx
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function Home() {
  const { user } = useUser();
  const studentEmail = user?.primaryEmailAddress?.emailAddress || '';
  const studentId = studentEmail.split('@')[0];
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">Stand Against Ragging</h1>
            <p className="text-xl mb-6">
              VNRVJIET is committed to providing a safe and inclusive environment for all students.
              Report incidents of ragging confidentially and help us maintain a respectful campus.
            </p>
            <Link 
              to="/report" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition duration-300"
            >
              Report an Incident
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://placehold.co/600x400/EEE/31316A?text=Stop+Ragging" 
              alt="Students standing united against ragging" 
              className="rounded-lg shadow-xl" 
            />
          </div>
        </div>
      </section>
      
      {/* Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Understanding Ragging</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">What is Ragging?</h3>
              <p className="text-gray-600">
                Ragging includes any disorderly conduct, act or practice by students towards other students that causes physical or psychological harm, fear, or apprehension.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Zero Tolerance Policy</h3>
              <p className="text-gray-600">
                VNRVJIET has a strict zero-tolerance policy against ragging. Any student found guilty of ragging will face serious disciplinary action.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Confidential Reporting</h3>
              <p className="text-gray-600">
                All reports are treated with strict confidentiality. Your identity will be protected throughout the investigation process.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Steps Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How to Report an Incident</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-1">Login with Your College Email</h3>
                  <p className="text-gray-600">
                    Use your official student_id@vnrvjiet.in email to access the reporting system.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-1">Fill Out the Reporting Form</h3>
                  <p className="text-gray-600">
                    Provide complete details including date, time, location, and a description of the incident.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-1">Submit Evidence (If Available)</h3>
                  <p className="text-gray-600">
                    Upload any photos, videos, or screenshots that support your report.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-1">Follow-Up</h3>
                  <p className="text-gray-600">
                    The college anti-ragging committee will investigate your report and take appropriate action.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/report" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                File a Report Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;