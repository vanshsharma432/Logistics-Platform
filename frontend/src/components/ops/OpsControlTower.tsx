import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { Sidebar } from '../common/Sidebar';
import { HealthHub } from './HealthHub';
import { UleoStream } from './UleoStream';
import { DigitalTwinGraph } from './DigitalTwinGraph';
import { ValidationLogger } from './ValidationLogger';
import { IncidentContext } from './IncidentContext';
import { RecoverySimulator } from './RecoverySimulator';
import { X, CheckCircle, Info } from 'lucide-react';

import { Pillar1Semantic } from './Pillar1Semantic';

export const OpsControlTower: React.FC = () => {
  const {
    subView,
    notificationMessage,
    dismissNotification,
  } = useLogistics();

  const renderActiveSubView = () => {
    switch (subView) {
      case 'health_hub':
        return <HealthHub />;
      case 'pillar_1':
        return <Pillar1Semantic />;
      case 'uleo_stream':
        return <Pillar1Semantic initialTab="uleo" />;
      case 'digital_twin':
        return <Pillar1Semantic initialTab="world_model" />;
      case 'pillar_2':
      case 'validation_logger':
        return <ValidationLogger />;
      case 'pillar_3':
      case 'incident_context':
        return <IncidentContext />;
      case 'pillar_4':
      case 'recovery_simulator':
        return <RecoverySimulator />;
      default:
        return <HealthHub />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-[#f8f9fa]">
      {/* Collapsible Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
        {/* Floating Notification Toast */}
        {notificationMessage && (
          <div className="mb-4 p-3 bg-white border border-neutral-300 rounded-[6px] shadow-sm flex items-center justify-between text-xs font-light text-neutral-800 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notificationMessage}</span>
            </div>
            <button
              onClick={dismissNotification}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Active Subview Viewport */}
        <div className="max-w-7xl mx-auto space-y-4">
          {renderActiveSubView()}
        </div>
      </main>
    </div>
  );
};
