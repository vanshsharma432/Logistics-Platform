import React from 'react';
import { useLogistics } from '../../context/LogisticsContext';
import { PlainLanguageStatus } from './PlainLanguageStatus';
import { ProgressTimeline } from './ProgressTimeline';
import { PivotOptionPanel } from './PivotOptionPanel';
import { ParcelInspector } from './ParcelInspector';
import { Package, BellRing, Sparkles } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { selectedParcelId, customerParcels } = useLogistics();
  const parcel = customerParcels[selectedParcelId] || customerParcels['PARCEL#87'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-normal text-neutral-900 tracking-tight">
              Customer Delivery Copilot
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-[4px] bg-neutral-100 text-neutral-600 border border-neutral-200">
              {parcel.trackingNumber}
            </span>
          </div>
          <p className="text-xs font-light text-neutral-500 mt-0.5">
            Real-time outcome visibility powered by continuous network intelligence
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-light rounded-[6px] bg-white border border-neutral-200 text-neutral-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live AI Truth Engine Connected
          </span>
        </div>
      </div>

      {/* 1. Parcel Inspector & Search */}
      <ParcelInspector parcel={parcel} />

      {/* 2. Plain Language Status & 'Why' Card */}
      <PlainLanguageStatus parcel={parcel} />

      {/* 3. Validated State Machine Timeline */}
      <ProgressTimeline parcel={parcel} />

      {/* 4. Self-Service Pivot Options */}
      <PivotOptionPanel parcel={parcel} />
    </div>
  );
};
