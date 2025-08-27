export interface Match {
  id: number;
  status: 'Live' | 'Upcoming' | 'Recent';
  tournament: string;
  teams: [
    { name: string; score?: string; flag: string },
    { name: string; score?: string; flag: string }
  ];
  date: string;
  result?: string;
}

export interface Article {
  id: number;
  category: string;
  title: string;
  author?: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  excerpt: string;
}

export interface RankingTeam {
  rank: number;
  team: string;
  rating: number;
  flag: string;
}
