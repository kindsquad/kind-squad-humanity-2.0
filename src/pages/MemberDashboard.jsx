import React, { useState } from 'react'
import Navigation from '../components/Navigation'

export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentTier, setCurrentTier] = useState('Ambassador') // This would come from user data
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const tierInfo = {
    'Supporter': {
      name: 'Supporter',
      price: 'Free',
      color: 'text-gray-400',
      bgColor: 'bg-gray-700',
      borderColor: 'border-gray-600'
    },
    'Ambassador': {
      name: 'Ambassador',
      price: '$5/month',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900',
      borderColor: 'border-blue-500'
    },
    'Champion': {
      name: 'Champion',
      price: '$25/month',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900',
      borderColor: 'border-yellow-500'
    }
  }

  const handleUpgrade = (newTier) => {
    console.log(`Upgrading to ${newTier}`)
    // Payment integration would go here
    alert(`Thank you for upgrading to ${newTier}! Payment integration would be implemented here.`)
    setShowUpgradeModal(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Sarah</h1>
                <p className="text-gray-400">Thank you for being part of Humanity 2.0 since March 2021</p>
              </div>
              <div className={`mt-4 md:mt-0 ${tierInfo[currentTier].bgColor} ${tierInfo[currentTier].borderColor} border-2 rounded-lg p-4 text-center`}>
                <div className={`text-sm ${tierInfo[currentTier].color} font-medium`}>Current Membership</div>
                <div className={`text-xl font-bold ${tierInfo[currentTier].color}`}>{tierInfo[currentTier].name}</div>
                <div className="text-gray-300 text-sm">{tierInfo[currentTier].price}</div>
                {currentTier !== 'Champion' && (
                  <button 
                    onClick={() => setShowUpgradeModal(true)}
                    className="mt-2 bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium hover:bg-yellow-400 transition-colors"
                  >
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-2xl font-bold text-yellow-400">12</div>
              <div className="text-gray-400">Total Donations</div>
              <div className="text-sm text-gray-500">This Year</div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-2xl font-bold text-green-400">$2,850</div>
              <div className="text-gray-400">Total Donated</div>
              <div className="text-sm text-gray-500">Lifetime</div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-2xl font-bold text-blue-400">45</div>
              <div className="text-gray-400">Hours Volunteered</div>
              <div className="text-sm text-gray-500">This Year</div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-2xl font-bold text-purple-400">8</div>
              <div className="text-gray-400">Lives Impacted</div>
              <div className="text-sm text-gray-500">Direct Impact</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-800">
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
                  onClick={() => setActiveTab('missions')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'missions'
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  My Missions
                </button>
                <button
                  onClick={() => setActiveTab('impact')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'impact'
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Impact Report
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Account Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Food Drive Mission</p>
                      <p className="text-gray-400 text-sm">Donated $150 • July 25, 2024</p>
                    </div>
                    <div className="text-green-400 font-medium">Completed</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Veteran Support</p>
                      <p className="text-gray-400 text-sm">Volunteered 8 hours • July 20, 2024</p>
                    </div>
                    <div className="text-green-400 font-medium">Completed</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Water Bottle Drive</p>
                      <p className="text-gray-400 text-sm">Donated supplies • April 28, 2024</p>
                    </div>
                    <div className="text-green-400 font-medium">Completed</div>
                  </div>
                </div>
              </div>

              {/* Upcoming Missions */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Available Missions</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">Emergency Shelter Support</h4>
                      <span className="text-red-400 text-xs font-medium bg-red-900 px-2 py-1 rounded">URGENT</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Help provide emergency shelter for families displaced by recent flooding.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-medium">Goal: $5,000</span>
                      <button className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium hover:bg-yellow-400 transition-colors">
                        Join Mission
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">School Supply Drive</h4>
                      <span className="text-blue-400 text-xs font-medium bg-blue-900 px-2 py-1 rounded">ACTIVE</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Collecting school supplies for underprivileged children in our community.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-medium">Goal: $2,500</span>
                      <button className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium hover:bg-yellow-400 transition-colors">
                        Join Mission
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Membership Management */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Membership Management</h3>
                <div className="space-y-6">
                  {/* Current Tier Display */}
                  <div className={`${tierInfo[currentTier].bgColor} ${tierInfo[currentTier].borderColor} border-2 rounded-lg p-4`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`text-lg font-bold ${tierInfo[currentTier].color}`}>{tierInfo[currentTier].name}</div>
                        <div className="text-gray-300">{tierInfo[currentTier].price}</div>
                        <div className="text-gray-400 text-sm mt-1">Member since March 2021</div>
                      </div>
                      <div className="text-right">
                        {currentTier !== 'Champion' && (
                          <button 
                            onClick={() => setShowUpgradeModal(true)}
                            className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition-colors"
                          >
                            Upgrade
                          </button>
                        )}
                        {currentTier === 'Champion' && (
                          <div className="text-yellow-400 font-medium">Highest Tier</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Membership Benefits */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Your Current Benefits</h4>
                    <div className="space-y-2">
                      {currentTier === 'Supporter' && (
                        <>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Access to public missions
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Monthly impact newsletter
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Community updates
                          </div>
                        </>
                      )}
                      {currentTier === 'Ambassador' && (
                        <>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            All Supporter benefits
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Private community access
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Priority mission notifications
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Exclusive member events
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Ambassador badge & recognition
                          </div>
                        </>
                      )}
                      {currentTier === 'Champion' && (
                        <>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            All Ambassador benefits
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Direct line to leadership team
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Quarterly strategy calls
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Mission proposal privileges
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✅</span>
                            Annual impact summit invitation
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Billing Information */}
                  {currentTier !== 'Supporter' && (
                    <div>
                      <h4 className="text-white font-medium mb-3">Billing Information</h4>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Next billing date:</span>
                          <span className="text-white">August 15, 2025</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Payment method:</span>
                          <span className="text-white">•••• •••• •••• 4242</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Amount:</span>
                          <span className="text-white">{tierInfo[currentTier].price}</span>
                        </div>
                      </div>
                      <div className="mt-3 space-x-3">
                        <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                          Update Payment Method
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          Cancel Membership
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                
                {/* Account Information */}
                <div className="mb-8">
                  <h4 className="text-white font-medium mb-4">Account Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value="sarah.martinez@email.com" 
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value="+1 (555) 123-4567" 
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                        readOnly
                      />
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                      Edit Account Information
                    </button>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h4 className="text-white font-medium mb-4">Notification Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Mission Alerts</p>
                        <p className="text-gray-400 text-sm">Get notified about new missions</p>
                      </div>
                      <div className="w-12 h-6 bg-yellow-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">SMS Updates</p>
                        <p className="text-gray-400 text-sm">Urgent mission updates via text</p>
                      </div>
                      <div className="w-12 h-6 bg-yellow-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Monthly Reports</p>
                        <p className="text-gray-400 text-sm">Your impact summary each month</p>
                      </div>
                      <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upgrade Modal */}
          {showUpgradeModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Upgrade Your Membership</h3>
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {currentTier === 'Supporter' && (
                    <>
                      {/* Ambassador Upgrade */}
                      <div className="bg-blue-900 border-2 border-blue-500 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-blue-400">Ambassador</h4>
                            <p className="text-gray-300">$5/month</p>
                          </div>
                          <button 
                            onClick={() => handleUpgrade('Ambassador')}
                            className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition-colors"
                          >
                            Upgrade to Ambassador
                          </button>
                        </div>
                        <div className="text-gray-300 text-sm space-y-1">
                          <div>✅ Private community access</div>
                          <div>✅ Priority mission notifications</div>
                          <div>✅ Exclusive member events</div>
                          <div>✅ Ambassador badge & recognition</div>
                        </div>
                      </div>

                      {/* Champion Upgrade */}
                      <div className="bg-yellow-900 border-2 border-yellow-500 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-yellow-400">Champion</h4>
                            <p className="text-gray-300">$25/month</p>
                          </div>
                          <button 
                            onClick={() => handleUpgrade('Champion')}
                            className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition-colors"
                          >
                            Upgrade to Champion
                          </button>
                        </div>
                        <div className="text-gray-300 text-sm space-y-1">
                          <div>✅ All Ambassador benefits</div>
                          <div>✅ Direct line to leadership team</div>
                          <div>✅ Quarterly strategy calls</div>
                          <div>✅ Mission proposal privileges</div>
                          <div>✅ Annual impact summit invitation</div>
                        </div>
                      </div>
                    </>
                  )}

                  {currentTier === 'Ambassador' && (
                    <div className="bg-yellow-900 border-2 border-yellow-500 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-yellow-400">Champion</h4>
                          <p className="text-gray-300">$25/month</p>
                        </div>
                        <button 
                          onClick={() => handleUpgrade('Champion')}
                          className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition-colors"
                        >
                          Upgrade to Champion
                        </button>
                      </div>
                      <div className="text-gray-300 text-sm space-y-1">
                        <div>✅ All Ambassador benefits</div>
                        <div>✅ Direct line to leadership team</div>
                        <div>✅ Quarterly strategy calls</div>
                        <div>✅ Mission proposal privileges</div>
                        <div>✅ Annual impact summit invitation</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

