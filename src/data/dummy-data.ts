
import type { Article, Match, RankingTeam, MatchDetailsData } from '@/lib/types';

const getFutureDate = (days: number, hours: number, minutes: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

export const matches: Match[] = [
  {
    id: 1,
    status: 'Live',
    tournament: 'T20 World Cup',
    teams: [
      { name: 'IND', score: '150/2 (15.3 ov)', flag: '🇮🇳' },
      { name: 'AUS', score: '188/5 (20 ov)', flag: '🇦🇺' },
    ],
    date: 'Today',
    dateTime: new Date().toISOString(),
    result: 'India need 39 runs in 27 balls.',
  },
  {
    id: 2,
    status: 'Recent',
    tournament: 'Bilateral Series',
    teams: [
      { name: 'ENG', score: '205/10', flag: '🇬🇧' },
      { name: 'SA', score: '208/4', flag: '🇿🇦' },
    ],
    date: 'Yesterday',
    dateTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    result: 'South Africa won by 6 wickets.',
  },
  {
    id: 3,
    status: 'Upcoming',
    tournament: 'T20 World Cup',
    teams: [
      { name: 'PAK', flag: '🇵🇰' },
      { name: 'NZ', flag: '🇳🇿' },
    ],
    date: 'Tomorrow, 7:30 PM',
    dateTime: getFutureDate(1, 19, 30),
  },
  {
    id: 4,
    status: 'Upcoming',
    tournament: 'Champions Trophy',
    teams: [
      { name: 'BAN', flag: '🇧🇩' },
      { name: 'SL', flag: '🇱🇰' },
    ],
    date: '28 June, 3:00 PM',
    dateTime: getFutureDate(2, 15, 0),
  },
  {
    id: 5,
    status: 'Recent',
    tournament: 'Bilateral Series',
    teams: [
        { name: 'WI', score: '178/8', flag: '🏝️' },
        { name: 'AFG', score: '179/5', flag: '🇦🇫' },
    ],
    date: '2 days ago',
    dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    result: 'Afghanistan won by 5 wickets.',
  },
];

export const articles: Article[] = [
  {
    id: 1,
    category: 'Latest News',
    title: 'Kohli Masterclass Guides India to a Thrilling Victory',
    author: 'Anirudh Sharma',
    date: 'June 25, 2024',
    imageUrl: 'https://picsum.photos/800/600',
    imageHint: 'cricket player',
    excerpt: 'Virat Kohli scored a magnificent century to help India chase down a formidable target against Australia in the T20 World Cup semi-final.',
  },
  {
    id: 2,
    category: 'Latest News',
    title: 'Bumrah\'s Fiery Spell Dismantles English Batting Lineup',
    author: 'Priya Singh',
    date: 'June 25, 2024',
    imageUrl: 'https://picsum.photos/400/300',
    imageHint: 'cricket action',
    excerpt: 'Jasprit Bumrah took 5 wickets in a devastating spell of fast bowling.',
  },
  {
    id: 3,
    category: 'Latest News',
    title: 'The Rise of Afghanistan in World Cricket',
    author: 'Zoya Khan',
    date: 'June 25, 2024',
    imageUrl: 'https://picsum.photos/400/300',
    imageHint: 'team celebration',
    excerpt: 'A look at the journey of the Afghanistan cricket team.',
  },
  {
    id: 4,
    category: 'Latest News',
    title: 'What\'s next for the West Indies after early exit?',
    author: 'Chris Thomas',
    date: 'June 24, 2024',
    imageUrl: 'https://picsum.photos/400/300',
    imageHint: 'cricket stadium',
    excerpt: 'Analyzing the performance of the Caribbean side in the recent tournament.',
  },
  {
    id: 5,
    category: 'Latest News',
    title: 'New Zealand\'s Consistent Run in ICC Tournaments',
    author: 'Sarah Taylor',
    date: 'June 24, 2024',
    imageUrl: 'https://picsum.photos/400/300',
    imageHint: 'cricket trophy',
    excerpt: 'The Kiwis have once again proven their mettle on the biggest stage.',
  },
  {
    id: 6,
    category: 'Featured',
    title: 'The Evolution of T20 Cricket: From Entertainment to a Global Phenomenon',
    author: 'Michael Holding',
    date: 'June 23, 2024',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'cricket crowd',
    excerpt: 'How the shortest format of the game has changed the cricketing landscape forever and what the future holds.',
  },
  {
    id: 7,
    category: 'Featured',
    title: 'Remembering Shane Warne: A Magician Who Redefined Spin Bowling',
    author: 'Gideon Haigh',
    date: 'June 22, 2024',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'cricket legend',
    excerpt: 'A tribute to the late Australian legend, whose charisma and skill captivated cricket fans worldwide.',
  },
  {
    id: 8,
    category: 'Opinion',
    title: 'Is It Time for Split Captaincy in Indian Cricket?',
    author: 'Sanjay Manjrekar',
    date: 'June 21, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'cricket strategy',
    excerpt: 'A deep dive into the pros and cons of having different captains for different formats of the game.',
  },
  {
    id: 9,
    category: 'Opinion',
    title: 'The Unsung Heroes: Importance of Fielding in Modern Cricket',
    author: 'Jonty Rhodes',
    date: 'June 20, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'cricket fielding',
    excerpt: 'Why a spectacular catch or a run-out is as crucial as a century or a five-wicket haul.',
  },
  {
    id: 10,
    category: 'Opinion',
    title: 'Player Burnout: The Elephant in the Room',
    author: 'Dr. Ali Bacher',
    date: 'June 19, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'tired athlete',
    excerpt: 'Addressing the demanding schedule and mental toll on international cricketers.',
  },
  {
    id: 11,
    category: 'Stories',
    title: 'From Gully Cricket to The Gabba: The Siraj Story',
    author: 'R. Kaushik',
    date: 'June 18, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'inspirational journey',
    excerpt: 'An inspiring tale of perseverance, passion, and belief.',
  },
  {
    id: 12,
    category: 'Stories',
    title: 'The 1983 World Cup: When Kapil\'s Devils Stunned the World',
    author: 'Ayaz Memon',
    date: 'June 17, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'historic moment',
    excerpt: 'Revisiting the iconic victory that changed the face of Indian cricket.',
  },
  {
    id: 13,
    category: 'Stories',
    title: 'The Bodyline Series: Cricket\'s Most Controversial Chapter',
    author: 'David Frith',
    date: 'June 16, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'cricket history',
    excerpt: 'A look back at the infamous Ashes series of 1932-33.',
  },
  {
    id: 14,
    category: 'Stories',
    title: 'The Story of the First-Ever Cricket Match',
    author: 'ESPN Cricinfo',
    date: 'June 15, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'vintage cricket',
    excerpt: 'Travel back in time to witness the origins of the gentleman\'s game.',
  },
];

export const rankings_odi: RankingTeam[] = [
  { rank: 1, team: 'Australia', rating: 121, flag: '🇦🇺' },
  { rank: 2, team: 'India', rating: 119, flag: '🇮🇳' },
  { rank: 3, team: 'Pakistan', rating: 115, flag: '🇵🇰' },
  { rank: 4, team: 'South Africa', rating: 106, flag: '🇿🇦' },
  { rank: 5, team: 'New Zealand', rating: 103, flag: '🇳🇿' },
];

export const rankings_t20i: RankingTeam[] = [
  { rank: 1, team: 'India', rating: 265, flag: '🇮🇳' },
  { rank: 2, team: 'England', rating: 261, flag: '🇬🇧' },
  { rank: 3, team: 'Australia', rating: 257, flag: '🇦🇺' },
  { rank: 4, team: 'New Zealand', rating: 254, flag: '🇳🇿' },
  { rank: 5, team: 'South Africa', rating: 253, flag: '🇿🇦' },
];

export const rankings_test: RankingTeam[] = [
  { rank: 1, team: 'Australia', rating: 124, flag: '🇦🇺' },
  { rank: 2, team: 'India', rating: 120, flag: '🇮🇳' },
  { rank: 3, team: 'England', rating: 116, flag: '🇬🇧' },
  { rank: 4, team: 'South Africa', rating: 104, flag: '🇿🇦' },
  { rank: 5, team: 'New Zealand', rating: 100, flag: '🇳🇿' },
];

const matchDetailsData: { [key: number]: MatchDetailsData } = {
  1: {
    details: {
      date: 'Today',
      series: 'T20 World Cup',
      venue: 'Kensington Oval, Barbados',
      match: 'Final',
      seriesFull: 'ICC Men\'s T20 World Cup 2024',
      toss: 'Australia won the toss and elected to field.',
      season: '2024',
      format: 'T20I',
      matchDate: 'June 29, 2024',
      status: 'Live',
    },
    teams: {
      a: { name: 'India', flag: '🇮🇳' },
      b: { name: 'Australia', flag: '🇦🇺' },
    },
    countdown: 'Match is live',
    poll: {
      a: { votes: 840, percentage: 65 },
      b: { votes: 455, percentage: 35 },
    },
    recentMatches: [
       { id: 1, type: "T20I", date: "24 Jun 2024", status: "Completed", teams: [{ name: "Australia", flag: "🇦🇺", score: "205/5" }, { name: "India", flag: "🇮🇳", score: "181/7" }], result: "Australia won by 24 runs" },
       { id: 2, type: "T20I", date: "22 Jun 2024", status: "Completed", teams: [{ name: "Afghanistan", flag: "🇦🇫", score: "148/6" }, { name: "Australia", flag: "🇦🇺", score: "127" }], result: "Afghanistan won by 21 runs" },
       { id: 3, type: "T20I", date: "20 Jun 2024", status: "Completed", teams: [{ name: "Australia", flag: "🇦🇺", score: "140/8" }, { name: "Bangladesh", flag: "🇧🇩", score: "100/8" }], result: "Australia won by 28 runs (DLS method)" },
    ],
    playingXI: [
      {
        team: 'India',
        players: [
          { name: 'Rohit Sharma', role: 'Batsman' },
          { name: 'Virat Kohli', role: 'Batsman' },
          { name: 'Rishabh Pant', role: 'Wicketkeeper' },
          { name: 'Suryakumar Yadav', role: 'Batsman' },
          { name: 'Axar Patel', role: 'All-rounder' },
          { name: 'Shivam Dube', role: 'All-rounder' },
          { name: 'Hardik Pandya', role: 'All-rounder' },
          { name: 'Ravindra Jadeja', role: 'All-rounder' },
          { name: 'Arshdeep Singh', role: 'Bowler' },
          { name: 'Kuldeep Yadav', role: 'Bowler' },
          { name: 'Jasprit Bumrah', role: 'Bowler' },
        ],
      },
      {
        team: 'Australia',
        players: [
          { name: 'Travis Head', role: 'Batsman' },
          { name: 'David Warner', role: 'Batsman' },
          { name: 'Mitchell Marsh', role: 'All-rounder' },
          { name: 'Glenn Maxwell', role: 'All-rounder' },
          { name: 'Marcus Stoinis', role: 'All-rounder' },
          { name: 'Tim David', role: 'Batsman' },
          { name: 'Matthew Wade', role: 'Wicketkeeper' },
          { name: 'Pat Cummins', role: 'Bowler' },
          { name: 'Mitchell Starc', role: 'Bowler' },
          { name: 'Adam Zampa', role: 'Bowler' },
          { name: 'Josh Hazlewood', role: 'Bowler' },
        ],
      },
    ],
    headToHead: {
      summary: 'India and Australia have a fierce rivalry. In T20Is, they have played 31 times, with India winning 19 and Australia 11.',
      last5: [
        { teams: [{ name: 'IND', score: '181/7' }, { name: 'AUS', score: '205/5' }], result: 'Australia won by 24 runs' },
        { teams: [{ name: 'IND', score: '140/8' }, { name: 'AUS', score: '141/5' }], result: 'Australia won by 5 wickets' },
        { teams: [{ name: 'IND', score: '174/9' }, { name: 'AUS', score: '154/7' }], result: 'India won by 20 runs' },
        { teams: [{ name: 'IND', score: '235/4' }, { name: 'AUS', score: '191/9' }], result: 'India won by 44 runs' },
        { teams: [{ name: 'IND', score: '208/8' }, { name: 'AUS', score: '209/8' }], result: 'Australia won by 2 wickets' },
      ],
    }
  },
  // Add details for other matches here, using a similar structure.
  // For brevity, I am adding only one. More can be added.
};

// Function to get match details by ID
export const getMatchDetailsById = (id: number): MatchDetailsData | undefined => {
  return matchDetailsData[id] || matchDetailsData[1]; // Return details for match 1 as a fallback
};
