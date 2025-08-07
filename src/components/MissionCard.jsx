import React, { useState } from 'react';

const MissionCard = ({ mission, onUpdate, onClose }) => {
  const [missionData, setMissionData] = useState({
    // Basic Info (from request)
    id: mission?.id || '',
    firstName: mission?.firstName || '',
    lastName: mission?.lastName || '',
    email: mission?.email || '',
    phone: mission?.phone || '',
    address: mission?.address || '',
    city: mission?.city || '',
    state: mission?.state || '',
    zipCode: mission?.zipCode || '',
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
    
    // Publish Status
    isPublished: mission?.isPublished || false,
    publishedDate: mission?.publishedDate || '',
    
    // Board Approval Fields
    boardApproval: mission?.boardApproval || {
      member1: { name: '', date: '', vote: '' },
      member2: { name: '', date: '', vote: '' },
      member3: { name: '', date: '', vote: '' },
      member4: { name: '', date: '', vote: '' },
      member5: { name: '', date: '', vote: '' }
    },
    
    // Anonymous Story Fields (Seth Godin Style)
    anonymousTitle: mission?.anonymousTitle || '',
    openingHook: mission?.openingHook || '',
    anonymousStory: mission?.anonymousStory || '',
    urgencyMessage: mission?.urgencyMessage || ''
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

  const handlePublish = () => {
    const publishedMission = {
      ...missionData,
      isPublished: true,
      publishedDate: new Date().toISOString().split('T')[0],
      status: 'posted' // Auto-update status to posted when published
    };
    
    onUpdate(publishedMission);
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
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={missionData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={missionData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={missionData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                        placeholder="State"
                        maxLength="2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={missionData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                      placeholder="ZIP Code"
                      maxLength="10"
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
                <p className="text-gray-400 text-sm mb-4">
                  All 5 board members must record their vote for mission approval
                </p>
                
                <div className="space-y-4">
                  {Object.entries(missionData.boardApproval).map(([memberKey, member], index) => (
                    <div key={memberKey} className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <h4 className="text-white font-medium mb-3">Board Member {index + 1}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            name={`boardApproval.${memberKey}.name`}
                            value={member.name}
                            onChange={handleInputChange}
                            placeholder="Board member name"
                            className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            name={`boardApproval.${memberKey}.date`}
                            value={member.date}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">
                            Vote
                          </label>
                          <select
                            name={`boardApproval.${memberKey}.vote`}
                            value={member.vote}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                          >
                            <option value="">Select Vote</option>
                            <option value="up">👍 Approve</option>
                            <option value="down">👎 Reject</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Board Approval Summary */}
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 mt-4">
                    <h4 className="text-yellow-400 font-medium mb-2">Approval Summary</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-300">Votes Cast:</span>
                        <span className="text-white ml-2">
                          {Object.values(missionData.boardApproval).filter(m => m.vote).length}/5
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-300">Approvals:</span>
                        <span className="text-green-400 ml-2">
                          {Object.values(missionData.boardApproval).filter(m => m.vote === 'up').length}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-300">Rejections:</span>
                        <span className="text-red-400 ml-2">
                          {Object.values(missionData.boardApproval).filter(m => m.vote === 'down').length}
                        </span>
                      </div>
                    </div>
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

          {/* Anonymous Story Section (Seth Godin Style) */}
          <div className="bg-gray-700 p-4 rounded-lg mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">📝 Anonymous Story for Homepage</h3>
            <p className="text-gray-400 text-sm mb-4">
              Create a compelling, anonymous story that protects privacy while inspiring action. Follow Seth Godin's principles: lead with emotion, make it universal, show the stakes.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Anonymous Title
                </label>
                <input
                  type="text"
                  name="anonymousTitle"
                  value={missionData.anonymousTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., When Cancer Steals Everything, Keeping the Lights On"
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Universal situation everyone can understand (no names)
                </p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Opening Hook
                </label>
                <textarea
                  name="openingHook"
                  value={missionData.openingHook}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="e.g., The call came at 3 AM. 'Your house is on fire.'"
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                />
                <p className="text-gray-400 text-xs mt-1">
                  The moment everything changed - grab attention immediately
                </p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Anonymous Story
                </label>
                <textarea
                  name="anonymousStory"
                  value={missionData.anonymousStory}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell the human story without revealing identity. Focus on universal experiences and emotions that create connection."
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Build understanding and empathy without invasion of privacy
                </p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Urgency Message
                </label>
                <input
                  type="text"
                  name="urgencyMessage"
                  value={missionData.urgencyMessage}
                  onChange={handleInputChange}
                  placeholder="e.g., Eviction notice: 14 days. Disconnection scheduled: 7 days."
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Create urgency without manipulation - show real stakes
                </p>
              </div>

              {/* Story Preview */}
              {(missionData.anonymousTitle || missionData.openingHook || missionData.anonymousStory) && (
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">📖 Story Preview:</h4>
                  <div className="text-gray-200 text-sm space-y-2">
                    {missionData.anonymousTitle && (
                      <div>
                        <strong className="text-white">
                          Mission {(() => {
                            // Generate mission number starting from 177
                            const baseNumber = 177;
                            const idNumber = missionData.id?.replace(/[^0-9]/g, '');
                            return idNumber ? (baseNumber + parseInt(idNumber) - 1) : baseNumber;
                          })()}: {missionData.anonymousTitle}
                        </strong>
                      </div>
                    )}
                    {missionData.openingHook && (
                      <div className="italic text-gray-300">
                        {missionData.openingHook}
                      </div>
                    )}
                    {missionData.anonymousStory && (
                      <div className="whitespace-pre-line">
                        {missionData.anonymousStory}
                      </div>
                    )}
                    {missionData.urgencyMessage && (
                      <div className="text-orange-400 font-medium">
                        {missionData.urgencyMessage}
                      </div>
                    )}
                    
                    {/* Community Math Section */}
                    <div className="mt-4 bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                      <div className="text-yellow-400 font-semibold mb-2">The Math:</div>
                      <div className="space-y-1 text-sm">
                        <div>${missionData.amount?.toLocaleString() || '0'} needed</div>
                        <div>Kind Squad: 2,647 members strong</div>
                        <div className="text-yellow-400 font-medium">
                          The Ask: {Math.ceil((missionData.amount || 0) / 5)} people × $5 each = Mission Complete
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6 pt-6 border-t border-gray-600">
            {/* Publish Status Indicator */}
            <div className="flex items-center space-x-2">
              {missionData.isPublished ? (
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                    ✓ Published to Homepage
                  </span>
                  <span className="text-gray-400 text-sm">
                    {missionData.publishedDate && new Date(missionData.publishedDate).toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <span className="px-3 py-1 bg-gray-600 text-gray-300 rounded-full text-sm">
                  Not Published
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition-colors font-semibold"
              >
                Save Mission
              </button>
              {!missionData.isPublished && (
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors font-semibold"
                >
                  📢 Publish to Homepage
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;

