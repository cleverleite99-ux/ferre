import React from 'react';

const PenaltyIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" className="text-blue-400" />
  </svg>
);

export default PenaltyIcon;
