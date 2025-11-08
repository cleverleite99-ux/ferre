import React, { useState } from 'react';
import { Match } from '../types';
import MatchDetails from './MatchDetails';
import ChevronIcon from './icons/ChevronIcon';
import StatChip from './StatChip';
import YellowCardIcon from './icons/YellowCardIcon';
import RedCardIcon from './icons/RedCardIcon';
import PenaltyIcon from './icons/PenaltyIcon';
import { formatNumber } from '../data/mockData';

interface MatchCardProps {
  match: Match;
}

const renderLeagueName = (name: string) => {
  if (name.endsWith(' 2')) {
    const baseName = name.slice(0, -2);
    return (
      <>
        {baseName}
        <sup className="font-semibold -top-1 text-xs">2</sup>
      </>
    );
  }
  return name;
};

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg mb-4">
      <div
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Mobile View */}
        <div className="p-4 md:hidden">
            <div className="flex justify-between items-center mb-3">
                <div className="text-xs text-slate-500">{match.time}</div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <span>{match.countryFlagEmoji}</span>
                    <span className="font-semibold">{renderLeagueName(match.league)}</span>
                </div>
            </div>
            <div className="flex items-center justify-between space-x-2 text-center my-2">
                <div className="flex-1 font-bold text-slate-800 text-lg">{match.homeTeam}</div>
                <div className="text-xl font-light text-slate-400">vs</div>
                <div className="flex-1 font-bold text-slate-800 text-lg">{match.awayTeam}</div>
            </div>
            <div className="text-center text-xs text-slate-500 mt-3 flex flex-col items-center">
              <div>
                Árbitro: <span className="font-medium text-slate-600">{match.referee}</span>
              </div>
              <div className="flex items-center space-x-3 mt-1.5 text-slate-600 font-medium">
                <div className="flex items-center space-x-1" title="Tarjetas Amarillas del árbitro">
                  <YellowCardIcon className="w-3 h-4" />
                  <span>{formatNumber(match.details.yellows.referee)}</span>
                </div>
                <div className="flex items-center space-x-1" title="Tarjetas Rojas del árbitro">
                  <RedCardIcon className="w-3 h-4" />
                  <span>{formatNumber(match.details.reds.referee)}</span>
                </div>
                <div className="flex items-center space-x-1" title="Penaltis señalados por el árbitro">
                  <PenaltyIcon className="w-3.5 h-3.5" />
                  <span>{formatNumber(match.details.penalties.referee)}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-3 mt-4 flex justify-around items-center">
                 <StatChip value={match.totalGoals} color="green" />
                 <StatChip value={match.totalYellows} color="yellow" />
                 <StatChip value={match.totalReds} color="red" />
                 <StatChip value={match.totalPenalties} color="blue" />
                 <ChevronIcon className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-[60px_60px_1fr_1.2fr_1.2fr_1.5fr_1fr_80px_80px_80px_80px_60px] items-center p-4 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200">
            <div className="font-medium text-slate-800">{match.time}</div>
            <div className="text-xl">{match.countryFlagEmoji}</div>
            <div className="font-semibold">{renderLeagueName(match.league)}</div>
            <div className="font-bold text-slate-900">{match.homeTeam}</div>
            <div className="font-bold text-slate-900">{match.awayTeam}</div>
            <div className="flex flex-col">
              <span className="font-medium">{match.referee}</span>
              <div className="flex items-center space-x-2 mt-1 text-xs text-slate-500">
                <div className="flex items-center space-x-1" title="Tarjetas Amarillas del árbitro">
                  <YellowCardIcon className="w-2.5 h-3.5" />
                  <span>{formatNumber(match.details.yellows.referee)}</span>
                </div>
                <div className="flex items-center space-x-1" title="Tarjetas Rojas del árbitro">
                  <RedCardIcon className="w-2.5 h-3.5" />
                  <span>{formatNumber(match.details.reds.referee)}</span>
                </div>
                <div className="flex items-center space-x-1" title="Penaltis señalados por el árbitro">
                  <PenaltyIcon className="w-3 h-3" />
                  <span>{formatNumber(match.details.penalties.referee)}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500">{match.probability1x2}</div>
            <StatChip value={match.totalGoals} color="green" />
            <StatChip value={match.totalYellows} color="yellow" />
            <StatChip value={match.totalReds} color="red" />
            <StatChip value={match.totalPenalties} color="blue" />
            <div className="flex justify-center">
              <ChevronIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
        </div>
      </div>
      
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
        {/* FIX: Pass the full match object to MatchDetails for AI context. */}
        <MatchDetails details={match.details} match={match} />
      </div>
    </div>
  );
};

export default MatchCard;