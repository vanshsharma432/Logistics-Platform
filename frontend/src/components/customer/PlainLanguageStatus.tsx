import React from 'react';
import { CustomerParcelInfo } from '../../types/logistics';
import { ShieldAlert, Clock, Sparkles, CheckCircle2, Thermometer } from 'lucide-react';

interface Props {
  parcel: CustomerParcelInfo;
}

export const PlainLanguageStatus: React.FC<Props> = ({ parcel }) => {
  const isResolved = parcel.currentStepIndex >= 4;

  return (
    <div className="space-y-3">
      {/* 1. Proactive Plain-Language Status Bar */}
      <div
        className={`p-4 border rounded-[8px] transition-all ${
          isResolved
            ? 'bg-emerald-50/50 border-emerald-200'
            : parcel.isRecalculated
            ? 'bg-amber-50/50 border-amber-200'
            : 'bg-white border-neutral-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {isResolved ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : parcel.isRecalculated ? (
              <Sparkles className="w-4 h-4 text-amber-600" />
            ) : (
              <Clock className="w-4 h-4 text-neutral-600" />
            )}
            <h2 className="text-sm font-normal text-neutral-900 tracking-tight">
              {parcel.plainStatusTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-light text-neutral-500">
              Confidence Score:
            </span>
            <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-[4px] bg-white border border-neutral-200 text-neutral-800">
              {parcel.confidenceScore}%
            </span>
          </div>
        </div>

        <p className="text-xs font-light text-neutral-600 leading-relaxed">
          {parcel.plainStatusBody}
        </p>

        {/* Real-time Telemetry strip */}
        {parcel.isTemperatureSensitive && (
          <div className="mt-3 pt-3 border-t border-neutral-200/60 flex items-center gap-4 text-xs font-light text-neutral-600">
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Monitored Cold-Chain: <strong className="font-mono font-normal text-neutral-900">{parcel.currentTemp}</strong>
              </span>
            </div>
            <span className="text-neutral-300">•</span>
            <div>
              Target Envelope: <span className="font-mono text-neutral-700">{parcel.targetTempRange}</span>
            </div>
            <span className="text-neutral-300">•</span>
            <span className="text-emerald-700 text-[11px] font-mono">
              ✓ Continuous Sensor Lock
            </span>
          </div>
        )}
      </div>

      {/* 2. The "Why" Card: Empathetic AI Brain context */}
      <div className="p-4 bg-white border border-neutral-200 rounded-[8px]">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-[6px] text-neutral-700 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-normal text-neutral-900">
                Why has my delivery route shifted?
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded-[4px] bg-neutral-100 text-neutral-600">
                AI Logistics Brain Context
              </span>
            </div>
            <p className="text-xs font-light text-neutral-600 leading-relaxed">
              {parcel.whyCardExplanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
