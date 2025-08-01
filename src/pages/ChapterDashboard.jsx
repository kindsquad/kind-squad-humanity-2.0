import React from 'react'
import Navigation from '../components/Navigation'

export default function ChapterDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Navigation */}
      <Navigation currentPage="chapter" showTitle={true} title="Chapter Dashboard" />

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Western Mass Chapter</h1>
            <p className="text-gray-400">Managing local missions and community impact</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Chapter Members</h3>
              <p className="text-3xl font-bold text-white">247</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Active Missions</h3>
              <p className="text-3xl font-bold text-white">5</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Funds Raised</h3>
              <p className="text-3xl font-bold text-white">$12,450</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Lives Helped</h3>
              <p className="text-3xl font-bold text-white">89</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Local Missions */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6">Local Missions</h3>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">Springfield Family Fire Relief</h4>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">Emergency housing and supplies for family of 4</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">$2,100 / $3,000</span>
                    <button className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold text-sm">
                      Manage
                    </button>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">Holyoke School Supplies</h4>
                    <span className="text-blue-400 text-sm">Pending</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">Back-to-school supplies for 50 students</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">$0 / $1,500</span>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded font-semibold text-sm">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter Activity */}
            <div className="space-y-6">
              {/* Recent Members */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Recent Members</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">JD</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-gray-400 text-sm">Joined 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">SM</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Sarah Miller</p>
                      <p className="text-gray-400 text-sm">Joined 5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">MJ</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Mike Johnson</p>
                      <p className="text-gray-400 text-sm">Joined 1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-yellow-500 text-black px-4 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                    Create New Mission
                  </button>
                  <button className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                    Send Chapter Update
                  </button>
                  <button className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                    View All Members
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

