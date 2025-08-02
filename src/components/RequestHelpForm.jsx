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
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 2: Request Details
    requestType: '',
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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const files = Array.from(e.target.files);
    
    if (fieldName === 'idDocument') {
      setFormData(prev => ({
        ...prev,
        idDocument: files[0]
      }));
    } else if (fieldName === 'supportingDocuments') {
      setFormData(prev => ({
        ...prev,
        supportingDocuments: [...prev.supportingDocuments, ...files]
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    } else if (step === 2) {
      if (!formData.requestType) newErrors.requestType = 'Assistance type is required';
      if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Urgency level is required';
      if (!formData.amountNeeded) newErrors.amountNeeded = 'Amount needed is required';
      if (!formData.description) newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
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
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      <div className="bg-gray-950 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Request Assistance</h1>
            <p className="text-gray-400 text-lg">We're here to help during your time of need</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-full h-1 mx-2 ${
                      step < currentStep ? 'bg-yellow-500' : 'bg-gray-800'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={currentStep >= 1 ? 'text-yellow-500' : 'text-gray-400'}>Personal Info</span>
              <span className={currentStep >= 2 ? 'text-yellow-500' : 'text-gray-400'}>Request Details</span>
              <span className={currentStep >= 3 ? 'text-yellow-500' : 'text-gray-400'}>Documents</span>
              <span className={currentStep >= 4 ? 'text-yellow-500' : 'text-gray-400'}>Additional Info</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
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
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.address ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Enter your street address"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Enter your city"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
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
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.state ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Enter your state"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
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
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Enter your ZIP code"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Request Details */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Request Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Type of Assistance Needed *
                      </label>
                      <select
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.requestType ? 'border-red-500' : 'border-gray-700'
                        }`}
                      >
                        <option value="">Select assistance type</option>
                        <option value="rent">Rent Assistance</option>
                        <option value="utilities">Utility Bills</option>
                        <option value="food">Food Assistance</option>
                        <option value="medical">Medical Expenses</option>
                        <option value="transportation">Transportation</option>
                        <option value="domestic_violence">Domestic Violence Support</option>
                        <option value="shelter">Emergency Shelter</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.requestType && <p className="text-red-500 text-sm mt-1">{errors.requestType}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Urgency Level *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { value: 'immediate', label: 'Immediate', color: 'border-red-500 text-red-400' },
                          { value: 'urgent', label: 'Urgent', color: 'border-orange-500 text-orange-400' },
                          { value: 'important', label: 'Important', color: 'border-blue-500 text-blue-400' },
                          { value: 'standard', label: 'Standard', color: 'border-green-500 text-green-400' }
                        ].map((urgency) => (
                          <button
                            key={urgency.value}
                            type="button"
                            onClick={() => handleInputChange({ target: { name: 'urgencyLevel', value: urgency.value } })}
                            className={`p-3 border-2 rounded-md text-center transition-colors ${
                              formData.urgencyLevel === urgency.value
                                ? `${urgency.color} bg-gray-800`
                                : 'border-gray-700 text-gray-400 hover:border-gray-600'
                            }`}
                          >
                            {urgency.label}
                          </button>
                        ))}
                      </div>
                      {errors.urgencyLevel && <p className="text-red-500 text-sm mt-1">{errors.urgencyLevel}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Amount Needed *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">$</span>
                        <input
                          type="number"
                          name="amountNeeded"
                          value={formData.amountNeeded}
                          onChange={handleInputChange}
                          className={`w-full pl-8 pr-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                            errors.amountNeeded ? 'border-red-500' : 'border-gray-700'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.amountNeeded && <p className="text-red-500 text-sm mt-1">{errors.amountNeeded}</p>}
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
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.description ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="Please provide a detailed description of your situation and why you need assistance..."
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Document Verification */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Document Verification</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">ID Verification</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Please upload a clear photo of your government-issued ID (driver's license, passport, or state ID)
                      </p>
                      
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(e, 'idDocument')}
                          className="hidden"
                          id="id-upload"
                        />
                        <label htmlFor="id-upload" className="cursor-pointer">
                          <div className="text-gray-400 mb-2">
                            📄 Click to upload ID document
                          </div>
                          <div className="text-sm text-gray-500">
                            Supports: JPG, PNG, PDF (Max 10MB)
                          </div>
                        </label>
                        {formData.idDocument && (
                          <div className="mt-3 text-green-400 text-sm">
                            ✓ {formData.idDocument.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Supporting Documents</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Upload any supporting documents (bills, medical records, eviction notices, etc.)
                      </p>
                      
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e, 'supportingDocuments')}
                          className="hidden"
                          id="supporting-upload"
                        />
                        <label htmlFor="supporting-upload" className="cursor-pointer">
                          <div className="text-gray-400 mb-2">
                            📎 Click to upload supporting documents
                          </div>
                          <div className="text-sm text-gray-500">
                            Multiple files supported (Max 10MB each)
                          </div>
                        </label>
                        {formData.supportingDocuments.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {formData.supportingDocuments.map((file, index) => (
                              <div key={index} className="text-green-400 text-sm">
                                ✓ {file.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                      <h4 className="text-blue-400 font-semibold mb-2">🔒 Privacy & Security</h4>
                      <p className="text-blue-300 text-sm">
                        Your documents are encrypted and securely stored. They will only be viewed by authorized Kind Squad board members for verification purposes and will be deleted after your case is resolved.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Information */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Additional Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Who is this request for?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleInputChange({ target: { name: 'requestingFor', value: 'myself' } })}
                          className={`p-3 border-2 rounded-md text-center transition-colors ${
                            formData.requestingFor === 'myself'
                              ? 'border-yellow-500 text-yellow-400 bg-gray-800'
                              : 'border-gray-700 text-gray-400 hover:border-gray-600'
                          }`}
                        >
                          For Myself
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange({ target: { name: 'requestingFor', value: 'someone_else' } })}
                          className={`p-3 border-2 rounded-md text-center transition-colors ${
                            formData.requestingFor === 'someone_else'
                              ? 'border-yellow-500 text-yellow-400 bg-gray-800'
                              : 'border-gray-700 text-gray-400 hover:border-gray-600'
                          }`}
                        >
                          For Someone Else
                        </button>
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
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Any additional information you'd like us to know..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-medium transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                  >
                    Submit Request
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Help Information */}
          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
            <p className="text-gray-400 mb-4">
              If you need assistance completing this form or have questions about our process, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:help@kindsquad.org" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                📧 help@kindsquad.org
              </a>
              <a href="tel:+1-555-KIND-HELP" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                📞 1-555-KIND-HELP
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RequestHelpForm;

