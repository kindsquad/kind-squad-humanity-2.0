import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MissionSpotlight from './components/MissionSpotlight';
import AnnualMissions from './components/AnnualMissions';
import Footer from './components/Footer';
import HeatMapTracker from './components/HeatMapTracker';
import GitHubAnalytics from './components/GitHubAnalytics';
import { useAnalytics } from './hooks/useAnalytics';
import './App.css';

function HomePage() {
  const analytics = useAnalytics({
    enableHeatMap: true,
    enableGitHubIntegration: true,
    repositoryOwner: 'kindsquad', // Replace with actual GitHub username
    repositoryName: 'humanity-2.0', // Replace with actual repository name
    trackingEnabled: true
  });

  const handleAnalyticsData = (data) => {
    // Handle analytics data collection
    console.log('Analytics data collected:', data);
  };

  return (
    <HeatMapTracker onDataCollected={handleAnalyticsData}>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Navigation />
        
        {/* Hero Section */}
        <section id="hero" className="bg-black dark:bg-black light:bg-white transition-colors duration-300">
          <Hero />
        </section>

        {/* Mission Spotlight Section */}
        <section 
          id="mission-spotlight" 
          className="transition-colors duration-300"
          style={{ backgroundColor: 'var(--mission-spotlight-bg, #0c0c0c)' }}
        >
          <MissionSpotlight />
        </section>

        {/* Annual Missions Section */}
        <section id="annual-missions" className="bg-black dark:bg-black light:bg-white transition-colors duration-300">
          <AnnualMissions />
        </section>

        {/* Footer */}
        <Footer />

        {/* Analytics Components */}
        <GitHubAnalytics 
          repositoryOwner="kindsquad"
          repositoryName="humanity-2.0"
          enabled={true}
        />
      </div>
    </HeatMapTracker>
  );
}

function App() {
  return (
    <AdminProvider>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;

