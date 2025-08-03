import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const RequestHelpForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 2: Request Details
    assistanceType: '',
    urgencyLevel: '',
    amountNeeded: '',
    description: '',
    
    // Step 3: Document Verification
    idDocument: null,
    supportingDocuments: [],
    
    // Step 4: Additional Information
    requestingFor: 'myself',
    previousHelp: '',
    otherResources: '',
    additionalInfo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'idDocument') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (name === 'supportingDocuments') {
      setFormData(prev => ({
        ...prev,
        [name]: Array.from(files)
      }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.phone && formData.streetAddress && formData.city && 
               formData.state && formData.zipCode;
      case 2:
        return formData.assistanceType && formData.urgencyLevel && 
               formData.amountNeeded && formData.description;
      case 3:
        return formData.idDocument;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Form submitted:', formData);
      alert('Request submitted successfully! We will review your application and contact you within 24-48 hours.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="bg-black py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-yellow-500 px-6 py-4">
              <h1 className="text-2xl font-bold text-black">Request Assistance</h1>
              <p className="text-black opacity-90">We're here to help in your time of need</p>
            </div>

            {/* Progress Indicator */}
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-700 text-gray-400 border border-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-yellow-500' : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-center">
                <span className="text-yellow-400 font-medium">
                  Step {currentStep} of 4: {
                    currentStep === 1 ? 'Personal Information' :
                    currentStep === 2 ? 'Request Details' :
                    currentStep === 3 ? 'Document Verification' :
                    'Additional Information'
                  }
                </span>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Springfield"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="IL"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="62701"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Request Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Request Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Type of Assistance *
                      </label>
                      <select
                        name="assistanceType"
                        value={formData.assistanceType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      >
                        <option value="">Select assistance type</option>
                        <option value="rent">Rent Assistance</option>
                        <option value="utilities">Utility Bills</option>
                        <option value="food">Food Assistance</option>
                        <option value="medical">Medical Expenses</option>
                        <option value="transportation">Transportation</option>
                        <option value="domestic-violence">Domestic Violence Support</option>
                        <option value="shelter">Emergency Shelter</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Urgency Level *
                      </label>
                      <select
                        name="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      >
                        <option value="">Select urgency</option>
                        <option value="immediate" className="text-red-400">🔴 Immediate (24 hours)</option>
                        <option value="urgent" className="text-orange-400">🟠 Urgent (3-5 days)</option>
                        <option value="important" className="text-blue-400">🔵 Important (1-2 weeks)</option>
                        <option value="standard" className="text-green-400">🟢 Standard (flexible)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount Needed *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400">$</span>
                      <input
                        type="number"
                        name="amountNeeded"
                        value={formData.amountNeeded}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Please provide a detailed explanation of your situation and how this assistance would help..."
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Document Verification */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Document Verification</h3>
                  
                  <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Privacy & Security</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Your documents are encrypted and only viewed by authorized board members for verification purposes. 
                          We never share your personal information with third parties.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ID Verification (Required) *
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                      <input
                        type="file"
                        name="idDocument"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        id="id-upload"
                        required
                      />
                      <label htmlFor="id-upload" className="cursor-pointer">
                        <div className="text-gray-400 mb-2">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-white font-medium">Upload Government-Issued ID</p>
                        <p className="text-gray-400 text-sm mt-1">Driver's License, State ID, or Passport</p>
                        <p className="text-gray-500 text-xs mt-2">PDF, JPG, PNG (Max 10MB)</p>
                      </label>
                      {formData.idDocument && (
                        <p className="text-yellow-400 text-sm mt-2">✓ {formData.idDocument.name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Supporting Documents (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                      <input
                        type="file"
                        name="supportingDocuments"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        className="hidden"
                        id="supporting-upload"
                      />
                      <label htmlFor="supporting-upload" className="cursor-pointer">
                        <div className="text-gray-400 mb-2">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-white font-medium">Upload Supporting Documents</p>
                        <p className="text-gray-400 text-sm mt-1">Bills, medical records, eviction notices, etc.</p>
                        <p className="text-gray-500 text-xs mt-2">PDF, JPG, PNG (Max 10MB each)</p>
                      </label>
                      {formData.supportingDocuments.length > 0 && (
                        <div className="mt-2">
                          {formData.supportingDocuments.map((file, index) => (
                            <p key={index} className="text-yellow-400 text-sm">✓ {file.name}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Additional Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Who is this request for?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="requestingFor"
                          value="myself"
                          checked={formData.requestingFor === 'myself'}
                          onChange={handleInputChange}
                          className="text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="ml-2 text-white">For myself</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="requestingFor"
                          value="someone-else"
                          checked={formData.requestingFor === 'someone-else'}
                          onChange={handleInputChange}
                          className="text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="ml-2 text-white">For someone else (anonymous)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Have you received help from Kind Squad before?
                    </label>
                    <textarea
                      name="previousHelp"
                      value={formData.previousHelp}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="If yes, please describe when and what type of assistance you received..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Have you sought help from other organizations?
                    </label>
                    <textarea
                      name="otherResources"
                      value={formData.otherResources}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Please list any other organizations you've contacted and the outcome..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Is there anything else you'd like us to know about your situation?"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-700">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Submit Request
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RequestHelpForm;

