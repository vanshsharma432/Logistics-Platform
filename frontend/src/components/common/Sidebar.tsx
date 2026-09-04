import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { SubView } from '../../types/logistics';
import {
  Activity,
  GitFork,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Layers,
  Database,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface NavItem {
  id: SubView;
  label: string;
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
      label: 'Global Network Health',
      icon: Activity,
    },
    {
      id: 'uleo_stream',
      label: 'ULEO Engine',
      icon: Database,
    },
    {
      id: 'digital_twin',
      label: 'Digital Twin Graph',
      icon: GitFork,
    },
    {
      id: 'validation_logger',
      label: 'Story Engine & Validation',
      icon: CheckCircle2,
      badgeCount: scenario === 'scenario-3' ? 2 : undefined,
    },
    {
      id: 'incident_context',
      label: 'Incident Context Panel',
      icon: AlertOctagon,
      badgeCount: activeCrisesCount > 0 ? activeCrisesCount : undefined,
    },
    {
      id: 'recovery_simulator',
      label: 'Decision Sandbox',
      icon: Zap,
    },
  ];

  return (
    <aside
      className={`relative flex flex-col justify-between h-[calc(100vh-3.5rem)] bg-white border-r border-neutral-200 transition-all duration-200 ease-in-out select-none ${sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
    >
      {/* Top Menu Items */}
      <div className="p-3 space-y-1 overflow-y-auto">
        {!sidebarCollapsed && (
          <div className="px-2.5 py-1.5 text-[11px] font-medium tracking-wider text-neutral-400 uppercase font-mono">
            Operations Control Tower
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = subView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSubView(item.id)}
              title={sidebarCollapsed ? `${item.label}` : undefined}
              className={`group flex items-center w-full px-2.5 py-2 text-left text-xs rounded-[6px] transition-all ${isActive
                ? 'bg-neutral-900 text-white font-normal shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 font-light'
                }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-800'
                  } ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`}
              />

              {!sidebarCollapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <span className="truncate">{item.label}</span>
                  <div className="flex items-center gap-1.5 ml-2">
                    {item.badgeCount !== undefined && item.badgeCount > 0 && (
                      <span className="flex items-center justify-center px-1.5 py-0.2 text-[10px] font-mono font-medium rounded-[4px] bg-red-500 text-white">
                        {item.badgeCount}
                      </span>
                    )}
                  </div>
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
            <div className="text-[10px] font-mono text-neutral-400 leading-tight">
              LangGraph Multi-Agent • Closed Loop Feedback
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
