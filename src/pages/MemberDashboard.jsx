import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTier, setCurrentTier] = useState('Friend'); // Member, Friend, Family
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Tier information
  const tierInfo = {
    Member: {
      name: 'Kind Squad Community',
      price: 'Free',
      color: 'text-blue-400',
      bgColor: 'bg-gray-900',
      borderColor: 'border-blue-500',
      benefits: [
        'SMS/push alerts for new missions',
        'Access to mission updates',
        'Community features on kindsquad.org'
      ]
    },
    Friend: {
      name: 'Kind Squad Friend',
      price: '$5/month',
      color: 'text-pink-400',
      bgColor: 'bg-gray-900',
      borderColor: 'border-pink-500',
      benefits: [
        'Everything in Kind Squad Community',
        'Annual exclusive Kind Squad sticker pack',
        '15% discount on all merchandise',
        'Friend badge on your profile'
      ]
    },
    Family: {
      name: 'Kind Squad Family',
      price: '$10/month',
      color: 'text-purple-400',
      bgColor: 'bg-gray-900',
      borderColor: 'border-purple-500',
      benefits: [
        'Everything in Kind Squad Friend',
        'Annual exclusive Kind Squad mug',
        '20% discount + FREE SHIPPING on merchandise',
        'Recognition on "Family Wall"',
        'Monthly Member Spotlight eligibility'
      ]
    }
  };

  const handleUpgrade = (newTier) => {
    setCurrentTier(newTier);
    setShowUpgradeModal(false);
    // Here you would integrate with your payment system
    alert(`Successfully upgraded to ${tierInfo[newTier].name}!`);
  };

  const handleDowngrade = (newTier) => {
    setCurrentTier(newTier);
    setShowDowngradeModal(false);
    alert(`Downgraded to ${tierInfo[newTier].name}. Changes will take effect at your next billing cycle.`);
  };

  const handleCancelMembership = () => {
    setCurrentTier('Member');
    setShowCancelModal(false);
    alert('Your membership has been cancelled. You will retain access until your next billing date.');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Sarah!</h1>
              <p className="text-gray-400">
                You're a <span className={tierInfo[currentTier].color}>{tierInfo[currentTier].name}</span> member
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">$1,250</div>
                <div className="text-gray-400 text-sm">Total Impact</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-2xl font-bold text-yellow-400">12</div>
              <div className="text-gray-400">Missions Joined</div>
              <div className="text-sm text-gray-500">This Year</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-2xl font-bold text-green-400">$1,250</div>
              <div className="text-gray-400">Total Donated</div>
              <div className="text-sm text-gray-500">Lifetime</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-2xl font-bold text-blue-400">45</div>
              <div className="text-gray-400">Hours Volunteered</div>
              <div className="text-sm text-gray-500">This Year</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-2xl font-bold text-purple-400">8</div>
              <div className="text-gray-400">Lives Impacted</div>
              <div className="text-sm text-gray-500">Direct Impact</div>
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
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Food Drive Mission</p>
                      <p className="text-gray-400 text-sm">Donated $150 • July 25, 2024</p>
                    </div>
                    <div className="text-green-400 font-medium">Completed</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Veteran Support</p>
                      <p className="text-gray-400 text-sm">Volunteered 8 hours • July 20, 2024</p>
                    </div>
                    <div className="text-green-400 font-medium">Completed</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Water Bottle Drive</p>
                      <p className="text-gray-400 text-sm">Donated supplies • April 28, 2024</p>
                    </div>
                    <div className="text-green-400 font-medium">Completed</div>
                  </div>
                </div>
              </div>

              {/* Available Missions */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Available Missions</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-yellow-500">
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
                  <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-blue-500">
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
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
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
                      <div className="text-right space-y-2">
                        {currentTier !== 'Family' && (
                          <button 
                            onClick={() => setShowUpgradeModal(true)}
                            className="block bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition-colors"
                          >
                            Upgrade
                          </button>
                        )}
                        {currentTier !== 'Member' && (
                          <button 
                            onClick={() => setShowDowngradeModal(true)}
                            className="block bg-gray-600 text-white px-4 py-2 rounded font-medium hover:bg-gray-500 transition-colors"
                          >
                            Downgrade
                          </button>
                        )}
                        {currentTier === 'Family' && (
                          <div className="text-yellow-400 font-medium">Highest Tier</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Membership Benefits */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Your Current Benefits</h4>
                    <div className="space-y-2">
                      {tierInfo[currentTier].benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300">
                          <span className="text-green-400">✅</span>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Billing Information */}
                  {currentTier !== 'Member' && (
                    <div>
                      <h4 className="text-white font-medium mb-3">Billing Information</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
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
                        <button 
                          onClick={() => setShowCancelModal(true)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Cancel Membership
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
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
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value="+1 (555) 123-4567" 
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
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
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Upgrade Your Membership</h3>
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  {currentTier === 'Member' && (
                    <>
                      {/* Friend Upgrade */}
                      <div className="bg-blue-900 border-2 border-blue-500 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-blue-400">Kind Squad® Friend</h4>
                            <p className="text-gray-300">$5/month</p>
                          </div>
                          <button 
                            onClick={() => handleUpgrade('Friend')}
                            className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition-colors"
                          >
                            Upgrade to Friend
                          </button>
                        </div>
                        <div className="text-gray-300 text-sm space-y-1">
                          {tierInfo.Friend.benefits.map((benefit, index) => (
                            <div key={index}>✅ {benefit}</div>
                          ))}
                        </div>
                      </div>

                      {/* Family Upgrade */}
                      <div className="bg-yellow-900 border-2 border-yellow-500 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-yellow-400">Kind Squad® Family</h4>
                            <p className="text-gray-300">$10/month</p>
                          </div>
                          <button 
                            onClick={() => handleUpgrade('Family')}
                            className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition-colors"
                          >
                            Upgrade to Family
                          </button>
                        </div>
                        <div className="text-gray-300 text-sm space-y-1">
                          {tierInfo.Family.benefits.map((benefit, index) => (
                            <div key={index}>✅ {benefit}</div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {currentTier === 'Friend' && (
                    <div className="bg-yellow-900 border-2 border-yellow-500 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-yellow-400">Kind Squad® Family</h4>
                          <p className="text-gray-300">$10/month</p>
                        </div>
                        <button 
                          onClick={() => handleUpgrade('Family')}
                          className="bg-yellow-500 text-black px-4 py-2 rounded font-medium hover:bg-yellow-400 transition-colors"
                        >
                          Upgrade to Family
                        </button>
                      </div>
                      <div className="text-gray-300 text-sm space-y-1">
                        {tierInfo.Family.benefits.map((benefit, index) => (
                          <div key={index}>✅ {benefit}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Downgrade Modal */}
          {showDowngradeModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Downgrade Membership</h3>
                  <button 
                    onClick={() => setShowDowngradeModal(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 mb-4">
                    Are you sure you want to downgrade your membership? You'll lose access to:
                  </p>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-red-400 text-sm space-y-1">
                      {currentTier === 'Family' && (
                        <>
                          <div>❌ Recognition on "Family Wall"</div>
                          <div>❌ Monthly Member Spotlight eligibility</div>
                          <div>❌ Annual exclusive Kind Squad mug</div>
                          <div>❌ 20% discount + FREE SHIPPING on merchandise</div>
                        </>
                      )}
                      {(currentTier === 'Family' || currentTier === 'Friend') && (
                        <>
                          <div>❌ Annual exclusive Kind Squad sticker pack</div>
                          <div>❌ 15% discount on all merchandise</div>
                          <div>❌ Friend badge on your profile</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentTier === 'Family' && (
                    <button 
                      onClick={() => handleDowngrade('Friend')}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-500 transition-colors"
                    >
                      Downgrade to Kind Squad Friend ($5/month)
                    </button>
                  )}
                  <button 
                    onClick={() => handleDowngrade('Member')}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded font-medium hover:bg-gray-500 transition-colors"
                  >
                    Downgrade to Kind Squad (Free)
                  </button>
                  <button 
                    onClick={() => setShowDowngradeModal(false)}
                    className="w-full bg-transparent border border-gray-600 text-gray-300 px-4 py-2 rounded font-medium hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cancel Membership Modal */}
          {showCancelModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Cancel Membership</h3>
                  <button 
                    onClick={() => setShowCancelModal(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 mb-4">
                    We're sorry to see you go! Your membership will remain active until your next billing date.
                  </p>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-yellow-400 text-sm">
                      <div>📅 Active until: August 15, 2025</div>
                      <div>💰 No refund for current period</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleCancelMembership}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-500 transition-colors"
                  >
                    Confirm Cancellation
                  </button>
                  <button 
                    onClick={() => setShowCancelModal(false)}
                    className="w-full bg-transparent border border-gray-600 text-gray-300 px-4 py-2 rounded font-medium hover:bg-gray-700 transition-colors"
                  >
                    Keep My Membership
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MemberDashboard;

