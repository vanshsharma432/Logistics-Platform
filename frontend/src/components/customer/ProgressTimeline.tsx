import React from 'react';
import { CustomerParcelInfo } from '../../types/logistics';
import { Check, Clock, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  parcel: CustomerParcelInfo;
}

export const ProgressTimeline: React.FC<Props> = ({ parcel }) => {
  const steps = [
    {
      id: 0,
      title: 'Order Packed',
      time: '10:15 AM',
      location: parcel.origin,
      status: 'VERIFIED_MANIFEST',
    },
    {
      id: 1,
      title: 'Dispatched from Hub',
      time: '11:45 AM',
      location: 'Jaipur Expressway Departure Gate',
      status: 'RFID_GATE_CONFIRMED',
    },
    {
      id: 2,
      title: 'In-Transit (NH-48 Corridor)',
      time: '01:10 PM',
      location: 'En-route to Gurgaon Central Hub',
      status: 'TELEMATICS_STREAMING',
    },
    {
      id: 3,
      isRecalculation: true,
      title: 'Active Recalculation by AI Brain',
      time: '02:27 PM',
      location: 'KM 142 • Proactive Transshipment Protocol',
      status: 'WORLD_MODEL_RE-ROUTED',
    },
    {
      id: 4,
      title: 'Delivery Resolved & Final Mile',
      time: parcel.currentEta,
      location: parcel.destination,
      status: 'TARGET_COMPLETION',
    },
  ];

  return (
    <div className="p-4 bg-white border border-neutral-200 rounded-[8px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-normal text-neutral-900 uppercase tracking-wider font-mono">
            Stakeholder Progress Timeline (Verified State Machine)
          </h3>
          <p className="text-[11px] font-light text-neutral-400 mt-0.5">
            Every transition is mathematically verified against physical sensor states
          </p>
        </div>

        {parcel.isRecalculated && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-light rounded-[4px] bg-amber-50 text-amber-900 border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-600 animate-spin" />
            Active Recalculation Verified
          </span>
        )}
      </div>

      {/* Steps List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-neutral-200">
        {steps.map((step) => {
          const isPassed = parcel.currentStepIndex > step.id;
          const isCurrent = parcel.currentStepIndex === step.id;

          return (
            <div key={step.id} className="relative group">
              {/* Step indicator dot/icon */}
              <div
                className={`absolute -left-6 top-0 flex items-center justify-center w-5 h-5 rounded-full border transition-all ${
                  step.isRecalculation
                    ? 'bg-amber-50 border-amber-500 text-amber-700'
                    : isPassed
                    ? 'bg-neutral-900 border-neutral-900 text-white'
                    : isCurrent
                    ? 'bg-white border-neutral-900 text-neutral-900 shadow-sm'
                    : 'bg-white border-neutral-300 text-neutral-300'
                }`}
              >
                {step.isRecalculation ? (
                  <Sparkles className="w-3 h-3 text-amber-600" />
                ) : isPassed ? (
                  <Check className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                )}
              </div>

              {/* Step content */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${
                        isCurrent
                          ? 'font-medium text-neutral-900'
                          : isPassed
                          ? 'font-normal text-neutral-800'
                          : 'font-light text-neutral-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    {step.isRecalculation && (
                      <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-amber-100/80 text-amber-900">
                        Autonomous Self-Healing
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-light text-neutral-500 mt-0.5">
                    {step.location}
                  </p>
                </div>

                <div className="text-right sm:shrink-0">
                  <div className="text-[11px] font-mono text-neutral-600">
                    {step.time}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400">
                    {step.status}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
