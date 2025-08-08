import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import notificationService from '../utils/notificationService';
import MissionCard from './MissionCard';
import MissionSection from './MissionSection';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [missions, setMissions] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('all');
  const [showMissionCard, setShowMissionCard] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [showViewMission, setShowViewMission] = useState(false);
  const [viewMission, setViewMission] = useState(null);

  useEffect(() => {
    // Mock data for requests
    setRequests([
      {
        id: 'REQ-001',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '(555) 123-4567',
        address: '123 Main St, Springfield, IL 62701',
        assistanceType: 'Rent Assistance',
        amount: 1200,
        urgency: 'urgent',
        status: 'pending',
        description: 'Behind on rent due to unexpected medical expenses. Need assistance to avoid eviction.',
        dateSubmitted: '2025-01-28',
        documents: {
          id: { name: 'drivers_license.pdf', size: '2.1 MB' },
          supporting: [{ name: 'medical_bill.pdf', size: '1.8 MB' }]
        }
      },
      {
        id: 'REQ-002',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@email.com',
        phone: '(555) 987-6543',
        address: '456 Oak Ave, Chicago, IL 60601',
        assistanceType: 'Medical Expenses',
        amount: 850,
        urgency: 'immediate',
        status: 'pending',
        description: 'Emergency dental work needed. Cannot afford treatment and in severe pain.',
        dateSubmitted: '2025-01-29',
        documents: {
          id: { name: 'drivers_license.pdf', size: '2.1 MB' },
          supporting: [{ name: 'medical_bill.pdf', size: '1.8 MB' }]
        }
      },
      {
        id: 'REQ-003',
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@email.com',
        phone: '(555) 456-7890',
        address: '789 Pine St, Austin, TX 78701',
        assistanceType: 'Utility Bills',
        amount: 450,
        urgency: 'important',
        status: 'approved',
        description: 'Electric bill past due. Risk of disconnection next week.',
        dateSubmitted: '2025-01-27',
        documents: {
          id: { name: 'drivers_license.pdf', size: '2.1 MB' },
          supporting: [{ name: 'utility_bill.pdf', size: '1.5 MB' }]
        }
      }
    ]);

    // Mock data for missions (sample saved mission cards)
    setMissions([
      {
        id: 'REQ-003',
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@email.com',
        phone: '(555) 456-7890',
        assistanceType: 'Utility Bills',
        amount: 450,
        amountRaised: 450,
        description: 'Electric bill past due. Risk of disconnection next week.',
        dateSubmitted: '2025-01-27',
        dateReceived: '2025-01-27',
        initialStatus: 'urgent',
        status: 'completed',
        datePostedToCommunity: '2025-01-28T10:00',
        dateGoalCompleted: '2025-01-29T15:30',
        datePurchased: '2025-01-30T09:00',
        dateDelivered: '2025-01-30',
        receipt: 'utility_payment_receipt.pdf' // Sample receipt
      },
      {
        id: 'MISSION-001',
        firstName: 'David',
        lastName: 'Thompson',
        email: 'david.thompson@email.com',
        phone: '(555) 321-9876',
        assistanceType: 'Food Assistance',
        amount: 300,
        amountRaised: 180,
        description: 'Family of four needs groceries for the month.',
        dateSubmitted: '2025-01-25',
        dateReceived: '2025-01-25',
        initialStatus: 'within_a_week',
        status: 'posted',
        datePostedToCommunity: '2025-01-26T14:00'
      },
      {
        id: 'MISSION-002',
        firstName: 'Lisa',
        lastName: 'Martinez',
        email: 'lisa.martinez@email.com',
        phone: '(555) 654-3210',
        assistanceType: 'Car Repair',
        amount: 800,
        amountRaised: 0,
        description: 'Car broke down, need repairs to get to work.',
        dateSubmitted: '2025-01-30',
        dateReceived: '2025-01-30',
        initialStatus: 'urgent',
        status: 'before_the_board'
      }
    ]);
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assistanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-600 text-white';
      case 'urgent': return 'bg-orange-600 text-white';
      case 'important': return 'bg-blue-600 text-white';
      case 'standard': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600 text-black';
      case 'approved': return 'bg-green-600 text-white';
      case 'rejected': return 'bg-red-600 text-white';
      case 'completed': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Main Dashboard Content */}
      <div className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage requests, members, and chapters</p>
            </div>

          {/* Section Navigation */}
          <div className="mb-8">
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 bg-gray-800 rounded-lg p-2 border border-gray-700">
              <button
                onClick={() => setActiveSection('requests')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'requests'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                📋 Requests
              </button>
              <button
                onClick={() => setActiveSection('missions')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'missions'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                🎯 Missions
              </button>
              <button
                onClick={() => setActiveSection('members')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'members'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                👥 Members
              </button>
              <button
                onClick={() => setActiveSection('chapters')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'chapters'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                🏢 Chapters
              </button>
              <button
                onClick={() => setActiveSection('alerts')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'alerts'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                🚨 Alerts
              </button>
            </div>
          </div>

          {/* Requests Section */}
          {activeSection === 'requests' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Assistance Requests</h2>
              
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="urgency">Sort by Urgency</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
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
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Request Cards */}
              <div className="space-y-4">
                {filteredRequests.map(request => (
                  <div key={request.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {request.firstName} {request.lastName}
                        </h3>
                        <p className="text-gray-400 text-sm">{request.id} • {request.dateSubmitted}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-gray-400 text-sm">Type:</span>
                        <p className="text-white font-medium">{request.assistanceType}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Amount:</span>
                        <p className="text-yellow-400 font-bold text-lg">${request.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Location:</span>
                        <p className="text-white">{request.address.split(',').slice(-2).join(',').trim()}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{request.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400">
                        <span className="mr-2">📄</span>
                        <span>{Object.keys(request.documents.supporting).length + 1} documents</span>
                      </div>
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Review →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missions Section */}
          {activeSection === 'missions' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Mission Management</h2>
              
              {/* Mission Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Missions</div>
                  <div className="text-2xl font-bold text-yellow-400">{missions.length}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-400 mb-1">Active</div>
                  <div className="text-2xl font-bold text-blue-400">{missions.filter(m => !['completed', 'delivered'].includes(m.status)).length}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-400 mb-1">Completed</div>
                  <div className="text-2xl font-bold text-green-400">{missions.filter(m => m.status === 'completed').length}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Raised</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    ${missions.reduce((sum, m) => sum + (m.amountRaised || 0), 0).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Mission Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search missions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Missions</option>
                  <option value="received">Received</option>
                  <option value="before_the_board">Before the Board</option>
                  <option value="accepted">Accepted</option>
                  <option value="posted">Posted</option>
                  <option value="raised">Raised</option>
                  <option value="items_purchased">Items Purchased</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Mission Cards Grid - Compact Mobile-Friendly Design */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                {missions.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <div className="text-gray-400 text-base mb-3">No missions created yet</div>
                    <p className="text-gray-500 text-sm">Mission cards will appear here after creating them from approved requests.</p>
                  </div>
                ) : (
                  missions
                    .filter(mission => {
                      const matchesSearch = searchTerm === '' || 
                        mission.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        mission.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        mission.assistanceType?.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesTab = activeTab === 'all' || mission.status === activeTab;
                      return matchesSearch && matchesTab;
                    })
                    .map(mission => (
                      <div key={mission.id} className="bg-gray-700 border border-gray-600 rounded-lg p-2 hover:border-yellow-500 transition-colors">
                        <div className="mb-2">
                          <h3 className="text-xs font-semibold text-white truncate">
                            {mission.firstName} {mission.lastName}
                          </h3>
                          <p className="text-gray-400 text-xs truncate">{mission.assistanceType}</p>
                          <span className={`inline-block px-1 py-0.5 rounded text-xs font-medium mt-1 ${
                            mission.status === 'completed' ? 'bg-green-600 text-white' :
                            mission.status === 'delivered' ? 'bg-teal-600 text-white' :
                            mission.status === 'items_purchased' ? 'bg-orange-600 text-white' :
                            mission.status === 'raised' ? 'bg-emerald-600 text-white' :
                            mission.status === 'posted' ? 'bg-purple-600 text-white' :
                            mission.status === 'accepted' ? 'bg-blue-600 text-white' :
                            mission.status === 'before_the_board' ? 'bg-yellow-600 text-black' :
                            'bg-gray-600 text-white'
                          }`}>
                            {mission.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Received'}
                          </span>
                        </div>

                        <div className="space-y-1 mb-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Need:</span>
                            <span className="text-white">${mission.amount?.toLocaleString() || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Raised:</span>
                            <span className="text-green-400">${mission.amountRaised?.toLocaleString() || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Progress:</span>
                            <span className="text-yellow-400">
                              {mission.amountRaised && mission.amount ? 
                                Math.round((mission.amountRaised / mission.amount) * 100) : 0}%
                            </span>
                          </div>
                          {mission.receipt && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Receipt:</span>
                              <span className="text-blue-400">📄 Uploaded</span>
                            </div>
                          )}
                        </div>

                        <MissionSection mission={mission} />

                        {/* Receipt Display Section */}
                        {mission.receipt && (
                          <div className="mb-2 p-2 bg-gray-600 rounded border border-gray-500">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-300">Receipt:</span>
                              <button
                                onClick={() => {
                                  if (mission.receipt instanceof File) {
                                    const url = URL.createObjectURL(mission.receipt);
                                    window.open(url, '_blank');
                                  } else if (typeof mission.receipt === 'string') {
                                    window.open(mission.receipt, '_blank');
                                  }
                                }}
                                className="text-xs text-blue-400 hover:text-blue-300"
                              >
                                View 📄
                              </button>
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {mission.receipt instanceof File ? mission.receipt.name : 'Receipt uploaded'}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setSelectedMission(mission);
                              setShowMissionCard(true);
                            }}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-1 px-2 rounded font-medium transition-colors text-xs"
                          >
                            📝 Edit
                          </button>
                          <button
                            onClick={() => {
                              setViewMission(mission);
                              setShowViewMission(true);
                            }}
                            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded font-medium transition-colors text-xs"
                          >
                            👁️ View
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {/* Other sections placeholder */}
          {!['requests', 'missions'].includes(activeSection) && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {activeSection === 'members' && 'Member Management'}
                {activeSection === 'chapters' && 'Chapter Management'}
                {activeSection === 'alerts' && 'Alerts & Merch'}
              </h2>
              <p className="text-gray-400">This section is under development.</p>
            </div>
          )}
        </div>
      </div>

      {/* Request Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Request Review</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Personal Information</h4>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 text-sm">Name:</span>
                    <p className="text-white">{selectedRequest.firstName} {selectedRequest.lastName}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Email:</span>
                    <p className="text-white">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Phone:</span>
                    <p className="text-white">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Address:</span>
                    <p className="text-white">{selectedRequest.address}</p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Request Details</h4>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Type:</span>
                      <p className="text-white">{selectedRequest.assistanceType}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Amount Needed:</span>
                      <p className="text-yellow-400 font-bold text-xl">${selectedRequest.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Urgency Level:</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                        {selectedRequest.urgency.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Status:</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Description:</span>
                    <p className="text-white mt-1">{selectedRequest.description}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Documents</h4>
                <div className="space-y-3">
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">ID Verification</p>
                      <p className="text-gray-400 text-sm">{selectedRequest.documents.id.name} • {selectedRequest.documents.id.size}</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                      View
                    </button>
                  </div>
                  {selectedRequest.documents.supporting.map((doc, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Supporting Document</p>
                        <p className="text-gray-400 text-sm">{doc.name} • {doc.size}</p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
                {/* Create Mission Card Button - First */}
                <button
                  onClick={() => {
                    setSelectedMission(selectedRequest);
                    setShowMissionCard(true);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  📋 Create Mission Card
                </button>
                
                {/* Approve Request Button - Second */}
                <button
                  onClick={async () => {
                    try {
                      const updatedRequests = requests.map(req => 
                        req.id === selectedRequest.id 
                          ? { ...req, status: 'approved' }
                          : req
                      );
                      setRequests(updatedRequests);
                      
                      const result = await notificationService.sendApprovalNotification(selectedRequest);
                      
                      if (result.success) {
                        notificationService.showInAppNotification({
                          title: '✅ Request Approved',
                          message: `${selectedRequest.firstName}'s request has been approved and notifications sent.`,
                          type: 'success'
                        });
                      } else {
                        notificationService.showInAppNotification({
                          title: '⚠️ Approval Saved',
                          message: 'Request approved but there was an issue sending notifications.',
                          type: 'error'
                        });
                      }
                      
                      setSelectedRequest(null);
                    } catch (error) {
                      console.error('Error approving request:', error);
                      notificationService.showInAppNotification({
                        title: '❌ Error',
                        message: 'There was an error processing the approval.',
                        type: 'error'
                      });
                    }
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  ✓ Approve Request
                </button>
                <button
                  onClick={async () => {
                    try {
                      const updatedRequests = requests.map(req => 
                        req.id === selectedRequest.id 
                          ? { ...req, status: 'rejected' }
                          : req
                      );
                      setRequests(updatedRequests);
                      
                      const result = await notificationService.sendRejectionNotification(selectedRequest);
                      
                      if (result.success) {
                        notificationService.showInAppNotification({
                          title: '📧 Request Rejected',
                          message: `${selectedRequest.firstName}'s request has been rejected and notifications sent.`,
                          type: 'info'
                        });
                      } else {
                        notificationService.showInAppNotification({
                          title: '⚠️ Rejection Saved',
                          message: 'Request rejected but there was an issue sending notifications.',
                          type: 'error'
                        });
                      }
                      
                      setSelectedRequest(null);
                    } catch (error) {
                      console.error('Error rejecting request:', error);
                      notificationService.showInAppNotification({
                        title: '❌ Error',
                        message: 'There was an error processing the rejection.',
                        type: 'error'
                      });
                    }
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  ✗ Reject Request
                </button>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Impact Dashboard at Bottom */}
      <div className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">KIND SQUAD IMPACT DASHBOARD</h2>
          <p className="text-gray-400 mb-12 text-lg">Building humanity through kindness • Real-time organizational metrics</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-2xl md:text-4xl font-bold mb-3 text-yellow-400">$284,368</div>
              <div className="text-sm font-medium text-white uppercase tracking-widest">TOTAL RAISED</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">THIS YEAR</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-2xl md:text-4xl font-bold mb-3 text-yellow-400">176</div>
              <div className="text-sm font-medium text-white uppercase tracking-widest">TOTAL MISSIONS</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">COMPLETED</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-2xl md:text-4xl font-bold mb-3 text-yellow-400">13,056</div>
              <div className="text-sm font-medium text-white uppercase tracking-widest">PEOPLE HELPED</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">LIVES CHANGED</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-2xl md:text-4xl font-bold mb-3 text-yellow-400">2,647</div>
              <div className="text-sm font-medium text-white uppercase tracking-widest">ACTIVE MEMBERS</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">GROWING DAILY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Card Modal */}
      {showMissionCard && selectedMission && (
        <MissionCard
          mission={selectedMission}
          onUpdate={(updatedMission) => {
            // Update or add mission to missions array
            setMissions(prevMissions => {
              const existingIndex = prevMissions.findIndex(m => m.id === updatedMission.id);
              if (existingIndex >= 0) {
                // Update existing mission
                const updated = [...prevMissions];
                updated[existingIndex] = updatedMission;
                return updated;
              } else {
                // Add new mission
                return [...prevMissions, updatedMission];
              }
            });
            
            // Show success notification
            notificationService.showInAppNotification({
              title: '✅ Mission Card Saved',
              message: `Mission card for ${updatedMission.firstName} ${updatedMission.lastName} has been saved to the Missions section.`,
              type: 'success'
            });
          }}
          onClose={() => {
            setShowMissionCard(false);
            setSelectedMission(null);
          }}
        />
      )}

      {/* View Mission Modal */}
      {showViewMission && viewMission && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Mission Details - {viewMission.firstName} {viewMission.lastName}</h3>
              <button
                onClick={() => {
                  setShowViewMission(false);
                  setViewMission(null);
                }}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Mission Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Mission Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{viewMission.firstName} {viewMission.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{viewMission.assistanceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        viewMission.status === 'completed' ? 'bg-green-600 text-white' :
                        viewMission.status === 'delivered' ? 'bg-teal-600 text-white' :
                        viewMission.status === 'items_purchased' ? 'bg-orange-600 text-white' :
                        viewMission.status === 'raised' ? 'bg-emerald-600 text-white' :
                        viewMission.status === 'posted' ? 'bg-purple-600 text-white' :
                        viewMission.status === 'accepted' ? 'bg-blue-600 text-white' :
                        viewMission.status === 'before_the_board' ? 'bg-yellow-600 text-black' :
                        'bg-gray-600 text-white'
                      }`}>
                        {viewMission.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Received'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date Submitted:</span>
                      <span className="text-white">{viewMission.dateSubmitted ? new Date(viewMission.dateSubmitted).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Financial Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount Requested:</span>
                      <span className="text-white">${viewMission.amount?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount Raised:</span>
                      <span className="text-green-400">${viewMission.amountRaised?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Progress:</span>
                      <span className="text-yellow-400">
                        {viewMission.amountRaised && viewMission.amount ? 
                          Math.round((viewMission.amountRaised / viewMission.amount) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${viewMission.amountRaised && viewMission.amount ? 
                            Math.min((viewMission.amountRaised / viewMission.amount) * 100, 100) : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Description */}
              {viewMission.description && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                  <p className="text-gray-300">{viewMission.description}</p>
                </div>
              )}

              {/* Mission Timeline */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Mission Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {viewMission.dateReceived && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date Received:</span>
                      <span className="text-white">{new Date(viewMission.dateReceived).toLocaleDateString()}</span>
                    </div>
                  )}
                  {viewMission.datePosted && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date Posted:</span>
                      <span className="text-white">{new Date(viewMission.datePosted).toLocaleDateString()}</span>
                    </div>
                  )}
                  {viewMission.dateGoalCompleted && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Goal Completed:</span>
                      <span className="text-white">{new Date(viewMission.dateGoalCompleted).toLocaleDateString()}</span>
                    </div>
                  )}
                  {viewMission.datePurchased && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Items Purchased:</span>
                      <span className="text-white">{new Date(viewMission.datePurchased).toLocaleDateString()}</span>
                    </div>
                  )}
                  {viewMission.dateDelivered && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Items Delivered:</span>
                      <span className="text-white">{new Date(viewMission.dateDelivered).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              {(viewMission.email || viewMission.phone || viewMission.address) && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {viewMission.email && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white">{viewMission.email}</span>
                      </div>
                    )}
                    {viewMission.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phone:</span>
                        <span className="text-white">{viewMission.phone}</span>
                      </div>
                    )}
                    {viewMission.address && (
                      <div className="col-span-full flex justify-between">
                        <span className="text-gray-400">Address:</span>
                        <span className="text-white">{viewMission.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowViewMission(false);
                    setViewMission(null);
                    setSelectedMission(viewMission);
                    setShowMissionCard(true);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  📝 Edit Mission
                </button>
                <button
                  onClick={() => {
                    setShowViewMission(false);
                    setViewMission(null);
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;

/* Force deployment Fri Aug  8 03:54:06 EDT 2025 */
