import React, { useState } from 'react'
import Navigation from '../components/Navigation'

export default function AllMissions() {
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // All missions data from spreadsheet in chronological order (newest first)
  const allMissions = [
    // 2025 Missions
    { title: "House Fire Relief", amount: 645, date: "Jul 27, 2025", people: 4, status: "active", category: "Emergency Relief", year: 2025 },
    { title: "House Fire Emergency", amount: 1502, date: "Jun 30, 2025", people: 5, status: "completed", category: "Emergency Relief", year: 2025 },
    { title: "Veteran Support", amount: 522, date: "May 14, 2025", people: 1, status: "completed", category: "Community Support", year: 2025 },
    { title: "Water Bill Assistance", amount: 691, date: "Apr 29, 2025", people: 1, status: "completed", category: "Basic Needs", year: 2025 },
    { title: "Day Trip for Special Needs", amount: 1194, date: "Apr 6, 2025", people: 12, status: "completed", category: "Community Support", year: 2025 },
    { title: "Groceries Support", amount: 304, date: "Mar 23, 2025", people: 4, status: "completed", category: "Basic Needs", year: 2025 },
    { title: "Utilities Assistance", amount: 718, date: "Mar 15, 2025", people: 1, status: "completed", category: "Basic Needs", year: 2025 },
    { title: "Critical Care with Rent", amount: 1231, date: "Feb 3, 2025", people: 3, status: "completed", category: "Healthcare", year: 2025 },
    { title: "Mom & Son (DV Case)", amount: 372, date: "Feb 2, 2025", people: 2, status: "completed", category: "Healthcare", year: 2025 },
    { title: "Heaters/Propane - Asheville, NC", amount: 616, date: "Jan 25, 2025", people: 8, status: "completed", category: "Emergency Relief", year: 2025 },
    { title: "LA Fires Emergency Aid", amount: 2091, date: "Jan 20, 2025", people: 25, status: "completed", category: "Emergency Relief", year: 2025 },

    // 2024 Missions
    { title: "Annual Toy Drive", amount: 46599, date: "Dec 23, 2024", people: 1500, status: "completed", category: "Holiday Programs", year: 2024 },
    { title: "Comedy Show Fundraiser", amount: 3475, date: "Nov 30, 2024", people: 50, status: "completed", category: "Community Support", year: 2024 },
    { title: "Toy Drive", amount: 2608, date: "Nov 29, 2024", people: 1500, status: "completed", category: "Holiday Programs", year: 2024 },
    { title: "Thanksgiving Meals", amount: 1887, date: "Nov 24, 2024", people: 18, status: "completed", category: "Holiday Programs", year: 2024 },
    { title: "In honor of Kristina (TJO)", amount: 558, date: "Nov 21, 2024", people: 1, status: "completed", category: "Community Support", year: 2024 },
    { title: "Trees of Hope Mission", amount: 689, date: "Oct 31, 2024", people: 1, status: "completed", category: "Community Support", year: 2024 },
    { title: "Travel Expenses Mission", amount: 507, date: "Oct 14, 2024", people: 1, status: "completed", category: "Community Support", year: 2024 },
    { title: "Westfield Homeless Cat Project", amount: 1091, date: "Sep 25, 2024", people: 1, status: "completed", category: "Community Support", year: 2024 },
    { title: "Mom Shoes/Groceries", amount: 120, date: "Sep 5, 2024", people: 2, status: "completed", category: "Basic Needs", year: 2024 },
    { title: "Doggie Food Support", amount: 88, date: "Sep 3, 2024", people: 1, status: "completed", category: "Community Support", year: 2024 },
    { title: "Army Guy Support", amount: 967, date: "Aug 27, 2024", people: 3, status: "completed", category: "Community Support", year: 2024 },
    { title: "Art Kits for Foster Kids", amount: 15368, date: "Aug 15, 2024", people: 300, status: "completed", category: "Foster Kids", year: 2024 },
    { title: "Bad Accident Mission", amount: 1056, date: "Aug 11, 2024", people: 1, status: "completed", category: "Healthcare", year: 2024 },
    { title: "Backpacks for Foster Kids", amount: 0, date: "Jul 13, 2024", people: 14, status: "completed", category: "Foster Kids", year: 2024 },
    { title: "Hip Replacement Aid", amount: 98, date: "Jul 7, 2024", people: 1, status: "completed", category: "Healthcare", year: 2024 },
    { title: "Italian Guy Support", amount: 412, date: "Jun 25, 2024", people: 1, status: "completed", category: "Healthcare", year: 2024 },
    { title: "Groceries for Family of 5", amount: 576, date: "Jun 10, 2024", people: 5, status: "completed", category: "Basic Needs", year: 2024 },
    { title: "Groceries for Family", amount: 532, date: "Jun 5, 2024", people: 4, status: "completed", category: "Basic Needs", year: 2024 },
    { title: "Essentials for Elderly Woman", amount: 384, date: "May 23, 2024", people: 1, status: "completed", category: "Community Support", year: 2024 },
    { title: "Veteran & Family", amount: 292, date: "May 12, 2024", people: 3, status: "completed", category: "Community Support", year: 2024 },
    { title: "DV Situation Support", amount: 508, date: "May 3, 2024", people: 3, status: "completed", category: "Healthcare", year: 2024 },
    { title: "Flowers for Foster Moms", amount: 845, date: "May 1, 2024", people: 35, status: "completed", category: "Foster Kids", year: 2024 },
    { title: "Rent for Mom", amount: 875, date: "Apr 3, 2024", people: 2, status: "completed", category: "Basic Needs", year: 2024 },
    { title: "New Family Support", amount: 500, date: "Mar 31, 2024", people: 5, status: "completed", category: "Community Support", year: 2024 },
    { title: "Hotel for Displaced Family", amount: 935, date: "Mar 8, 2024", people: 5, status: "completed", category: "Emergency Relief", year: 2024 },
    { title: "Groceries/Care Packages", amount: 444, date: "Feb 18, 2024", people: 2, status: "completed", category: "Basic Needs", year: 2024 },
    { title: "Gas Bill Support", amount: 495, date: "Feb 11, 2024", people: 2, status: "completed", category: "Basic Needs", year: 2024 },

    // 2023 Missions
    { title: "Christmas Toy Drive", amount: 8900, date: "Dec 15, 2023", people: 1500, status: "completed", category: "Holiday Programs", year: 2023 },
    { title: "Thanksgiving Dinner Program", amount: 3400, date: "Nov 20, 2023", people: 18, status: "completed", category: "Holiday Programs", year: 2023 },
    { title: "Hurricane Relief", amount: 5800, date: "Sep 15, 2023", people: 45, status: "completed", category: "Emergency Relief", year: 2023 },
    { title: "School Supply Drive", amount: 2100, date: "Aug 20, 2023", people: 150, status: "completed", category: "Educational Support", year: 2023 },
    { title: "Medical Emergency Aid", amount: 4500, date: "Apr 5, 2023", people: 3, status: "completed", category: "Healthcare", year: 2023 },
    { title: "Homeless Winter Support", amount: 1800, date: "Mar 10, 2023", people: 25, status: "completed", category: "Community Support", year: 2023 },
    { title: "Foster Kids Art Supplies", amount: 3200, date: "Feb 20, 2023", people: 300, status: "completed", category: "Foster Kids", year: 2023 },
    { title: "Emergency Relief Fund", amount: 2500, date: "Jan 15, 2023", people: 15, status: "completed", category: "Emergency Relief", year: 2023 },

    // 2022 Missions
    { title: "Ukraine Emergency Aid", amount: 1849, date: "Apr 4, 2022", people: 50, status: "completed", category: "International Aid", year: 2022 },
    { title: "Stand Up for Ukraine", amount: 1416, date: "Mar 13, 2022", people: 50, status: "completed", category: "International Aid", year: 2022 },
    { title: "Family of 3 House Fire", amount: 381, date: "Feb 23, 2022", people: 3, status: "completed", category: "Emergency Relief", year: 2022 },
    { title: "Flowers for Teachers & Nurses", amount: 572, date: "Jan 18, 2022", people: 10, status: "completed", category: "Community Support", year: 2022 },
    { title: "Bronx Fire Emergency", amount: 782, date: "Jan 10, 2022", people: 5, status: "completed", category: "Emergency Relief", year: 2022 },
    { title: "Cards/Gifts for Mia", amount: 500, date: "Jan 5, 2022", people: 1, status: "completed", category: "Healthcare", year: 2022 },
    { title: "Rx Care Packages", amount: 425, date: "Jan 3, 2022", people: 1, status: "completed", category: "Healthcare", year: 2022 },

    // 2021 Missions
    { title: "Annual Toy Drive for Foster Kids", amount: 17892, date: "Dec 23, 2021", people: 1500, status: "completed", category: "Foster Kids", year: 2021 },
    { title: "Christmas Cards for Shea", amount: 0, date: "Dec 11, 2021", people: 1, status: "completed", category: "Community Support", year: 2021 },
    { title: "Abandoned Girls Support", amount: 1301, date: "Dec 9, 2021", people: 2, status: "completed", category: "Community Support", year: 2021 },
    { title: "Homeless Man Jacket & Shirts", amount: 238, date: "Nov 16, 2021", people: 1, status: "completed", category: "Community Support", year: 2021 },
    { title: "Food Drive/Comedy Night", amount: 1353, date: "Nov 10, 2021", people: 50, status: "completed", category: "Community Support", year: 2021 },
    { title: "Emergency Rent for Family", amount: 683, date: "Oct 29, 2021", people: 6, status: "completed", category: "Basic Needs", year: 2021 },
    { title: "6th Grade Books for ELA kids", amount: 441, date: "Oct 26, 2021", people: 25, status: "completed", category: "Educational Support", year: 2021 },
    { title: "Groceries for Family of 5", amount: 570, date: "Oct 17, 2021", people: 5, status: "completed", category: "Basic Needs", year: 2021 },
    { title: "Pumpkins for Kids", amount: 230, date: "Oct 13, 2021", people: 5, status: "completed", category: "Holiday Programs", year: 2021 },
    { title: "Repair Little Libraries", amount: 137, date: "Sep 26, 2021", people: 1, status: "completed", category: "Community Support", year: 2021 },
    { title: "Little Girls with Cancer", amount: 310, date: "Sep 12, 2021", people: 1, status: "completed", category: "Healthcare", year: 2021 },
    { title: "10th Grade Books", amount: 471, date: "Sep 12, 2021", people: 25, status: "completed", category: "Educational Support", year: 2021 },
    { title: "LGBTQ Housing", amount: 1200, date: "Aug 12, 2021", people: 25, status: "completed", category: "Community Support", year: 2021 },
    { title: "Teacher Books for Students", amount: 500, date: "Jul 20, 2021", people: 30, status: "completed", category: "Educational Support", year: 2021 },
    { title: "Stickers for Books", amount: 556, date: "Jul 5, 2021", people: 1, status: "completed", category: "Educational Support", year: 2021 },
    { title: "Art Kits for Foster Kids", amount: 5000, date: "Jul 2, 2021", people: 300, status: "completed", category: "Foster Kids", year: 2021 },
    { title: "HBA & Puppy Pkg (house fire)", amount: 477, date: "May 27, 2021", people: 5, status: "completed", category: "Emergency Relief", year: 2021 },
    { title: "Groceries for Mom", amount: 500, date: "May 19, 2021", people: 5, status: "completed", category: "Basic Needs", year: 2021 },
    { title: "Books for Kids", amount: 312, date: "May 14, 2021", people: 25, status: "completed", category: "Educational Support", year: 2021 },
    { title: "Stop & Shop Gift Card (House Fire)", amount: 500, date: "Apr 29, 2021", people: 5, status: "completed", category: "Emergency Relief", year: 2021 },
    { title: "Foster Mom Flowers", amount: 1459, date: "Apr 17, 2021", people: 10, status: "completed", category: "Foster Kids", year: 2021 },
    { title: "Basketball Camp for Springfield Kids", amount: 750, date: "Apr 5, 2021", people: 10, status: "completed", category: "Community Support", year: 2021 },

    // 2020 Missions
    { title: "Recliner for Local Woman with Rare Condition", amount: 368, date: "Aug 20, 2020", people: 1, status: "completed", category: "Healthcare", year: 2020 },
    { title: "Ramp for Elderly Woman", amount: 600, date: "Aug 17, 2020", people: 1, status: "completed", category: "Community Support", year: 2020 },
    { title: "Landscaping Project - Kind Squad Volunteers", amount: 500, date: "Aug 15, 2020", people: 1, status: "completed", category: "Community Support", year: 2020 },
    { title: "Uganda Care Pkg", amount: 345, date: "Aug 9, 2020", people: 15, status: "completed", category: "International Aid", year: 2020 },
    { title: "Car accident (Grocery Gift Cards)", amount: 300, date: "Aug 7, 2020", people: 1, status: "completed", category: "Emergency Relief", year: 2020 },
    { title: "Summer Fun for Mom & Kids Gift Package", amount: 182, date: "Aug 7, 2020", people: 3, status: "completed", category: "Community Support", year: 2020 },
    { title: "Homeless Project (clothes for 200 people)", amount: 738, date: "Jul 29, 2020", people: 200, status: "completed", category: "Community Support", year: 2020 },
    { title: "Unexpected Sunshine Care Package", amount: 52, date: "Jul 28, 2020", people: 1, status: "completed", category: "Community Support", year: 2020 },
    { title: "Gift Cards for Restaurant Super Heroes", amount: 221, date: "Jul 26, 2020", people: 2, status: "completed", category: "Community Support", year: 2020 },
    { title: "Teen Girls Hygiene Products", amount: 728, date: "Jul 26, 2020", people: 88, status: "completed", category: "Community Support", year: 2020 },
    { title: "Masks Created & Donated by the Kind Squad", amount: 2689, date: "Jul 25, 2020", people: 500, status: "completed", category: "Community Support", year: 2020 },
    { title: "Positive Vibes Care Package", amount: 62, date: "Jul 19, 2020", people: 1, status: "completed", category: "Community Support", year: 2020 },
    { title: "Big Brother/Sister Care Package", amount: 108, date: "Jul 19, 2020", people: 1, status: "completed", category: "Community Support", year: 2020 },
    { title: "Mom & 2 Boys Grocery Gift Cards", amount: 373, date: "Jul 23, 2020", people: 3, status: "completed", category: "Basic Needs", year: 2020 },
    { title: "Art Kits for Foster Kids (joint mission)", amount: 4553, date: "Jul 16, 2020", people: 300, status: "completed", category: "Foster Kids", year: 2020 },
    { title: "Get Well Care Package", amount: 51, date: "Jul 13, 2020", people: 1, status: "completed", category: "Healthcare", year: 2020 },
    { title: "Emergency Hotel for Woman", amount: 391, date: "Jul 12, 2020", people: 1, status: "completed", category: "Emergency Relief", year: 2020 },
    { title: "Essential for Family (multi-family house fire)", amount: 653, date: "Jul 11, 2020", people: 5, status: "completed", category: "Emergency Relief", year: 2020 },
    { title: "Get Well Care Package", amount: 140, date: "Jul 10, 2020", people: 1, status: "completed", category: "Healthcare", year: 2020 },
    { title: "Grief Care Package", amount: 212, date: "Jul 9, 2020", people: 1, status: "completed", category: "Healthcare", year: 2020 },
    { title: "Three Weeks of Basketball Camp for Local Kid", amount: 300, date: "Jul 9, 2020", people: 1, status: "completed", category: "Community Support", year: 2020 },
    { title: "Playhouse for Homeless Shelter", amount: 212, date: "Jul 6, 2020", people: 5, status: "completed", category: "Community Support", year: 2020 },
    { title: "Flowers for Woman in Nursing Home", amount: 65, date: "Jul 4, 2020", people: 1, status: "completed", category: "Community Support", year: 2020 },
    { title: "Care Packages for Nurses", amount: 325, date: "Jul 2, 2020", people: 10, status: "completed", category: "Community Support", year: 2020 },
    { title: "Water Bill", amount: 300, date: "Jul 1, 2020", people: 2, status: "completed", category: "Basic Needs", year: 2020 }
  ]

  const categories = [
    'Emergency Relief',
    'Healthcare', 
    'Foster Kids',
    'Community Support',
    'Basic Needs',
    'Holiday Programs',
    'Educational Support',
    'International Aid'
  ]

  const years = ['2025', '2024', '2023', '2022', '2021', '2020']

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Emergency Relief': return 'bg-red-500'
      case 'Healthcare': return 'bg-blue-500'
      case 'Foster Kids': return 'bg-purple-500'
      case 'Community Support': return 'bg-green-500'
      case 'Basic Needs': return 'bg-orange-500'
      case 'Holiday Programs': return 'bg-pink-500'
      case 'Educational Support': return 'bg-indigo-500'
      case 'International Aid': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-400'
      case 'active': return 'text-yellow-400'
      case 'pending': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  // Filter missions based on selected filters and search
  const filteredMissions = allMissions.filter(mission => {
    const matchesYear = selectedYear === 'all' || mission.year.toString() === selectedYear
    const matchesCategory = selectedCategory === 'all' || mission.category === selectedCategory
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesYear && matchesCategory && matchesSearch
  })

  // Calculate totals for filtered missions
  const totalRaised = filteredMissions.reduce((sum, mission) => sum + mission.amount, 0)
  const totalPeople = filteredMissions.reduce((sum, mission) => sum + mission.people, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All Kind Squad Missions
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Complete chronological history of our impact • 2020-2025
            </p>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {filteredMissions.length}
                </div>
                <div className="text-gray-400">Total Missions</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  ${totalRaised.toLocaleString()}
                </div>
                <div className="text-gray-400">Total Raised</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {totalPeople.toLocaleString()}
                </div>
                <div className="text-gray-400">People Helped</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Search Missions</label>
                <input
                  type="text"
                  placeholder="Search by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                />
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Filter by Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Filter by Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedYear('all')
                    setSelectedCategory('all')
                    setSearchTerm('')
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Missions List */}
          <div className="space-y-4">
            {filteredMissions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No missions found matching your filters.</p>
              </div>
            ) : (
              filteredMissions.map((mission, index) => (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    
                    {/* Mission Info */}
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{mission.title}</h3>
                        <span className={`inline-block w-3 h-3 rounded-full ${getCategoryColor(mission.category)}`}></span>
                        <span className="text-sm text-gray-400">{mission.category}</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span>📅 {mission.date}</span>
                        <span>👥 {mission.people} people helped</span>
                        <span className={`font-medium ${getStatusColor(mission.status)}`}>
                          ● {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        ${mission.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        ${(mission.amount / mission.people).toFixed(0)} per person
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Back to Missions */}
          <div className="text-center mt-12">
            <a
              href="#/missions"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              ← Back to Missions Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

