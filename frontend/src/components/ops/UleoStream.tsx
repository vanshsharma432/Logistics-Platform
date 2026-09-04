import React, { useState } from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { BlueprintDrawer } from './BlueprintDrawer';
import {
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  PlusCircle,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { UleoEvent } from '../../types/logistics';

export const UleoStream: React.FC = () => {
  const { uleoEvents } = useLogistics();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredEvents = uleoEvents.filter((ev) => {
    if (filterType === 'ALL') return true;
    return ev.entityType === filterType;
  });

  return (
    <div className="space-y-4">
      {/* Blueprint Drawer modal */}
      <BlueprintDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header Banner */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-normal text-neutral-900 tracking-tight">
              Semantic Translation Stream (ULEO Engine)
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-[4px] bg-neutral-100 text-neutral-600 border border-neutral-200">
              Pillar 1: Unified Event Language
            </span>
          </div>
          <p className="text-xs font-light text-neutral-500 mt-0.5">
            Real-time ontological translation of messy multi-vendor ERP/TMS/WMS feeds into mathematically verified state transitions
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Blueprint Drawer Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-light bg-neutral-900 hover:bg-black text-white rounded-[6px] transition-colors shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Open Integration Blueprint</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-light text-neutral-400 mr-1">Filter Entity:</span>
          {['ALL', 'PARCEL', 'VEHICLE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-[4px] border transition-colors ${
                filterType === cat
                  ? 'bg-neutral-800 text-white border-neutral-800'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono text-neutral-400">
          Showing {filteredEvents.length} synchronized events
        </span>
      </div>

      {/* Double-Column Live Log Feed */}
      <div className="bg-white border border-neutral-200 rounded-[8px] overflow-hidden">
        {/* Table/Feed Header */}
        <div className="grid grid-cols-12 bg-neutral-50 border-b border-neutral-200 px-4 py-2.5 text-[11px] font-mono text-neutral-500 tracking-wider uppercase">
          <div className="col-span-5 flex items-center gap-1.5">
            <Database className="w-3 h-3 text-neutral-400" />
            <span>Heterogeneous Legacy Inputs (Unstructured)</span>
          </div>
          <div className="col-span-1 text-center">Translation</div>
          <div className="col-span-6 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Standardized ULEO Action Stream (Verified State Machine)</span>
          </div>
        </div>

        {/* Feed Rows */}
        <div className="divide-y divide-neutral-100">
          {filteredEvents.map((event) => {
            const isAnomaly = event.status === 'ANOMALY_CAUGHT';

            return (
              <div
                key={event.id}
                className={`grid grid-cols-12 px-4 py-3 items-center hover:bg-neutral-50/70 transition-colors ${
                  isAnomaly ? 'bg-red-50/20' : ''
                }`}
              >
                {/* Left Column: Legacy Input */}
                <div className="col-span-5 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.2 text-[10px] font-mono bg-neutral-100 text-neutral-600 border border-neutral-200 rounded">
                      {event.legacySystem}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {event.timestamp}
                    </span>
                  </div>
                  <div className="p-2 bg-neutral-100/70 border border-neutral-200 rounded-[4px] font-mono text-[11px] text-neutral-800 break-all leading-tight">
                    {event.legacyRawString}
                  </div>
                </div>

                {/* Middle: Arrow indicator */}
                <div className="col-span-1 flex justify-center text-neutral-400">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                {/* Right Column: ULEO Standardized Output */}
                <div className="col-span-6 pl-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 text-[11px] font-mono font-medium rounded-[4px] border ${
                          isAnomaly
                            ? 'bg-red-50 border-red-200 text-red-700'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        }`}
                      >
                        {event.uleoEventName}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        {event.entityId}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        isAnomaly
                          ? 'bg-red-100 border-red-300 text-red-800 font-medium'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-500 space-y-0.5 mt-1 bg-neutral-50/50 p-2 rounded border border-neutral-100">
                    <div>
                      <span className="text-neutral-400">Pre-Condition:</span>{' '}
                      <span className="text-neutral-700">{event.preConditions}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Post-Condition:</span>{' '}
                      <span className={isAnomaly ? 'text-red-600 font-medium' : 'text-emerald-700'}>
                        {event.postConditions}
                      </span>
                    </div>
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
