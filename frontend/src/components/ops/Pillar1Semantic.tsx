import React, { useState } from 'react';
import { UleoStream } from './UleoStream';
import { DigitalTwinGraph } from './DigitalTwinGraph';
import { Database, GitFork, Info } from 'lucide-react';

interface Props {
  initialTab?: 'uleo' | 'world_model';
}

export const Pillar1Semantic: React.FC<Props> = ({ initialTab = 'uleo' }) => {
  const [activeTab, setActiveTab] = useState<'uleo' | 'world_model'>(initialTab);

  return (
    <div className="space-y-4">
      {/* Pillar 1 Semantic Level Master Header */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-[4px] bg-neutral-900 text-white">
              PILLAR 1
            </span>
            <h1 className="text-sm font-normal text-neutral-900 tracking-tight">
              Language & System Fragmentation (The Semantic Level)
            </h1>
          </div>
          <p className="text-xs font-light text-neutral-500 mt-1">
            <strong className="font-normal text-neutral-700">The Problem:</strong> Data siloed across WMS, TMS, ERPs, CRM & GPS with semantic mismatches forcing manual checking.
          </p>
        </div>

        {/* Semantic Level Sub-Solution Switcher */}
        <div className="flex items-center p-1 bg-neutral-100 rounded-[6px] border border-neutral-200 shrink-0">
          <button
            onClick={() => setActiveTab('uleo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-[4px] transition-all ${
              activeTab === 'uleo'
                ? 'bg-white text-neutral-900 font-normal shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800 font-light'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-neutral-600" />
            <span>Solution 1: ULEO Ontology</span>
          </button>

          <button
            onClick={() => setActiveTab('world_model')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-[4px] transition-all ${
              activeTab === 'world_model'
                ? 'bg-white text-neutral-900 font-normal shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800 font-light'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-neutral-600" />
            <span>Solution 2: Verified World Model</span>
          </button>
        </div>
      </div>

      {/* Active Semantic Sub-Solution View */}
      {activeTab === 'uleo' ? (
        <UleoStream />
      ) : (
        <DigitalTwinGraph />
      )}
    </div>
  );
};
