import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, mode = 'signin', onModeChange, redirectToMembership = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signin') {
        // Check for demo credentials
        if (formData.email === 'demo@kindsquad.org' && formData.password === '1') {
          // Demo login successful
          localStorage.setItem('authToken', 'demo-token-' + Date.now());
          localStorage.setItem('userRole', 'member'); // Default to member role
          alert('Demo login successful! Welcome to Kind Squad!');
          onClose();
          // Refresh the page to update authentication state
          window.location.reload();
          return;
        }
        
        // Regular sign in logic
        console.log('Signing in:', { email: formData.email, password: formData.password });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Sign in successful! (This would integrate with your authentication system)');
        onClose();
      } else {
        // Registration logic
        if (redirectToMembership) {
          // Store registration data and redirect to membership page
          localStorage.setItem('pendingRegistration', JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone
          }));
          window.location.hash = '#/membership';
          onClose();
        } else {
          console.log('Registering:', formData);
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert('Registration successful! (This would integrate with your authentication system)');
          onClose();
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeSwitch = (newMode) => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''
    });
    setErrors({});
    onModeChange(newMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {mode === 'signin' && (
          <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 mb-6">
            <p className="text-yellow-200 text-sm">
              <strong>Demo Credentials:</strong><br />
              Email: demo@kindsquad.org<br />
              Password: 1
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-900 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-900 border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-white font-medium mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full bg-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-white font-medium mb-2">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full bg-gray-900 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {mode === 'register' && redirectToMembership && (
            <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4">
              <p className="text-yellow-200 text-sm">
                <strong>Next:</strong> You'll choose your membership tier and complete registration on the next page.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Continue to Membership')}
          </button>
        </form>

        <div className="mt-6 text-center">
          {mode === 'signin' ? (
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => handleModeSwitch('register')}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Create one here
              </button>
            </p>
          ) : (
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => handleModeSwitch('signin')}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>

        {mode === 'signin' && (
          <div className="mt-4 text-center">
            <button className="text-gray-400 hover:text-yellow-300 transition-colors text-sm">
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

