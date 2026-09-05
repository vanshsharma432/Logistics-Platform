import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { SubView } from '../../types/logistics';
import {
  Activity,
  Database,
  CheckCircle2,
  AlertOctagon,
  Zap,
} from 'lucide-react';

interface NavItem {
  id: SubView;
  pillarTitle: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
}

export const Sidebar: React.FC = () => {
  const {
    subView,
    setSubView,
    sidebarCollapsed,
    activeCrisesCount,
    scenario,
  } = useLogistics();

  const navItems: NavItem[] = [
    {
      id: 'health_hub',
      pillarTitle: 'Global Network Health',
      subtitle: 'NOC Flight Control',
      icon: Activity,
    },
    {
      id: 'pillar_1',
      pillarTitle: 'The Semantic Level',
      subtitle: 'ULEO & World Model',
      icon: Database,
    },
    {
      id: 'pillar_2',
      pillarTitle: 'The Verification Level',
      subtitle: 'State Machines & Story Engine',
      icon: CheckCircle2,
      badgeCount: scenario === 'scenario-3' ? 2 : undefined,
    },
    {
      id: 'pillar_3',
      pillarTitle: 'The Diagnostic Level',
      subtitle: 'Dependency & 5Q Context',
      icon: AlertOctagon,
      badgeCount: activeCrisesCount > 0 ? activeCrisesCount : undefined,
    },
    {
      id: 'pillar_4',
      pillarTitle: 'The Actionable Level',
      subtitle: 'Decision Engine & Simulator',
      icon: Zap,
    },
  ];

  // Helper to determine if item is active
  const isItemActive = (id: SubView) => {
    if (subView === id) return true;
    if (id === 'pillar_1' && (subView === 'uleo_stream' || subView === 'digital_twin')) return true;
    if (id === 'pillar_2' && subView === 'validation_logger') return true;
    if (id === 'pillar_3' && subView === 'incident_context') return true;
    if (id === 'pillar_4' && subView === 'recovery_simulator') return true;
    return false;
  };

  return (
    <aside
      className={`relative flex flex-col justify-between h-[calc(100vh-3.5rem)] bg-white border-r border-neutral-200 transition-all duration-200 ease-in-out select-none ${sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
    >
      {/* Top Menu Items */}
      <div className="p-3 space-y-1 overflow-y-auto">
        {!sidebarCollapsed}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item.id);

          return (
            <button
              key={item.id}
              onClick={() => setSubView(item.id)}
              title={sidebarCollapsed ? `${item.pillarTitle}` : undefined}
              className={`group flex items-center w-full px-2.5 py-2.5 text-left rounded-[6px] transition-all ${isActive
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 font-light'
                }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-800'
                  } ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`}
              />

              {!sidebarCollapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <div className="truncate">
                    <div className="flex items-center gap-1.5 leading-tight">
                      <span className={`text-xs ${isActive ? 'font-medium text-white' : 'font-normal text-neutral-900'}`}>
                        {item.pillarTitle}
                      </span>
                    </div>
                    <div
                      className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-neutral-300 font-light' : 'text-neutral-400 font-light'
                        }`}
                    >
                      {item.subtitle}
                    </div>
                  </div>

                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span className="flex items-center justify-center px-1.5 py-0.2 text-[10px] font-mono font-medium rounded-[4px] bg-red-500 text-white ml-2 shrink-0">
                      {item.badgeCount}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer / System Status */}
      <div className="p-3 border-t border-neutral-100 bg-neutral-50/70">
        {!sidebarCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-light text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                World Model Sync
              </span>
              <span className="font-mono text-neutral-700">1,450 Nodes</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="1,450 Verified Nodes Online">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
};
