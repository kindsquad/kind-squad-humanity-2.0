import React, { useEffect, useRef, useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import AdminLogin from './AdminLogin';

const HeatMapTracker = ({ children, onDataCollected }) => {
  const containerRef = useRef(null);
  const [heatMapData, setHeatMapData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track click events
    const handleClick = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const clickData = {
        x: Math.round(x),
        y: Math.round(y),
        timestamp: new Date().toISOString(),
        type: 'click',
        element: event.target.tagName,
        className: event.target.className,
        id: event.target.id,
        page: window.location.pathname,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };

      setHeatMapData(prev => [...prev, clickData]);
      
      // Send to parent component or analytics service
      if (onDataCollected) {
        onDataCollected(clickData);
      }

      // Store in localStorage for persistence
      const existingData = JSON.parse(localStorage.getItem('kindSquadHeatMap') || '[]');
      existingData.push(clickData);
      localStorage.setItem('kindSquadHeatMap', JSON.stringify(existingData));
    };

    // Track scroll events
    const handleScroll = () => {
      const scrollData = {
        scrollY: window.scrollY,
        scrollX: window.scrollX,
        timestamp: new Date().toISOString(),
        type: 'scroll',
        page: window.location.pathname,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };

      if (onDataCollected) {
        onDataCollected(scrollData);
      }
    };

    // Track mouse movement (throttled)
    let mouseMoveTimeout;
    const handleMouseMove = (event) => {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const moveData = {
          x: Math.round(x),
          y: Math.round(y),
          timestamp: new Date().toISOString(),
          type: 'mousemove',
          page: window.location.pathname,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        };

        if (onDataCollected) {
          onDataCollected(moveData);
        }
      }, 100); // Throttle to every 100ms
    };

    container.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseMoveTimeout);
    };
  }, [onDataCollected]);

  // Toggle heat map visualization (admin only)
  const toggleHeatMap = () => {
    if (!isAdmin) {
      setShowAdminLogin(true);
      return;
    }
    setIsVisible(!isVisible);
  };

  // Render heat map overlay (admin only)
  const renderHeatMapOverlay = () => {
    if (!isVisible || !isAdmin) return null;

    const storedData = JSON.parse(localStorage.getItem('kindSquadHeatMap') || '[]');
    const clickData = storedData.filter(item => item.type === 'click' && item.page === window.location.pathname);

    return (
      <div className="fixed inset-0 pointer-events-none z-50" style={{ background: 'rgba(0,0,0,0.1)' }}>
        {clickData.map((point, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-red-500 opacity-60"
            style={{
              left: point.x - 5,
              top: point.y - 5,
              width: '10px',
              height: '10px',
              transform: 'translate(-50%, -50%)'
            }}
            title={`Click at ${point.x}, ${point.y} on ${new Date(point.timestamp).toLocaleString()}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative">
      {children}
      {renderHeatMapOverlay()}
      
      {/* Heat Map Control Button - Only show for admins */}
      {isAdmin && (
        <button
          onClick={toggleHeatMap}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-50"
          title="Toggle Heat Map Visualization (Admin Only)"
        >
          {isVisible ? '🔥 Hide Heat Map' : '📊 Show Heat Map'}
        </button>
      )}
      
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}
    </div>
  );
};

export default HeatMapTracker;

