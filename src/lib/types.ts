
export interface Match {
  id: number;
  status: 'Live' | 'Upcoming' | 'Recent';
  tournament: string;
  teams: [
    { name: string; score?: string; flag: string },
    { name: string; score?: string; flag: string }
  ];
  date: string;
  startTime: string;
  endTime: string;
  result?: string;
}

export interface Article {
  id: number;
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
