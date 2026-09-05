import React, { useState } from 'react';
import { defaultIncidentContext } from '../../lib/mockData';
import { useLogistics } from '../../context/LogisticsContext';
import {
  HelpCircle,
  Clock,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileQuestion,
  TrendingDown,
  Zap,
} from 'lucide-react';

export const IncidentContext: React.FC = () => {
  const { setSubView, isResolved } = useLogistics();
  const [selectedQuestion, setSelectedQuestion] = useState<number>(1);
  const incident = defaultIncidentContext;

  const questions = [
    { id: 1, title: 'What happened?', label: 'Event Summary' },
    { id: 2, title: 'Why did it happen?', label: 'Root Cause' },
    { id: 3, title: 'Who is affected?', label: 'Blast Radius' },
    { id: 4, title: 'What if we do nothing?', label: 'Cascade Risk' },
    { id: 5, title: 'What should I do first?', label: 'Next Action' },
  ];

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-normal text-neutral-900 tracking-tight">
              Incident Context Builder & Operational Memory
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-[4px] bg-neutral-100 text-neutral-600 border border-neutral-200">
              Pillar 3: Disconnected Context &amp; Dependency Blindness (The Diagnostic Level)
            </span>
          </div>
          <p className="text-xs font-light text-neutral-500 mt-0.5">
            Resource Dependency Monitoring, Operational Context Builder &amp; AI Root-Cause Diagnostic Agents (Assembled in 12.4s)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-1 bg-red-50 text-red-800 border border-red-200 rounded-[4px]">
            {incident.incidentId}
          </span>
          <span className="text-xs font-light text-neutral-500">
            {incident.timestamp}
          </span>
        </div>
      </div>

      {/* 5 Core Questions Interactive Tabs */}
      <div className="bg-white border border-neutral-200 rounded-[8px] overflow-hidden">
        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-neutral-200 bg-neutral-50">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuestion(q.id)}
              className={`p-3 text-left border-r last:border-r-0 border-neutral-200 transition-all ${
                selectedQuestion === q.id
                  ? 'bg-white font-normal text-neutral-900 border-b-2 border-b-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/50 font-light'
              }`}
            >
              <div className="text-[10px] font-mono text-neutral-400 uppercase">
                Question 0{q.id}
              </div>
              <div className="text-xs mt-0.5 truncate">{q.title}</div>
            </button>
          ))}
        </div>

        {/* Question Answers Panel */}
        <div className="p-5 text-xs">
          {selectedQuestion === 1 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-medium">
                <AlertOctagon className="w-4 h-4 text-red-600" />
                <span>What Happened: Incident Ground Truth</span>
              </div>
              <p className="text-neutral-700 font-light leading-relaxed text-sm bg-neutral-50 p-4 border border-neutral-200 rounded-[6px]">
                {incident.q1WhatHappened}
              </p>
              <div className="grid grid-cols-2 gap-3 text-neutral-600 pt-1">
                <div className="p-3 border border-neutral-200 rounded-[6px]">
                  <span className="text-neutral-400 block text-[11px]">Asset ID:</span>
                  <span className="font-mono text-neutral-900">{incident.vehicleId}</span>
                </div>
                <div className="p-3 border border-neutral-200 rounded-[6px]">
                  <span className="text-neutral-400 block text-[11px]">Expressway Marker:</span>
                  <span className="text-neutral-900">{incident.highwayLocation}</span>
                </div>
              </div>
            </div>
          )}

          {selectedQuestion === 2 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Why Did It Happen: AI Root Cause Attribution Agent</span>
              </div>
              <p className="text-neutral-700 font-light leading-relaxed text-sm bg-neutral-50 p-4 border border-neutral-200 rounded-[6px]">
                {incident.q2WhyDidItHappen}
              </p>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-[6px] text-amber-900 font-light text-xs">
                <strong>Attribution Analysis:</strong> Driver D-41 is not responsible. Primary failure was caused by upstream packaging inventory sorting delay at Jaipur Hub, which triggered excessive coolant pump cycles.
              </div>
            </div>
          )}

          {selectedQuestion === 3 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-medium">
                <TrendingDown className="w-4 h-4 text-amber-600" />
                <span>Who Is Affected: Complete Blast Radius</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 border border-neutral-200 rounded-[6px] bg-neutral-50">
                  <span className="text-neutral-400 block text-[11px]">Total Shipments:</span>
                  <span className="text-xl font-light text-neutral-900">
                    {incident.q3WhoIsAffected.totalParcels} Parcels
                  </span>
                </div>
                <div className="p-3 border border-neutral-200 rounded-[6px] bg-neutral-50">
                  <span className="text-neutral-400 block text-[11px]">Downstream Clients:</span>
                  <span className="text-xl font-light text-neutral-900">
                    {incident.q3WhoIsAffected.downstreamCustomersCount} Recipients
                  </span>
                </div>
                <div className="p-3 border border-neutral-200 rounded-[6px] bg-neutral-50">
                  <span className="text-neutral-400 block text-[11px]">Downstream Hubs:</span>
                  <span className="text-xs font-mono text-neutral-800">
                    {incident.q3WhoIsAffected.affectedHubs.join(', ')}
                  </span>
                </div>
              </div>

              <div className="p-3 border border-red-200 bg-red-50/50 rounded-[6px]">
                <span className="text-xs font-medium text-red-950 block mb-1">
                  High Priority Critical Cargo:
                </span>
                <ul className="list-disc list-inside space-y-1 text-red-900 text-xs font-light">
                  {incident.q3WhoIsAffected.highPriorityItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedQuestion === 4 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-medium">
                <AlertOctagon className="w-4 h-4 text-red-600" />
                <span>What Happens If We Do Nothing: Inaction Consequences</span>
              </div>
              <p className="text-neutral-700 font-light leading-relaxed text-sm bg-red-50/60 p-4 border border-red-200 rounded-[6px] text-red-950">
                {incident.q4WhatIfDoNothing}
              </p>
            </div>
          )}

          {selectedQuestion === 5 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-medium">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>What Should I Do First: Recommended Action Pathway</span>
              </div>
              <p className="text-neutral-700 font-light leading-relaxed text-sm bg-neutral-50 p-4 border border-neutral-200 rounded-[6px]">
                {incident.q5WhatShouldIDoFirst}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubView('recovery_simulator')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-[6px] text-xs font-light transition-all shadow-sm group"
                >
                  <span>Open Decision Sandbox & Simulate Recovery Options</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Operational Memory Timeline (Reconstructed Last Verified Chain) */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <div>
            <h3 className="text-xs font-normal text-neutral-900 uppercase tracking-wider font-mono">
              Operational Memory: Reconstructed Chain of Truth
            </h3>
            <p className="text-[11px] font-light text-neutral-400 mt-0.5">
              Verified chronological sensor chain pinpointing the exact location of deviation
            </p>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            5 Ground Truth Nodes Synchronized
          </span>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-neutral-200">
          {incident.reconstructedTimeline.map((item, idx) => {
            return (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                    item.isDivergencePoint
                      ? 'bg-red-500 border-red-600 text-white animate-pulse'
                      : 'bg-white border-neutral-400 text-neutral-600'
                  }`}
                >
                  {item.isDivergencePoint ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-normal text-neutral-900">
                        {item.checkpoint}
                      </span>
                      {item.isDivergencePoint && (
                        <span className="px-1.5 py-0.2 text-[9px] font-mono bg-red-100 text-red-800 rounded border border-red-300 font-medium">
                          Divergence Point
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-light text-neutral-500 mt-0.5">
                      {item.verifiedState}
                    </p>
                  </div>

                  <div className="text-right sm:shrink-0">
                    <span className="text-[11px] font-mono text-neutral-700">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      {item.source}
                    </span>
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
