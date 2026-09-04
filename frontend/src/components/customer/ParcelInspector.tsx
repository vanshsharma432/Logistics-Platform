import React, { useState } from 'react';
import { CustomerParcelInfo } from '../../types/logistics';
import { useLogistics } from '../../context/LogisticsContext';
import { Search, Package, MapPin, CheckCircle, Navigation } from 'lucide-react';

interface Props {
  parcel: CustomerParcelInfo;
}

export const ParcelInspector: React.FC<Props> = ({ parcel }) => {
  const { setSelectedParcelId } = useLogistics();
  const [searchInput, setSearchInput] = useState('');

  const sampleIds = [
    { id: 'PARCEL#87', label: 'Parcel #87 (Cold-Chain Medicine)', badge: 'Critical' },
    { id: 'PARCEL#109', label: 'Parcel #109 (Electronics)', badge: 'On-Schedule' },
    { id: 'PARCEL#204', label: 'Parcel #204 (Automotive Parts)', badge: 'Staged' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (query) {
      setSelectedParcelId(query);
    }
  };

  return (
    <div className="p-4 bg-white border border-neutral-200 rounded-[8px]">
      {/* Top Search & Preset selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter parcel code (e.g. PARCEL#87)..."
            className="w-full pl-8 pr-3 py-1.5 text-xs font-light bg-neutral-50 border border-neutral-200 rounded-[6px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
        </form>

        {/* Quick sample chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] font-light text-neutral-400 shrink-0">Demo Parcels:</span>
          {sampleIds.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedParcelId(item.id)}
              className={`px-2 py-1 text-[11px] font-light rounded-[4px] border transition-colors shrink-0 ${
                parcel.parcelId === item.id
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parcel Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 pt-1">
        <div>
          <span className="text-[11px] font-light text-neutral-400 block">Recipient</span>
          <span className="text-xs font-normal text-neutral-900 block truncate">
            {parcel.recipientName}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-light text-neutral-400 block">Cargo Type</span>
          <span className="text-xs font-normal text-neutral-900 block truncate">
            {parcel.cargoCategory}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-light text-neutral-400 block">Origin Location</span>
          <span className="text-xs font-light text-neutral-700 block truncate">
            {parcel.origin}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-light text-neutral-400 block">Destination</span>
          <span className="text-xs font-light text-neutral-700 block truncate">
            {parcel.destination}
          </span>
        </div>
      </div>
    </div>
  );
};
