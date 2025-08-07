import { useState, useEffect } from 'react';

export default function MissionSpotlight() {
  const [publishedMissions, setPublishedMissions] = useState([]);

  useEffect(() => {
    // Get published missions from localStorage (shared with admin dashboard)
    const storedMissions = localStorage.getItem('kindsquad_missions');
    if (storedMissions) {
      try {
        const missions = JSON.parse(storedMissions);
        const published = missions.filter(mission => mission.isPublished);
        setPublishedMissions(published);
      } catch (error) {
        console.error('Error loading published missions:', error);
      }
    }

    // Listen for mission updates
    const handleStorageChange = (e) => {
      if (e.key === 'kindsquad_missions') {
        try {
          const missions = JSON.parse(e.newValue || '[]');
          const published = missions.filter(mission => mission.isPublished);
          setPublishedMissions(published);
        } catch (error) {
          console.error('Error updating published missions:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Show default mission if no published missions
  const displayMission = publishedMissions.length > 0 ? publishedMissions[0] : null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'delivered': return 'bg-green-500';
      case 'items_purchased': return 'bg-orange-500';
      case 'raised': return 'bg-orange-500';
      case 'posted': return 'bg-red-500';
      case 'accepted': return 'bg-red-500';
      default: return 'bg-red-500';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'delivered': return 'In Progress';
      case 'items_purchased': return 'In Progress';
      case 'raised': return 'In Progress';
      case 'posted': return 'Active';
      case 'accepted': return 'Active';
      default: return 'Active';
    }
  };

  const getProgressPercentage = (raised, amount) => {
    if (!amount || amount === 0) return 0;
    return Math.min(Math.round((raised / amount) * 100), 100);
  };

  return (
    <section className="py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-yellow-400 tracking-wide uppercase mb-4">
            MISSION SPOTLIGHT
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {displayMission ? 'Latest Published Mission' : 'Latest Mission Update'}
          </h3>
        </div>

        {displayMission ? (
          // Display published mission from admin dashboard
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-yellow-400/30 transition-colors mb-6">
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {displayMission.assistanceType}
              </span>
            </div>
            
            <h4 className="text-xl font-bold text-white mb-3">
              Mission: {displayMission.firstName} {displayMission.lastName}
            </h4>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Description:</p>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                {displayMission.description}
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Status:</p>
              <div className="flex gap-2">
                <span className={`${getStatusColor(displayMission.status)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                  {getStatusLabel(displayMission.status)}
                </span>
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Published {displayMission.publishedDate && new Date(displayMission.publishedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
              
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Target Amount</span>
                <span className="text-yellow-400 font-semibold">${displayMission.amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Published</span>
                <span className="text-white">{displayMission.publishedDate && new Date(displayMission.publishedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Type</span>
                <span className="text-white">{displayMission.assistanceType}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Amount Raised</span>
                <span className="text-yellow-400 font-semibold">${displayMission.amountRaised?.toLocaleString() || 0}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                  style={{width: `${getProgressPercentage(displayMission.amountRaised, displayMission.amount)}%`}}
                ></div>
              </div>
              <p className="text-sm text-orange-400 mt-2 font-semibold">
                {getProgressPercentage(displayMission.amountRaised, displayMission.amount)}% funded
                {displayMission.status === 'completed' && ' - Mission Complete! ✅'}
                {displayMission.status === 'delivered' && ' - Delivered! 📦'}
                {displayMission.status === 'items_purchased' && ' - Items Purchased 🛒'}
                {displayMission.status === 'raised' && ' - Goal Reached! 🎉'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Donate Now
              </button>
              <button className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                Mission Details
              </button>
            </div>
          </div>
        ) : (
          // Default mission display when no published missions
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-yellow-400/30 transition-colors mb-6">
            <div className="mb-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Emergency Relief
              </span>
            </div>
            
            <h4 className="text-xl font-bold text-white mb-3">Mission 176: House Fire</h4>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Description:</p>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Mission: To help a woman & her dog who lost their home to a house fire. This mission will help replace items lost in the fire.
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Status:</p>
              <div className="flex gap-2">
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  In Progress
                </span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Completed
                </span>
              </div>
            </div>
              
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Target Amount</span>
                <span className="text-yellow-400 font-semibold">$655</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Timing</span>
                <span className="text-white">July 2025</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Helps</span>
                <span className="text-white">1 person and her dog</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Amount Raised</span>
                <span className="text-yellow-400 font-semibold">$655</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{width: '100%'}}></div>
              </div>
              <p className="text-sm text-orange-400 mt-2 font-semibold">100% funded - Awaiting delivery 📦</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Donate Now
              </button>
              <button className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                Mission Details
              </button>
            </div>
          </div>
        )}

        {/* Status Key - Responsive 3x3 grid layout */}
        <div className="text-center">
          {/* Row 1: Title */}
          <p className="text-gray-400 text-sm mb-4">Status Key:</p>
          
          {/* Desktop: Single row layout */}
          <div className="hidden md:flex justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Active</span>
              <span className="text-gray-300">Accepting donations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">In Progress</span>
              <span className="text-gray-300">Funded, awaiting delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Completed</span>
              <span className="text-gray-300">Delivered & finished!</span>
            </div>
          </div>
          
          {/* Mobile: 3x3 grid layout */}
          <div className="md:hidden">
            {/* Row 2: Status badges in 3 columns */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="flex justify-center">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Active</span>
              </div>
              <div className="flex justify-center">
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">In Progress</span>
              </div>
              <div className="flex justify-center">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Completed</span>
              </div>
            </div>
            
            {/* Row 3: Descriptions in 3 columns */}
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-300">
              <div className="text-center">
                <span>Accepting donations</span>
              </div>
              <div className="text-center">
                <span>Funded, awaiting delivery</span>
              </div>
              <div className="text-center">
                <span>Delivered & finished!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

