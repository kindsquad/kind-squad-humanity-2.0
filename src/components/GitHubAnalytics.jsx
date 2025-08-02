import React, { useState, useEffect } from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import { useAdmin } from '../contexts/AdminContext';
import AdminLogin from './AdminLogin';

const GitHubAnalytics = ({ repositoryOwner, repositoryName, enabled = true }) => {
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    sessionDuration: 0,
    bounceRate: 0
  });
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (!enabled) return;

    // Initialize session tracking
    const sessionStart = Date.now();
    const sessionId = generateSessionId();
    
    // Track page view
    trackPageView();
    
    // Track session duration
    const trackSessionDuration = () => {
      const duration = Date.now() - sessionStart;
      updateAnalytics('sessionDuration', duration);
    };

    // Track user engagement
    const trackEngagement = () => {
      const engagementData = {
        sessionId,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };

      // Store engagement data
      storeAnalyticsData('engagement', engagementData);
    };

    // Track before page unload
    const handleBeforeUnload = () => {
      trackSessionDuration();
      trackEngagement();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Track engagement every 30 seconds
    const engagementInterval = setInterval(trackEngagement, 30000);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(engagementInterval);
      trackSessionDuration();
    };
  }, [enabled, repositoryOwner, repositoryName]);

  const generateSessionId = () => {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  const trackPageView = () => {
    const pageViewData = {
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };

    storeAnalyticsData('pageView', pageViewData);
    setAnalyticsData(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1
    }));
  };

  const updateAnalytics = (metric, value) => {
    setAnalyticsData(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const storeAnalyticsData = (type, data) => {
    // Store in localStorage
    const storageKey = `kindSquadAnalytics_${type}`;
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existingData.push(data);
    localStorage.setItem(storageKey, JSON.stringify(existingData));

    // If GitHub integration is enabled, prepare data for GitHub Issues API
    if (repositoryOwner && repositoryName) {
      prepareGitHubIssue(type, data);
    }
  };

  const prepareGitHubIssue = (type, data) => {
    // Prepare analytics data for GitHub Issues (can be used for feedback collection)
    const issueData = {
      title: `Analytics Data - ${type} - ${new Date().toLocaleDateString()}`,
      body: `
## Analytics Report

**Type:** ${type}
**Timestamp:** ${data.timestamp}
**Page:** ${data.page}

### Data
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`

### Summary
- Session tracking for Kind Squad Humanity 2.0 platform
- User engagement and behavior analytics
- Generated automatically by the platform analytics system
      `,
      labels: ['analytics', 'user-data', type]
    };

    // Store prepared issue data (can be sent to GitHub API when needed)
    const issuesData = JSON.parse(localStorage.getItem('kindSquadGitHubIssues') || '[]');
    issuesData.push(issueData);
    localStorage.setItem('kindSquadGitHubIssues', JSON.stringify(issuesData));
  };

  const exportAnalyticsData = () => {
    const allData = {
      pageViews: JSON.parse(localStorage.getItem('kindSquadAnalytics_pageView') || '[]'),
      engagement: JSON.parse(localStorage.getItem('kindSquadAnalytics_engagement') || '[]'),
      heatMap: JSON.parse(localStorage.getItem('kindSquadHeatMap') || '[]'),
      gitHubIssues: JSON.parse(localStorage.getItem('kindSquadGitHubIssues') || '[]')
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `kind-squad-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const clearAnalyticsData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data?')) {
      localStorage.removeItem('kindSquadAnalytics_pageView');
      localStorage.removeItem('kindSquadAnalytics_engagement');
      localStorage.removeItem('kindSquadHeatMap');
      localStorage.removeItem('kindSquadGitHubIssues');
      setAnalyticsData({
        pageViews: 0,
        uniqueVisitors: 0,
        sessionDuration: 0,
        bounceRate: 0
      });
    }
  };

  const toggleDashboard = () => {
    if (!isAdmin) {
      setShowAdminLogin(true);
      return;
    }
    setShowDashboard(true);
  };

  const handleExport = () => {
    if (!isAdmin) {
      setShowAdminLogin(true);
      return;
    }
    exportAnalyticsData();
  };

  const handleClear = () => {
    if (!isAdmin) {
      setShowAdminLogin(true);
      return;
    }
    clearAnalyticsData();
  };

  if (!enabled) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-40">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
          📊 Analytics Dashboard
        </h3>
        
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
          <div>Page Views: {analyticsData.pageViews}</div>
          <div>Session: {Math.round(analyticsData.sessionDuration / 1000)}s</div>
        </div>

        <div className="flex space-x-2 mt-3">
          <button
            onClick={toggleDashboard}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
            title="Open Analytics Dashboard (Admin Only)"
          >
            📈 Dashboard
          </button>
          
          <button
            onClick={handleExport}
            className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
            title="Export Analytics Data (Admin Only)"
          >
            📥 Export
          </button>
          
          <button
            onClick={handleClear}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            title="Clear Analytics Data (Admin Only)"
          >
            🗑️ Clear
          </button>
        </div>

        {repositoryOwner && repositoryName && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            GitHub: {repositoryOwner}/{repositoryName}
          </div>
        )}
      </div>

      <AnalyticsDashboard 
        isVisible={showDashboard && isAdmin}
        onClose={() => setShowDashboard(false)}
      />
      
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}
    </>
  );
};

export default GitHubAnalytics;

