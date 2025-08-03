import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import notificationService from '../utils/notificationService';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('all');

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

          {/* Stats Grid - Clickable Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <button 
              onClick={() => {
                setActiveSection('requests');
                setActiveTab('pending');
                setSearchTerm('');
              }}
              className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer group"
            >
              <div className="text-sm text-gray-400 mb-1 group-hover:text-gray-300">Pending Requests</div>
              <div className="text-2xl font-bold text-yellow-400 group-hover:text-yellow-300">{requests.filter(r => r.status === 'pending').length}</div>
            </button>
            <button 
              onClick={() => {
                setActiveSection('members');
                setSearchTerm('');
              }}
              className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer group"
            >
              <div className="text-sm text-gray-400 mb-1 group-hover:text-gray-300">New Members</div>
              <div className="text-2xl font-bold text-green-400 group-hover:text-green-300">3</div>
            </button>
            <button 
              onClick={() => {
                setActiveSection('chapters');
                setSearchTerm('');
              }}
              className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer group"
            >
              <div className="text-sm text-gray-400 mb-1 group-hover:text-gray-300">New Chapters</div>
              <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300">2</div>
            </button>
            <button 
              onClick={() => {
                setActiveSection('alerts');
                setSearchTerm('');
                // Scroll to birthdays section when implemented
              }}
              className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer group"
            >
              <div className="text-sm text-gray-400 mb-1 group-hover:text-gray-300">🎂 Birthdays</div>
              <div className="text-2xl font-bold text-pink-400 group-hover:text-pink-300">2</div>
            </button>
            <button 
              onClick={() => {
                setActiveSection('alerts');
                setSearchTerm('');
                // Scroll to anniversaries section when implemented
              }}
              className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer group"
            >
              <div className="text-sm text-gray-400 mb-1 group-hover:text-gray-300">🎉 Anniversaries</div>
              <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300">1</div>
            </button>
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

          {/* Other sections placeholder */}
          {activeSection !== 'requests' && (
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
      <div className="bg-yellow-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Kind Squad® Impact Dashboard</h2>
          <p className="text-black mb-8">Building humanity through kindness - Real-time organizational metrics</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-yellow-600 rounded-lg p-6 text-black">
              <div className="text-3xl font-bold mb-2">$127,450</div>
              <div className="text-sm font-medium">Total Raised</div>
              <div className="text-xs opacity-75">This Year</div>
            </div>
            <div className="bg-yellow-600 rounded-lg p-6 text-black">
              <div className="text-3xl font-bold mb-2">89</div>
              <div className="text-sm font-medium">Total Missions</div>
              <div className="text-xs opacity-75">Completed</div>
            </div>
            <div className="bg-yellow-600 rounded-lg p-6 text-black">
              <div className="text-3xl font-bold mb-2">342</div>
              <div className="text-sm font-medium">People Helped</div>
              <div className="text-xs opacity-75">Lives Changed</div>
            </div>
            <div className="bg-yellow-600 rounded-lg p-6 text-black">
              <div className="text-3xl font-bold mb-2">156</div>
              <div className="text-sm font-medium">Active Members</div>
              <div className="text-xs opacity-75">Growing Daily</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

