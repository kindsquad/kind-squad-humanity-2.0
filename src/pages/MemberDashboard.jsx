import React, { useState } from 'react'
import Navigation from '../components/Navigation'

export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Navigation */}
      <Navigation currentPage="member" showTitle={true} title="Member Dashboard" />

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Sarah</h1>
            <p className="text-gray-400">Thank you for being part of Humanity 2.0 since March 2021</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Donated</h3>
              <p className="text-3xl font-bold text-white">$2,847</p>
              <p className="text-green-400 text-sm mt-1">+$150 this month</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Missions Supported</h3>
              <p className="text-3xl font-bold text-white">23</p>
              <p className="text-blue-400 text-sm mt-1">2 active missions</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Lives Touched</h3>
              <p className="text-3xl font-bold text-white">127</p>
              <p className="text-yellow-400 text-sm mt-1">Across 5 states</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Tax Savings</h3>
              <p className="text-3xl font-bold text-white">$854</p>
              <p className="text-purple-400 text-sm mt-1">2024 deduction</p>
            </div>
          </div>

          {/* Tab Navigation */}
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
                  onClick={() => setActiveTab('history')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Donation History
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
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Donations */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Recent Donations</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <div>
                      <p className="text-white font-medium">House Fire Relief</p>
                      <p className="text-gray-400 text-sm">July 27, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">$150</p>
                      <p className="text-yellow-400 text-sm">Active</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <div>
                      <p className="text-white font-medium">Veteran Support</p>
                      <p className="text-gray-400 text-sm">June 30, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">$100</p>
                      <p className="text-green-400 text-sm">Completed</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <div>
                      <p className="text-white font-medium">Water Bill Assistance</p>
                      <p className="text-gray-400 text-sm">April 29, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">$75</p>
                      <p className="text-green-400 text-sm">Completed</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Make a Donation
                </button>
              </div>

              {/* Active Missions & Recurring */}
              <div className="space-y-6">
                {/* Active Missions */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Active Missions</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">House Fire Relief</h4>
                        <span className="text-yellow-400 text-sm">$645 / $1,200</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '54%'}}></div>
                      </div>
                      <p className="text-gray-400 text-sm">54% funded • 3 days left</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">Veteran Support</h4>
                        <span className="text-yellow-400 text-sm">$522 / $850</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '61%'}}></div>
                      </div>
                      <p className="text-gray-400 text-sm">61% funded • 7 days left</p>
                    </div>
                  </div>
                </div>

                {/* Recurring Donations */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Recurring Donations</h3>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">Active</span>
                      <div className="w-12 h-6 bg-yellow-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Emergency Relief Fund</span>
                      <span className="text-yellow-400 font-bold">$50/month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Foster Kids Program</span>
                      <span className="text-yellow-400 font-bold">$25/month</span>
                    </div>
                  </div>
                  <button className="mt-4 text-yellow-400 hover:text-yellow-300 transition-colors">
                    Manage Recurring Donations →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Complete Donation History</h3>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Download 2024 Tax Receipt
                </button>
              </div>
              
              <div className="space-y-4">
                {/* 2025 Donations */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">2025 Donations ($425 total)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white font-medium">House Fire Relief</p>
                        <p className="text-gray-400 text-sm">July 27, 2025 • Family of 4</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$150</p>
                        <p className="text-yellow-400 text-sm">Active</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white font-medium">Veteran Support</p>
                        <p className="text-gray-400 text-sm">June 30, 2025 • Military family</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$100</p>
                        <p className="text-green-400 text-sm">Completed</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white font-medium">Water Bill Assistance</p>
                        <p className="text-gray-400 text-sm">April 29, 2025 • Single mother</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$75</p>
                        <p className="text-green-400 text-sm">Completed</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white font-medium">LA Fires Emergency Aid</p>
                        <p className="text-gray-400 text-sm">January 20, 2025 • Disaster relief</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$100</p>
                        <p className="text-green-400 text-sm">Completed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2024 Donations */}
                <div className="pt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">2024 Donations ($1,850 total)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white font-medium">Annual Toy Drive</p>
                        <p className="text-gray-400 text-sm">December 23, 2024 • 2,000 children</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$500</p>
                        <p className="text-green-400 text-sm">Completed</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white font-medium">Thanksgiving Meals</p>
                        <p className="text-gray-400 text-sm">November 24, 2024 • 14 families</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$200</p>
                        <p className="text-green-400 text-sm">Completed</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-800">
                      <div>
                        <p className="text-white font-medium">Art Kits for Foster Kids</p>
                        <p className="text-gray-400 text-sm">August 15, 2024 • 300 children</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$250</p>
                        <p className="text-green-400 text-sm">Completed</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 text-yellow-400 hover:text-yellow-300 transition-colors">
                    View All 2024 Donations (18 total) →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Impact Summary */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Your Impact Since 2021</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-yellow-400 mb-2">127</p>
                    <p className="text-gray-400">Lives Directly Touched</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">23</p>
                      <p className="text-gray-400 text-sm">Missions Supported</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">5</p>
                      <p className="text-gray-400 text-sm">States Reached</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Emergency Relief</span>
                      <span className="text-white">$1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Foster Kids Support</span>
                      <span className="text-white">$650</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Community Aid</span>
                      <span className="text-white">$997</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Categories */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Mission Categories</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-dark-blue rounded mr-3"></div>
                      <span className="text-white">Emergency Relief</span>
                    </div>
                    <span className="text-gray-400">8 missions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                      <span className="text-white">Foster Kids</span>
                    </div>
                    <span className="text-gray-400">5 missions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                      <span className="text-white">Community Support</span>
                    </div>
                    <span className="text-gray-400">6 missions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                      <span className="text-white">Healthcare</span>
                    </div>
                    <span className="text-gray-400">4 missions</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Most Recent Impact</h4>
                  <p className="text-gray-400 text-sm">Your $150 donation to House Fire Relief helped provide emergency shelter and clothing for a family of 4 who lost everything in a house fire.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Settings */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value="sarah.k@email.com" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value="+1 (555) 123-4567" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Chapter</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                      <option>Western Mass</option>
                      <option>Boston</option>
                      <option>Springfield</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
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
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">Tax Receipts</p>
                      <p className="text-gray-400 text-sm">Annual tax documents</p>
                    </div>
                    <div className="w-12 h-6 bg-yellow-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

