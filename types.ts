export interface MatchDetails {
  trends: { home: string; away: string; };
  shots: { home: number; away: number; };
  goals: { home: number; away: number; };
  fouls: { home: number; away: number; };
  yellows: { home: number; away: number; referee: number; };
  reds: { home: number; away: number; referee: number; };
  penalties: { home: number; away: number; referee: number; };
}

export interface Match {
  id: number;
  time: string;
  countryFlagEmoji: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  referee: string;
  probability1x2: string;
  totalGoals: number;
  totalYellows: number;
  totalReds: number;
  totalPenalties: number;
  details: MatchDetails;
}

// Represents the flat structure from the user's JSON data
export interface MatchFromExcel {
  HORA?: string;
  bandera?: string;
  liga?: string;
  HOME?: string;
  AWAY?: string;
  ARBITRO?: string;
  '1X2'?: string | number;
  'TEN HOME'?: string | number;
  'TEN AWAY'?: string | number;
  'TIROS HOME'?: number | null;
  'TIROS AWAY'?: number | null;
  'GOLES HOME'?: string | number;
  'GOLES AWAY'?: string | number;
  'GOLES TOTAL'?: number | null;
  'FALTAS HOME'?: number | null;
  'FALTAS AWAY'?: number | null;
  'AMARILLAS HOME'?: number;
  'AMARILLAS AWAY'?: number;
  'ARBITRO AMARILLAS'?: number | null;
  'AMARILLAS TOTAL'?: number | null;
  'ROJAS HOME'?: number | null;
  'ROJAS AWAY'?: number | null;
  'ARBITRO ROJAS'?: number | null;
  'ROJAS TOTAL'?: number | null;
  'PENALTIS HOME'?: number | null;
  'PENALTIS AWAY'?: number | null;
  'ARBITRO PENALTIS'?: number;
  'PENALTIS TOTAL'?: number | null;
}
