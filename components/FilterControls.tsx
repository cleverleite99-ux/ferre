import React from 'react';

interface FilterControlsProps {
  leagues: string[];
  selectedLeagues: string[];
  onLeagueChange: (league: string) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

const FilterButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
      isActive
        ? 'bg-slate-800 text-white shadow-md'
        : 'bg-white text-slate-600 hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
);

const FilterControls: React.FC<FilterControlsProps> = ({
  leagues,
  selectedLeagues,
  onLeagueChange,
  selectedTime,
  onTimeChange,
}) => {
  const timeOptions = [
    { id: 'all', label: 'Todos' },
    { id: 'morning', label: 'Mañana' },
    { id: 'afternoon', label: 'Tarde' },
    { id: 'night', label: 'Noche' },
  ];

  return (
    <div className="bg-slate-50 p-4 rounded-xl shadow-sm mb-8 space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Filtrar por Liga</h3>
        <div className="flex flex-wrap gap-2">
          {leagues.map((league) => (
            <FilterButton
              key={league}
              onClick={() => onLeagueChange(league)}
              isActive={selectedLeagues.includes(league)}
            >
              {league}
            </FilterButton>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Filtrar por Hora</h3>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map((option) => (
            <FilterButton
              key={option.id}
              onClick={() => onTimeChange(option.id)}
              isActive={selectedTime === option.id}
            >
              {option.label}
            </FilterButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
