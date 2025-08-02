import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('requests');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('submittedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [chapters, setChapters] = useState([]);

  // Mock data
  const mockRequests = [
    {
      id: 'REQ-001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Springfield, IL 62701',
      requestType: 'rent',
      amountNeeded: 1200,
      urgencyLevel: 'urgent',
      status: 'pending',
      description: 'Behind on rent due to unexpected medical expenses. Need assistance to avoid eviction.',
      submittedDate: '2025-01-28'
    },
    {
      id: 'REQ-002',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Chicago, IL 60601',
      requestType: 'medical',
      amountNeeded: 850,
      urgencyLevel: 'immediate',
      status: 'pending',
      description: 'Emergency dental work needed. Cannot afford treatment and in severe pain.',
      submittedDate: '2025-01-29'
    },
    {
      id: 'REQ-003',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '(555) 456-7890',
      address: '789 Pine St, Austin, TX 78701',
      requestType: 'utilities',
      amountNeeded: 450,
      urgencyLevel: 'important',
      status: 'approved',
      description: 'Electric bill past due. Risk of disconnection next week.',
      submittedDate: '2025-01-27',
      approvedDate: '2025-01-28'
    }
  ];

  const mockMembers = [
    {
      id: 'MEM-001',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '(555) 456-7890',
      address: '789 Pine St, Austin, TX 78701',
      dateOfBirth: '1990-02-15',
      joinDate: '2024-03-15',
      status: 'active',
      memberType: 'volunteer',
      isPaidMember: false,
      anniversaryDate: null,
      activity: {
        lastActive: '2025-01-28',
        missionsCompleted: 12,
        hoursVolunteered: 48
      }
    },
    {
      id: 'MEM-002',
      firstName: 'David',
      lastName: 'Kim',
      email: 'david.kim@email.com',
      phone: '(555) 234-5678',
      address: '321 Elm St, Seattle, WA 98101',
      dateOfBirth: '1985-08-22',
      joinDate: '2023-11-20',
      status: 'active',
      memberType: 'paid',
      isPaidMember: true,
      anniversaryDate: '2023-11-20',
      activity: {
        lastActive: '2025-01-29',
        missionsCompleted: 25,
        hoursVolunteered: 120
      }
    }
  ];

  const mockChapters = [
    {
      id: 'CHAP-001',
      name: 'Austin Kind Squad',
      location: 'Austin, TX',
      foundedDate: '2023-06-15',
      status: 'active',
      leaderName: 'Maria Santos',
      leaderEmail: 'maria.santos@email.com',
      memberCount: 45,
      missionsCompleted: 128,
      fundsRaised: 15750,
      lastActivity: '2025-01-28'
    },
    {
      id: 'CHAP-002',
      name: 'Chicago Kindness Hub',
      location: 'Chicago, IL',
      foundedDate: '2024-01-10',
      status: 'pending',
      leaderName: 'James Wilson',
      leaderEmail: 'james.wilson@email.com',
      memberCount: 12,
      missionsCompleted: 8,
      fundsRaised: 2400,
      lastActivity: '2025-01-25'
    }
  ];

  useEffect(() => {
    setRequests(mockRequests);
    setMembers(mockMembers);
    setChapters(mockChapters);
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
    if (activeTab !== 'all' && request.status !== activeTab) return false;
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
  });

  const getBirthdayAlerts = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return members.filter(member => {
      const birthday = new Date(member.dateOfBirth);
      const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
      
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
      
      if (thisYearAnniversary < today) {
        thisYearAnniversary.setFullYear(today.getFullYear() + 1);
      }
      
      return thisYearAnniversary >= today && thisYearAnniversary <= nextWeek;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="bg-gray-900">
        {/* Dashboard Header */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400 mt-1">Manage requests, members, and chapters</p>
              </div>
              
              {/* Stats Grid - Mobile Responsive */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-400">Total Requests</p>
                  <p className="text-lg md:text-2xl font-bold text-yellow-500">{requests.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-400">Active Members</p>
                  <p className="text-lg md:text-2xl font-bold text-green-500">{members.filter(m => m.status === 'active').length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-400">Active Chapters</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-500">{chapters.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-400">🎂 Birthdays</p>
                  <p className="text-lg md:text-2xl font-bold text-pink-500">{getBirthdayAlerts().length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-400">🎉 Anniversaries</p>
                  <p className="text-lg md:text-2xl font-bold text-purple-500">{getAnniversaryAlerts().length}</p>
                </div>
              </div>
              
              {/* Section Navigation - Mobile Responsive */}
              <div className="mt-6">
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 bg-gray-700 rounded-lg p-2">
                  <button
                    onClick={() => setActiveSection('requests')}
                    className={`px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                      activeSection === 'requests'
                        ? 'bg-yellow-500 text-black'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    📋 Requests
                  </button>
                  <button
                    onClick={() => setActiveSection('members')}
                    className={`px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                      activeSection === 'members'
                        ? 'bg-yellow-500 text-black'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    👥 Members
                  </button>
                  <button
                    onClick={() => setActiveSection('chapters')}
                    className={`px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                      activeSection === 'chapters'
                        ? 'bg-yellow-500 text-black'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    🏢 Chapters
                  </button>
                  <button
                    onClick={() => setActiveSection('alerts')}
                    className={`px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                      activeSection === 'alerts'
                        ? 'bg-yellow-500 text-black'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    🚨 Alerts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeSection === 'requests' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Assistance Requests</h2>
              
              {/* Search and Filter */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
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
              </div>

              {/* Status Tabs */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All', count: requests.length },
                    { key: 'pending', label: 'Pending', count: requests.filter(r => r.status === 'pending').length },
                    { key: 'approved', label: 'Approved', count: requests.filter(r => r.status === 'approved').length },
                    { key: 'rejected', label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length },
                    { key: 'completed', label: 'Completed', count: requests.filter(r => r.status === 'completed').length }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                        activeTab === tab.key
                          ? 'bg-yellow-500 text-black'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Request Cards - Mobile Optimized */}
              <div className="grid grid-cols-1 gap-4">
                {filteredRequests.map(request => (
                  <div key={request.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">{request.firstName} {request.lastName}</h3>
                          <p className="text-gray-400 text-sm">{request.id} • {request.submittedDate}</p>
                        </div>
                        <div className="flex flex-col gap-1 ml-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgencyLevel)}`}>
                            {request.urgencyLevel.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                            {request.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white text-right">{getAssistanceTypeLabel(request.requestType)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span className="text-yellow-500 font-semibold">${request.amountNeeded.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location:</span>
                          <span className="text-white text-right">{request.address.split(',').slice(-2).join(',').trim()}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm line-clamp-2">{request.description}</p>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                        <span className="text-gray-400 text-sm">📄 2 documents</span>
                        <button 
                          onClick={() => setSelectedRequest(request)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-medium transition-colors text-sm"
                        >
                          Review →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'members' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Member Management</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-300">Member management features coming soon...</p>
              </div>
            </div>
          )}

          {activeSection === 'chapters' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Chapter Management</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-300">Chapter management features coming soon...</p>
              </div>
            </div>
          )}

          {activeSection === 'alerts' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Alerts & Merch Management</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-300">Birthday alerts, anniversary tracking, and merch store integration coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

