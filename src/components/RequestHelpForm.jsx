import React, { useState } from 'react';

const RequestHelpForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Request Details
    requestType: '',
    isForSelf: true,
    recipientName: '',
    recipientRelation: '',
    urgencyLevel: '',
    amountNeeded: '',
    description: '',
    
    // Supporting Documents
    idDocument: null,
    supportingDocs: [],
    
    // Additional Information
    previousHelp: false,
    otherResources: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});

  const requestTypes = [
    { value: 'rent', label: 'Rent Assistance' },
    { value: 'utilities', label: 'Utility Bills' },
    { value: 'food', label: 'Food Assistance' },
    { value: 'medical', label: 'Medical Expenses' },
    { value: 'transportation', label: 'Transportation/Car Repairs' },
    { value: 'domestic_violence', label: 'Domestic Violence Support' },
    { value: 'shelter', label: 'Emergency Shelter' },
    { value: 'disaster', label: 'Disaster Relief' },
    { value: 'care_package', label: 'Care Package' },
    { value: 'other', label: 'Other Emergency Need' }
  ];

  const urgencyLevels = [
    { value: 'immediate', label: 'Immediate (24-48 hours)', color: 'text-red-400' },
    { value: 'urgent', label: 'Urgent (1 week)', color: 'text-orange-400' },
    { value: 'important', label: 'Important (2-4 weeks)', color: 'text-yellow-400' },
    { value: 'standard', label: 'Standard (1-2 months)', color: 'text-green-400' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (field, files) => {
    if (field === 'supportingDocs') {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }));
    }
  };

  const removeFile = (field, index = null) => {
    if (field === 'supportingDocs' && index !== null) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }

    if (step === 2) {
      if (!formData.requestType) newErrors.requestType = 'Please select a request type';
      if (!formData.isForSelf && !formData.recipientName.trim()) {
        newErrors.recipientName = 'Recipient name is required';
      }
      if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Please select urgency level';
      if (!formData.amountNeeded || formData.amountNeeded.trim() === '') newErrors.amountNeeded = 'Amount needed is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }

    if (step === 3) {
      if (!formData.idDocument) newErrors.idDocument = 'ID verification is required';
      if (formData.supportingDocs.length === 0) {
        newErrors.supportingDocs = 'At least one supporting document is required';
      }
    }

    setErrors(newErrors);
    console.log('Validation for step', step, ':', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    console.log('Current form data:', formData);
    console.log('Current step:', currentStep);
    
    if (validateStep(currentStep)) {
      console.log('Validation passed, advancing to next step');
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      console.log('Validation failed, errors:', errors);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Here we would submit to the backend/admin dashboard
      console.log('Form submitted:', formData);
      alert('Request submitted successfully! You will receive an email confirmation shortly.');
      // Reset form or redirect to member dashboard
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep 
              ? 'bg-yellow-500 text-black' 
              : 'bg-gray-700 text-gray-400'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-yellow-500' : 'bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Street Address *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter your street address"
        />
        {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="City"
          />
          {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            State *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="State"
          />
          {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="ZIP"
          />
          {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Request Details</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Type of Assistance Needed *
        </label>
        <select
          value={formData.requestType}
          onChange={(e) => handleInputChange('requestType', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">Select assistance type</option>
          {requestTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.requestType && <p className="text-red-400 text-sm mt-1">{errors.requestType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Who is this request for? *
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="isForSelf"
              checked={formData.isForSelf === true}
              onChange={() => handleInputChange('isForSelf', true)}
              className="mr-3 text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-white">Myself</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="isForSelf"
              checked={formData.isForSelf === false}
              onChange={() => handleInputChange('isForSelf', false)}
              className="mr-3 text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-white">Someone else</span>
          </label>
        </div>
      </div>

      {!formData.isForSelf && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Recipient Name *
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) => handleInputChange('recipientName', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Name of person receiving help"
            />
            {errors.recipientName && <p className="text-red-400 text-sm mt-1">{errors.recipientName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Relationship to Recipient
            </label>
            <input
              type="text"
              value={formData.recipientRelation}
              onChange={(e) => handleInputChange('recipientRelation', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g., Friend, Family member, Neighbor"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Urgency Level *
        </label>
        <div className="space-y-2">
          {urgencyLevels.map((level) => (
            <label key={level.value} className="flex items-center">
              <input
                type="radio"
                name="urgencyLevel"
                value={level.value}
                checked={formData.urgencyLevel === level.value}
                onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
                className="mr-3 text-yellow-500 focus:ring-yellow-500"
              />
              <span className={`${level.color} font-medium`}>{level.label}</span>
            </label>
          ))}
        </div>
        {errors.urgencyLevel && <p className="text-red-400 text-sm mt-1">{errors.urgencyLevel}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Amount Needed *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-400">$</span>
          <input
            type="number"
            value={formData.amountNeeded}
            onChange={(e) => handleInputChange('amountNeeded', e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
        {errors.amountNeeded && <p className="text-red-400 text-sm mt-1">{errors.amountNeeded}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Detailed Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Please provide a detailed description of your situation and how this assistance will help..."
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Verification & Supporting Documents</h3>
      
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
        <h4 className="text-lg font-medium text-white mb-2">📋 Required Documents</h4>
        <p className="text-gray-300 text-sm mb-4">
          To prevent fraud and ensure assistance reaches those who truly need it, we require verification documents.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ID Verification * (Driver's License, State ID, or Passport)
        </label>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('idDocument', e.target.files)}
            className="hidden"
            id="id-upload"
          />
          <label htmlFor="id-upload" className="cursor-pointer">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-white">Click to upload ID document</p>
            <p className="text-gray-400 text-sm">PNG, JPG, or PDF up to 10MB</p>
          </label>
        </div>
        
        {formData.idDocument && (
          <div className="mt-2 p-3 bg-gray-800 rounded-md flex items-center justify-between">
            <span className="text-white text-sm">{formData.idDocument.name}</span>
            <button
              onClick={() => removeFile('idDocument')}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        )}
        {errors.idDocument && <p className="text-red-400 text-sm mt-1">{errors.idDocument}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Supporting Documents * (Bills, estimates, photos, articles, etc.)
        </label>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            multiple
            onChange={(e) => handleFileUpload('supportingDocs', e.target.files)}
            className="hidden"
            id="docs-upload"
          />
          <label htmlFor="docs-upload" className="cursor-pointer">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-white">Click to upload supporting documents</p>
            <p className="text-gray-400 text-sm">Multiple files accepted: Images, PDFs, Word docs</p>
          </label>
        </div>
        
        {formData.supportingDocs.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.supportingDocs.map((file, index) => (
              <div key={index} className="p-3 bg-gray-800 rounded-md flex items-center justify-between">
                <span className="text-white text-sm">{file.name}</span>
                <button
                  onClick={() => removeFile('supportingDocs', index)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.supportingDocs && <p className="text-red-400 text-sm mt-1">{errors.supportingDocs}</p>}
      </div>

      <div className="bg-blue-900 p-4 rounded-lg border border-blue-700">
        <h4 className="text-lg font-medium text-blue-200 mb-2">🔒 Privacy & Security</h4>
        <p className="text-blue-200 text-sm">
          All documents are securely stored and only viewed by Kind Squad board members for verification purposes. 
          Your personal information remains confidential and is never shared publicly without your explicit consent.
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Additional Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Have you received assistance from Kind Squad before?
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="previousHelp"
              checked={formData.previousHelp === false}
              onChange={() => handleInputChange('previousHelp', false)}
              className="mr-3 text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-white">No, this is my first request</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="previousHelp"
              checked={formData.previousHelp === true}
              onChange={() => handleInputChange('previousHelp', true)}
              className="mr-3 text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-white">Yes, I have received help before</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Other Resources You've Tried
        </label>
        <textarea
          value={formData.otherResources}
          onChange={(e) => handleInputChange('otherResources', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Please list any other organizations, government programs, or resources you've contacted for help..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Additional Information
        </label>
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Any additional information that would help us understand your situation..."
        />
      </div>

      <div className="bg-green-900 p-4 rounded-lg border border-green-700">
        <h4 className="text-lg font-medium text-green-200 mb-2">✅ What Happens Next?</h4>
        <div className="text-green-200 text-sm space-y-1">
          <p>• Your request will be reviewed by our board within 24-48 hours</p>
          <p>• You'll receive an email confirmation with your request status</p>
          <p>• If approved, your mission will be posted and fundraising will begin</p>
          <p>• You'll become a Kind Squad member with access to your personal dashboard</p>
          <p>• You can track progress and choose how much to share with the community</p>
        </div>
      </div>

      <div className="bg-yellow-900 p-4 rounded-lg border border-yellow-700">
        <h4 className="text-lg font-medium text-yellow-200 mb-2">💛 Kind Squad Values</h4>
        <p className="text-yellow-200 text-sm">
          <strong>Do what you can, when you can, when you want.</strong> There's never any pressure. 
          We believe in community support, dignity, and helping each other through difficult times.
        </p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Request Assistance</h1>
            <p className="text-gray-300">
              Join the Kind Squad community and get the help you need
            </p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form Content */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-md font-medium ${
                  currentStep === 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-400"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-500"
                >
                  Submit Request
                </button>
              )}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Request Details' :
                currentStep === 3 ? 'Document Verification' :
                'Additional Information'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestHelpForm;

