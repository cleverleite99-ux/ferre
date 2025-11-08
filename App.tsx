import React, { useState, useEffect, useMemo } from 'react';
import { Match, MatchFromExcel } from './types';
import { processMatches } from './data/mockData';
import MatchCard from './components/MatchCard';
import FilterControls from './components/FilterControls';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('all');

  useEffect(() => {
    const fetchMatches = async () => {
      // The file ID from the user's shared Google Drive link
      const fileId = '1XaNxtyayxsF_A8jQJecmHQQHArarf-u2';
      // Construct the direct download URL
      const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      // Use a CORS proxy to bypass browser security restrictions
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(googleDriveUrl)}`;

      try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: MatchFromExcel[] = await response.json();
        const processed = processMatches(data);
        setMatches(processed);
      } catch (e) {
        console.error("Failed to fetch or process match data:", e);
        setError('No se pudieron cargar los datos. Por favor, revisa la URL y la configuración de datos compartidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const allLeagues = useMemo(() => {
    // FIX: Add explicit type annotation to resolve potential type mismatch
    const leagues: string[] = [...new Set(matches.map(match => match.league))];
    return leagues;
  }, [matches]);

  const handleLeagueChange = (league: string) => {
    setSelectedLeagues(prev =>
      prev.includes(league)
        ? prev.filter(l => l !== league)
        : [...prev, league]
    );
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };
  
  const getTimeCategory = (time: string): string => {
    if (time === 'N/A') return 'all';
    const hour = parseInt(time.split(':')[0], 10);
    if (isNaN(hour)) return 'all';
    if (hour < 12) return 'morning';
    if (hour < 20) return 'afternoon';
    return 'night';
  };

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const leagueFilter = selectedLeagues.length === 0 || selectedLeagues.includes(match.league);
      const timeFilter = selectedTime === 'all' || getTimeCategory(match.time) === selectedTime;
      return leagueFilter && timeFilter;
    });
  }, [matches, selectedLeagues, selectedTime]);

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800">Partidos de Fútbol</h1>
          <p className="text-slate-500 mt-2">Análisis y estadísticas de partidos de fútbol.</p>
        </header>

        {!loading && !error && (
            <FilterControls
                leagues={allLeagues}
                selectedLeagues={selectedLeagues}
                onLeagueChange={handleLeagueChange}
                selectedTime={selectedTime}
                onTimeChange={handleTimeChange}
            />
        )}


        {loading ? (
          <LoadingSpinner />
        ) : error ? (
            <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        ) : (
          <div>
            {/* Desktop Headers */}
            <div className="hidden md:grid md:grid-cols-[60px_60px_1fr_1.2fr_1.2fr_1.5fr_1fr_80px_80px_80px_80px_60px] items-center p-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <span>Hora</span>
                <span></span>
                <span>Liga</span>
                <span>Local</span>
                <span>Visitante</span>
                <span>Árbitro</span>
                <span>1X2</span>
                <span className="text-center">Goles</span>
                <span className="text-center">Amarillas</span>
                <span className="text-center">Rojas</span>
                <span className="text-center">Penaltis</span>
                <span></span>
            </div>

            {filteredMatches.length > 0 ? (
                filteredMatches.map(match => (
                    <MatchCard key={match.id} match={match} />
                ))
            ) : (
                <div className="text-center bg-white p-8 rounded-xl shadow-md text-slate-500">
                    No se encontraron partidos que coincidan con los filtros seleccionados.
                </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;