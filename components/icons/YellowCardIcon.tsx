import React from 'react';

const YellowCardIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-4' }) => (
  <svg viewBox="0 0 12 16" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 0H1.5A1.5 1.5 0 000 1.5v13A1.5 1.5 0 001.5 16h9a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0010.5 0z" className="text-yellow-400"/>
  </svg>
);

export default YellowCardIcon;
