import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Truck,
  Package,
  Clock,
  DollarSign,
  Activity,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
} from 'lucide-react';

export const HealthHub: React.FC = () => {
  const {
    scenario,
    isResolved,
    activeCrisesCount,
    slaHealth,
    worldModelNodesCount,
    setSubView,
    diagnosticMode,
  } = useLogistics();

  // Calculate radial stroke dash for SLA Gauge
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (slaHealth / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* 1. Global Network Health Hub Header & Top Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Clustered Incident Counter */}
        <div
          onClick={() => setSubView('pillar_3')}
          className={`p-4 bg-white border rounded-[8px] cursor-pointer hover:border-neutral-400 transition-all ${
            activeCrisesCount > 0 ? 'border-red-300' : 'border-neutral-200'
          }`}
        >
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-xs font-light">Root-Cause Incidents</span>
            <AlertTriangle
              className={`w-3.5 h-3.5 ${
                activeCrisesCount > 0 ? 'text-red-500' : 'text-neutral-400'
              }`}
            />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-light text-neutral-900 tracking-tight">
              {activeCrisesCount}
              <span className="text-xs font-light text-neutral-500 ml-1.5">
                Active {activeCrisesCount === 1 ? 'Crisis' : 'Crises'}
              </span>
            </div>
            {activeCrisesCount > 0 ? (
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded-[4px] bg-red-50 text-red-700 border border-red-200">
                Clustered from 104 alerts
              </span>
            ) : (
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded-[4px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                All Systems Nominal
              </span>
            )}
          </div>
          <div className="text-[11px] font-light text-neutral-400 mt-2 flex items-center justify-between">
            <span>AI Root-Cause Deduplication</span>
            <span className="text-neutral-600 font-mono">96% noise reduced</span>
          </div>
        </div>

        {/* Metric 2: Radial SLA Danger Gauge */}
        <div className="p-4 bg-white border border-neutral-200 rounded-[8px] flex items-center justify-between">
          <div>
            <span className="text-xs font-light text-neutral-500 block mb-1">
              Network SLA Health
            </span>
            <div className="text-2xl font-light text-neutral-900 tracking-tight">
              {slaHealth}%
            </div>
            <div className="text-[11px] font-light text-neutral-400 mt-1">
              {slaHealth > 90
                ? 'High Confidence SLA'
                : 'SLA Breach Threat Detected'}
            </div>
          </div>

          {/* Radial SVG Gauge */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="text-neutral-100"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                className={`transition-all duration-700 ${
                  slaHealth < 70
                    ? 'text-red-500'
                    : slaHealth < 90
                    ? 'text-amber-500'
                    : 'text-emerald-500'
                }`}
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[10px] font-mono font-medium text-neutral-700">
              {Math.round(slaHealth)}%
            </span>
          </div>
        </div>

        {/* Metric 3: World Model Digital Twin Status */}
        <div
          onClick={() => setSubView('pillar_1')}
          className="p-4 bg-white border border-neutral-200 rounded-[8px] cursor-pointer hover:border-neutral-400 transition-all"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-xs font-light">Verified World Model</span>
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          <div className="text-2xl font-light text-neutral-900 tracking-tight">
            {worldModelNodesCount.toLocaleString()}
            <span className="text-xs font-light text-neutral-500 ml-1.5">
              Live Nodes
            </span>
          </div>
          <div className="text-[11px] font-light text-neutral-400 mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>100% Graph Physical Alignment</span>
          </div>
        </div>

        {/* Metric 4: On-Time Rate & Cost Per Mile */}
        <div className="p-4 bg-white border border-neutral-200 rounded-[8px]">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-xs font-light">Fleet Efficiency Index</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-light text-neutral-900 tracking-tight">
              96.4%
            </div>
            <span className="text-[11px] font-mono text-emerald-700 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +1.8%
            </span>
          </div>
          <div className="text-[11px] font-light text-neutral-400 mt-2 flex justify-between">
            <span>Cost per Ton-KM:</span>
            <span className="font-mono text-neutral-700">₹7.91</span>
          </div>
        </div>
      </div>

      {/* 2. Secondary KPI Bar (Matching Reference Image 1 & 2 styles) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-neutral-200 rounded-[8px]">
          <div className="flex items-center justify-between text-[11px] font-light text-neutral-500">
            <span>Total Active Vehicles</span>
            <Truck className="w-3 h-3 text-neutral-400" />
          </div>
          <div className="text-lg font-light text-neutral-900 mt-0.5">8,234</div>
          <div className="flex gap-0.5 mt-2 h-1.5">
            {[4, 6, 8, 9, 8, 7, 6, 9, 10, 8, 7, 9].map((h, i) => (
              <span
                key={i}
                className="w-full bg-emerald-200 rounded-sm"
                style={{ height: `${h * 10}%` }}
              />
            ))}
          </div>
        </div>

        <div className="p-3 bg-white border border-neutral-200 rounded-[8px]">
          <div className="flex items-center justify-between text-[11px] font-light text-neutral-500">
            <span>Daily Deliveries</span>
            <Package className="w-3 h-3 text-neutral-400" />
          </div>
          <div className="text-lg font-light text-neutral-900 mt-0.5">10,218</div>
          <div className="flex gap-0.5 mt-2 h-1.5">
            {[7, 8, 6, 9, 10, 8, 9, 7, 8, 10, 9, 8].map((h, i) => (
              <span
                key={i}
                className="w-full bg-neutral-300 rounded-sm"
                style={{ height: `${h * 10}%` }}
              />
            ))}
          </div>
        </div>

        <div className="p-3 bg-white border border-neutral-200 rounded-[8px]">
          <div className="flex items-center justify-between text-[11px] font-light text-neutral-500">
            <span>Active Loading Docks</span>
            <Layers className="w-3 h-3 text-neutral-400" />
          </div>
          <div className="text-lg font-light text-neutral-900 mt-0.5">6 / 10</div>
          <div className="text-[10px] font-mono text-neutral-400 mt-1">60% dock utilization</div>
        </div>

        <div className="p-3 bg-white border border-neutral-200 rounded-[8px]">
          <div className="flex items-center justify-between text-[11px] font-light text-neutral-500">
            <span>Dispatch Ready Today</span>
            <Clock className="w-3 h-3 text-neutral-400" />
          </div>
          <div className="text-lg font-light text-neutral-900 mt-0.5">04 Hub Batches</div>
          <div className="text-[10px] font-mono text-emerald-600 mt-1">Cleared by Truth Engine</div>
        </div>
      </div>

      {/* 3. Operational Overview Split: Active Disruption & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Active Crisis Callout or Nominal State */}
        <div className="lg:col-span-2 p-4 bg-white border border-neutral-200 rounded-[8px] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-normal text-neutral-900 uppercase tracking-wider font-mono">
                Active Network Operational Horizon
              </h3>
              {scenario === 'scenario-2' && !isResolved && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono bg-red-100 text-red-800 rounded border border-red-300">
                  SEV-1 DISRUPTION
                </span>
              )}
            </div>
            <span className="text-[11px] font-light text-neutral-400">
              Live Feed • Polling 1,450 Node Graph
            </span>
          </div>

          {scenario === 'scenario-2' && !isResolved ? (
            <div className="p-3.5 bg-red-50/60 border border-red-200 rounded-[6px] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-medium text-red-950">
                    Truck T12 Breakdown & Overheating Stall (NH48 Highway KM 142)
                  </h4>
                  <p className="text-[11px] font-light text-red-900 mt-0.5">
                    132 parcels delayed. Cold-chain oncology medicine (Parcel #87) at risk of thermal breach in 3h 45m.
                  </p>
                </div>
                <button
                  onClick={() => setSubView('incident_context')}
                  className="px-2.5 py-1 text-xs font-light bg-red-600 hover:bg-red-700 text-white rounded-[4px] shadow-sm transition-colors shrink-0"
                >
                  Assemble Context →
                </button>
              </div>

              <div className="pt-2 border-t border-red-200/60 flex items-center justify-between text-[11px] font-light text-red-800">
                <span>Root Cause: Upstream inventory loading delay cascading into driver shift overrun</span>
                <span className="font-mono">SLA Impact: -38%</span>
              </div>
            </div>
          ) : scenario === 'scenario-3' ? (
            <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-[6px] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-medium text-amber-950">
                    Impossible State Transition Detected on Parcel #87
                  </h4>
                  <p className="text-[11px] font-light text-amber-900 mt-0.5">
                    Handheld barcode scanner attempted DELIVERED &rarr; LOADED. Lifecycle state machine blocked corrupt transition.
                  </p>
                </div>
                <button
                  onClick={() => setSubView('validation_logger')}
                  className="px-2.5 py-1 text-xs font-light bg-amber-600 hover:bg-amber-700 text-white rounded-[4px] shadow-sm transition-colors shrink-0"
                >
                  View Story Engine →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-[6px] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-xs font-normal text-emerald-950">
                    Network State Stabilized & Nominal
                  </div>
                  <div className="text-[11px] font-light text-emerald-800">
                    All entities in verified state machine compliance. Zero uncontained anomalies.
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-medium">99.4% SLA</span>
            </div>
          )}

          {/* Quick Navigation Cards to the 4 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
            <button
              onClick={() => setSubView('pillar_1')}
              className="p-2.5 text-left border border-neutral-200 hover:border-neutral-400 rounded-[6px] hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-medium text-neutral-900 bg-neutral-100 px-1.5 py-0.2 rounded">
                  Pillar 1
                </span>
                <span className="text-[9px] font-mono text-neutral-400">Semantic Level</span>
              </div>
              <div className="text-xs font-normal text-neutral-900 mt-1">ULEO & World Model</div>
              <div className="text-[10px] font-light text-neutral-500 mt-0.5">
                Standard ontology & live graph
              </div>
            </button>

            <button
              onClick={() => setSubView('pillar_2')}
              className="p-2.5 text-left border border-neutral-200 hover:border-neutral-400 rounded-[6px] hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-medium text-neutral-900 bg-neutral-100 px-1.5 py-0.2 rounded">
                  Pillar 2
                </span>
                <span className="text-[9px] font-mono text-neutral-400">Verification</span>
              </div>
              <div className="text-xs font-normal text-neutral-900 mt-1">Story Engine & Checks</div>
              <div className="text-[10px] font-light text-neutral-500 mt-0.5">
                State machines & cross-story validation
              </div>
            </button>

            <button
              onClick={() => setSubView('pillar_3')}
              className="p-2.5 text-left border border-neutral-200 hover:border-neutral-400 rounded-[6px] hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-medium text-neutral-900 bg-neutral-100 px-1.5 py-0.2 rounded">
                  Pillar 3
                </span>
                <span className="text-[9px] font-mono text-neutral-400">Diagnostic</span>
              </div>
              <div className="text-xs font-normal text-neutral-900 mt-1">Dependency & 5Q Context</div>
              <div className="text-[10px] font-light text-neutral-500 mt-0.5">
                Root cause in 15 seconds
              </div>
            </button>

            <button
              onClick={() => setSubView('pillar_4')}
              className="p-2.5 text-left border border-neutral-200 hover:border-neutral-400 rounded-[6px] hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-medium text-neutral-900 bg-neutral-100 px-1.5 py-0.2 rounded">
                  Pillar 4
                </span>
                <span className="text-[9px] font-mono text-neutral-400">Actionable</span>
              </div>
              <div className="text-xs font-normal text-neutral-900 mt-1">Decision Engine & Copilot</div>
              <div className="text-[10px] font-light text-neutral-500 mt-0.5">
                Simulate & execute 1-click recovery
              </div>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Quick System Health Feed */}
        <div className="p-4 bg-white border border-neutral-200 rounded-[8px] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h3 className="text-xs font-normal text-neutral-900 uppercase tracking-wider font-mono">
              Live Verification Feed
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-2.5 text-xs font-light">
            <div className="flex items-start gap-2">
              <span className="text-[10px] font-mono text-neutral-400 shrink-0 mt-0.5">14:29:40</span>
              <div>
                <span className="font-normal text-neutral-800">Scanner Guardrail:</span> Impossible transition blocked on Parcel #87.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[10px] font-mono text-neutral-400 shrink-0 mt-0.5">14:27:18</span>
              <div>
                <span className="font-normal text-neutral-800">Incident Copilot:</span> Context constructed in 12.4s for NH48 disruption.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[10px] font-mono text-neutral-400 shrink-0 mt-0.5">14:25:02</span>
              <div>
                <span className="font-normal text-neutral-800">ULEO Adapter:</span> 48 SAP-WMS events normalized with zero custom code.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[10px] font-mono text-neutral-400 shrink-0 mt-0.5">14:23:45</span>
              <div>
                <span className="font-normal text-neutral-800">Dependency Check:</span> Driver D-41 shift hours flagged near ceiling.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
