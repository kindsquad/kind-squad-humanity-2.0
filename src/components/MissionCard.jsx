import React, { useState } from 'react';

const MissionCard = ({ mission, onUpdate, onClose }) => {
  const [missionData, setMissionData] = useState({
    // Basic Info (from request)
    id: mission?.id || '',
    firstName: mission?.firstName || '',
    lastName: mission?.lastName || '',
    email: mission?.email || '',
    phone: mission?.phone || '',
    assistanceType: mission?.assistanceType || '',
    amount: mission?.amount || 0,
    description: mission?.description || '',
    
    // Mission Tracking Fields
    dateSubmitted: mission?.dateSubmitted || new Date().toISOString().split('T')[0],
    dateReceived: mission?.dateReceived || new Date().toISOString().split('T')[0],
    initialStatus: mission?.initialStatus || 'urgent',
    
    // Mission Progress Fields
    datePostedToCommunity: mission?.datePostedToCommunity || '',
    imageUsedOnPost: mission?.imageUsedOnPost || null,
    amountRaised: mission?.amountRaised || 0,
    dateGoalCompleted: mission?.dateGoalCompleted || '',
    datePurchased: mission?.datePurchased || '',
    receipt: mission?.receipt || null,
    dateDelivered: mission?.dateDelivered || '',
    
    // Mission Status
    status: mission?.status || 'received',
    
    // Board Approval Fields
    boardApproval: mission?.boardApproval || {
      member1: { name: '', date: '', vote: '' },
      member2: { name: '', date: '', vote: '' },
      member3: { name: '', date: '', vote: '' },
      member4: { name: '', date: '', vote: '' },
      member5: { name: '', date: '', vote: '' }
    }
  });

  const statusOptions = [
    'received',
    'before_the_board',
    'accepted',
    'posted',
    'raised',
    'items_purchased',
    'delivered',
    'completed'
  ];

  const initialStatusOptions = [
    'urgent',
    'within_a_week'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // Handle board approval fields
    if (name.startsWith('boardApproval.')) {
      const [, member, field] = name.split('.');
      setMissionData(prev => ({
        ...prev,
        boardApproval: {
          ...prev.boardApproval,
          [member]: {
            ...prev.boardApproval[member],
            [field]: value
          }
        }
      }));
    } else {
      setMissionData(prev => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value
      }));
    }
  };

  const handleSave = () => {
    // Auto-mark as completed when status reaches 'completed'
    if (missionData.status === 'completed' && !missionData.dateDelivered) {
      setMissionData(prev => ({
        ...prev,
        dateDelivered: new Date().toISOString().split('T')[0]
      }));
    }
    
    onUpdate(missionData);
    onClose();
  };

  const getStatusLabel = (status) => {
    const labels = {
      'received': 'Received',
      'before_the_board': 'Before the Board',
      'accepted': 'Accepted',
      'posted': 'Posted',
      'raised': 'Raised',
      'items_purchased': 'Item(s) Purchased',
      'delivered': 'Delivered',
      'completed': 'Completed'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      'received': 'bg-gray-500',
      'before_the_board': 'bg-yellow-500',
      'accepted': 'bg-blue-500',
      'posted': 'bg-purple-500',
      'raised': 'bg-green-500',
      'items_purchased': 'bg-orange-500',
      'delivered': 'bg-teal-500',
      'completed': 'bg-emerald-600'
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Mission Card Management</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Information */}
            <div className="space-y-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Request Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Request ID
                    </label>
                    <input
                      type="text"
                      value={missionData.id}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      readOnly
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={missionData.firstName}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={missionData.lastName}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={missionData.email}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={missionData.phone}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Assistance Type
                    </label>
                    <input
                      type="text"
                      value={missionData.assistanceType}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Amount Requested
                    </label>
                    <input
                      type="text"
                      value={`$${missionData.amount.toLocaleString()}`}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={missionData.description}
                      rows="3"
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Dates Section */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Important Dates</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Date Submitted
                      </label>
                      <input
                        type="date"
                        name="dateSubmitted"
                        value={missionData.dateSubmitted}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Date Received
                      </label>
                      <input
                        type="date"
                        name="dateReceived"
                        value={missionData.dateReceived}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Initial Status (Admin Decision)
                    </label>
                    <select
                      name="initialStatus"
                      value={missionData.initialStatus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    >
                      {initialStatusOptions.map(option => (
                        <option key={option} value={option}>
                          {option === 'urgent' ? 'Urgent' : 'Within a Week'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Mission Progress */}
            <div className="space-y-6">
              {/* Mission Status */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Mission Status</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Current Status
                  </label>
                  <select
                    name="status"
                    value={missionData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>
                        {getStatusLabel(option)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(missionData.status)}`}>
                    {getStatusLabel(missionData.status)}
                  </span>
                  {missionData.status === 'completed' && (
                    <span className="text-green-400 text-sm">✓ Mission Complete</span>
                  )}
                </div>
              </div>

              {/* Board Approval Section */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Board Approval</h3>
                <p className="text-gray-300 text-sm mb-6">All 5 board members must record their vote for mission approval</p>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(num => {
                    const member = `member${num}`;
                    const memberData = missionData.boardApproval[member];
                    
                    return (
                      <div key={member} className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-3">Board Member {num}</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                            <input
                              type="text"
                              name={`boardApproval.${member}.name`}
                              value={memberData.name}
                              onChange={handleInputChange}
                              placeholder="Board member name"
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Date</label>
                            <input
                              type="date"
                              name={`boardApproval.${member}.date`}
                              value={memberData.date}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Vote</label>
                            <select
                              name={`boardApproval.${member}.vote`}
                              value={memberData.vote}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                            >
                              <option value="">Select Vote</option>
                              <option value="approve">👍 Approve</option>
                              <option value="reject">👎 Reject</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Approval Summary */}
                <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-medium mb-3">Approval Summary</h4>
                  <div className="flex space-x-6 text-sm">
                    <span className="text-gray-300">
                      Votes Cast: <span className="text-white font-medium">
                        {Object.values(missionData.boardApproval).filter(m => m.vote).length}/5
                      </span>
                    </span>
                    <span className="text-gray-300">
                      Approvals: <span className="text-green-400 font-medium">
                        {Object.values(missionData.boardApproval).filter(m => m.vote === 'approve').length}
                      </span>
                    </span>
                    <span className="text-gray-300">
                      Rejections: <span className="text-red-400 font-medium">
                        {Object.values(missionData.boardApproval).filter(m => m.vote === 'reject').length}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Mission Progress Fields */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Mission Progress</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Date & Time Posted to Community
                    </label>
                    <input
                      type="datetime-local"
                      name="datePostedToCommunity"
                      value={missionData.datePostedToCommunity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Image Used on Post
                    </label>
                    <input
                      type="file"
                      name="imageUsedOnPost"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                    {missionData.imageUsedOnPost && (
                      <p className="text-yellow-400 text-sm mt-1">
                        ✓ {missionData.imageUsedOnPost.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Amount Raised
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400">$</span>
                      <input
                        type="number"
                        name="amountRaised"
                        value={missionData.amountRaised}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Date & Time Goal Completed
                    </label>
                    <input
                      type="datetime-local"
                      name="dateGoalCompleted"
                      value={missionData.dateGoalCompleted}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Date & Time Items Purchased
                    </label>
                    <input
                      type="datetime-local"
                      name="datePurchased"
                      value={missionData.datePurchased}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Upload Receipt (with identifying info blacked out)
                    </label>
                    <input
                      type="file"
                      name="receipt"
                      onChange={handleInputChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                    {missionData.receipt && (
                      <p className="text-yellow-400 text-sm mt-1">
                        ✓ {missionData.receipt.name}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">
                      For public mission card display
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Date Items Delivered/Completed
                    </label>
                    <input
                      type="date"
                      name="dateDelivered"
                      value={missionData.dateDelivered}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-600">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition-colors font-semibold"
            >
              Save Mission Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;

/* Board approval deployment Fri Aug  8 00:39:49 EDT 2025 */
