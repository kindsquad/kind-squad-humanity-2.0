import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const RequestHelpForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Page 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Page 2: Request Details
    assistanceType: '',
    amountNeeded: '',
    description: '',
    idDocument: null,
    supportingDocuments: null,
    additionalDocuments: null,
    
    // Page 3: Additional Information
    requestFor: 'myself',
    // For someone else fields
    otherFirstName: '',
    otherLastName: '',
    otherEmail: '',
    otherPhone: '',
    otherAddress: '',
    otherCity: '',
    otherState: '',
    otherZipCode: '',
    relationship: '',
    customRelationship: '',
    
    // Questions
    previousHelp: '',
    otherOrganizations: '',
    carePackageLink: '',
    additionalInfo: '',
    
    // Page 4: Review checkboxes
    understandLimitations: false,
    agreeAnonymous: false,
    agreeMembership: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Request submitted successfully! We will review your application and contact you within 24-48 hours.');
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-center items-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step <= currentStep ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-gray-400'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 ${
                step < currentStep ? 'bg-yellow-500' : 'bg-gray-600'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-4">
        <span className="text-yellow-400 font-semibold">
          Step {currentStep} of 4: {
            currentStep === 1 ? 'Personal Information' :
            currentStep === 2 ? 'Request Details' :
            currentStep === 3 ? 'Additional Information' :
            'Review & Submit'
          }
        </span>
      </div>
    </div>
  );

  const renderPage1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Address *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Zip Code *
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderPage2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Request Details</h2>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Type of Request *
        </label>
        <textarea
          name="assistanceType"
          value={formData.assistanceType}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          placeholder="Please describe the type of assistance you need..."
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Amount Needed *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">$</span>
          <input
            type="number"
            name="amountNeeded"
            value={formData.amountNeeded}
            onChange={handleInputChange}
            className="w-full pl-8 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Detailed Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          placeholder="Please provide a detailed explanation of your situation and how this assistance would help..."
          required
        />
      </div>

      {/* Upload Sections */}
      <div className="space-y-6">
        {/* ID Verification - Required */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Upload Government-Issued ID</h3>
            <p className="text-gray-400 text-sm mb-2">Driver's License, State ID, or Passport</p>
            <p className="text-gray-500 text-xs mb-4">PDF, JPG, PNG (Max 10MB)</p>
            <input
              type="file"
              name="idDocument"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              id="idDocument"
              required
            />
            <label
              htmlFor="idDocument"
              className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-yellow-400 transition-colors"
            >
              Choose File
            </label>
            {formData.idDocument && (
              <p className="text-yellow-400 text-sm mt-2">✓ {formData.idDocument.name}</p>
            )}
          </div>
          <p className="text-red-400 text-sm mt-2">* Required</p>
        </div>

        {/* Supporting Documents - Required */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Upload Supporting Documents</h3>
            <p className="text-gray-400 text-sm mb-2">Bills, medical records, eviction notices, etc.</p>
            <p className="text-gray-500 text-xs mb-4">PDF, JPG, PNG (Max 10MB each)</p>
            <input
              type="file"
              name="supportingDocuments"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              id="supportingDocuments"
              required
            />
            <label
              htmlFor="supportingDocuments"
              className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-yellow-400 transition-colors"
            >
              Choose File
            </label>
            {formData.supportingDocuments && (
              <p className="text-yellow-400 text-sm mt-2">✓ {formData.supportingDocuments.name}</p>
            )}
          </div>
          <p className="text-red-400 text-sm mt-2">* Required</p>
        </div>

        {/* Additional Supporting Documents - Optional */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Additional Supporting Documents</h3>
            <p className="text-gray-400 text-sm mb-2">Any additional documentation that supports your request</p>
            <p className="text-gray-500 text-xs mb-4">PDF, JPG, PNG (Max 10MB each)</p>
            <input
              type="file"
              name="additionalDocuments"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              id="additionalDocuments"
            />
            <label
              htmlFor="additionalDocuments"
              className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-gray-500 transition-colors"
            >
              Choose File (Optional)
            </label>
            {formData.additionalDocuments && (
              <p className="text-yellow-400 text-sm mt-2">✓ {formData.additionalDocuments.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Additional Information</h2>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-4">
          Who is this request for?
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="requestFor"
              value="myself"
              checked={formData.requestFor === 'myself'}
              onChange={handleInputChange}
              className="mr-3 text-yellow-500"
            />
            <span className="text-white">For myself</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="requestFor"
              value="someone-else"
              checked={formData.requestFor === 'someone-else'}
              onChange={handleInputChange}
              className="mr-3 text-yellow-500"
            />
            <span className="text-white">For someone else</span>
          </label>
        </div>
      </div>

      {/* Show additional fields if "For someone else" is selected */}
      {formData.requestFor === 'someone-else' && (
        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold text-white">Person You're Helping</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="otherFirstName"
                value={formData.otherFirstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                required={formData.requestFor === 'someone-else'}
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="otherLastName"
                value={formData.otherLastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                required={formData.requestFor === 'someone-else'}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              name="otherEmail"
              value={formData.otherEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              required={formData.requestFor === 'someone-else'}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="otherPhone"
              value={formData.otherPhone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              required={formData.requestFor === 'someone-else'}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Address *
            </label>
            <input
              type="text"
              name="otherAddress"
              value={formData.otherAddress}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              required={formData.requestFor === 'someone-else'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                City *
              </label>
              <input
                type="text"
                name="otherCity"
                value={formData.otherCity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                required={formData.requestFor === 'someone-else'}
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                State *
              </label>
              <input
                type="text"
                name="otherState"
                value={formData.otherState}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                required={formData.requestFor === 'someone-else'}
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Zip Code *
              </label>
              <input
                type="text"
                name="otherZipCode"
                value={formData.otherZipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                required={formData.requestFor === 'someone-else'}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Relationship *
            </label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              required={formData.requestFor === 'someone-else'}
            >
              <option value="">Select relationship</option>
              <option value="friend">Friend</option>
              <option value="family">Family</option>
              <option value="colleague">Colleague</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formData.relationship === 'other' && (
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Please specify relationship *
              </label>
              <input
                type="text"
                name="customRelationship"
                value={formData.customRelationship}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                placeholder="Please describe your relationship"
                required={formData.relationship === 'other'}
              />
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Have you or the person you wish to help received help from the Kind Squad? If so, when?
        </label>
        <textarea
          name="previousHelp"
          value={formData.previousHelp}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          placeholder="If yes, please describe when and what type of assistance you received..."
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Have you sought help from other organizations? If so, who & when?
        </label>
        <textarea
          name="otherOrganizations"
          value={formData.otherOrganizations}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          placeholder="Please list any other organizations you've contacted and the outcome..."
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Care Packages: Please share a link to the care package
        </label>
        <input
          type="url"
          name="carePackageLink"
          value={formData.carePackageLink}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          placeholder="https://..."
        />
        {formData.carePackageLink && !validateURL(formData.carePackageLink) && (
          <p className="text-red-400 text-sm mt-1">Please enter a valid URL</p>
        )}
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Additional Information
        </label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          placeholder="Is there anything else you'd like us to know about this situation?"
        />
      </div>
    </div>
  );

  const renderPage4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Review Request</h2>
      
      {/* Summary of Request */}
      <div className="bg-gray-800 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Summary of Request</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Name:</span>
            <span className="text-white ml-2">{formData.firstName} {formData.lastName}</span>
          </div>
          <div>
            <span className="text-gray-400">Email:</span>
            <span className="text-white ml-2">{formData.email}</span>
          </div>
          <div>
            <span className="text-gray-400">Phone:</span>
            <span className="text-white ml-2">{formData.phone}</span>
          </div>
          <div>
            <span className="text-gray-400">Amount Needed:</span>
            <span className="text-white ml-2">${formData.amountNeeded}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-400">Request For:</span>
            <span className="text-white ml-2">
              {formData.requestFor === 'myself' ? 'Myself' : `${formData.otherFirstName} ${formData.otherLastName}`}
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-400">Type of Assistance:</span>
            <span className="text-white ml-2">{formData.assistanceType}</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-gray-800 text-sm">
          If everything looks correct, please go ahead and submit your request. Someone from our team will be in touch with you within 24–48 hours.
        </p>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="understandLimitations"
            checked={formData.understandLimitations}
            onChange={handleInputChange}
            className="mr-3 mt-1 text-yellow-500"
            required
          />
          <span className="text-white text-sm">
            You understand that not all requests can be accommodated. If we're unable to assist directly but can refer you to another agency, we'll provide those details in your dashboard.
          </span>
        </label>

        {formData.requestFor === 'someone-else' && (
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeAnonymous"
              checked={formData.agreeAnonymous}
              onChange={handleInputChange}
              className="mr-3 mt-1 text-yellow-500"
              required
            />
            <span className="text-white text-sm">
              By submitting this request on someone else's behalf, you agree to remain anonymous.
            </span>
          </label>
        )}

        {formData.requestFor === 'myself' && (
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeMembership"
              checked={formData.agreeMembership}
              onChange={handleInputChange}
              className="mr-3 mt-1 text-yellow-500"
              required
            />
            <span className="text-white text-sm">
              By submitting this request, you acknowledge that, if it's intended for you, you'll be added to the Kind Squad as a community member. You'll also be able to access your information directly from our website.
            </span>
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-yellow-500 text-black p-6 rounded-t-lg">
            <h1 className="text-2xl md:text-3xl font-bold">Request Assistance</h1>
            <p className="text-lg mt-2">We're here to help in your time of need</p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-800 p-6 md:p-8 rounded-b-lg">
            {renderProgressBar()}
            
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderPage1()}
              {currentStep === 2 && renderPage2()}
              {currentStep === 3 && renderPage3()}
              {currentStep === 4 && renderPage4()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-500'
                  }`}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors"
                    disabled={
                      !formData.understandLimitations ||
                      (formData.requestFor === 'someone-else' && !formData.agreeAnonymous) ||
                      (formData.requestFor === 'myself' && !formData.agreeMembership)
                    }
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

