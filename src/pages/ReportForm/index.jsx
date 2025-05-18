import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { createReport } from '../../services/reports';

function ReportForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    victimName: user?.fullName || '',
    victimEmail: user?.primaryEmailAddress?.emailAddress || '',
    victimPhone: '',
    victimYear: '',
    victimBranch: '',
    incidentDate: '',
    incidentLocation: '',
    incidentDescription: '',
    perpetrators: [{ name: '', year: '', branch: '' }],
    witnesses: [{ name: '', contact: '' }]
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePerpetratorChange = (index, field, value) => {
    setFormData(prev => {
      const updatedPerpetrators = [...prev.perpetrators];
      updatedPerpetrators[index] = {
        ...updatedPerpetrators[index],
        [field]: value
      };
      return {
        ...prev,
        perpetrators: updatedPerpetrators
      };
    });
  };

  const handleWitnessChange = (index, field, value) => {
    setFormData(prev => {
      const updatedWitnesses = [...prev.witnesses];
      updatedWitnesses[index] = {
        ...updatedWitnesses[index],
        [field]: value
      };
      return {
        ...prev,
        witnesses: updatedWitnesses
      };
    });
  };

  const addPerpetrator = () => {
    setFormData(prev => ({
      ...prev,
      perpetrators: [...prev.perpetrators, { name: '', year: '', branch: '' }]
    }));
  };

  const removePerpetrator = (index) => {
    setFormData(prev => ({
      ...prev,
      perpetrators: prev.perpetrators.filter((_, i) => i !== index)
    }));
  };

  const addWitness = () => {
    setFormData(prev => ({
      ...prev,
      witnesses: [...prev.witnesses, { name: '', contact: '' }]
    }));
  };

  const removeWitness = (index) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate form data
      if (!formData.victimName || !formData.victimEmail || !formData.incidentDescription) {
        throw new Error('Please fill in all required fields');
      }

      // Create report with images
      await createReport(
        {
          ...formData,
          reporterEmail: user.primaryEmailAddress.emailAddress,
          reporterName: user.fullName
        },
        selectedFiles
      );

      // Redirect to home page on success
      navigate('/');
    } catch (error) {
      console.error('Error submitting report:', error);
      setError(error.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Report Ragging Incident</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Victim Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Victim Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="victimName"
                value={user?.fullName || ''}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed shadow-sm"
                required
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="victimEmail"
                value={user?.primaryEmailAddress?.emailAddress || ''}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed shadow-sm"
                required
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="victimPhone"
                value={formData.victimPhone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <select
                name="victimYear"
                value={formData.victimYear}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Branch</label>
              <input
                type="text"
                name="victimBranch"
                value={formData.victimBranch}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Incident Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Incident Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Incident</label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="incidentLocation"
                value={formData.incidentLocation}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="incidentDescription"
                value={formData.incidentDescription}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Perpetrators */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Perpetrators</h2>
            <button
              type="button"
              onClick={addPerpetrator}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Perpetrator
            </button>
          </div>
          {formData.perpetrators.map((perpetrator, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={perpetrator.name}
                    onChange={(e) => handlePerpetratorChange(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <select
                    value={perpetrator.year}
                    onChange={(e) => handlePerpetratorChange(index, 'year', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Branch</label>
                  <input
                    type="text"
                    value={perpetrator.branch}
                    onChange={(e) => handlePerpetratorChange(index, 'branch', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removePerpetrator(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Witnesses */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Witnesses</h2>
            <button
              type="button"
              onClick={addWitness}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Witness
            </button>
          </div>
          {formData.witnesses.map((witness, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={witness.name}
                    onChange={(e) => handleWitnessChange(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact</label>
                  <input
                    type="text"
                    value={witness.contact}
                    onChange={(e) => handleWitnessChange(index, 'contact', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeWitness(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Evidence Upload */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Evidence</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
                <ul className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportForm; 