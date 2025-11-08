import React, { useState } from 'react';
// FIX: Import Match type for component props
import { Match, MatchDetails as MatchDetailsType } from '../types';
import { formatNumber } from '../data/mockData';
// FIX: Import GoogleGenAI for AI features
import { GoogleGenAI } from '@google/genai';
import LoadingSpinner from './LoadingSpinner';


interface MatchDetailsProps {
  details: MatchDetailsType;
  // FIX: Accept the full match object to provide context for AI analysis.
  match: Match;
}

interface StatCardProps {
  title: string;
  children: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, children }) => (
  <div className="bg-slate-100/80 p-4 rounded-lg">
    <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-300 pb-2">{title}</h4>
    <div className="space-y-2 text-sm text-slate-600">{children}</div>
  </div>
);

const StatRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span>{label}</span>
    <span className="font-bold text-slate-800">{formatNumber(value)}</span>
  </div>
);

const MatchDetails: React.FC<MatchDetailsProps> = ({ details, match }) => {
  // FIX: State management for AI analysis feature
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const prompt = `
        Analiza el siguiente partido de fútbol y proporciona un resumen conciso (máximo 100 palabras) para un aficionado a las apuestas.
        Enfócate en las tendencias clave, estadísticas del árbitro y posibles resultados. Sé breve y directo.

        Partido: ${match.homeTeam} vs ${match.awayTeam}
        Liga: ${match.league}
        Árbitro: ${match.referee}

        Estadísticas Clave (Promedios por partido):
        - Goles (Local/Visitante): ${formatNumber(details.goals.home)} / ${formatNumber(details.goals.away)}
        - Tarjetas Amarillas (Local/Visitante/Árbitro): ${formatNumber(details.yellows.home)} / ${formatNumber(details.yellows.away)} / ${formatNumber(details.yellows.referee)}
        - Penaltis (Local/Visitante/Árbitro): ${formatNumber(details.penalties.home)} / ${formatNumber(details.penalties.away)} / ${formatNumber(details.penalties.referee)}

        Tendencias recientes (últimos 5 partidos):
        - ${match.homeTeam} (Local): ${details.trends.home}
        - ${match.awayTeam} (Visitante): ${details.trends.away}

        Probabilidad 1X2 (según datos): ${match.probability1x2}
      `;

      // FIX: Call Gemini API to generate content
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      // FIX: Extract text from response
      setAnalysis(response.text);

    } catch (e) {
      console.error(e);
      setError('No se pudo generar el análisis. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-white p-4 md:p-6 border-t border-slate-200">
      {/* FIX: Added AI Analysis section */}
      <div className="mb-6">
        <StatCard title="Análisis con IA">
          {isLoading && (
            <div className="flex justify-center items-center h-24">
              <LoadingSpinner />
            </div>
          )}
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
          {analysis && <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{analysis}</div>}
          
          {!isLoading && !analysis && (
             <div className="flex flex-col items-start space-y-2">
                <p className="text-sm text-slate-600">Obtén un resumen rápido y conclusiones clave sobre este partido.</p>
                <button
                onClick={handleAnalysis}
                disabled={isLoading}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                {isLoading ? 'Generando...' : 'Generar Resumen con IA'}
                </button>
            </div>
          )}
        </StatCard>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Tendencias">
          <StatRow label="Local:" value={details.trends.home} />
          <StatRow label="Visitante:" value={details.trends.away} />
        </StatCard>
        
        <StatCard title="Tiros">
          <StatRow label="Local:" value={details.shots.home} />
          <StatRow label="Visitante:" value={details.shots.away} />
        </StatCard>

        <StatCard title="Goles Detallados">
          <StatRow label="Local:" value={details.goals.home} />
          <StatRow label="Visitante:" value={details.goals.away} />
        </StatCard>

        <StatCard title="Faltas">
          <StatRow label="Local:" value={details.fouls.home} />
          <StatRow label="Visitante:" value={details.fouls.away} />
        </StatCard>

        <StatCard title="Tarjetas Amarillas">
          <StatRow label="Local:" value={details.yellows.home} />
          <StatRow label="Visitante:" value={details.yellows.away} />
          <StatRow label="Por Árbitro:" value={details.yellows.referee} />
        </StatCard>

        <StatCard title="Tarjetas Rojas">
          <StatRow label="Local:" value={details.reds.home} />
          <StatRow label="Visitante:" value={details.reds.away} />
          <StatRow label="Por Árbitro:" value={details.reds.referee} />
        </StatCard>

        <StatCard title="Penaltis">
          <StatRow label="Local:" value={details.penalties.home} />
          <StatRow label="Visitante:" value={details.penalties.away} />
          <StatRow label="Por Árbitro:" value={details.penalties.referee} />
        </StatCard>
      </div>
    </div>
  );
};

export default MatchDetails;