import { useState, useEffect, useCallback } from 'react';

export const useAnalytics = (config = {}) => {
  const {
    enableHeatMap = true,
    enableGitHubIntegration = true,
    repositoryOwner = '',
    repositoryName = '',
    trackingEnabled = true
  } = config;

  const [analyticsState, setAnalyticsState] = useState({
    isTracking: trackingEnabled,
    heatMapVisible: false,
    totalClicks: 0,
    totalPageViews: 0,
    sessionStartTime: Date.now()
  });

  // Initialize analytics on mount
  useEffect(() => {
    if (!trackingEnabled) return;

    // Track initial page view
    trackPageView();
    
    // Set up performance tracking
    trackPerformance();

    // Track user agent and device info
    trackDeviceInfo();

  }, [trackingEnabled]);

  const trackPageView = useCallback(() => {
    const pageViewData = {
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      title: document.title,
      url: window.location.href
    };

    storeData('pageViews', pageViewData);
    
    setAnalyticsState(prev => ({
      ...prev,
      totalPageViews: prev.totalPageViews + 1
    }));
  }, []);

  const trackClick = useCallback((event, additionalData = {}) => {
    if (!analyticsState.isTracking) return;

    const clickData = {
      x: event.clientX,
      y: event.clientY,
      timestamp: new Date().toISOString(),
      element: event.target.tagName,
      className: event.target.className,
      id: event.target.id,
      text: event.target.textContent?.substring(0, 100),
      page: window.location.pathname,
      ...additionalData
    };

    storeData('clicks', clickData);
    
    setAnalyticsState(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1
    }));

    return clickData;
  }, [analyticsState.isTracking]);

  const trackCustomEvent = useCallback((eventName, eventData = {}) => {
    if (!analyticsState.isTracking) return;

    const customEventData = {
      eventName,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      sessionId: getSessionId(),
      ...eventData
    };

    storeData('customEvents', customEventData);
    return customEventData;
  }, [analyticsState.isTracking]);

  const trackPerformance = useCallback(() => {
    if (!window.performance) return;

    const perfData = {
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      loadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
      domContentLoaded: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart,
      firstPaint: window.performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: window.performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
    };

    storeData('performance', perfData);
  }, []);

  const trackDeviceInfo = useCallback(() => {
    const deviceData = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth
      }
    };

    storeData('deviceInfo', deviceData);
  }, []);

  const storeData = useCallback((type, data) => {
    const storageKey = `kindSquadAnalytics_${type}`;
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existingData.push(data);
    
    // Keep only last 1000 entries to prevent storage overflow
    if (existingData.length > 1000) {
      existingData.splice(0, existingData.length - 1000);
    }
    
    localStorage.setItem(storageKey, JSON.stringify(existingData));
  }, []);

  const getSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem('kindSquadSessionId');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      sessionStorage.setItem('kindSquadSessionId', sessionId);
    }
    return sessionId;
  }, []);

  const getAnalyticsData = useCallback((type = null) => {
    if (type) {
      return JSON.parse(localStorage.getItem(`kindSquadAnalytics_${type}`) || '[]');
    }

    return {
      pageViews: JSON.parse(localStorage.getItem('kindSquadAnalytics_pageViews') || '[]'),
      clicks: JSON.parse(localStorage.getItem('kindSquadAnalytics_clicks') || '[]'),
      customEvents: JSON.parse(localStorage.getItem('kindSquadAnalytics_customEvents') || '[]'),
      performance: JSON.parse(localStorage.getItem('kindSquadAnalytics_performance') || '[]'),
      deviceInfo: JSON.parse(localStorage.getItem('kindSquadAnalytics_deviceInfo') || '[]')
    };
  }, []);

  const exportAnalytics = useCallback(() => {
    const allData = getAnalyticsData();
    const exportData = {
      ...allData,
      exportTimestamp: new Date().toISOString(),
      sessionInfo: {
        sessionId: getSessionId(),
        sessionDuration: Date.now() - analyticsState.sessionStartTime,
        totalClicks: analyticsState.totalClicks,
        totalPageViews: analyticsState.totalPageViews
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `kind-squad-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }, [analyticsState, getAnalyticsData, getSessionId]);

  const clearAnalytics = useCallback(() => {
    const keys = [
      'kindSquadAnalytics_pageViews',
      'kindSquadAnalytics_clicks', 
      'kindSquadAnalytics_customEvents',
      'kindSquadAnalytics_performance',
      'kindSquadAnalytics_deviceInfo'
    ];

    keys.forEach(key => localStorage.removeItem(key));
    
    setAnalyticsState(prev => ({
      ...prev,
      totalClicks: 0,
      totalPageViews: 0,
      sessionStartTime: Date.now()
    }));
  }, []);

  const toggleTracking = useCallback(() => {
    setAnalyticsState(prev => ({
      ...prev,
      isTracking: !prev.isTracking
    }));
  }, []);

  const toggleHeatMapVisibility = useCallback(() => {
    setAnalyticsState(prev => ({
      ...prev,
      heatMapVisible: !prev.heatMapVisible
    }));
  }, []);

  return {
    // State
    analyticsState,
    
    // Tracking functions
    trackPageView,
    trackClick,
    trackCustomEvent,
    trackPerformance,
    trackDeviceInfo,
    
    // Data management
    getAnalyticsData,
    exportAnalytics,
    clearAnalytics,
    
    // Controls
    toggleTracking,
    toggleHeatMapVisibility,
    
    // Utilities
    getSessionId
  };
};

