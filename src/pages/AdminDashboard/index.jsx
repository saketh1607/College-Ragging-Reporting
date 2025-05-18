import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function AdminDashboard() {
  const { user } = useUser();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  
  useEffect(() => {
    // Check if user is admin
    const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
    const isAdmin = userEmail === 'saketh1607@gmail.com'; // Direct comparison
    
    if (!isAdmin) {
      setError('You do not have permission to access this page');
      setLoading(false);
      return;
    }
    
    // Subscribe to reports collection
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reportsList = [];
      querySnapshot.forEach((doc) => {
        reportsList.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });
      setReports(reportsList);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching reports:", err);
      setError("Failed to load reports");
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [user]);
  
  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await updateDoc(doc(db, "reports", reportId), {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Close modal if open
      if (selectedReport && selectedReport.id === reportId) {
        setSelectedReport(null);
      }
    } catch (err) {
      console.error("Error updating report status:", err);
    }
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      investigating: "bg-blue-100 text-blue-800 border-blue-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
      dismissed: "bg-red-100 text-red-800 border-red-200"
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClasses[status] || statusClasses.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto my-12 px-4 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Admin Dashboard</h1>
      
      {reports.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-semibold mt-4 text-gray-600">No Reports Yet</h2>
          <p className="text-gray-500 mt-2">
            When students submit ragging reports, they will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Reported</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{report.date} at {report.time}</div>
                      <div className="text-gray-500 truncate max-w-xs">{report.description ? report.description.substring(0, 60) + '...' : 'No description provided'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.reporterEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => setSelectedReport(report)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">Report Details</h2>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Report Information</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Date Reported:</span>
                      <p className="mt-1">{formatDate(selectedReport.createdAt)}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Status:</span>
                      <p className="mt-1">{getStatusBadge(selectedReport.status)}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Reported By:</span>
                      <p className="mt-1">{selectedReport.reporterEmail}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Incident Details</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Date & Time:</span>
                      <p className="mt-1">{selectedReport.date} at {selectedReport.time}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Location:</span>
                      <p className="mt-1">{selectedReport.location}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Perpetrator:</span>
                      <p className="mt-1">
                        {selectedReport.perpetratorName}, {selectedReport.perpetratorBranch}
                        {selectedReport.perpetratorSection && `, Section ${selectedReport.perpetratorSection}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-2 whitespace-pre-line text-gray-700">
                  {selectedReport.description}
                </p>
              </div>
              
              {selectedReport.evidenceUrl && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500">Evidence</h3>
                  <div className="mt-2">
                    {selectedReport.evidenceUrl.toLowerCase().endsWith('.pdf') ? (
                      <a 
                        href={selectedReport.evidenceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        View PDF Evidence
                      </a>
                    ) : (
                      <a 
                        href={selectedReport.evidenceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <img 
                          src={selectedReport.evidenceUrl} 
                          alt="Evidence" 
                          className="max-h-64 rounded-md shadow-md"
                        />
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              {selectedReport.imageUrls && selectedReport.imageUrls.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500">Evidence Images</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    {selectedReport.imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <a 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img 
                            src={url} 
                            alt={`Evidence ${index + 1}`}
                            className="rounded-lg shadow-md w-full h-48 object-cover transition-transform group-hover:scale-105"
                          />
                        </a>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Update Status</h3>
                <div className="mt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => handleStatusUpdate(selectedReport.id, 'investigating')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Mark as Investigating
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedReport.id, 'resolved')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    Mark as Resolved
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedReport.id, 'dismissed')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Dismiss Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard; 