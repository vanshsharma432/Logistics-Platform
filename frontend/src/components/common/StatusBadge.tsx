import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'emerald' | 'amber' | 'rose' | 'neutral' | 'blue';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'neutral',
  pulse = false,
}) => {
  const styles = {
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 text-rose-800 border-rose-200',
    neutral: 'bg-neutral-50 text-neutral-700 border-neutral-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
  }[variant];

  const dotColors = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    neutral: 'bg-neutral-400',
    blue: 'bg-blue-500',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-light tracking-wide border rounded-[6px] ${styles}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColors} ${pulse ? 'animate-ping' : ''}`}
      />
      {status}
    </span>
  );
};
