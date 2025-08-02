import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const AnalyticsDashboard = ({ isVisible, onClose }) => {
  const analytics = useAnalytics();
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    if (isVisible) {
      const data = analytics.getAnalyticsData();
      setAnalyticsData(data);
    }
  }, [isVisible, analytics]);

  if (!isVisible) return null;

  const renderOverview = () => {
    const totalClicks = analyticsData.clicks?.length || 0;
    const totalPageViews = analyticsData.pageViews?.length || 0;
    const totalCustomEvents = analyticsData.customEvents?.length || 0;
    const sessionDuration = Math.round((Date.now() - analytics.analyticsState.sessionStartTime) / 1000);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Analytics Overview</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{totalPageViews}</div>
            <div className="text-sm text-blue-600 dark:text-blue-300">Page Views</div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">{totalClicks}</div>
            <div className="text-sm text-green-600 dark:text-green-300">Total Clicks</div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">{totalCustomEvents}</div>
            <div className="text-sm text-purple-600 dark:text-purple-300">Custom Events</div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">{sessionDuration}s</div>
            <div className="text-sm text-orange-600 dark:text-orange-300">Session Time</div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Recent Activity</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {analyticsData.clicks?.slice(-5).reverse().map((click, index) => (
              <div key={index} className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Click:</span> {click.element} at ({click.x}, {click.y}) - {new Date(click.timestamp).toLocaleTimeString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHeatMap = () => {
    const clickData = analyticsData.clicks || [];
    const currentPageClicks = clickData.filter(click => click.page === window.location.pathname);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Heat Map Data</h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-white">Current Page Clicks: {currentPageClicks.length}</h4>
            <button
              onClick={analytics.toggleHeatMapVisibility}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              {analytics.analyticsState.heatMapVisible ? 'Hide' : 'Show'} Heat Map
            </button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {currentPageClicks.slice(-10).reverse().map((click, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  {click.element} ({click.x}, {click.y})
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(click.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Most Clicked Elements</h4>
          {(() => {
            const elementCounts = {};
            currentPageClicks.forEach(click => {
              const key = click.element + (click.className ? `.${click.className}` : '');
              elementCounts[key] = (elementCounts[key] || 0) + 1;
            });
            
            return Object.entries(elementCounts)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([element, count]) => (
                <div key={element} className="flex justify-between text-sm text-yellow-700 dark:text-yellow-300">
                  <span>{element}</span>
                  <span>{count} clicks</span>
                </div>
              ));
          })()}
        </div>
      </div>
    );
  };

  const renderPerformance = () => {
    const performanceData = analyticsData.performance || [];
    const latestPerf = performanceData[performanceData.length - 1];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Performance Metrics</h3>
        
        {latestPerf && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-300">{latestPerf.loadTime}ms</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Page Load Time</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <div className="text-xl font-bold text-green-600 dark:text-green-300">{latestPerf.domContentLoaded}ms</div>
              <div className="text-sm text-green-600 dark:text-green-300">DOM Content Loaded</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-300">{Math.round(latestPerf.firstPaint)}ms</div>
              <div className="text-sm text-purple-600 dark:text-purple-300">First Paint</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
              <div className="text-xl font-bold text-orange-600 dark:text-orange-300">{Math.round(latestPerf.firstContentfulPaint)}ms</div>
              <div className="text-sm text-orange-600 dark:text-orange-300">First Contentful Paint</div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Performance History</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {performanceData.slice(-5).reverse().map((perf, index) => (
              <div key={index} className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">{perf.page}:</span> {perf.loadTime}ms load time - {new Date(perf.timestamp).toLocaleTimeString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderExport = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Data Management</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Export Data</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              Download all analytics data as a JSON file for external analysis or backup.
            </p>
            <button
              onClick={analytics.exportAnalytics}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              📥 Export Analytics Data
            </button>
          </div>

          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">GitHub Integration</h4>
            <p className="text-sm text-green-700 dark:text-green-300 mb-3">
              Analytics data is prepared for GitHub Issues integration. Repository: kindsquad/humanity-2.0
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              Data is automatically formatted for GitHub Issues API when collected.
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Clear Data</h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              Remove all stored analytics data. This action cannot be undone.
            </p>
            <button
              onClick={analytics.clearAnalytics}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              🗑️ Clear All Data
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Tracking Control</h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={analytics.toggleTracking}
                className={`px-4 py-2 rounded transition-colors ${
                  analytics.analyticsState.isTracking 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                {analytics.analyticsState.isTracking ? '⏸️ Pause Tracking' : '▶️ Resume Tracking'}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Status: {analytics.analyticsState.isTracking ? 'Active' : 'Paused'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Kind Squad Analytics Dashboard</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'heatmap', label: '🔥 Heat Map' },
            { id: 'performance', label: '⚡ Performance' },
            { id: 'export', label: '💾 Export' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'heatmap' && renderHeatMap()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'export' && renderExport()}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

