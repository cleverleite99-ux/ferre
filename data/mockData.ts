import { Match, MatchFromExcel } from '../types';

export const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  
  let num: number;
  if (typeof value === 'string') {
    if (value.includes('%')) {
      return value;
    }
    num = parseFloat(value.replace(',', '.'));
  } else {
    num = value;
  }

  if (isNaN(num)) {
    return typeof value === 'string' ? value : '-';
  }
  
  // Use toFixed(2) for precise two-decimal formatting
  return num.toFixed(2);
};


const toNumber = (val: string | number | null | undefined, defaultValue = 0): number => {
    if (val === null || val === undefined || val === '#N/D' || val === '') return defaultValue;
    if (typeof val === 'string') {
        const parsed = parseFloat(val.replace(',', '.'));
        return isNaN(parsed) ? defaultValue : parsed;
    }
    return val;
};

const countryCodeToEmoji = (code: string): string => {
    const countryMap: { [key: string]: string } = {
        'AUS': '🇦🇺', 'BEL': '🇧🇪', 'BRA': '🇧🇷', 'ENG': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'FRA': '🇫🇷',
        'GER': '🇩🇪', 'GRE': '🇬🇷', 'ITA': '🇮🇹', 'MEX': '🇲🇽', 'NED': '🇳🇱',
        'NOR': '🇳🇴', 'POL': '🇵🇱', 'POR': '🇵🇹', 'RUM': '🇷🇴', 'ARA': '🇸🇦',
        'SCO': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'ESP': '🇪🇸', 'TUR': '🇹🇷', 'USA': '🇺🇸',
    };
    return countryMap[code.toUpperCase()] || '⚽️';
};


export const processMatches = (data: MatchFromExcel[]): Match[] => {
  return data
    .filter(d => d.liga && d.HOME && d.AWAY) // Filter out rows with essential missing data
    .map((d, index) => {
      const leagueCode = (d.liga || '').substring(0, 3).trim();
      const flag = countryCodeToEmoji(leagueCode);
      
      return {
        id: index,
        time: d.HORA || 'N/A',
        countryFlagEmoji: flag,
        league: (d.liga || 'Unknown League').replace(/\s*�\s*$/, ' 2'),
        homeTeam: d.HOME || 'Home Team',
        awayTeam: d.AWAY || 'Away Team',
        referee: d.ARBITRO || 'N/A',
        probability1x2: typeof d['1X2'] === 'string' || typeof d['1X2'] === 'number' ? String(d['1X2']) : 'N/A',
        totalGoals: toNumber(d['GOLES TOTAL']),
        totalYellows: toNumber(d['AMARILLAS TOTAL']),
        totalReds: toNumber(d['ROJAS TOTAL']),
        totalPenalties: toNumber(d['PENALTIS TOTAL']),
        details: {
          trends: {
            home: String(d['TEN HOME'] || '-'),
            away: String(d['TEN AWAY'] || '-'),
          },
          shots: {
            home: toNumber(d['TIROS HOME']),
            away: toNumber(d['TIROS AWAY']),
          },
          goals: {
            home: toNumber(d['GOLES HOME']),
            away: toNumber(d['GOLES AWAY']),
          },
          fouls: {
            home: toNumber(d['FALTAS HOME']),
            away: toNumber(d['FALTAS AWAY']),
          },
          yellows: {
            home: toNumber(d['AMARILLAS HOME']),
            away: toNumber(d['AMARILLAS AWAY']),
            referee: toNumber(d['ARBITRO AMARILLAS']),
          },
          reds: {
            home: toNumber(d['ROJAS HOME']),
            away: toNumber(d['ROJAS AWAY']),
            referee: toNumber(d['ARBITRO ROJAS']),
          },
          penalties: {
            home: toNumber(d['PENALTIS HOME']),
            away: toNumber(d['PENALTIS AWAY']),
            referee: toNumber(d['ARBITRO PENALTIS']),
          },
        },
    }});
};