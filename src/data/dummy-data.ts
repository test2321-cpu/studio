
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
    teams: { a: { name: 'India', flag: '🇮🇳' }, b: { name: 'Australia', flag: '🇦🇺' } },
    countdown: 'Match is live',
    poll: { a: { votes: 840, percentage: 65 }, b: { votes: 455, percentage: 35 } },
    recentMatches: [
       { id: 1, type: "T20I", date: "24 Jun 2024", status: "Completed", teams: [{ name: "Australia", flag: "🇦🇺", score: "205/5" }, { name: "India", flag: "🇮🇳", score: "181/7" }], result: "Australia won by 24 runs" },
       { id: 2, type: "T20I", date: "22 Jun 2024", status: "Completed", teams: [{ name: "Afghanistan", flag: "🇦🇫", score: "148/6" }, { name: "Australia", flag: "🇦🇺", score: "127" }], result: "Afghanistan won by 21 runs" },
       { id: 3, type: "T20I", date: "20 Jun 2024", status: "Completed", teams: [{ name: "Australia", flag: "🇦🇺", score: "140/8" }, { name: "Bangladesh", flag: "🇧🇩", score: "100/8" }], result: "Australia won by 28 runs (DLS method)" },
    ],
    playingXI: [
      { team: 'India', players: [
          { name: 'Rohit Sharma', role: 'Batsman' }, { name: 'Virat Kohli', role: 'Batsman' }, { name: 'Rishabh Pant', role: 'Wicketkeeper' }, { name: 'Suryakumar Yadav', role: 'Batsman' }, { name: 'Axar Patel', role: 'All-rounder' }, { name: 'Shivam Dube', role: 'All-rounder' }, { name: 'Hardik Pandya', role: 'All-rounder' }, { name: 'Ravindra Jadeja', role: 'All-rounder' }, { name: 'Arshdeep Singh', role: 'Bowler' }, { name: 'Kuldeep Yadav', role: 'Bowler' }, { name: 'Jasprit Bumrah', role: 'Bowler' },
      ]},
      { team: 'Australia', players: [
          { name: 'Travis Head', role: 'Batsman' }, { name: 'David Warner', role: 'Batsman' }, { name: 'Mitchell Marsh', role: 'All-rounder' }, { name: 'Glenn Maxwell', role: 'All-rounder' }, { name: 'Marcus Stoinis', role: 'All-rounder' }, { name: 'Tim David', role: 'Batsman' }, { name: 'Matthew Wade', role: 'Wicketkeeper' }, { name: 'Pat Cummins', role: 'Bowler' }, { name: 'Mitchell Starc', role: 'Bowler' }, { name: 'Adam Zampa', role: 'Bowler' }, { name: 'Josh Hazlewood', role: 'Bowler' },
      ]},
    ],
    headToHead: {
      summary: 'India and Australia have a fierce rivalry. In T20Is, they have played 31 times, with India winning 19 and Australia 11.',
      last5: [
        { teams: [{ name: 'IND', score: '181/7' }, { name: 'AUS', score: '205/5' }], result: 'Australia won by 24 runs' }, { teams: [{ name: 'IND', score: '140/8' }, { name: 'AUS', score: '141/5' }], result: 'Australia won by 5 wickets' }, { teams: [{ name: 'IND', score: '174/9' }, { name: 'AUS', score: '154/7' }], result: 'India won by 20 runs' }, { teams: [{ name: 'IND', score: '235/4' }, { name: 'AUS', score: '191/9' }], result: 'India won by 44 runs' }, { teams: [{ name: 'IND', score: '208/8' }, { name: 'AUS', score: '209/8' }], result: 'Australia won by 2 wickets' },
      ],
    }
  },
  2: {
    details: {
      date: 'Yesterday',
      series: 'Bilateral Series',
      venue: 'Lord\'s, London',
      match: '3rd ODI',
      seriesFull: 'South Africa tour of England 2024',
      toss: 'South Africa won the toss and elected to bowl.',
      season: '2024',
      format: 'ODI',
      matchDate: 'June 28, 2024',
      status: 'Recent',
    },
    teams: { a: { name: 'England', flag: '🇬🇧' }, b: { name: 'South Africa', flag: '🇿🇦' } },
    countdown: 'Match completed',
    poll: { a: { votes: 320, percentage: 40 }, b: { votes: 480, percentage: 60 } },
    recentMatches: [
       { id: 1, type: "ODI", date: "26 Jun 2024", status: "Completed", teams: [{ name: "England", flag: "🇬🇧", score: "302/8" }, { name: "South Africa", flag: "🇿🇦", score: "298/9" }], result: "England won by 4 runs" },
       { id: 2, type: "ODI", date: "24 Jun 2024", status: "Completed", teams: [{ name: "England", flag: "🇬🇧", score: "250" }, { name: "South Africa", flag: "🇿🇦", score: "251/3" }], result: "South Africa won by 7 wickets" },
       { id: 3, type: "Test", date: "15 Jun 2024", status: "Completed", teams: [{ name: "England", flag: "🇬🇧", score: "450 & 230" }, { name: "South Africa", flag: "🇿🇦", score: "350 & 150" }], result: "England won by 180 runs" },
    ],
    playingXI: [
      { team: 'England', players: [
          { name: 'Jason Roy', role: 'Batsman' }, { name: 'Jonny Bairstow', role: 'Wicketkeeper' }, { name: 'Joe Root', role: 'Batsman' }, { name: 'Eoin Morgan', role: 'Batsman' }, { name: 'Ben Stokes', role: 'All-rounder' }, { name: 'Jos Buttler', role: 'Wicketkeeper' }, { name: 'Moeen Ali', role: 'All-rounder' }, { name: 'Chris Woakes', role: 'All-rounder' }, { name: 'Adil Rashid', role: 'Bowler' }, { name: 'Jofra Archer', role: 'Bowler' }, { name: 'Mark Wood', role: 'Bowler' },
      ]},
      { team: 'South Africa', players: [
          { name: 'Quinton de Kock', role: 'Wicketkeeper' }, { name: 'Aiden Markram', role: 'Batsman' }, { name: 'Rassie van der Dussen', role: 'Batsman' }, { name: 'Faf du Plessis', role: 'Batsman' }, { name: 'David Miller', role: 'Batsman' }, { name: 'Heinrich Klaasen', role: 'Wicketkeeper' }, { name: 'Andile Phehlukwayo', role: 'All-rounder' }, { name: 'Kagiso Rabada', role: 'Bowler' }, { name: 'Lungi Ngidi', role: 'Bowler' }, { name: 'Anrich Nortje', role: 'Bowler' }, { name: 'Tabraiz Shamsi', role: 'Bowler' },
      ]},
    ],
    headToHead: {
      summary: 'In ODIs, England and South Africa have played 69 times. England have won 31, South Africa 32, with 1 tie and 5 no results.',
      last5: [
        { teams: [{ name: 'ENG', score: '205' }, { name: 'SA', score: '208/4' }], result: 'South Africa won by 6 wickets' },
        { teams: [{ name: 'ENG', score: '302/8' }, { name: 'SA', score: '298/9' }], result: 'England won by 4 runs' },
        { teams: [{ name: 'ENG', score: '250' }, { name: 'SA', score: '251/3' }], result: 'South Africa won by 7 wickets' },
        { teams: [{ name: 'ENG', score: '311/8' }, { name: 'SA', score: '207' }], result: 'England won by 104 runs' },
        { teams: [{ name: 'ENG', score: '339/9' }, { name: 'SA', score: '340/3' }], result: 'South Africa won by 7 wickets' },
      ],
    }
  },
  3: {
    details: {
      date: 'Tomorrow, 7:30 PM',
      series: 'T20 World Cup',
      venue: 'Dubai International Stadium',
      match: 'Semi-Final 1',
      seriesFull: 'ICC Men\'s T20 World Cup 2024',
      toss: 'New Zealand won the toss and elected to bowl.',
      season: '2024',
      format: 'T20I',
      matchDate: 'June 30, 2024',
      status: 'Upcoming',
    },
    teams: { a: { name: 'Pakistan', flag: '🇵🇰' }, b: { name: 'New Zealand', flag: '🇳🇿' } },
    countdown: 'Match starts tomorrow',
    poll: { a: { votes: 620, percentage: 55 }, b: { votes: 505, percentage: 45 } },
    recentMatches: [
       { id: 1, type: "T20I", date: "25 Jun 2024", status: "Completed", teams: [{ name: "Pakistan", flag: "🇵🇰", score: "159/8" }, { name: "Ireland", flag: "🇮🇪", score: "160/7" }], result: "Ireland won by 3 wickets" },
       { id: 2, type: "T20I", date: "23 Jun 2024", status: "Completed", teams: [{ name: "Pakistan", flag: "🇵🇰", score: "182/6" }, { name: "Canada", flag: "🇨🇦", score: "178/7" }], result: "Pakistan won by 4 runs" },
       { id: 3, type: "T20I", date: "21 Jun 2024", status: "Completed", teams: [{ name: "Pakistan", flag: "🇵🇰", score: "137/7" }, { name: "USA", flag: "🇺🇸", score: "138/5" }], result: "USA won by 5 wickets" },
    ],
    playingXI: [
      { team: 'Pakistan', players: [
          { name: 'Babar Azam', role: 'Batsman' }, { name: 'Mohammad Rizwan', role: 'Wicketkeeper' }, { name: 'Fakhar Zaman', role: 'Batsman' }, { name: 'Iftikhar Ahmed', role: 'All-rounder' }, { name: 'Shadab Khan', role: 'All-rounder' }, { name: 'Imad Wasim', role: 'All-rounder' }, { name: 'Asif Ali', role: 'Batsman' }, { name: 'Shaheen Afridi', role: 'Bowler' }, { name: 'Haris Rauf', role: 'Bowler' }, { name: 'Naseem Shah', role: 'Bowler' }, { name: 'Mohammad Amir', role: 'Bowler' },
      ]},
      { team: 'New Zealand', players: [
          { name: 'Finn Allen', role: 'Batsman' }, { name: 'Devon Conway', role: 'Wicketkeeper' }, { name: 'Kane Williamson', role: 'Batsman' }, { name: 'Glenn Phillips', role: 'Batsman' }, { name: 'Daryl Mitchell', role: 'All-rounder' }, { name: 'James Neesham', role: 'All-rounder' }, { name: 'Mitchell Santner', role: 'All-rounder' }, { name: 'Tim Southee', role: 'Bowler' }, { name: 'Lockie Ferguson', role: 'Bowler' }, { name: 'Ish Sodhi', role: 'Bowler' }, { name: 'Trent Boult', role: 'Bowler' },
      ]},
    ],
    headToHead: {
      summary: 'Pakistan and New Zealand have played 34 T20Is. Pakistan has won 20, while New Zealand has won 14.',
      last5: [
        { teams: [{ name: 'PAK', score: '135/5' }, { name: 'NZ', score: '134/8' }], result: 'Pakistan won by 5 wickets' },
        { teams: [{ name: 'PAK', score: '92' }, { name: 'NZ', score: '94/1' }], result: 'New Zealand won by 9 wickets' },
        { teams: [{ name: 'PAK', score: '182' }, { name: 'NZ', score: '164' }], result: 'Pakistan won by 18 runs' },
        { teams: [{ name: 'PAK', score: '193/5' }, { name: 'NZ', score: '194/6' }], result: 'New Zealand won by 4 runs' },
        { teams: [{ name: 'PAK', score: '163/5' }, { name: 'NZ', score: '164/5' }], result: 'New Zealand won by 5 wickets' },
      ],
    }
  },
  4: {
    details: {
      date: '28 June, 3:00 PM',
      series: 'Champions Trophy',
      venue: 'Edgbaston, Birmingham',
      match: 'Group A',
      seriesFull: 'ICC Champions Trophy 2025',
      toss: 'Bangladesh won the toss and elected to bat.',
      season: '2025',
      format: 'ODI',
      matchDate: 'June 28, 2025',
      status: 'Upcoming',
    },
    teams: { a: { name: 'Bangladesh', flag: '🇧🇩' }, b: { name: 'Sri Lanka', flag: '🇱🇰' } },
    countdown: 'Match starts in 2 days',
    poll: { a: { votes: 410, percentage: 48 }, b: { votes: 440, percentage: 52 } },
    recentMatches: [
       { id: 1, type: "ODI", date: "20 Jun 2024", status: "Completed", teams: [{ name: "Bangladesh", flag: "🇧🇩", score: "276/9" }, { name: "Netherlands", flag: "🇳🇱", score: "251" }], result: "Bangladesh won by 25 runs" },
       { id: 2, type: "ODI", date: "18 Jun 2024", status: "Completed", teams: [{ name: "Bangladesh", flag: "🇧🇩", score: "265/8" }, { name: "South Africa", flag: "🇿🇦", score: "266/6" }], result: "South Africa won by 4 runs" },
       { id: 3, type: "ODI", date: "16 Jun 2024", status: "Completed", teams: [{ name: "Bangladesh", flag: "🇧🇩", score: "306/7" }, { name: "Sri Lanka", flag: "🇱🇰", score: "307/8" }], result: "Sri Lanka won by 2 wickets" },
    ],
    playingXI: [
      { team: 'Bangladesh', players: [
          { name: 'Tamim Iqbal', role: 'Batsman' }, { name: 'Liton Das', role: 'Wicketkeeper' }, { name: 'Shakib Al Hasan', role: 'All-rounder' }, { name: 'Mushfiqur Rahim', role: 'Wicketkeeper' }, { name: 'Mahmudullah', role: 'All-rounder' }, { name: 'Najmul Hossain Shanto', role: 'Batsman' }, { name: 'Mehidy Hasan Miraz', role: 'All-rounder' }, { name: 'Mustafizur Rahman', role: 'Bowler' }, { name: 'Taskin Ahmed', role: 'Bowler' }, { name: 'Shoriful Islam', role: 'Bowler' }, { name: 'Afif Hossain', role: 'Batsman' },
      ]},
      { team: 'Sri Lanka', players: [
          { name: 'Pathum Nissanka', role: 'Batsman' }, { name: 'Kusal Mendis', role: 'Wicketkeeper' }, { name: 'Charith Asalanka', role: 'Batsman' }, { name: 'Dhananjaya de Silva', role: 'All-rounder' }, { name: 'Dasun Shanaka', role: 'All-rounder' }, { name: 'Wanindu Hasaranga', role: 'All-rounder' }, { name: 'Chamika Karunaratne', role: 'All-rounder' }, { name: 'Dushmantha Chameera', role: 'Bowler' }, { name: 'Maheesh Theekshana', role: 'Bowler' }, { name: 'Lahiru Kumara', role: 'Bowler' }, { name: 'Pramod Madushan', role: 'Bowler' },
      ]},
    ],
    headToHead: {
      summary: 'In ODIs, Bangladesh and Sri Lanka have played 53 times. Bangladesh has won 10, while Sri Lanka has won 41, with 2 no results.',
      last5: [
        { teams: [{ name: 'BAN', score: '306/7' }, { name: 'SL', score: '307/8' }], result: 'Sri Lanka won by 2 wickets' },
        { teams: [{ name: 'BAN', score: '257/6' }, { name: 'SL', score: '258/7' }], result: 'Sri Lanka won by 3 wickets' },
        { teams: [{ name: 'BAN', score: '238/8' }, { name: 'SL', score: '141/9' }], result: 'Bangladesh won by 97 runs (DLS)' },
        { teams: [{ name: 'BAN', score: '246' }, { name: 'SL', score: '143' }], result: 'Bangladesh won by 103 runs' },
        { teams: [{ name: 'BAN', score: '257/9' }, { name: 'SL', score: '224' }], result: 'Bangladesh won by 33 runs' },
      ],
    }
  },
  5: {
    details: {
      date: '2 days ago',
      series: 'Bilateral Series',
      venue: 'Sharjah Cricket Stadium',
      match: '1st T20I',
      seriesFull: 'Afghanistan vs West Indies in UAE 2024',
      toss: 'Afghanistan won the toss and elected to field.',
      season: '2024',
      format: 'T20I',
      matchDate: 'June 27, 2024',
      status: 'Recent',
    },
    teams: { a: { name: 'West Indies', flag: '🏝️' }, b: { name: 'Afghanistan', flag: '🇦🇫' } },
    countdown: 'Match completed',
    poll: { a: { votes: 380, percentage: 45 }, b: { votes: 460, percentage: 55 } },
    recentMatches: [
       { id: 1, type: "T20I", date: "25 Jun 2024", status: "Completed", teams: [{ name: "West Indies", flag: "🏝️", score: "150/7" }, { name: "New Zealand", flag: "🇳🇿", score: "151/5" }], result: "New Zealand won by 5 wickets" },
       { id: 2, type: "T20I", date: "23 Jun 2024", status: "Completed", teams: [{ name: "West Indies", flag: "🏝️", score: "202/5" }, { name: "Uganda", flag: "🇺🇬", score: "63" }], result: "West Indies won by 139 runs" },
       { id: 3, type: "T20I", date: "21 Jun 2024", status: "Completed", teams: [{ name: "West Indies", flag: "🏝️", score: "189/5" }, { name: "PNG", flag: "🇵🇬", score: "190/7" }], result: "PNG won by 3 wickets" },
    ],
    playingXI: [
      { team: 'West Indies', players: [
          { name: 'Brandon King', role: 'Batsman' }, { name: 'Johnson Charles', role: 'Batsman' }, { name: 'Nicholas Pooran', role: 'Wicketkeeper' }, { name: 'Rovman Powell', role: 'Batsman' }, { name: 'Sherfane Rutherford', role: 'Batsman' }, { name: 'Andre Russell', role: 'All-rounder' }, { name: 'Romario Shepherd', role: 'All-rounder' }, { name: 'Akeal Hosein', role: 'Bowler' }, { name: 'Alzarri Joseph', role: 'Bowler' }, { name: 'Gudakesh Motie', role: 'Bowler' }, { name: 'Obed McCoy', role: 'Bowler' },
      ]},
      { team: 'Afghanistan', players: [
          { name: 'Rahmanullah Gurbaz', role: 'Wicketkeeper' }, { name: 'Ibrahim Zadran', role: 'Batsman' }, { name: 'Gulbadin Naib', role: 'All-rounder' }, { name: 'Azmatullah Omarzai', role: 'All-rounder' }, { name: 'Najibullah Zadran', role: 'Batsman' }, { name: 'Mohammad Nabi', role: 'All-rounder' }, { name: 'Rashid Khan', role: 'Bowler' }, { name: 'Karim Janat', role: 'All-rounder' }, { name: 'Naveen-ul-Haq', role: 'Bowler' }, { name: 'Noor Ahmad', role: 'Bowler' }, { name: 'Fazalhaq Farooqi', role: 'Bowler' },
      ]},
    ],
    headToHead: {
      summary: 'In T20Is, West Indies and Afghanistan have played 7 times. West Indies has won 4, while Afghanistan has won 3.',
      last5: [
        { teams: [{ name: 'WI', score: '178/8' }, { name: 'AFG', score: '179/5' }], result: 'Afghanistan won by 5 wickets' },
        { teams: [{ name: 'WI', score: '159/5' }, { name: 'AFG', score: '160/4' }], result: 'Afghanistan won by 6 wickets' },
        { teams: [{ name: 'WI', score: '112' }, { name: 'AFG', score: '124/7' }], result: 'Afghanistan won by 12 runs' },
        { teams: [{ name: 'WI', score: '142/7' }, { name: 'AFG', score: '123/7' }], result: 'West Indies won by 19 runs' },
        { teams: [{ name: 'WI', score: '147/7' }, { name: 'AFG', score: '126/6' }], result: 'West Indies won by 21 runs' },
      ],
    }
  },
};

// Function to get match details by ID
export const getMatchDetailsById = (id: number): MatchDetailsData | undefined => {
  return matchDetailsData[id];
};
