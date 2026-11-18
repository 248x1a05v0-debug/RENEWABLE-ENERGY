/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './hooks/useAppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FirebaseGuideModal } from './components/FirebaseGuideModal';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { SolarGuidePage } from './pages/SolarGuidePage';
import { BiomassPage } from './pages/BiomassPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { LearningCenterPage } from './pages/LearningCenterPage';
import { TeluguCenterPage } from './pages/TeluguCenterPage';
import { QuizPage } from './pages/QuizPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { DashboardPage } from './pages/DashboardPage';

function MainLayout() {
  const { currentPage } = useAppContext();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'calculator':
        return <CalculatorPage />;
      case 'solar':
        return <SolarGuidePage />;
      case 'biomass':
        return <BiomassPage />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'learning':
        return <LearningCenterPage />;
      case 'telugu':
        return <TeluguCenterPage />;
      case 'quiz':
        return <QuizPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <FirebaseGuideModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
