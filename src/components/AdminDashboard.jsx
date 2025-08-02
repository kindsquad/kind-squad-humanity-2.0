import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const isDarkMode = true; // Always use dark mode for admin dashboard
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('submittedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewingDocument, setViewingDocument] = useState(null);

  // Mock data for demonstration - in production this would come from your backend
  const mockRequests = [
    {
      id: 'REQ-001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '555-0123',
      address: '123 Oak Street, Springfield, IL 62701',
      requestType: 'rent',
      urgencyLevel: 'urgent',
      amountNeeded: 1200,
      description: 'Behind on rent due to unexpected medical expenses. Need assistance to avoid eviction.',
      status: 'pending',
      submittedDate: '2025-01-28',
      documents: {
        idDocument: { name: 'drivers_license.jpg', size: 2.1 },
        supportingDocs: [
          { name: 'rent_notice.pdf', size: 1.5 },
          { name: 'medical_bills.pdf', size: 3.2 }
        ]
      },
      isForSelf: true,
      previousHelp: false
    },
    {
      id: 'REQ-002',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '555-0456',
      address: '456 Pine Avenue, Chicago, IL 60601',
      requestType: 'medical',
      urgencyLevel: 'immediate',
      amountNeeded: 850,
      description: 'Emergency dental work needed. Cannot afford treatment and in severe pain.',
      status: 'pending',
      submittedDate: '2025-01-29',
      documents: {
        idDocument: { name: 'state_id.jpg', size: 1.8 },
        supportingDocs: [
          { name: 'dental_estimate.pdf', size: 0.9 }
        ]
      },
      isForSelf: true,
      previousHelp: false
    },
    {
      id: 'REQ-003',
      firstName: 'Lisa',
      lastName: 'Rodriguez',
      email: 'lisa.rodriguez@email.com',
      phone: '555-0789',
      address: '789 Elm Street, Peoria, IL 61602',
      requestType: 'utilities',
      urgencyLevel: 'important',
      amountNeeded: 450,
      description: 'Electric bill past due. Risk of disconnection with young children in the home.',
      status: 'approved',
      submittedDate: '2025-01-25',
      approvedDate: '2025-01-27',
      documents: {
        idDocument: { name: 'passport.jpg', size: 2.5 },
        supportingDocs: [
          { name: 'electric_bill.pdf', size: 1.1 },
          { name: 'disconnect_notice.pdf', size: 0.8 }
        ]
      },
      isForSelf: true,
      previousHelp: true
    }
  ];

  useEffect(() => {
    setRequests(mockRequests);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'approved': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'rejected': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'completed': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'immediate': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'urgent': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'important': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'standard': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getAssistanceTypeLabel = (type) => {
    const types = {
      rent: 'Rent Assistance',
      utilities: 'Utility Bills',
      food: 'Food Assistance',
      medical: 'Medical Expenses',
      transportation: 'Transportation/Car Repairs',
      domestic_violence: 'Domestic Violence Support',
      shelter: 'Emergency Shelter',
      disaster: 'Disaster Relief',
      care_package: 'Care Package',
      other: 'Other Emergency Need'
    };
    return types[type] || type;
  };

  const filteredRequests = requests.filter(request => {
    // Filter by tab
    if (activeTab !== 'all' && request.status !== activeTab) return false;
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        request.firstName.toLowerCase().includes(searchLower) ||
        request.lastName.toLowerCase().includes(searchLower) ||
        request.email.toLowerCase().includes(searchLower) ||
        request.id.toLowerCase().includes(searchLower) ||
        getAssistanceTypeLabel(request.requestType).toLowerCase().includes(searchLower) ||
        request.description.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }).sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle date sorting
    if (sortBy === 'submittedDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    // Handle numeric sorting
    if (sortBy === 'amountNeeded') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getAnalytics = () => {
    const totalAmount = requests.reduce((sum, req) => sum + req.amountNeeded, 0);
    const approvedAmount = requests.filter(req => req.status === 'approved' || req.status === 'completed')
      .reduce((sum, req) => sum + req.amountNeeded, 0);
    
    const urgencyBreakdown = requests.reduce((acc, req) => {
      acc[req.urgencyLevel] = (acc[req.urgencyLevel] || 0) + 1;
      return acc;
    }, {});

    const typeBreakdown = requests.reduce((acc, req) => {
      acc[req.requestType] = (acc[req.requestType] || 0) + 1;
      return acc;
    }, {});

    return {
      totalAmount,
      approvedAmount,
      urgencyBreakdown,
      typeBreakdown,
      averageAmount: Math.round(totalAmount / requests.length)
    };
  };

  const analytics = getAnalytics();

  const viewDocument = (document, type = 'supporting') => {
    setViewingDocument({
      ...document,
      type,
      // In production, this would be the actual file URL from your storage
      url: `/mock-documents/${document.name}`
    });
  };

  const renderDocumentViewer = () => {
    if (!viewingDocument) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <div>
              <h3 className="text-xl font-bold text-white">{viewingDocument.name}</h3>
              <p className="text-gray-400 text-sm">
                {viewingDocument.type === 'id' ? 'ID Verification Document' : 'Supporting Document'} • {viewingDocument.size} MB
              </p>
            </div>
            <button 
              onClick={() => setViewingDocument(null)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            {/* Document Preview Area */}
            <div className="bg-gray-800 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
              <div className="text-gray-400">
                <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium">Document Preview</p>
                <p className="text-sm mt-2">In production, this would display the actual document content</p>
                <p className="text-xs mt-1 text-gray-500">File: {viewingDocument.name}</p>
              </div>
            </div>
            
            {/* Document Actions */}
            <div className="mt-6 flex justify-between items-center">
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                  📥 Download
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors">
                  ✓ Verify Document
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors">
                  ⚠ Flag as Suspicious
                </button>
              </div>
              <div className="text-sm text-gray-400">
                Uploaded: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const updateRequestStatus = (requestId, newStatus) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: newStatus, approvedDate: newStatus === 'approved' ? new Date().toISOString().split('T')[0] : req.approvedDate }
        : req
    ));
    
    // Close the detail view if the request was updated
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(prev => ({ ...prev, status: newStatus }));
    }
  };

  const renderRequestCard = (request) => (
    <div 
      key={request.id}
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-colors cursor-pointer"
      onClick={() => setSelectedRequest(request)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{request.firstName} {request.lastName}</h3>
          <p className="text-gray-400 text-sm">{request.id} • {request.submittedDate}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgencyLevel)}`}>
            {request.urgencyLevel.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
            {request.status.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Type:</span>
          <span className="text-white">{getAssistanceTypeLabel(request.requestType)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Amount:</span>
          <span className="text-yellow-500 font-semibold">${request.amountNeeded.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Location:</span>
          <span className="text-white text-sm">{request.address.split(',').slice(-2).join(',').trim()}</span>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mt-3 line-clamp-2">{request.description}</p>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
        <div className="flex items-center text-sm text-gray-400">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {request.documents.supportingDocs.length + 1} documents
        </div>
        <button className="text-yellow-500 hover:text-yellow-400 text-sm font-medium">
          Review →
        </button>
      </div>
    </div>
  );

  const renderRequestDetail = () => {
    if (!selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedRequest.firstName} {selectedRequest.lastName}</h2>
                <p className="text-gray-400">{selectedRequest.id} • Submitted {selectedRequest.submittedDate}</p>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <p className="text-white">{selectedRequest.email}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Phone</label>
                  <p className="text-white">{selectedRequest.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-400 text-sm">Address</label>
                  <p className="text-white">{selectedRequest.address}</p>
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Request Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Assistance Type</label>
                  <p className="text-white">{getAssistanceTypeLabel(selectedRequest.requestType)}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Amount Needed</label>
                  <p className="text-yellow-500 font-semibold text-lg">${selectedRequest.amountNeeded.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Urgency Level</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(selectedRequest.urgencyLevel)}`}>
                    {selectedRequest.urgencyLevel.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Current Status</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-gray-400 text-sm">Description</label>
                <p className="text-white mt-1">{selectedRequest.description}</p>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Verification Documents</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">ID Verification</label>
                  <div className="mt-2 p-3 bg-gray-700 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-white text-sm">{selectedRequest.documents.idDocument.name}</span>
                      <span className="text-gray-400 text-xs ml-2">({selectedRequest.documents.idDocument.size} MB)</span>
                    </div>
                    <button 
                      onClick={() => viewDocument(selectedRequest.documents.idDocument, 'id')}
                      className="text-yellow-500 hover:text-yellow-400 text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Supporting Documents ({selectedRequest.documents.supportingDocs.length})</label>
                  <div className="mt-2 space-y-2">
                    {selectedRequest.documents.supportingDocs.map((doc, index) => (
                      <div key={index} className="p-3 bg-gray-700 rounded-md flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-white text-sm">{doc.name}</span>
                          <span className="text-gray-400 text-xs ml-2">({doc.size} MB)</span>
                        </div>
                        <button 
                          onClick={() => viewDocument(doc, 'supporting')}
                          className="text-yellow-500 hover:text-yellow-400 text-sm"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {selectedRequest.status === 'pending' && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Review Actions</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => updateRequestStatus(selectedRequest.id, 'approved')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                  >
                    ✓ Approve Request
                  </button>
                  <button 
                    onClick={() => updateRequestStatus(selectedRequest.id, 'rejected')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                  >
                    ✗ Reject Request
                  </button>
                </div>
                <div className="mt-3">
                  <textarea 
                    placeholder="Add notes or comments for this decision..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {selectedRequest.status === 'approved' && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Approved Request Actions</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => updateRequestStatus(selectedRequest.id, 'completed')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                  >
                    ✓ Mark as Completed
                  </button>
                  <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
                    📧 Send Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getTabCounts = () => {
    return {
      all: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      approved: requests.filter(r => r.status === 'approved').length,
      rejected: requests.filter(r => r.status === 'rejected').length,
      completed: requests.filter(r => r.status === 'completed').length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Review and manage assistance requests</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold text-yellow-500">{requests.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Pending Review</p>
                <p className="text-2xl font-bold text-orange-500">{tabCounts.pending}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Amount</p>
                <p className="text-2xl font-bold text-green-500">${analytics.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="pb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search requests by name, email, ID, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="submittedDate">Sort by Date</option>
                <option value="amountNeeded">Sort by Amount</option>
                <option value="urgencyLevel">Sort by Urgency</option>
                <option value="firstName">Sort by Name</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'all', label: 'All Requests', count: tabCounts.all },
              { key: 'pending', label: 'Pending', count: tabCounts.pending },
              { key: 'approved', label: 'Approved', count: tabCounts.approved },
              { key: 'rejected', label: 'Rejected', count: tabCounts.rejected },
              { key: 'completed', label: 'Completed', count: tabCounts.completed }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-yellow-500 text-yellow-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-300">No requests found</h3>
            <p className="mt-1 text-sm text-gray-400">No assistance requests match the current filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.map(renderRequestCard)}
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      {renderRequestDetail()}

      {/* Document Viewer Modal */}
      {renderDocumentViewer()}
    </div>
  );
};

export default AdminDashboard;

