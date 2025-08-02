import React, { useState } from 'react'
import Navigation from '../components/Navigation'

export default function AdminDashboard() {
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const missionCategories = {
    'Emergency Relief': { count: 23, amount: 45600, color: 'bg-dark-blue', recent: 'House Fire Relief' },
    'Foster Kids': { count: 18, amount: 89400, color: 'bg-purple-500', recent: 'Art Kits Distribution' },
    'Community Support': { count: 35, amount: 52300, color: 'bg-green-500', recent: 'Veteran Support' },
    'Basic Needs': { count: 28, amount: 31200, color: 'bg-blue-500', recent: 'Groceries for Family' },
    'Healthcare': { count: 15, amount: 18900, color: 'bg-pink-500', recent: 'Medical Emergency Aid' },
    'Holiday Programs': { count: 12, amount: 67800, color: 'bg-orange-500', recent: 'Annual Toy Drive' },
    'Educational Support': { count: 8, amount: 12400, color: 'bg-indigo-500', recent: 'School Supplies' },
    'International Aid': { count: 4, amount: 8200, color: 'bg-teal-500', recent: 'Ukraine Support' }
  }

  const handleStateClick = (state) => {
    setSelectedState(state)
    // Future: Show state-specific data
  }

  const getCategoryStats = () => {
    if (selectedCategory === 'all') {
      return Object.values(missionCategories).reduce((acc, cat) => ({
        count: acc.count + cat.count,
        amount: acc.amount + cat.amount
      }), { count: 0, amount: 0 })
    }
    return missionCategories[selectedCategory] || { count: 0, amount: 0 }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Navigation */}
      <Navigation currentPage="admin" showTitle={true} title="Admin" />

      {/* Main Content */}
      <div className="p-6">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">TOTAL RAISED</h3>
            <p className="text-3xl font-bold text-white">$278,999</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">ACTIVE MISSIONS</h3>
            <p className="text-3xl font-bold text-white">3</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">PENDING MISSIONS</h3>
            <p className="text-3xl font-bold text-white">8</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">COMPLETED MISSIONS</h3>
            <p className="text-3xl font-bold text-white">127</p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* US Map */}
          <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">US Chapters Map</h3>
            <div className="bg-gray-800 rounded-lg p-4 h-80 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-400">Interactive US Map</p>
                <p className="text-sm text-gray-500 mt-2">Click states to view chapter details</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>Active Chapters</span>
                    <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Pending</span>
                    <span className="flex items-center"><span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>No Chapter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Performance */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">CHAPTER PERFORMANCE</h3>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium text-white">Western Mass</h4>
                    <p className="text-sm text-gray-400">Massachusetts, USA</p>
                  </div>
                  <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">5 Active Missions</span>
                  <button className="px-3 py-1 bg-yellow-500 text-black rounded text-sm font-medium hover:bg-yellow-400">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Categories Section */}
        <div className="mt-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Mission Categories</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                All Categories
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Object.entries(missionCategories).map(([category, data]) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`bg-gray-900 rounded-lg p-4 text-left hover:bg-gray-800 transition-colors border-2 ${
                  selectedCategory === category ? 'border-yellow-500' : 'border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-4 h-4 rounded-full ${data.color}`}></div>
                  <h3 className="font-medium text-white text-sm">{category}</h3>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-yellow-400">{data.count}</div>
                  <div className="text-sm text-gray-400">missions</div>
                  <div className="text-lg font-semibold text-white">${data.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">raised</div>
                </div>
              </button>
            ))}
          </div>

          {/* Category Details */}
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {selectedCategory === 'all' ? 'All Mission Categories' : selectedCategory}
              </h3>
              <div className="flex space-x-4 text-sm text-gray-400">
                <span>
                  <span className="text-yellow-400 font-bold">{getCategoryStats().count}</span> missions
                </span>
                <span>
                  <span className="text-yellow-400 font-bold">${getCategoryStats().amount.toLocaleString()}</span> raised
                </span>
              </div>
            </div>

            {selectedCategory !== 'all' && (
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Most Recent Mission</h4>
                    <p className="text-gray-400">{missionCategories[selectedCategory]?.recent}</p>
                  </div>
                  <button className="px-4 py-2 bg-yellow-500 text-black rounded font-medium hover:bg-yellow-400">
                    View Details
                  </button>
                </div>
              </div>
            )}

            {selectedCategory === 'all' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Top Categories by Count</h4>
                  <div className="space-y-2">
                    {Object.entries(missionCategories)
                      .sort(([,a], [,b]) => b.count - a.count)
                      .slice(0, 3)
                      .map(([category, data]) => (
                        <div key={category} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${data.color}`}></div>
                            <span className="text-sm text-gray-300">{category}</span>
                          </div>
                          <span className="text-yellow-400 font-medium">{data.count}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Top Categories by Amount</h4>
                  <div className="space-y-2">
                    {Object.entries(missionCategories)
                      .sort(([,a], [,b]) => b.amount - a.amount)
                      .slice(0, 3)
                      .map(([category, data]) => (
                        <div key={category} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${data.color}`}></div>
                            <span className="text-sm text-gray-300">{category}</span>
                          </div>
                          <span className="text-yellow-400 font-medium">${data.amount.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          {/* Mission Approval */}
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">MISSION APPROVAL</h3>
              <span className="text-sm text-gray-400">Queue: 8</span>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-white mb-1">House Fire Relief</h4>
                <p className="text-yellow-400 font-semibold mb-3">$1,200</p>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-yellow-500 text-black rounded text-sm font-medium hover:bg-yellow-400">
                    APPROVE
                  </button>
                  <button className="px-3 py-2 bg-gray-700 text-white rounded text-sm font-medium hover:bg-gray-600">
                    View
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-white mb-1">Veteran Support</h4>
                <p className="text-yellow-400 font-semibold mb-3">$850</p>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-yellow-500 text-black rounded text-sm font-medium hover:bg-yellow-400">
                    APPROVE
                  </button>
                  <button className="px-3 py-2 bg-gray-700 text-white rounded text-sm font-medium hover:bg-gray-600">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">RECENT ACTIVITY</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                  <p className="text-sm text-white">Max B. joined Western Mass</p>
                  <p className="text-xs text-gray-400">5m ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div>
                  <p className="text-sm text-white">Sarah K. joined Boston Chapter</p>
                  <p className="text-xs text-gray-400">45m ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                  <p className="text-sm text-white">Mike R. joined Western Mass</p>
                  <p className="text-xs text-gray-400">1h ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">RECENT DONATIONS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Jennifer L.</p>
                  <p className="text-xs text-gray-400">House Fire Relief</p>
                </div>
                <span className="text-yellow-400 font-semibold">$250</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">David M.</p>
                  <p className="text-xs text-gray-400">Veteran Support</p>
                </div>
                <span className="text-yellow-400 font-semibold">$100</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Lisa P.</p>
                  <p className="text-xs text-gray-400">Utilities Assistance</p>
                </div>
                <span className="text-yellow-400 font-semibold">$75</span>
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">PUSH NOTIFICATIONS</h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 bg-yellow-500 text-black rounded font-medium hover:bg-yellow-400">
                Send SMS Alert
              </button>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-500">
                Send Email Update
              </button>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Recent Messages</h4>
                <div className="space-y-2">
                  <div className="text-xs text-gray-300">
                    <span className="text-yellow-400">SMS:</span> Mission alert sent to 2,600 members
                  </div>
                  <div className="text-xs text-gray-300">
                    <span className="text-blue-400">Email:</span> Weekly update sent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

