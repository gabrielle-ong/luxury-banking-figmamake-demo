import { useState } from "react";
import { OnboardingView } from "./components/OnboardingView";
import { DashboardView } from "./components/DashboardView";
import { WealthAdvisoryView } from "./components/WealthAdvisoryView";
import { FamilyWealthView } from "./components/FamilyWealthView";
import { ConciergeView } from "./components/ConciergeView";
import { BankMapView } from "./components/BankMapView";
import { AdvisorView } from "./components/AdvisorView";
import { BottomNav } from "./components/BottomNav";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from "./components/ui/sonner";

type ViewType = 'onboarding' | 'dashboard' | 'wealth' | 'family' | 'concierge' | 'map' | 'advisor';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('onboarding');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const showBottomNav = hasCompletedOnboarding && currentView !== 'onboarding';

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'onboarding' && (
            <OnboardingView onComplete={handleOnboardingComplete} />
          )}

          {currentView === 'dashboard' && (
            <DashboardView 
              userName="Khun Somchai"
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'wealth' && (
            <WealthAdvisoryView onBack={handleBackToDashboard} />
          )}

          {currentView === 'family' && (
            <FamilyWealthView onBack={handleBackToDashboard} />
          )}

          {currentView === 'concierge' && (
            <ConciergeView onBack={handleBackToDashboard} />
          )}

          {currentView === 'map' && (
            <BankMapView onBack={handleBackToDashboard} />
          )}

          {currentView === 'advisor' && (
            <AdvisorView onBack={handleBackToDashboard} />
          )}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && (
        <BottomNav currentView={currentView} onNavigate={handleNavigate} />
      )}
      
      <Toaster />
    </div>
  );
}
