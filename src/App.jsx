import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyPuzzle from './components/DailyPuzzle';
import PastPuzzles from './components/PastPuzzles';
import PuzzleDetail from './components/PuzzleDetail';
import About from './components/About';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import FeedbackSection from './components/FeedbackSection';
import Header from './components/Header';
import ProjectDescription from './components/ProjectDescription';
import { AuthProvider } from './contexts/AuthContext';
import { Amplify } from 'aws-amplify';
import { ConsoleLogger } from '@aws-amplify/core';
import awsconfig from './aws-exports';

ConsoleLogger.LOG_LEVEL = 'DEBUG';

Amplify.configure(awsconfig);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-full bg-[rgb(226,24,51)] text-center py-2 text-sm text-white">
          University of Maryland
        </div>
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<DailyPuzzle />} />
            <Route path="/about" element={<About />} />
            <Route path="/past" element={<PastPuzzles />} />
            <Route path="/puzzle/:date" element={<PuzzleDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <ProjectDescription />
        <FeedbackSection />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
