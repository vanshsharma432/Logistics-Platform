import React, { useState } from 'react';
import { recoveryPathways } from '../../lib/mockData';
import { useLogistics } from '../../context/LogisticsContext';
import {
  Zap,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  BarChart3,
} from 'lucide-react';

export const RecoverySimulator: React.FC = () => {
  const {
    isResolved,
    approveAndExecuteRecovery,
    setSubView,
  } = useLogistics();

  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-b');
  const activePathway = recoveryPathways.find((p) => p.id === selectedOptionId) || recoveryPathways[1];

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-normal text-neutral-900 tracking-tight">
              Recovery Simulator & Decision Sandbox
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-[4px] bg-neutral-100 text-neutral-600 border border-neutral-200">
              Pillar 4: Alert Fatigue vs. Simulated Recovery (The Actionable Level)
            </span>
          </div>
          <p className="text-xs font-light text-neutral-500 mt-0.5">
            Incident Clustering, Incident Copilot &amp; Decision Engine: Digitally simulate recovery futures and execute with a single click
          </p>
        </div>

        {isResolved ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-[6px] text-emerald-900 text-xs font-light">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Pathway Executed: Fleet Dispatched & Customer Notified</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-light text-neutral-500">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>3 Modeled Futures Ready</span>
          </div>
        )}
      </div>

      {/* Comparative Pathway Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recoveryPathways.map((opt) => {
          const isCurrentSelected = selectedOptionId === opt.id;
          const isThisExecuted = isResolved && opt.isRecommended;

          return (
            <div
              key={opt.id}
              onClick={() => setSelectedOptionId(opt.id)}
              className={`p-4 rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between ${
                isThisExecuted
                  ? 'bg-emerald-50/40 border-emerald-400 ring-1 ring-emerald-400'
                  : isCurrentSelected
                  ? 'bg-neutral-50 border-neutral-900 shadow-sm ring-1 ring-neutral-900'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Pathway Option
                  </span>
                  {opt.isRecommended && (
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-neutral-900 text-white font-normal">
                      ★ AI Recommended
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-medium text-neutral-900 mb-1">
                  {opt.title}
                </h3>
                <div className="text-[11px] font-light text-neutral-500 mb-3">
                  {opt.subtitle}
                </div>

                <p className="text-xs font-light text-neutral-600 leading-relaxed mb-4">
                  {opt.description}
                </p>

                {/* Metrics Breakdown */}
                <div className="space-y-2 pt-3 border-t border-neutral-100 text-xs font-light">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      Delay Impact:
                    </span>
                    <span className="font-mono text-neutral-900 font-normal">
                      {opt.delayImpact}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3 text-neutral-400" />
                      Cost Trade-off:
                    </span>
                    <span className="font-mono text-neutral-900 font-normal">
                      {opt.costImpact}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-neutral-400" />
                      SLA Protection:
                    </span>
                    <span
                      className={`font-mono font-medium ${
                        opt.slaProtection >= 90
                          ? 'text-emerald-700'
                          : opt.slaProtection >= 70
                          ? 'text-amber-700'
                          : 'text-red-700'
                      }`}
                    >
                      {opt.slaProtection}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-neutral-100">
                {opt.isRecommended ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      approveAndExecuteRecovery(opt.id);
                    }}
                    disabled={isResolved}
                    className={`w-full py-2 px-3 text-xs rounded-[6px] font-normal transition-all flex items-center justify-center gap-2 shadow-sm ${
                      isResolved
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-neutral-900 hover:bg-black text-white'
                    }`}
                  >
                    {isResolved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Route Dispatched & Verified</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Approve & Execute Pathway</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedOptionId(opt.id)}
                    className="w-full py-2 px-3 text-xs rounded-[6px] border border-neutral-200 text-neutral-600 hover:bg-neutral-100 font-light transition-colors"
                  >
                    {isCurrentSelected ? 'Simulating Pathway' : 'Select to Simulate'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* "Simulate Future" Visualizer: Chart Overlay */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-neutral-500" />
            <h3 className="text-xs font-normal text-neutral-900 uppercase tracking-wider font-mono">
              Simulate Future Visualizer: Downstream Congestion Impact
            </h3>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            Simulating: {activePathway.title}
          </span>
        </div>

        <p className="text-xs font-light text-neutral-500">
          Evaluates secondary bottleneck cascades at downstream sorting docks before authorizing physical vehicle movements.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {activePathway.simulatedHubCongestion.map((hub) => {
            return (
              <div
                key={hub.hub}
                className="p-3 bg-neutral-50 border border-neutral-200 rounded-[6px] space-y-2"
              >
                <div className="flex justify-between text-xs font-normal text-neutral-900">
                  <span>{hub.hub}</span>
                  <span className="font-mono text-neutral-600">
                    {hub.simulated}% Projected Load
                  </span>
                </div>

                {/* Bar Visualizer */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>Baseline: {hub.baseline}%</span>
                    <span>Simulated: {hub.simulated}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-[2px] overflow-hidden flex">
                    <div
                      className="bg-neutral-400 h-full"
                      style={{ width: `${hub.baseline}%` }}
                      title={`Baseline: ${hub.baseline}%`}
                    />
                    <div
                      className={`h-full ${
                        hub.simulated > 85 ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.max(0, hub.simulated - hub.baseline)}%` }}
                      title={`Added Congestion: ${hub.simulated - hub.baseline}%`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
