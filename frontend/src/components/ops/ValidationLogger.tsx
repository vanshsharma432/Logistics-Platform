import React, { useState } from 'react';
import { transitionCheckItems, consistencyComparisons } from '../../lib/mockData';
import { useLogistics } from '../../context/LogisticsContext';
import {
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  GitCommit,
  Split,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ValidationLogger: React.FC = () => {
  const { scenario } = useLogistics();
  const [activeTab, setActiveTab] = useState<'transitions' | 'cross_entity'>('transitions');

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-normal text-neutral-900 tracking-tight">
              Logistics Story Engine & Active Validation Logger
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-[4px] bg-neutral-100 text-neutral-600 border border-neutral-200">
              Pillars 4 & 8: Logical State Verification & Physical Validation
            </span>
          </div>
          <p className="text-xs font-light text-neutral-500 mt-0.5">
            Cross-entity mathematical invariants that catch impossible lifecycle transitions and scanner errors before departure
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-[6px] border border-neutral-200">
          <button
            onClick={() => setActiveTab('transitions')}
            className={`px-3 py-1 text-xs rounded-[4px] transition-all ${
              activeTab === 'transitions'
                ? 'bg-white text-neutral-900 font-normal shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800 font-light'
            }`}
          >
            Transition Checker
          </button>
          <button
            onClick={() => setActiveTab('cross_entity')}
            className={`px-3 py-1 text-xs rounded-[4px] transition-all ${
              activeTab === 'cross_entity'
                ? 'bg-white text-neutral-900 font-normal shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800 font-light'
            }`}
          >
            Cross-Entity Consistency
          </button>
        </div>
      </div>

      {activeTab === 'transitions' ? (
        /* Tab 1: Transition Checker View */
        <div className="space-y-3">
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-[6px] text-xs font-light text-neutral-600 flex items-center justify-between">
            <span>
              <strong className="font-normal text-neutral-900">Finite State Machine Engine:</strong> Evaluates all physical scanner events against directed acyclic graph lifecycles.
            </span>
            <span className="font-mono text-[11px] text-neutral-500">
              Enforcing Non-Reversible Terminal Constraints
            </span>
          </div>

          <div className="space-y-3">
            {transitionCheckItems.map((item) => {
              const isCritical = item.status === 'CRITICAL_ERROR';
              const isFlagged = item.status === 'FLAGGED';

              return (
                <div
                  key={item.id}
                  className={`p-4 bg-white border rounded-[8px] transition-all ${
                    isCritical
                      ? 'border-red-300 bg-red-50/20'
                      : isFlagged
                      ? 'border-amber-300 bg-amber-50/20'
                      : 'border-neutral-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      {isCritical ? (
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                      ) : isFlagged ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      )}
                      <span className="text-xs font-normal text-neutral-900">
                        {item.entityName}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-neutral-100 rounded text-neutral-600">
                        {item.entityId}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-neutral-400">
                        {item.timestamp}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] border ${
                          isCritical
                            ? 'bg-red-100 text-red-800 border-red-200 font-medium'
                            : isFlagged
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Transition attempted */}
                  <div className="my-2 p-2.5 bg-neutral-50 rounded-[6px] border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs">
                      <span className="text-neutral-400 mr-2 font-mono">Attempted:</span>
                      <span className="font-mono font-medium text-neutral-900">
                        {item.attemptedTransition}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-neutral-500">
                      {item.detectedRule}
                    </div>
                  </div>

                  <p className="text-xs font-light text-neutral-600 mt-2 leading-relaxed">
                    {item.details}
                  </p>

                  {/* Allowed lifecycles strip */}
                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto text-[10px] font-mono text-neutral-400">
                    <span className="shrink-0">Canonical FSM:</span>
                    {item.validLifecycles.map((cycle, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 bg-neutral-50 rounded border border-neutral-200 text-neutral-600 shrink-0"
                      >
                        {cycle}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Tab 2: Cross-Entity Consistency Monitor */
        <div className="space-y-3">
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-[6px] text-xs font-light text-neutral-600">
            <strong className="font-normal text-neutral-900">Cross-Story Verification:</strong> Simultaneously traces the separate lifecycles of Parcels, Trucks, Drivers, and Facilities to guarantee mutual consistency.
          </div>

          <div className="space-y-3">
            {consistencyComparisons.map((comp) => {
              return (
                <div
                  key={comp.id}
                  className={`p-4 bg-white border rounded-[8px] space-y-3 ${
                    comp.isConflict ? 'border-amber-300 bg-amber-50/10' : 'border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <h4 className="text-xs font-normal text-neutral-900">
                      {comp.title}
                    </h4>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        comp.isConflict
                          ? 'bg-amber-100 text-amber-900 border-amber-300 font-medium'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {comp.isConflict ? 'STORY CONFLICT FLAGGED' : 'STORIES ALIGNED'}
                    </span>
                  </div>

                  {/* Side-by-side Entity comparison lines */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Entity A */}
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-[6px]">
                      <div className="text-xs font-medium text-neutral-900 mb-1">
                        Line 1: {comp.entityA.label}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-600">
                        {comp.entityA.code}
                      </div>
                    </div>

                    {/* Entity B */}
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-[6px]">
                      <div className="text-xs font-medium text-neutral-900 mb-1">
                        Line 2: {comp.entityB.label}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-600">
                        {comp.entityB.code}
                      </div>
                    </div>
                  </div>

                  {/* Conflict description prompt */}
                  {comp.isConflict && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-[6px] text-xs font-light text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div>{comp.conflictDescription}</div>
                        <div className="mt-1 text-[11px] font-mono text-amber-700">
                          Recommended Truth Engine Action: {comp.resolutionHint}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
