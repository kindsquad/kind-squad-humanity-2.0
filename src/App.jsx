import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import MissionSpotlight from './components/MissionSpotlight'
import AnnualMissions from './components/AnnualMissions'
import Footer from './components/Footer'
import AdminDashboard from './pages/AdminDashboard'
import MemberDashboard from './pages/MemberDashboard'
import ChapterDashboard from './pages/ChapterDashboard'
import Missions from './pages/Missions'
import './App.css'

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Hero Section - Black background */}
      <div className="bg-black">
        <Hero />
      </div>
      {/* Mission Spotlight - Very Dark Background */}
      <div style={{backgroundColor: '#0c0c0c'}} className="py-8 md:py-12">
        <MissionSpotlight />
      </div>
      {/* Annual Missions - Black background */}
      <div className="bg-black">
        <AnnualMissions />
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/chapter" element={<ChapterDashboard />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/request-help" element={<div className="min-h-screen bg-black text-white p-8"><h1>Request Help - Coming Soon</h1></div>} />
        <Route path="/start-chapter" element={<div className="min-h-screen bg-black text-white p-8"><h1>Start a Chapter - Coming Soon</h1></div>} />
        <Route path="/events" element={<div className="min-h-screen bg-black text-white p-8"><h1>Events - Coming Soon</h1></div>} />
      </Routes>
    </Router>
  )
}

export default App