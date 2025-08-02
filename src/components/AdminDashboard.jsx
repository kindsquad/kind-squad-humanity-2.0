import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const isDarkMode = true; // Always use dark mode for admin dashboard
  const [activeSection, setActiveSection] = useState('requests'); // requests, members, chapters
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [chapters, setChapters] = useState([]);
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

  // Mock data for members
  const mockMembers = [
    {
      id: 'MEM-001',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '555-0789',
      address: '789 Maple Drive, Austin, TX 78701',
      dateOfBirth: '1985-03-15',
      joinDate: '2024-12-01',
      membershipType: 'volunteer',
      status: 'pending',
      chapterId: 'CH-001',
      activity: {
        lastActive: '2025-01-30',
        missionsCompleted: 0,
        hoursVolunteered: 0
      },
      isPaidMember: false,
      anniversaryDate: null
    },
    {
      id: 'MEM-002',
      firstName: 'David',
      lastName: 'Kim',
      email: 'david.kim@email.com',
      phone: '555-0321',
      address: '321 Oak Lane, Seattle, WA 98101',
      dateOfBirth: '1990-08-22',
      joinDate: '2024-11-15',
      membershipType: 'paid',
      status: 'active',
      chapterId: 'CH-002',
      activity: {
        lastActive: '2025-01-29',
        missionsCompleted: 12,
        hoursVolunteered: 48
      },
      isPaidMember: true,
      anniversaryDate: '2024-11-15'
    },
    {
      id: 'MEM-003',
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'maria.santos@email.com',
      phone: '555-0654',
      address: '654 Pine Street, Denver, CO 80201',
      dateOfBirth: '1988-02-08',
      joinDate: '2024-10-20',
      membershipType: 'volunteer',
      status: 'active',
      chapterId: 'CH-001',
      activity: {
        lastActive: '2025-01-28',
        missionsCompleted: 8,
        hoursVolunteered: 32
      },
      isPaidMember: false,
      anniversaryDate: null
    }
  ];

  // Mock data for chapters
  const mockChapters = [
    {
      id: 'CH-001',
      name: 'Austin Kind Squad',
      location: 'Austin, TX',
      leaderName: 'Jennifer Martinez',
      leaderEmail: 'jennifer.martinez@email.com',
      foundedDate: '2024-09-01',
      status: 'active',
      memberCount: 25,
      activeMembers: 18,
      missionsCompleted: 45,
      totalFundsRaised: 12500,
      lastActivity: '2025-01-30'
    },
    {
      id: 'CH-002',
      name: 'Seattle Kindness Chapter',
      location: 'Seattle, WA',
      leaderName: 'Robert Chen',
      leaderEmail: 'robert.chen@email.com',
      foundedDate: '2024-10-15',
      status: 'pending',
      memberCount: 8,
      activeMembers: 6,
      missionsCompleted: 12,
      totalFundsRaised: 3200,
      lastActivity: '2025-01-29'
    },
    {
      id: 'CH-003',
      name: 'Denver Community Squad',
      location: 'Denver, CO',
      leaderName: 'Lisa Thompson',
      leaderEmail: 'lisa.thompson@email.com',
      foundedDate: '2024-11-01',
      status: 'active',
      memberCount: 15,
      activeMembers: 12,
      missionsCompleted: 28,
      totalFundsRaised: 7800,
      lastActivity: '2025-01-28'
    }
  ];

  useEffect(() => {
    setRequests(mockRequests);
    setMembers(mockMembers);
    setChapters(mockChapters);
  }, []);

  // Activity monitoring and analytics functions
  const getBirthdayAlerts = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return members.filter(member => {
      const birthday = new Date(member.dateOfBirth);
      const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
      
      // If birthday already passed this year, check next year
      if (thisYearBirthday < today) {
        thisYearBirthday.setFullYear(today.getFullYear() + 1);
      }
      
      return thisYearBirthday >= today && thisYearBirthday <= nextWeek;
    });
  };

  const getAnniversaryAlerts = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return members.filter(member => {
      if (!member.isPaidMember || !member.anniversaryDate) return false;
      
      const anniversary = new Date(member.anniversaryDate);
      const thisYearAnniversary = new Date(today.getFullYear(), anniversary.getMonth(), anniversary.getDate());
      
      // If anniversary already passed this year, check next year
      if (thisYearAnniversary < today) {
        thisYearAnniversary.setFullYear(today.getFullYear() + 1);
      }
      
      return thisYearAnniversary >= today && thisYearAnniversary <= nextWeek;
    });
  };

  const getActivityMetrics = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const activeThisWeek = members.filter(m => new Date(m.activity.lastActive) > lastWeek).length;
    const activeThisMonth = members.filter(m => new Date(m.activity.lastActive) > lastMonth).length;
    const totalMissions = members.reduce((sum, m) => sum + m.activity.missionsCompleted, 0);
    const totalHours = members.reduce((sum, m) => sum + m.activity.hoursVolunteered, 0);

    return {
      activeThisWeek,
      activeThisMonth,
      totalMissions,
      totalHours,
      averageMissionsPerMember: members.length > 0 ? (totalMissions / members.length).toFixed(1) : 0,
      averageHoursPerMember: members.length > 0 ? (totalHours / members.length).toFixed(1) : 0
    };
  };

  const getMerchAlerts = () => {
    const birthdayAlerts = getBirthdayAlerts();
    const anniversaryAlerts = getAnniversaryAlerts();
    
    return {
      birthdayCards: birthdayAlerts.map(member => ({
        ...member,
        alertType: 'birthday',
        daysUntil: Math.ceil((new Date(new Date().getFullYear(), new Date(member.dateOfBirth).getMonth(), new Date(member.dateOfBirth).getDate()) - new Date()) / (1000 * 60 * 60 * 24)),
        suggestedMerch: ['Birthday Card', 'Kind Squad Mug', 'Appreciation Pin']
      })),
      anniversaryGifts: anniversaryAlerts.map(member => ({
        ...member,
        alertType: 'anniversary',
        daysUntil: Math.ceil((new Date(new Date().getFullYear(), new Date(member.anniversaryDate).getMonth(), new Date(member.anniversaryDate).getDate()) - new Date()) / (1000 * 60 * 60 * 24)),
        suggestedMerch: ['Anniversary Certificate', 'Premium T-Shirt', 'Thank You Package']
      }))
    };
  };

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
              <p className="text-gray-400 mt-1">Manage requests, members, and chapters</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold text-yellow-500">{requests.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Active Members</p>
                <p className="text-2xl font-bold text-green-500">{members.filter(m => m.status === 'active').length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Active Chapters</p>
                <p className="text-2xl font-bold text-blue-500">{chapters.filter(c => c.status === 'active').length}</p>
              </div>
              
              {/* Alerts Section */}
              <div className="text-right">
                <p className="text-sm text-gray-400">🎂 Birthdays This Week</p>
                <p className="text-2xl font-bold text-pink-500">{getBirthdayAlerts().length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">🎉 Anniversaries This Week</p>
                <p className="text-2xl font-bold text-purple-500">{getAnniversaryAlerts().length}</p>
              </div>
            </div>
          </div>
          
          {/* Section Navigation */}
          <div className="pb-6">
            <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveSection('requests')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'requests'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                📋 Assistance Requests
              </button>
              <button
                onClick={() => setActiveSection('members')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'members'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                👥 Members
              </button>
              <button
                onClick={() => setActiveSection('chapters')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'chapters'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                🏢 Chapters
              </button>
              <button
                onClick={() => setActiveSection('alerts')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'alerts'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                🚨 Alerts & Merch
              </button>
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
                  placeholder={`Search ${activeSection}...`}
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
                {activeSection === 'requests' && (
                  <>
                    <option value="submittedDate">Sort by Date</option>
                    <option value="amountNeeded">Sort by Amount</option>
                    <option value="urgencyLevel">Sort by Urgency</option>
                    <option value="firstName">Sort by Name</option>
                  </>
                )}
                {activeSection === 'members' && (
                  <>
                    <option value="joinDate">Sort by Join Date</option>
                    <option value="firstName">Sort by Name</option>
                    <option value="lastActive">Sort by Activity</option>
                    <option value="missionsCompleted">Sort by Missions</option>
                  </>
                )}
                {activeSection === 'chapters' && (
                  <>
                    <option value="foundedDate">Sort by Founded Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="memberCount">Sort by Members</option>
                    <option value="missionsCompleted">Sort by Missions</option>
                  </>
                )}
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

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'requests' && (
          <>
            {/* Navigation Tabs for Requests */}
            <div className="bg-gray-800 border-b border-gray-700 -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                  {['all', 'pending', 'approved', 'rejected', 'completed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'border-yellow-500 text-yellow-500'
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests ({tabCounts[tab] || 0})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRequests.map((request) => renderRequestCard(request))}
            </div>
          </>
        )}

        {activeSection === 'members' && (
          <>
            {/* Members Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Member Management</h2>
              
              {/* Member Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Total Members</p>
                      <p className="text-2xl font-bold text-white">{members.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Pending Approval</p>
                      <p className="text-2xl font-bold text-white">{members.filter(m => m.status === 'pending').length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Paid Members</p>
                      <p className="text-2xl font-bold text-white">{members.filter(m => m.isPaidMember).length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Active This Week</p>
                      <p className="text-2xl font-bold text-white">{members.filter(m => {
                        const lastActive = new Date(m.activity.lastActive);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return lastActive > weekAgo;
                      }).length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Members List */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h3 className="text-lg font-medium text-white">Members</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Member</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Activity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {members.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {member.firstName[0]}{member.lastName[0]}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-white">
                                  {member.firstName} {member.lastName}
                                </div>
                                <div className="text-sm text-gray-400">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              member.status === 'active' ? 'bg-green-100 text-green-800' :
                              member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div className="flex items-center">
                              {member.isPaidMember && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                  💎 Paid
                                </span>
                              )}
                              {member.membershipType}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div>
                              <div>{member.activity.missionsCompleted} missions</div>
                              <div className="text-xs text-gray-400">
                                Last active: {new Date(member.activity.lastActive).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="text-yellow-500 hover:text-yellow-400 mr-3"
                            >
                              View
                            </button>
                            {member.status === 'pending' && (
                              <>
                                <button className="text-green-500 hover:text-green-400 mr-3">
                                  Approve
                                </button>
                                <button className="text-red-500 hover:text-red-400">
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'chapters' && (
          <>
            {/* Chapters Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Chapter Management</h2>
              
              {/* Chapter Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Total Chapters</p>
                      <p className="text-2xl font-bold text-white">{chapters.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Pending Approval</p>
                      <p className="text-2xl font-bold text-white">{chapters.filter(c => c.status === 'pending').length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Total Members</p>
                      <p className="text-2xl font-bold text-white">{chapters.reduce((sum, c) => sum + c.memberCount, 0)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Funds Raised</p>
                      <p className="text-2xl font-bold text-white">${chapters.reduce((sum, c) => sum + c.totalFundsRaised, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{chapter.name}</h3>
                        <p className="text-gray-400 text-sm">{chapter.location}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        chapter.status === 'active' ? 'bg-green-100 text-green-800' :
                        chapter.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {chapter.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Leader:</span>
                        <span className="text-white">{chapter.leaderName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Members:</span>
                        <span className="text-white">{chapter.memberCount} ({chapter.activeMembers} active)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Missions:</span>
                        <span className="text-white">{chapter.missionsCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Funds Raised:</span>
                        <span className="text-white">${chapter.totalFundsRaised.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Founded:</span>
                        <span className="text-white">{new Date(chapter.foundedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-2">
                      <button
                        onClick={() => setSelectedChapter(chapter)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        View Details
                      </button>
                      {chapter.status === 'pending' && (
                        <>
                          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-md transition-colors">
                            ✓
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-md transition-colors">
                            ✗
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeSection === 'alerts' && (
          <>
            {/* Alerts & Merch Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Alerts & Merch Management</h2>
              
              {/* Alert Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-pink-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Birthdays This Week</p>
                      <p className="text-2xl font-bold text-white">{getBirthdayAlerts().length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Anniversaries This Week</p>
                      <p className="text-2xl font-bold text-white">{getAnniversaryAlerts().length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Pending Merch Orders</p>
                      <p className="text-2xl font-bold text-white">{getMerchAlerts().birthdayCards.length + getMerchAlerts().anniversaryGifts.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">Monthly Merch Budget</p>
                      <p className="text-2xl font-bold text-white">$500</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Birthday Alerts */}
              {getBirthdayAlerts().length > 0 && (
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      🎂 Upcoming Birthdays
                    </h3>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Order All Birthday Cards
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getMerchAlerts().birthdayCards.map((alert) => (
                      <div key={alert.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-white">{alert.firstName} {alert.lastName}</h4>
                            <p className="text-sm text-gray-400">{alert.email}</p>
                          </div>
                          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full">
                            {alert.daysUntil} days
                          </span>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-400 mb-2">Birthday: {new Date(alert.dateOfBirth).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-400">Address: {alert.address}</p>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm font-medium text-white mb-2">Suggested Merch:</p>
                          <div className="flex flex-wrap gap-1">
                            {alert.suggestedMerch.map((item, index) => (
                              <span key={index} className="bg-gray-600 text-gray-200 text-xs px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm py-2 px-3 rounded-md transition-colors">
                            Send Card
                          </button>
                          <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white text-sm py-2 px-3 rounded-md transition-colors">
                            Order Merch
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Anniversary Alerts */}
              {getAnniversaryAlerts().length > 0 && (
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      🎉 Upcoming Anniversaries
                    </h3>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Order All Anniversary Gifts
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getMerchAlerts().anniversaryGifts.map((alert) => (
                      <div key={alert.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-white">{alert.firstName} {alert.lastName}</h4>
                            <p className="text-sm text-gray-400">{alert.email}</p>
                          </div>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                            {alert.daysUntil} days
                          </span>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-400 mb-2">Anniversary: {new Date(alert.anniversaryDate).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-400">Address: {alert.address}</p>
                          <p className="text-sm text-gray-400">Missions: {alert.activity.missionsCompleted}</p>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm font-medium text-white mb-2">Suggested Merch:</p>
                          <div className="flex flex-wrap gap-1">
                            {alert.suggestedMerch.map((item, index) => (
                              <span key={index} className="bg-gray-600 text-gray-200 text-xs px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-3 rounded-md transition-colors">
                            Send Certificate
                          </button>
                          <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white text-sm py-2 px-3 rounded-md transition-colors">
                            Order Merch
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity Analytics */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">📊 Activity Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-500">{getActivityMetrics().activeThisWeek}</p>
                    <p className="text-sm text-gray-400">Active This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-500">{getActivityMetrics().totalMissions}</p>
                    <p className="text-sm text-gray-400">Total Missions Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-500">{getActivityMetrics().averageMissionsPerMember}</p>
                    <p className="text-sm text-gray-400">Avg Missions per Member</p>
                  </div>
                </div>
              </div>

              {/* Merch Store Integration */}
              <div className="bg-gray-800 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">🛍️ Merch Store Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-3">Quick Order Options</h4>
                    <div className="space-y-2">
                      <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                        🎂 Order Birthday Cards (Bulk) - $3.99 each
                      </button>
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                        🎉 Order Anniversary Certificates (Bulk) - $5.99 each
                      </button>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                        👕 Order Appreciation T-Shirts - $19.99 each
                      </button>
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                        📦 Custom Merch Package - $29.99 each
                      </button>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-700 rounded-md">
                      <h5 className="text-sm font-medium text-white mb-2">Integration Status</h5>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-400">Printful API Connected</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-400">Shopify Store Linked</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-yellow-400">Auto-shipping: Enabled</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3">Store Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Printful API Key</label>
                        <input 
                          type="password" 
                          placeholder="Enter Printful API key"
                          defaultValue="pk_live_••••••••••••••••"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Shopify Store URL</label>
                        <input 
                          type="text" 
                          placeholder="your-store.myshopify.com"
                          defaultValue="kindsquad-merch.myshopify.com"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Default Shipping Address</label>
                        <textarea 
                          placeholder="Kind Squad HQ Address"
                          defaultValue="Kind Squad HQ&#10;123 Kindness Ave&#10;Austin, TX 78701"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          rows="3"
                        />
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="auto-order"
                          defaultChecked
                          className="mr-2 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                        />
                        <label htmlFor="auto-order" className="text-sm text-gray-300">
                          Auto-order birthday cards 3 days in advance
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="auto-anniversary"
                          defaultChecked
                          className="mr-2 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                        />
                        <label htmlFor="auto-anniversary" className="text-sm text-gray-300">
                          Auto-order anniversary gifts 1 week in advance
                        </label>
                      </div>
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md text-sm font-medium transition-colors">
                        Save Settings & Test Connection
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recent Orders */}
                <div className="mt-6">
                  <h4 className="font-medium text-white mb-3">Recent Merch Orders</h4>
                  <div className="bg-gray-700 rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-600">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-300">Order ID</th>
                          <th className="px-4 py-2 text-left text-gray-300">Member</th>
                          <th className="px-4 py-2 text-left text-gray-300">Item</th>
                          <th className="px-4 py-2 text-left text-gray-300">Status</th>
                          <th className="px-4 py-2 text-left text-gray-300">Tracking</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-t border-gray-600">
                          <td className="px-4 py-2">#PF-2025-001</td>
                          <td className="px-4 py-2">Emily Rodriguez</td>
                          <td className="px-4 py-2">Birthday Card</td>
                          <td className="px-4 py-2">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Shipped</span>
                          </td>
                          <td className="px-4 py-2">
                            <a href="#" className="text-yellow-500 hover:text-yellow-400">1Z999AA1234567890</a>
                          </td>
                        </tr>
                        <tr className="border-t border-gray-600">
                          <td className="px-4 py-2">#PF-2025-002</td>
                          <td className="px-4 py-2">David Kim</td>
                          <td className="px-4 py-2">Anniversary T-Shirt</td>
                          <td className="px-4 py-2">
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Processing</span>
                          </td>
                          <td className="px-4 py-2">-</td>
                        </tr>
                        <tr className="border-t border-gray-600">
                          <td className="px-4 py-2">#PF-2025-003</td>
                          <td className="px-4 py-2">Maria Santos</td>
                          <td className="px-4 py-2">Appreciation Pin Set</td>
                          <td className="px-4 py-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Ordered</span>
                          </td>
                          <td className="px-4 py-2">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {filteredRequests.length === 0 && activeSection === 'requests' && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-300">No requests found</h3>
            <p className="mt-1 text-sm text-gray-400">
              {searchTerm ? 'Try adjusting your search terms.' : 'No assistance requests match the current filter.'}
            </p>
          </div>
        )}
      </div>  ) : (
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

