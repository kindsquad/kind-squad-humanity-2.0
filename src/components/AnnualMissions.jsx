export default function AnnualMissions() {
  const missions = [
    {
      id: 1,
      title: "Mother's Day Flowers",
      description: "Beautiful flower arrangements delivered to foster & single moms to show appreciation for their dedication to children.",
      category: "Foster & Single Moms",
      categoryColor: "bg-pink-500",
      target: 2000,
      timing: "May",
      helps: "35 foster moms"
    },
    {
      id: 2,
      title: "Art Kits for Foster Kids",
      description: "Creative art supplies and kits to inspire imagination and self-expression",
      category: "Foster Kids",
      categoryColor: "bg-purple-500",
      target: 7500,
      timing: "August",
      helps: "300 children"
    },
    {
      id: 3,
      title: "Food Drive",
      description: "Collecting non-perishable food to help eliminate food insecurity",
      category: "Basic Needs",
      categoryColor: "bg-blue-500",
      target: 5000,
      timing: "October",
      helps: "150 families"
    },
    {
      id: 4,
      title: "Thanksgiving Dinners",
      description: "Complete holiday meals for families in need during Thanksgiving",
      category: "Holiday Programs",
      categoryColor: "bg-red-500",
      target: 3500,
      timing: "November",
      helps: "18 families"
    },
    {
      id: 5,
      title: "Winter Coat Drive",
      description: "Warm winter coats and clothing for those facing cold weather without proper protection",
      category: "Basic Needs",
      categoryColor: "bg-blue-500",
      target: 4000,
      timing: "December",
      helps: "200 people"
    },
    {
      id: 6,
      title: "Toy Drive",
      description: "Holiday gifts to bring joy to foster kids & children in need during the Christmas Season",
      category: "Holiday Programs",
      categoryColor: "bg-red-500",
      target: 50000,
      timing: "December",
      helps: "1,500 children"
    }
  ]

  return (
    <section className="py-8 md:py-16 relative">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-yellow-400 tracking-wide uppercase mb-4">
            ANNUAL MISSIONS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white dark:text-white light:text-black mb-8">
            Recurring Programs You Can Support
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {missions.map((mission) => (
            <div key={mission.id} className="bg-black/70 dark:bg-black/70 light:bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/10 dark:border-white/10 light:border-black/10 hover:border-yellow-400/30 transition-colors">
              <div className="mb-4">
                <span className={`${mission.categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {mission.category}
                </span>
              </div>
              
              <h4 className="text-xl font-bold text-white dark:text-white light:text-black mb-3">{mission.title}</h4>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">{mission.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-700 dark:border-gray-700 light:border-gray-300">
                  <span className="text-gray-400 dark:text-gray-400 light:text-gray-600">Target Amount</span>
                  <span className="text-yellow-400 dark:text-yellow-400 light:text-black font-semibold">${mission.target.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700 dark:border-gray-700 light:border-gray-300">
                  <span className="text-gray-400 dark:text-gray-400 light:text-gray-600">Timing</span>
                  <span className="text-white dark:text-white light:text-black">{mission.timing}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700 dark:border-gray-700 light:border-gray-300">
                  <span className="text-gray-400 dark:text-gray-400 light:text-gray-600">Helps</span>
                  <span className="text-white dark:text-white light:text-black">{mission.helps}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Donate Now
                </button>
                <button className="w-full bg-gray-700 dark:bg-gray-700 light:bg-gray-300 text-white dark:text-white light:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 dark:hover:bg-gray-600 light:hover:bg-gray-400 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">
            Support these recurring programs with a monthly donation to maximize your impact
          </p>
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors">
            Become a Monthly Supporter
          </button>
        </div>
      </div>
    </section>
  )
}

