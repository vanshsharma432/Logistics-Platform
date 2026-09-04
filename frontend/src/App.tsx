import React from 'react';
import { LogisticsProvider, useLogistics } from './context/LogisticsContext';
import { Header } from './components/common/Header';
import { LoginModal } from './components/auth/LoginModal';
import { OpsControlTower } from './components/ops/OpsControlTower';
import { CustomerDashboard } from './components/customer/CustomerDashboard';

const AppContent: React.FC = () => {
  const { role } = useLogistics();

  // If unauthenticated, show the clean login screen
  if (!role) {
    return <LoginModal />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col selection:bg-neutral-200">
      {/* Global Navigation & Scenario Control Header */}
      <Header />

      {/* Main Role-Specific Viewport */}
      <div className="flex-1">
        {role === 'OPERATIONS_MANAGER' ? (
          <OpsControlTower />
        ) : (
          <div className="overflow-y-auto h-[calc(100vh-3.5rem)]">
            <CustomerDashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LogisticsProvider>
      <AppContent />
    </LogisticsProvider>
  );
}
