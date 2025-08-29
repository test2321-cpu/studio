
export interface Team {
  id: string;
  name: string;
  flag: string; // e.g., 'india'
}

export interface MatchTeam {
    name: string;
    flag: string;
    score?: string;
}

export interface Match {
  id: string; // Firestore document ID
  tournament: string;
  teams: [MatchTeam, MatchTeam];
  date: string; // Stored as 'YYYY-MM-DD'
  time: string; // Stored as 'HH:MM'
  status: 'Upcoming' | 'Live' | 'Recent';
  result?: string;
}

export interface Article {
  id: string; // Changed to string to accommodate firestore doc id
  slug: string;
  category: string;
  title: string;
  author?: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  excerpt: string;
  content: string;
}

export interface RankingTeam {
  rank: number;
  team: string;
  rating: number;
  flag: string;
}

export interface Player {
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';
}

export interface MatchDetailsData {
  details: {
    date: string;
    series: string;
    venue: string;
    match: string;
    seriesFull: string;
    toss: string;
    season: string;
    format: string;
    matchDate: string;
    status: string;
  };
  teams: {
    a: { name: string; flag: string; };
    b: { name: string; flag: string; };
  };
  countdown: string;
  poll: {
    a: { votes: number; percentage: number; };
    b: { votes: number; percentage: number; };
  };
  recentMatches: Array<{
    id: number;
    type: string;
    date: string;
    status: string;
    teams: Array<{
      name: string;
      flag: string;
      score: string;
    }>;
    result: string;
  }>;
  playingXI: Array<{
    team: string;
    players: Player[];
  }>;
  headToHead: {
    summary: string;
    last5: Array<{
      teams: [
        { name: string; score: string },
        { name: string; score: string }
      ];
      result: string;
    }>;
  }
}
