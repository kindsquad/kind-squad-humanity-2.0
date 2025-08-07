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

  const getAnonymousTitle = (mission) => {
    // Use custom title if provided, otherwise use default based on assistance type
    if (mission.anonymousTitle) {
      return mission.anonymousTitle;
    }
    
    const titles = {
      'Utility Bills': 'Keeping the Lights On',
      'Food Assistance': 'When Hunger Knocks',
      'Car Repair': 'Getting Back on the Road',
      'Medical Bills': 'When Health Costs Everything',
      'Rent Assistance': 'A Place to Call Home',
      'Emergency Relief': 'When Crisis Strikes'
    };
    return titles[mission.assistanceType] || 'A Community Responds';
  };

  const getAnonymousStory = (mission) => {
    // Use custom story if provided, otherwise use default based on assistance type
    if (mission.openingHook || mission.anonymousStory) {
      let story = '';
      if (mission.openingHook) {
        story += mission.openingHook + '\n\n';
      }
      if (mission.anonymousStory) {
        story += mission.anonymousStory;
      }
      if (mission.urgencyMessage) {
        story += '\n\n' + mission.urgencyMessage;
      }
      return story;
    }
    
    const stories = {
      'Utility Bills': 'Winter came early this year. So did the disconnect notice.\n\nAn individual on fixed income, watching bills climb while savings disappear. The choice between warmth and food shouldn\'t exist, but here we are.',
      'Food Assistance': 'The math just doesn\'t add up anymore.\n\nA family working hard but still falling short. Rent went up, hours got cut, and the gap between income and survival keeps growing.',
      'Car Repair': 'The car broke down on the way to work. Again.\n\nWithout reliable transportation, keeping a job becomes impossible. The cycle of struggle continues until someone breaks it.',
      'Medical Bills': 'The diagnosis changed everything.\n\nMedical bills pile up while the ability to work disappears. Insurance covers some things, but not the basics like keeping a roof overhead.',
      'Emergency Relief': 'Sometimes life piles on all at once.\n\nWhen crisis strikes, it doesn\'t come alone. One emergency becomes many, and the weight becomes too much to bear alone.'
    };
    
    return stories[mission.assistanceType] || `Life threw an unexpected challenge.\n\n${mission.description}`;
  };

  const getUrgencyMessage = (status, amount, amountRaised) => {
    const percentage = getProgressPercentage(amountRaised, amount);
    
    if (status === 'completed') return 'Mission Complete! ✅';
    if (status === 'delivered') return 'Delivered! 📦';
    if (status === 'items_purchased') return 'Items Purchased 🛒';
    if (percentage === 100) return 'Goal Reached! 🎉';
    if (percentage > 75) return 'Almost there! Every dollar counts 💙';
    if (percentage > 50) return 'Halfway there! Momentum building 🌟';
    if (percentage > 25) return 'Great start! Keep it going 🚀';
    if (percentage > 0) return 'First steps taken! Join the mission 💪';
    return 'Just getting started - Be the first to help 🌟';
  };

  const calculateCommunityMath = (amount) => {
    const totalMembers = 2647; // Current member count
    const donationAmount = 5;
    const peopleNeeded = Math.ceil(amount / donationAmount);
    
    return {
      totalMembers,
      donationAmount,
      peopleNeeded
    };
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
          // Display published mission with anonymous format
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-yellow-400/30 transition-colors mb-6">
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {displayMission.assistanceType}
              </span>
            </div>
            
            <h4 className="text-xl font-bold text-white mb-6">
              Mission {(() => {
                // Generate mission number starting from 177
                const baseNumber = 177;
                const idNumber = displayMission.id?.replace(/[^0-9]/g, '');
                return idNumber ? (baseNumber + parseInt(idNumber) - 1) : baseNumber;
              })()}: {getAnonymousTitle(displayMission)}
            </h4>
            
            {/* Anonymous Story Section */}
            <div className="mb-6">
              <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                {getAnonymousStory(displayMission)}
              </div>
            </div>

            {/* Community Math Section */}
            <div className="mb-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h5 className="text-yellow-400 font-semibold mb-3">The Community Math:</h5>
              {(() => {
                const { totalMembers, donationAmount, peopleNeeded } = calculateCommunityMath(displayMission.amount);
                return (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Amount Needed:</span>
                      <span className="text-white font-semibold">${displayMission.amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Our Community:</span>
                      <span className="text-white">{totalMembers.toLocaleString()} members strong</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">The Ask:</span>
                      <span className="text-yellow-400 font-semibold">
                        {peopleNeeded} people × ${donationAmount} each = Mission Complete
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
            
            {/* Status and Progress */}
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Status:</p>
              <div className="flex gap-2 mb-4">
                <span className={`${getStatusColor(displayMission.status)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                  {getStatusLabel(displayMission.status)}
                </span>
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Published {displayMission.publishedDate && new Date(displayMission.publishedDate).toLocaleDateString()}
                </span>
              </div>

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
                {getProgressPercentage(displayMission.amountRaised, displayMission.amount)}% funded - {getUrgencyMessage(displayMission.status, displayMission.amount, displayMission.amountRaised)}
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
          // Default mission display when no published missions (enhanced with anonymous format)
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-yellow-400/30 transition-colors mb-6">
            <div className="mb-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Emergency Relief
              </span>
            </div>
            
            <h4 className="text-xl font-bold text-white mb-6">Mission 176: When Fire Takes Everything</h4>
            
            {/* Enhanced Anonymous Story */}
            <div className="mb-6">
              <div className="text-gray-200 text-sm leading-relaxed">
                The call came at 3 AM. "Your house is on fire."
                <br /><br />
                A woman and her loyal companion lost everything in minutes. Decades of memories, personal belongings, and the sense of security that comes with having a place to call home—all gone in smoke and flames.
                <br /><br />
                Now she faces the overwhelming task of rebuilding from nothing, one essential item at a time.
              </div>
            </div>

            {/* Community Math Section */}
            <div className="mb-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h5 className="text-yellow-400 font-semibold mb-3">The Community Math:</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Amount Needed:</span>
                  <span className="text-white font-semibold">$655</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Our Community:</span>
                  <span className="text-white">2,647 members strong</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">The Ask:</span>
                  <span className="text-yellow-400 font-semibold">131 people × $5 each = Mission Complete</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Status:</p>
              <div className="flex gap-2 mb-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Completed
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Amount Raised</span>
                <span className="text-yellow-400 font-semibold">$655</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{width: '100%'}}></div>
              </div>
              <p className="text-sm text-orange-400 mt-2 font-semibold">100% funded - Mission Complete! ✅</p>
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

