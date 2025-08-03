import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const ChapterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [chapterData, setChapterData] = useState({
    name: 'Springfield Chapter',
    location: 'Springfield, IL',
    memberCount: 45,
    activeMissions: 3,
    totalRaised: 12500,
    established: 'March 2023'
  });

  // Check authentication status on component mount
  useEffect(() => {
    // In a real app, this would check for valid chapter JWT token or session
    const chapterToken = localStorage.getItem('chapterToken');
    if (chapterToken) {
      setIsAuthenticated(true);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        redirectToMembership={authMode === 'register'}
      />

      {/* Show loading or sign in prompt if not authenticated */}
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Chapter Dashboard</h2>
            <p className="text-gray-400 mb-8">Please sign in to access your chapter dashboard</p>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setAuthMode('signin')
                  setShowAuthModal(true)
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Chapter Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('register')
                  setShowAuthModal(true)
                }}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Register Chapter
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Chapter leaders and coordinators only.
            </p>
          </div>
        </div>
      ) : (
        /* Main Dashboard Content - Only shown when authenticated */
        <div className="bg-black py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Chapter Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{chapterData.name}</h1>
                  <p className="text-gray-400">{chapterData.location} • Established {chapterData.established}</p>
                </div>
                <div className="mt-4 md:mt-0 bg-yellow-900 border-2 border-yellow-500 rounded-lg p-4 text-center">
                  <div className="text-sm text-yellow-400 font-medium">Chapter Status</div>
                  <div className="text-xl font-bold text-yellow-400">Active</div>
                  <div className="text-gray-300 text-sm">{chapterData.memberCount} Members</div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-blue-400">{chapterData.memberCount}</div>
                <div className="text-gray-400">Chapter Members</div>
                <div className="text-sm text-gray-500">Active Participants</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-green-400">${chapterData.totalRaised.toLocaleString()}</div>
                <div className="text-gray-400">Total Raised</div>
                <div className="text-sm text-gray-500">This Year</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-yellow-400">{chapterData.activeMissions}</div>
                <div className="text-gray-400">Active Missions</div>
                <div className="text-sm text-gray-500">In Progress</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-purple-400">12</div>
                <div className="text-gray-400">Completed Missions</div>
                <div className="text-sm text-gray-500">This Year</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-yellow-500 text-yellow-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('members')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'members'
                        ? 'border-yellow-500 text-yellow-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Members
                  </button>
                  <button
                    onClick={() => setActiveTab('missions')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'missions'
                        ? 'border-yellow-500 text-yellow-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Missions
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'events'
                        ? 'border-yellow-500 text-yellow-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Events
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'settings'
                        ? 'border-yellow-500 text-yellow-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Settings
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Chapter Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Holiday Food Drive</p>
                        <p className="text-gray-400 text-sm">Raised $2,500 • December 15, 2024</p>
                      </div>
                      <div className="text-green-400 font-medium">Completed</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="text-white font-medium">New Member Orientation</p>
                        <p className="text-gray-400 text-sm">8 new members joined • December 10, 2024</p>
                      </div>
                      <div className="text-blue-400 font-medium">Event</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Winter Coat Collection</p>
                        <p className="text-gray-400 text-sm">150 coats collected • December 5, 2024</p>
                      </div>
                      <div className="text-green-400 font-medium">Completed</div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Upcoming Chapter Events</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">Monthly Chapter Meeting</h4>
                        <span className="text-yellow-400 text-xs font-medium bg-yellow-900 px-2 py-1 rounded">UPCOMING</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Plan upcoming missions and review chapter progress.</p>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 font-medium">January 15, 2025 • 7:00 PM</span>
                        <button className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium hover:bg-yellow-400 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">Community Outreach Day</h4>
                        <span className="text-blue-400 text-xs font-medium bg-blue-900 px-2 py-1 rounded">PLANNING</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Volunteer at local shelters and food banks.</p>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 font-medium">January 25, 2025 • 9:00 AM</span>
                        <button className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium hover:bg-yellow-400 transition-colors">
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Chapter Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample member cards */}
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                        JD
                      </div>
                      <div>
                        <div className="font-semibold text-white">John Doe</div>
                        <div className="text-gray-400 text-sm">Chapter Leader</div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm">
                      <div>Joined: March 2023</div>
                      <div>Missions: 15 completed</div>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        SM
                      </div>
                      <div>
                        <div className="font-semibold text-white">Sarah Martinez</div>
                        <div className="text-gray-400 text-sm">Coordinator</div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm">
                      <div>Joined: April 2023</div>
                      <div>Missions: 12 completed</div>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        MC
                      </div>
                      <div>
                        <div className="font-semibold text-white">Mike Chen</div>
                        <div className="text-gray-400 text-sm">Volunteer</div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm">
                      <div>Joined: June 2023</div>
                      <div>Missions: 8 completed</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chapter Information */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Chapter Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Chapter Name</label>
                      <input 
                        type="text" 
                        value={chapterData.name}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Location</label>
                      <input 
                        type="text" 
                        value={chapterData.location}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Established</label>
                      <input 
                        type="text" 
                        value={chapterData.established}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                        readOnly
                      />
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                      Edit Chapter Information
                    </button>
                  </div>
                </div>

                {/* Chapter Settings */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">Chapter Settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Public Chapter Profile</p>
                        <p className="text-gray-400 text-sm">Show chapter on public directory</p>
                      </div>
                      <div className="w-12 h-6 bg-yellow-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Member Notifications</p>
                        <p className="text-gray-400 text-sm">Send updates to chapter members</p>
                      </div>
                      <div className="w-12 h-6 bg-yellow-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Auto-approve Members</p>
                        <p className="text-gray-400 text-sm">Automatically approve new member requests</p>
                      </div>
                      <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ChapterDashboard;

