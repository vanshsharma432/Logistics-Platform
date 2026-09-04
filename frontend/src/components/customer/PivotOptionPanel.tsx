import React from 'react';
import { CustomerParcelInfo } from '../../types/logistics';
import { useLogistics } from '../../context/LogisticsContext';
import { MapPin, Users, CalendarClock, CheckCircle, ArrowRight } from 'lucide-react';

interface Props {
  parcel: CustomerParcelInfo;
}

export const PivotOptionPanel: React.FC<Props> = ({ parcel }) => {
  const { selectCustomerPivot } = useLogistics();

  const options = [
    {
      id: 'pivot-locker',
      title: 'Redirect to Secure Smart Locker',
      description: 'Deposit at Med-Secure Parcel Locker (Cyber City Hub, Station #4). Available 24/7 with OTP.',
      icon: MapPin,
      badge: 'Immediate Availability',
    },
    {
      id: 'pivot-neighbor',
      title: 'Authorize Leaving with Neighbor',
      description: 'Authorize delivery handoff with Dr. Kapoor at Suite No. 42 (Reception Desk verified).',
      icon: Users,
      badge: 'Same-Day Clearance',
    },
    {
      id: 'pivot-reschedule',
      title: 'Reschedule Delivery Slot',
      description: 'Move final mile delivery window to tomorrow morning: 09:00 AM – 11:00 AM IST.',
      icon: CalendarClock,
      badge: 'Protected Cold-Chain',
    },
  ];

  return (
    <div className="p-4 bg-white border border-neutral-200 rounded-[8px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-normal text-neutral-900 uppercase tracking-wider font-mono">
            Contextual Self-Service Actions (Pivot Panel)
          </h3>
          <p className="text-[11px] font-light text-neutral-400 mt-0.5">
            Select a preference to dynamically update the live carrier route in the World Model
          </p>
        </div>

        {parcel.selectedPivotOption && (
          <span className="flex items-center gap-1 text-xs font-light text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Preference Applied
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = parcel.selectedPivotOption === opt.title;

          return (
            <div
              key={opt.id}
              className={`flex flex-col justify-between p-3.5 rounded-[6px] border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'border-neutral-900 bg-neutral-50 shadow-sm ring-1 ring-neutral-900'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50'
              }`}
              onClick={() => selectCustomerPivot(parcel.parcelId, opt.title)}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-1.5 rounded-[4px] border ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-600 border-neutral-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-[3px]">
                    {opt.badge}
                  </span>
                </div>

                <h4 className="text-xs font-normal text-neutral-900 mb-1">
                  {opt.title}
                </h4>
                <p className="text-[11px] font-light text-neutral-500 leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span
                  className={`text-[11px] font-light ${
                    isSelected ? 'text-neutral-900 font-medium' : 'text-neutral-500'
                  }`}
                >
                  {isSelected ? '✓ Confirmed by Brain' : 'Select Option'}
                </span>
                <ArrowRight
                  className={`w-3 h-3 transition-transform ${
                    isSelected ? 'text-neutral-900 translate-x-0.5' : 'text-neutral-300'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
