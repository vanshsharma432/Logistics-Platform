import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { DemoScenario } from '../../types/logistics';
import {
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  UserCheck,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Activity,
  Layers,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    role,
    userEmail,
    scenario,
    setScenario,
    resetDemo,
    diagnosticMode,
    toggleDiagnosticMode,
    sidebarCollapsed,
    toggleSidebar,
    logout,
    login,
  } = useLogistics();

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScenario(e.target.value as DemoScenario);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white border-b border-neutral-200 select-none">
      {/* Left side: Sidebar Toggle & Brand Title */}
      <div className="flex items-center gap-3">
        {role === 'OPERATIONS_MANAGER' && (
          <button
            onClick={toggleSidebar}
            title={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-[6px] transition-colors"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 bg-neutral-900 text-white rounded-[6px] font-mono text-xs font-medium tracking-tight">
            Æ
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-normal tracking-tight text-neutral-900">
                AETHER
              </span>
              <span className="text-[11px] font-light text-neutral-400 font-mono tracking-wider">
                TRUTH ENGINE
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Context Tag */}
        <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-neutral-200">
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-50 border border-neutral-200 rounded-[6px] text-xs font-light text-neutral-600">
            <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
            LangGraph Closed-Loop Verified
          </span>
        </div>
      </div>

      {/* Right side: Scenario Switcher, Diagnostic Toggle, Reset & Role Profile */}
      <div className="flex items-center gap-2.5">
        {/* Scenario Selector Dropdown */}
        <div className="relative flex items-center">
          <label htmlFor="scenario-select" className="sr-only">Demo Scenario</label>
          <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-[6px] px-2 py-1 hover:border-neutral-300 transition-colors">
            <span className="text-xs font-light text-neutral-400 mr-1.5">Demo:</span>
            <select
              id="scenario-select"
              value={scenario}
              onChange={handleScenarioChange}
              className="bg-transparent text-xs font-normal text-neutral-800 pr-5 appearance-none cursor-pointer focus:outline-none"
            >
              <option value="scenario-1">Scenario 1: Baseline (Normal Ops)</option>
              <option value="scenario-2">Scenario 2: NH48 Truck Breakdown</option>
              <option value="scenario-3">Scenario 3: Impossible State Transition</option>
            </select>
            <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 pointer-events-none" />
          </div>
        </div>

        {/* Diagnostic Mode Toggle (Ops view only) */}
        {role === 'OPERATIONS_MANAGER' && (
          <button
            onClick={toggleDiagnosticMode}
            title="Toggle between standard network monitoring and deep story/dependency verification mode"
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-light rounded-[6px] border transition-all ${
              diagnosticMode
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden sm:inline">Diagnostic Mode</span>
            {diagnosticMode && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>
        )}

        {/* Reset Demo Button */}
        <button
          onClick={resetDemo}
          title="Reset modified demo state without page reload"
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-light text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 rounded-[6px] transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-neutral-500" />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>

        <div className="h-4 w-[1px] bg-neutral-200 mx-1" />

        {/* Role & User info */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden lg:block">
            <div className="text-xs font-normal text-neutral-900 leading-tight">
              {role === 'OPERATIONS_MANAGER' ? 'Ops Controller' : 'Customer Account'}
            </div>
            <div className="text-[10px] font-light text-neutral-400 truncate max-w-[140px]">
              {userEmail}
            </div>
          </div>

          {/* Quick role toggle button (convenient for hackathon presentation) */}
          <button
            onClick={() => {
              if (role === 'OPERATIONS_MANAGER') {
                login('customer@gmail.com');
              } else {
                login('ops.controller@company.com');
              }
            }}
            title={`Currently in ${role === 'OPERATIONS_MANAGER' ? 'Operations' : 'Customer'} view. Click to quick-switch.`}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-light border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 rounded-[6px] text-neutral-700 transition-colors"
          >
            <UserCheck className="w-3 h-3 text-neutral-500" />
            <span className="hidden sm:inline">
              Switch to {role === 'OPERATIONS_MANAGER' ? 'Customer' : 'Ops Tower'}
            </span>
          </button>

          {/* Logout button */}
          <button
            onClick={logout}
            title="Log out to Auth Screen"
            className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-[6px] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
