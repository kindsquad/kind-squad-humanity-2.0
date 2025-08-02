import worldMapImage from '../assets/world-map.jpg'

export default function Hero() {
  return (
    <section className="relative bg-black dark:bg-black light:bg-white overflow-hidden">
      {/* World Map Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-40 light:opacity-20"
        style={{ backgroundImage: `url(${worldMapImage})` }}
      >
      </div>

      {/* Content Overlay */}
      <div className="relative min-h-screen flex items-center justify-center py-8 md:py-24">
        <div className="max-w-7xl mx-auto text-center px-4">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-white light:text-black mb-8 md:mb-8 drop-shadow-2xl">
            Kindness Without Limits
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-200 light:text-gray-700 mb-12 md:mb-16 drop-shadow-lg max-w-4xl mx-auto">
            Recreating humanity by spreading hope and compassion
          </p>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-12 max-w-6xl mx-auto">
          <div className="bg-black/70 dark:bg-black/70 light:bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/10 dark:border-white/10 light:border-black/10">
            <div className="text-2xl md:text-3xl lg:text-3xl font-bold text-yellow-400 dark:text-yellow-400 light:text-black mb-2">$284,368</div>
            <div className="text-white dark:text-white light:text-black text-sm md:text-base">Raised</div>
          </div>
          <div className="bg-black/70 dark:bg-black/70 light:bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/10 dark:border-white/10 light:border-black/10">
            <div className="text-3xl md:text-4xl lg:text-4xl font-bold text-yellow-400 dark:text-yellow-400 light:text-black mb-2">176</div>
            <div className="text-white dark:text-white light:text-black text-sm md:text-base">Missions Completed</div>
          </div>
          <div className="bg-black/70 dark:bg-black/70 light:bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/10 dark:border-white/10 light:border-black/10">
            <div className="text-2xl md:text-3xl lg:text-3xl font-bold text-yellow-400 dark:text-yellow-400 light:text-black mb-2">13,056</div>
            <div className="text-white dark:text-white light:text-black text-sm md:text-base">People Helped</div>
          </div>
          <div className="bg-black/70 dark:bg-black/70 light:bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/10 dark:border-white/10 light:border-black/10">
            <div className="text-3xl md:text-4xl lg:text-4xl font-bold text-yellow-400 dark:text-yellow-400 light:text-black mb-2">2,647</div>
            <div className="text-white dark:text-white light:text-black text-sm md:text-base">Members</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4 md:mb-8">
          <button className="w-3/4 sm:w-auto bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Donate Now
          </button>
          <button className="w-3/4 sm:w-auto bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Request Help
          </button>
          <button className="w-3/4 sm:w-auto bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Become A Member
          </button>
          <button className="w-3/4 sm:w-auto bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Start a Chapter
          </button>
        </div>
        </div>
      </div>
    </section>
  )
}

