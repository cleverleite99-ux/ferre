import React from 'react';
import { formatNumber } from '../data/mockData';

interface StatChipProps {
  value: number | string;
  color: 'green' | 'yellow' | 'red' | 'blue';
}

const colorClasses = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
};

const StatChip: React.FC<StatChipProps> = ({ value, color }) => {
  return (
    <div
      className={`flex items-center justify-center min-w-[2rem] h-8 px-1 rounded-lg font-bold text-sm ${colorClasses[color]}`}
    >
      {formatNumber(value)}
    </div>
  );
};

export default StatChip;