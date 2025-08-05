import React, { useState } from 'react'
import Navigation from '../components/Navigation'

export default function Missions() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [expandedMission, setExpandedMission] = useState(null)

  const currentMissions = [
    {
      id: 1,
      title: "House Fire Relief",
      description: "Emergency assistance for family of 4 who lost everything in house fire",
      goal: 1200,
      raised: 645,
      daysLeft: 3,
      location: "Western Mass",
      category: "Emergency Relief",
      peopleHelped: 4,
      urgency: "high"
    },
    {
      id: 2,
      title: "Veteran Support",
      description: "Medical expenses and basic needs for disabled veteran",
      goal: 850,
      raised: 522,
      daysLeft: 7,
      location: "Western Mass", 
      category: "Healthcare",
      peopleHelped: 1,
      urgency: "medium"
    },
    {
      id: 3,
      title: "Foster Kids Art Supplies",
      description: "Art kits and creative supplies for children in foster care",
      goal: 500,
      raised: 125,
      daysLeft: 14,
      location: "Springfield",
      category: "Foster Kids",
      peopleHelped: 15,
      urgency: "low"
    }
  ]

  const annualMissions = {
    '2025': [
      { title: "LA Fires Emergency Aid", amount: 2091, date: "Jan 20, 2025", people: 25, status: "completed", category: "Emergency Relief" },
      { title: "Heaters/Propane - Asheville, NC", amount: 616, date: "Jan 25, 2025", people: 8, status: "completed", category: "Emergency Relief" },
      { title: "Mom & Son (DV Case)", amount: 372, date: "Feb 2, 2025", people: 2, status: "completed", category: "Healthcare" },
      { title: "Critical Care with Rent", amount: 1231, date: "Feb 3, 2025", people: 3, status: "completed", category: "Healthcare" },
      { title: "Utilities Assistance", amount: 718, date: "Mar 15, 2025", people: 1, status: "completed", category: "Basic Needs" },
      { title: "Groceries Support", amount: 304, date: "Mar 23, 2025", people: 4, status: "completed", category: "Basic Needs" },
      { title: "Day Trip for Special Needs", amount: 1194, date: "Apr 6, 2025", people: 12, status: "completed", category: "Community Support" },
      { title: "Water Bill Assistance", amount: 691, date: "Apr 29, 2025", people: 1, status: "completed", category: "Basic Needs" },
      { title: "Veteran Support", amount: 522, date: "May 14, 2025", people: 1, status: "completed", category: "Community Support" },
      { title: "House Fire Emergency", amount: 1502, date: "Jun 30, 2025", people: 5, status: "completed", category: "Emergency Relief" },
      { title: "House Fire Relief", amount: 645, date: "Jul 27, 2025", people: 4, status: "active", category: "Emergency Relief" }
    ],
    '2024': [
      { title: "Gas Bill Support", amount: 495, date: "Feb 11, 2024", people: 2, status: "completed", category: "Basic Needs" },
      { title: "Groceries/Care Packages", amount: 444, date: "Feb 18, 2024", people: 2, status: "completed", category: "Basic Needs" },
      { title: "Hotel for Displaced Family", amount: 935, date: "Mar 8, 2024", people: 5, status: "completed", category: "Emergency Relief" },
      { title: "New Family Support", amount: 500, date: "Mar 31, 2024", people: 5, status: "completed", category: "Community Support" },
      { title: "Rent for Mom", amount: 875, date: "Apr 3, 2024", people: 2, status: "completed", category: "Basic Needs" },
      { title: "Flowers for Foster Moms", amount: 845, date: "May 1, 2024", people: 35, status: "completed", category: "Foster Kids" },
      { title: "DV Situation Support", amount: 508, date: "May 3, 2024", people: 3, status: "completed", category: "Healthcare" },
      { title: "Veteran & Family", amount: 292, date: "May 12, 2024", people: 3, status: "completed", category: "Community Support" },
      { title: "Essentials for Elderly Woman", amount: 384, date: "May 23, 2024", people: 1, status: "completed", category: "Community Support" },
      { title: "Groceries for Family", amount: 532, date: "Jun 5, 2024", people: 4, status: "completed", category: "Basic Needs" },
      { title: "Groceries for Family of 5", amount: 576, date: "Jun 10, 2024", people: 5, status: "completed", category: "Basic Needs" },
      { title: "Italian Guy Support", amount: 412, date: "Jun 25, 2024", people: 1, status: "completed", category: "Healthcare" },
      { title: "Hip Replacement Aid", amount: 98, date: "Jul 7, 2024", people: 1, status: "completed", category: "Healthcare" },
      { title: "Backpacks for Foster Kids", amount: 0, date: "Jul 13, 2024", people: 14, status: "completed", category: "Foster Kids" },
      { title: "Bad Accident Mission", amount: 1056, date: "Aug 11, 2024", people: 1, status: "completed", category: "Healthcare" },
      { title: "Art Kits for Foster Kids", amount: 15368, date: "Aug 15, 2024", people: 300, status: "completed", category: "Foster Kids" },
      { title: "Army Guy Support", amount: 967, date: "Aug 27, 2024", people: 3, status: "completed", category: "Community Support" },
      { title: "Doggie Food Support", amount: 88, date: "Sep 3, 2024", people: 1, status: "completed", category: "Community Support" },
      { title: "Mom Shoes/Groceries", amount: 120, date: "Sep 5, 2024", people: 2, status: "completed", category: "Basic Needs" },
      { title: "Westfield Homeless Cat Project", amount: 1091, date: "Sep 25, 2024", people: 1, status: "completed", category: "Community Support" },
      { title: "Travel Expenses Mission", amount: 507, date: "Oct 14, 2024", people: 1, status: "completed", category: "Community Support" },
      { title: "Trees of Hope Mission", amount: 689, date: "Oct 31, 2024", people: 1, status: "completed", category: "Community Support" },
      { title: "In honor of Kristina (TJO)", amount: 558, date: "Nov 21, 2024", people: 1, status: "completed", category: "Community Support" },
      { title: "Thanksgiving Meals", amount: 1887, date: "Nov 24, 2024", people: 18, status: "completed", category: "Holiday Programs" },
      { title: "Toy Drive", amount: 2608, date: "Nov 29, 2024", people: 1500, status: "completed", category: "Holiday Programs" },
      { title: "Comedy Show Fundraiser", amount: 3475, date: "Nov 30, 2024", people: 50, status: "completed", category: "Community Support" },
      { title: "Annual Toy Drive", amount: 46599, date: "Dec 23, 2024", people: 1500, status: "completed", category: "Holiday Programs" }
    ],
    '2023': [
      { title: "Emergency Relief Fund", amount: 2500, date: "Jan 15, 2023", people: 15, status: "completed", category: "Emergency Relief" },
      { title: "Foster Kids Art Supplies", amount: 3200, date: "Feb 20, 2023", people: 300, status: "completed", category: "Foster Kids" },
      { title: "Homeless Winter Support", amount: 1800, date: "Mar 10, 2023", people: 25, status: "completed", category: "Community Support" },
      { title: "Medical Emergency Aid", amount: 4500, date: "Apr 5, 2023", people: 3, status: "completed", category: "Healthcare" },
      { title: "School Supply Drive", amount: 2100, date: "Aug 20, 2023", people: 150, status: "completed", category: "Educational Support" },
      { title: "Hurricane Relief", amount: 5800, date: "Sep 15, 2023", people: 45, status: "completed", category: "Emergency Relief" },
      { title: "Thanksgiving Dinner Program", amount: 3400, date: "Nov 20, 2023", people: 18, status: "completed", category: "Holiday Programs" },
      { title: "Christmas Toy Drive", amount: 8900, date: "Dec 15, 2023", people: 1500, status: "completed", category: "Holiday Programs" }
    ],
    '2022': [
      { title: "Ukraine Emergency Aid", amount: 1849, date: "Apr 4, 2022", people: 50, status: "completed", category: "International Aid" },
      { title: "Stand Up for Ukraine", amount: 1416, date: "Mar 13, 2022", people: 50, status: "completed", category: "International Aid" },
      { title: "Family of 3 House Fire", amount: 381, date: "Feb 23, 2022", people: 3, status: "completed", category: "Emergency Relief" },
      { title: "Flowers for Teachers & Nurses", amount: 572, date: "Jan 18, 2022", people: 10, status: "completed", category: "Community Support" },
      { title: "Bronx Fire Emergency", amount: 782, date: "Jan 10, 2022", people: 5, status: "completed", category: "Emergency Relief" },
      { title: "Cards/Gifts for Mia", amount: 500, date: "Jan 5, 2022", people: 1, status: "completed", category: "Healthcare" },
      { title: "Rx Care Packages", amount: 425, date: "Jan 3, 2022", people: 1, status: "completed", category: "Healthcare" }
    ],
    '2021': [
      { title: "Annual Toy Drive for Foster Kids", amount: 17892, date: "Dec 23, 2021", people: 1500, status: "completed", category: "Foster Kids" },
      { title: "Christmas Cards for Shea", amount: 0, date: "Dec 11, 2021", people: 1, status: "completed", category: "Community Support" },
      { title: "Abandoned Girls Support", amount: 1301, date: "Dec 9, 2021", people: 2, status: "completed", category: "Community Support" },
      { title: "Homeless Man Jacket & Shirts", amount: 238, date: "Nov 16, 2021", people: 1, status: "completed", category: "Community Support" },
      { title: "Food Drive/Comedy Night", amount: 1353, date: "Nov 10, 2021", people: 50, status: "completed", category: "Community Support" },
      { title: "Emergency Rent for Family", amount: 683, date: "Oct 29, 2021", people: 6, status: "completed", category: "Basic Needs" },
      { title: "6th Grade Books for ELA kids", amount: 441, date: "Oct 26, 2021", people: 25, status: "completed", category: "Educational Support" },
      { title: "Groceries for Family of 5", amount: 570, date: "Oct 17, 2021", people: 5, status: "completed", category: "Basic Needs" },
      { title: "Pumpkins for Kids", amount: 230, date: "Oct 13, 2021", people: 5, status: "completed", category: "Holiday Programs" },
      { title: "Repair Little Libraries", amount: 137, date: "Sep 26, 2021", people: 1, status: "completed", category: "Community Support" },
      { title: "Little Girls with Cancer", amount: 310, date: "Sep 12, 2021", people: 1, status: "completed", category: "Healthcare" },
      { title: "10th Grade Books", amount: 471, date: "Sep 12, 2021", people: 25, status: "completed", category: "Educational Support" },
      { title: "LGBTQ Housing", amount: 1200, date: "Aug 12, 2021", people: 25, status: "completed", category: "Community Support" },
      { title: "Teacher Books for Students", amount: 500, date: "Jul 20, 2021", people: 30, status: "completed", category: "Educational Support" },
      { title: "Stickers for Books", amount: 556, date: "Jul 5, 2021", people: 1, status: "completed", category: "Educational Support" },
      { title: "Art Kits for Foster Kids", amount: 5000, date: "Jul 2, 2021", people: 300, status: "completed", category: "Foster Kids" },
      { title: "HBA & Puppy Pkg (house fire)", amount: 477, date: "May 27, 2021", people: 5, status: "completed", category: "Emergency Relief" },
      { title: "Groceries for Mom", amount: 500, date: "May 19, 2021", people: 5, status: "completed", category: "Basic Needs" },
      { title: "Books for Kids", amount: 312, date: "May 14, 2021", people: 25, status: "completed", category: "Educational Support" },
      { title: "Stop & Shop Gift Card (House Fire)", amount: 500, date: "Apr 29, 2021", people: 5, status: "completed", category: "Emergency Relief" },
      { title: "Foster Mom Flowers", amount: 1459, date: "Apr 17, 2021", people: 10, status: "completed", category: "Foster Kids" },
      { title: "Basketball Camp for Springfield Kids", amount: 750, date: "Apr 5, 2021", people: 10, status: "completed", category: "Community Support" }
    ],
    '2020': [
      { title: "Recliner for Local Woman with Rare Condition", amount: 368, date: "Aug 20, 2020", people: 1, status: "completed", category: "Healthcare" },
      { title: "Ramp for Elderly Woman", amount: 600, date: "Aug 17, 2020", people: 1, status: "completed", category: "Community Support" },
      { title: "Landscaping Project - Kind Squad Volunteers", amount: 500, date: "Aug 15, 2020", people: 1, status: "completed", category: "Community Support" },
      { title: "Uganda Care Pkg", amount: 345, date: "Aug 9, 2020", people: 15, status: "completed", category: "International Aid" },
      { title: "Car accident (Grocery Gift Cards)", amount: 300, date: "Aug 7, 2020", people: 1, status: "completed", category: "Emergency Relief" },
      { title: "Summer Fun for Mom & Kids Gift Package", amount: 182, date: "Aug 7, 2020", people: 3, status: "completed", category: "Community Support" },
      { title: "Homeless Project (clothes for 200 people)", amount: 738, date: "Jul 29, 2020", people: 200, status: "completed", category: "Community Support" },
      { title: "Unexpected Sunshine Care Package", amount: 52, date: "Jul 28, 2020", people: 1, status: "completed", category: "Community Support" },
      { title: "Gift Cards for Restaurant Super Heroes", amount: 221, date: "Jul 26, 2020", people: 2, status: "completed", category: "Community Support" },
      { title: "Teen Girls Hygiene Products", amount: 728, date: "Jul 26, 2020", people: 88, status: "completed", category: "Community Support" },
      { title: "Masks Created & Donated by the Kind Squad", amount: 2689, date: "Jul 25, 2020", people: 500, status: "completed", category: "Community Support" },
      { title: "Unexpected Sunshine Care Package", amount: 52, date: "Jul 28, 2020", people: 1, status: "completed", category: "Community Support" },
      { title: "Art Kits for Foster Kids (joint mission)", amount: 4553, date: "Jul 16, 2020", people: 300, status: "completed", category: "Foster Kids" },
      { title: "Positive Vibes Care Package", amount: 62, date: "Jul 19, 2020", people: 1, status: "completed", category: "Community Support" },
      { title: "Big Brother/Sister Care Package", amount: 108, date: "Jul 19, 2020", people: 1, status: "completed", category: "Community Support" },
      { title: "Mom & 2 Boys Grocery Gift Cards", amount: 373, date: "Jul 23, 2020", people: 3, status: "completed", category: "Basic Needs" },
      { title: "Emergency Hotel for Woman", amount: 391, date: "Jul 12, 2020", people: 1, status: "completed", category: "Emergency Relief" },
      { title: "Get Well Care Package", amount: 140, date: "Jul 10, 2020", people: 1, status: "completed", category: "Healthcare" },
      { title: "Essential for Family (multi-family house fire)", amount: 653, date: "Jul 11, 2020", people: 5, status: "completed", category: "Emergency Relief" },
      { title: "Get Well Care Package", amount: 51, date: "Jul 13, 2020", people: 1, status: "completed", category: "Healthcare" },
      { title: "Grief Care Package", amount: 212, date: "Jul 9, 2020", people: 1, status: "completed", category: "Healthcare" },
      { title: "Three Weeks of Basketball Camp for Local Kid", amount: 300, date: "Jul 9, 2020", people: 1, status: "completed", category: "Community Support" },
      { title: "Playhouse for Homeless Shelter", amount: 212, date: "Jul 6, 2020", people: 5, status: "completed", category: "Community Support" },
      { title: "Flowers for Woman in Nursing Home", amount: 65, date: "Jul 4, 2020", people: 1, status: "completed", category: "Community Support" },
      { title: "Care Packages for Nurses", amount: 325, date: "Jul 2, 2020", people: 10, status: "completed", category: "Community Support" },
      { title: "Water Bill", amount: 300, date: "Jul 1, 2020", people: 2, status: "completed", category: "Basic Needs" }
    ]
  }

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'border-red-500 bg-red-500/10'
      case 'medium': return 'border-yellow-500 bg-yellow-500/10'
      case 'low': return 'border-green-500 bg-green-500/10'
      default: return 'border-gray-500 bg-gray-500/10'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Emergency Relief': return 'bg-red-500'
      case 'Healthcare': return 'bg-blue-500'
      case 'Foster Kids': return 'bg-purple-500'
      case 'Community Support': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Navigation */}
      <Navigation currentPage="missions" showTitle={true} title="Missions" />

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Current Missions Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Current Missions</h2>
              <div className="text-gray-400">
                <span className="text-yellow-400 font-bold">{currentMissions.length}</span> Active Missions
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentMissions.map((mission) => (
                <div key={mission.id} className={`bg-gray-900 rounded-lg p-6 border-2 ${getUrgencyColor(mission.urgency)} hover:border-yellow-500 transition-all duration-300`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{mission.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`w-3 h-3 rounded-full ${getCategoryColor(mission.category)}`}></span>
                        <span className="text-gray-400 text-sm">{mission.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{mission.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold text-lg">${mission.raised.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">of ${mission.goal.toLocaleString()}</div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{mission.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-yellow-500 h-3 rounded-full transition-all duration-500" 
                        style={{width: `${getProgressPercentage(mission.raised, mission.goal)}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>{Math.round(getProgressPercentage(mission.raised, mission.goal))}% funded</span>
                      <span>{mission.daysLeft} days left</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      <span className="text-white font-medium">{mission.peopleHelped}</span> people helped
                    </div>
                    <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                      Donate Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Annual Missions Section */}
          <section className="mb-12">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
              <h2 className="text-3xl font-bold text-white">Annual Missions</h2>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                {Object.keys(annualMissions).sort((a, b) => b - a).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      selectedYear === year 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {annualMissions[selectedYear]?.length || 0}
                    </div>
                    <div className="text-gray-400">Missions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      ${annualMissions[selectedYear]?.reduce((sum, mission) => sum + mission.amount, 0).toLocaleString() || 0}
                    </div>
                    <div className="text-gray-400">Total Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {annualMissions[selectedYear]?.reduce((sum, mission) => sum + mission.people, 0).toLocaleString() || 0}
                    </div>
                    <div className="text-gray-400">People Helped</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {annualMissions[selectedYear]?.map((mission, index) => (
                  <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-white font-medium">{mission.title}</h4>
                        {mission.status === 'active' && (
                          <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded-full font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{mission.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">${mission.amount.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">{mission.people} people</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* All Completed Missions Section */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Mission History</h2>
              <div className="text-gray-400">
                <span className="text-yellow-400 font-bold">127+</span> Total Missions Completed
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">127+</div>
                  <div className="text-gray-400">Total Missions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">$279,000+</div>
                  <div className="text-gray-400">Total Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">8,400+</div>
                  <div className="text-gray-400">People Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">5</div>
                  <div className="text-gray-400">Years Active</div>
                </div>
              </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Recent Completed Missions</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {/* 2025 Completed Missions */}
                  {annualMissions['2025']?.filter(m => m.status === 'completed').slice(0, 10).map((mission, index) => (
                    <div key={`2025-${index}`} className="flex justify-between items-center py-2 px-4 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                      <div>
                        <span className="text-white font-medium">{mission.title}</span>
                        <span className="text-gray-400 text-sm ml-2">• {mission.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-400 font-bold">${mission.amount.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm ml-2">• {mission.people} people</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* 2024 Completed Missions */}
                  {annualMissions['2024']?.slice(0, 15).map((mission, index) => (
                    <div key={`2024-${index}`} className="flex justify-between items-center py-2 px-4 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
                      <div>
                        <span className="text-white font-medium">{mission.title}</span>
                        <span className="text-gray-400 text-sm ml-2">• {mission.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-400 font-bold">${mission.amount.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm ml-2">• {mission.people} people</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                    <div className="pt-4 border-t border-gray-800">
                  <a 
                    href="#/all-missions"
                    className="block w-full bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
                  >
                    View All 176+ Missions →
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

