import React from 'react';

const MissionSection = ({ mission }) => {
  if (!mission || !mission.amount) return null;

  const donorsNeeded = Math.ceil(mission.amount / 5);

  return (
    <div className="mb-2 p-2 bg-blue-900 rounded border border-blue-600">
      <h4 className="text-xs font-semibold text-yellow-400 mb-1">The Mission</h4>
      <div className="text-xs text-gray-200 space-y-0.5">
        <div>• ${mission.amount?.toLocaleString() || 0} needed</div>
        <div>• Our community: 2,647 members strong</div>
        <div>• We are asking {donorsNeeded} people to donate $5 each to complete this mission.</div>
      </div>
    </div>
  );
};

export default MissionSection;

