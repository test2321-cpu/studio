
import type { Article, RankingTeam, MatchDetailsData } from '@/lib/types';

// This file is now primarily for static data like rankings and article details stubs.
// Match data is fetched directly from Firestore.

export const articles: Article[] = [
  {
    id: '1',
    slug: 'kohli-masterclass-guides-india-to-thrilling-victory',
    category: 'Latest News',
    title: 'Kohli Masterclass Guides India to a Thrilling Victory',
    author: 'Anirudh Sharma',
    date: 'June 25, 2024',
    imageUrl: 'https://picsum.photos/800/600',
    imageHint: 'cricket player',
    excerpt: 'Virat Kohli scored a magnificent century to help India chase down a formidable target against Australia in the T20 World Cup semi-final.',
    content: 'In a stunning display of batsmanship, Virat Kohli scored a magnificent century to help India chase down a formidable target against Australia in the T20 World Cup semi-final. His unbeaten 112 off just 60 balls was studded with 10 fours and 5 sixes, leaving the opposition hapless. This innings will be remembered as one of the greatest in T20 history.',
  },
  {
    id: '2',
    slug: 'bumrahs-fiery-spell-dismantles-english-batting-lineup',
    category: 'Latest News',
    title: 'Bumrah\'s Fiery Spell Dismantles English Batting Lineup',
    author: 'Priya Singh',
    date: 'June 25, 2024',
    imageUrl: 'https://picsum.photos/400/300',
    imageHint: 'cricket action',
    excerpt: 'Jasprit Bumrah took 5 wickets in a devastating spell of fast bowling.',
    content: 'Jasprit Bumrah was at his lethal best, taking 5 wickets for just 12 runs in a devastating spell of fast bowling that dismantled the English batting lineup. His yorkers and slower balls were unplayable, leading India to a comfortable victory in the crucial encounter.',
  },
  {
    id: '3',
    slug: 'the-rise-of-afghanistan-in-world-cricket',
    category: 'Latest News',
    title: 'The Rise of Afghanistan in World Cricket',
    author: 'Zoya Khan',
    date: 'June 25, 2024',
    imageUrl: 'https://picsum.photos/400/300',
    imageHint: 'team celebration',
    excerpt: 'A look at the journey of the Afghanistan cricket team.',
    content: 'From a war-torn nation to a formidable force in world cricket, the journey of the Afghanistan cricket team is nothing short of a fairytale. This article takes a look at their incredible rise, the challenges they overcame, and the stars that have emerged from their ranks.',
  },
  {
    id: '4',
    slug: 'whats-next-for-west-indies-after-early-exit',
    category: 'Latest News',
    title: 'What\'s next for the West Indies after early exit?',
    author: 'Chris Thomas',
    date: 'June 24, 2024',
    imageUrl: 'https://picsum.photos/400/300',
    imageHint: 'cricket stadium',
    excerpt: 'Analyzing the performance of the Caribbean side in the recent tournament.',
    content: 'After a disappointing early exit from the T20 World Cup, the West Indies cricket team is at a crossroads. This piece analyzes their performance, the reasons behind their failure, and what the future holds for the two-time champions.',
  },
  {
    id: '5',
    slug: 'new-zealands-consistent-run-in-icc-tournaments',
    category: 'Latest News',
    title: 'New Zealand\'s Consistent Run in ICC Tournaments',
    author: 'Sarah Taylor',
    date: 'June 24, 2024',
    imageUrl: 'https://picsum.photos/400/300',
    imageHint: 'cricket trophy',
    excerpt: 'The Kiwis have once again proven their mettle on the biggest stage.',
    content: 'New Zealand has consistently been one of the top performers in ICC tournaments, often punching above their weight. We explore the factors behind their success, their team culture, and why they are always a team to watch out for.',
  },
  {
    id: '6',
    slug: 'the-evolution-of-t20-cricket',
    category: 'Featured',
    title: 'The Evolution of T20 Cricket: From Entertainment to a Global Phenomenon',
    author: 'Michael Holding',
    date: 'June 23, 2024',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'cricket crowd',
    excerpt: 'How the shortest format of the game has changed the cricketing landscape forever and what the future holds.',
    content: 'T20 cricket has revolutionized the sport, bringing in new audiences and financial riches. This featured article traces its evolution from a mere entertaining format to a global phenomenon, discussing its impact on Test cricket and the future of the sport.',
  },
  {
    id: '7',
    slug: 'remembering-shane-warne-a-magician',
    category: 'Featured',
    title: 'Remembering Shane Warne: A Magician Who Redefined Spin Bowling',
    author: 'Gideon Haigh',
    date: 'June 22, 2024',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'cricket legend',
    excerpt: 'A tribute to the late Australian legend, whose charisma and skill captivated cricket fans worldwide.',
    content: 'The world of cricket is poorer without Shane Warne. This tribute looks back at the life and career of the legendary leg-spinner, his most memorable performances, and his lasting legacy on the game. A true magician who redefined the art of spin bowling.',
  },
  {
    id: '8',
    slug: 'is-it-time-for-split-captaincy-in-indian-cricket',
    category: 'Opinion',
    title: 'Is It Time for Split Captaincy in Indian Cricket?',
    author: 'Sanjay Manjrekar',
    date: 'June 21, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'cricket strategy',
    excerpt: 'A deep dive into the pros and cons of having different captains for different formats of the game.',
    content: 'With the increasing workload and different demands of each format, the debate around split captaincy has resurfaced in Indian cricket. This opinion piece explores the arguments for and against this move, and whether it could be the key to sustained success.',
  },
  {
    id: '9',
    slug: 'the-unsung-heroes-importance-of-fielding',
    category: 'Opinion',
    title: 'The Unsung Heroes: Importance of Fielding in Modern Cricket',
    author: 'Jonty Rhodes',
    date: 'June 20, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'cricket fielding',
    excerpt: 'Why a spectacular catch or a run-out is as crucial as a century or a five-wicket haul.',
    content: 'Catches win matches, they say. In this piece, legendary fielder Jonty Rhodes explains the importance of fielding in modern cricket. He argues that the impact of a great fielder is often underestimated and is as crucial as a star batsman or bowler.',
  },
  {
    id: '10',
    slug: 'player-burnout-the-elephant-in-the-room',
    category: 'Opinion',
    title: 'Player Burnout: The Elephant in the Room',
    author: 'Dr. Ali Bacher',
    date: 'June 19, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'tired athlete',
    excerpt: 'Addressing the demanding schedule and mental toll on international cricketers.',
    content: 'The packed international calendar is taking a toll on players, both physically and mentally. This article addresses the issue of player burnout, its consequences, and what cricket boards can do to manage the workload of their players better.',
  },
  {
    id: '11',
    slug: 'from-gully-cricket-to-the-gabba-the-siraj-story',
    category: 'Stories',
    title: 'From Gully Cricket to The Gabba: The Siraj Story',
    author: 'R. Kaushik',
    date: 'June 18, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'inspirational journey',
    excerpt: 'An inspiring tale of perseverance, passion, and belief.',
    content: 'Mohammed Siraj\'s journey from the narrow lanes of Hyderabad to conquering the fortress of The Gabba is an inspiring tale of grit, determination, and self-belief. This story chronicles his struggles, his triumphs, and his emotional journey to the top.',
  },
  {
    id: '12',
    slug: 'the-1983-world-cup-when-kapils-devils-stunned-the-world',
    category: 'Stories',
    title: 'The 1983 World Cup: When Kapil\'s Devils Stunned the World',
    author: 'Ayaz Memon',
    date: 'June 17, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'historic moment',
    excerpt: 'Revisiting the iconic victory that changed the face of Indian cricket.',
    content: 'June 25, 1983, is a date etched in the memory of every Indian cricket fan. This story revisits that glorious day at Lord\'s when Kapil Dev\'s underdogs defied all odds to beat the mighty West Indies and lift the Prudential World Cup, changing the face of Indian cricket forever.',
  },
  {
    id: '13',
    slug: 'the-bodyline-series-crickets-most-controversial-chapter',
    category: 'Stories',
    title: 'The Bodyline Series: Cricket\'s Most Controversial Chapter',
    author: 'David Frith',
    date: 'June 16, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'cricket history',
    excerpt: 'A look back at the infamous Ashes series of 1932-33.',
    content: 'The 1932-33 Ashes series, famously known as the Bodyline series, remains one of the most controversial chapters in cricket history. This story delves into the tactics employed by England captain Douglas Jardine to counter the genius of Don Bradman, the ensuing controversy, and its impact on the game.',
  },
  {
    id: '14',
    slug: 'the-story-of-the-first-ever-cricket-match',
    category: 'Stories',
    title: 'The Story of the First-Ever Cricket Match',
    author: 'ESPN Cricinfo',
    date: 'June 15, 2024',
    imageUrl: 'https://picsum.photos/500/350',
    imageHint: 'vintage cricket',
    excerpt: 'Travel back in time to witness the origins of the gentleman\'s game.',
    content: 'Ever wondered when and where the first-ever cricket match was played? This story takes you back in time to explore the origins of this beautiful game, the first recorded match, and how the rules and equipment have evolved over the centuries.',
  },
];


export const rankings_odi: RankingTeam[] = [
  { rank: 1, team: 'Australia', rating: 121, flag: 'australia' },
  { rank: 2, team: 'India', rating: 119, flag: 'india' },
  { rank: 3, team: 'Pakistan', rating: 115, flag: 'pakistan' },
  { rank: 4, team: 'South Africa', rating: 106, flag: 'south-africa' },
  { rank: 5, team: 'New Zealand', rating: 103, flag: 'new-zealand' },
];

export const rankings_t20i: RankingTeam[] = [
  { rank: 1, team: 'India', rating: 265, flag: 'india' },
  { rank: 2, team: 'England', rating: 261, flag: 'england' },
  { rank: 3, team: 'Australia', rating: 257, flag: 'australia' },
  { rank: 4, team: 'New Zealand', rating: 254, flag: 'new-zealand' },
  { rank: 5, team: 'South Africa', rating: 253, flag: 'south-africa' },
];

export const rankings_test: RankingTeam[] = [
  { rank: 1, team: 'Australia', rating: 124, flag: 'australia' },
  { rank: 2, team: 'India', rating: 120, flag: 'india' },
  { rank: 3, team: 'England', rating: 116, flag: 'england' },
  { rank: 4, team: 'South Africa', rating: 104, flag: 'south-africa' },
  { rank: 5, team: 'New Zealand', rating: 100, flag: 'new-zealand' },
];

const matchDetailsData: { [key: string]: MatchDetailsData } = {
  "1": {
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
    teams: { a: { name: 'India', flag: 'india' }, b: { name: 'Australia', flag: 'australia' } },
    countdown: 'Match is live',
    poll: { a: { votes: 840, percentage: 65 }, b: { votes: 455, percentage: 35 } },
    recentMatches: [
       { id: "1", type: "T20I", date: "24 Jun 2024", status: "Completed", teams: [{ name: "Australia", flag: "australia", score: "205/5" }, { name: "India", flag: "india", score: "181/7" }], result: "Australia won by 24 runs" },
       { id: "2", type: "T20I", date: "22 Jun 2024", status: "Completed", teams: [{ name: "Afghanistan", flag: "afghanistan", score: "148/6" }, { name: "Australia", flag: "australia", score: "127" }], result: "Afghanistan won by 21 runs" },
       { id: "3", type: "T20I", date: "20 Jun 2024", status: "Completed", teams: [{ name: "Australia", flag: "australia", score: "140/8" }, { name: "Bangladesh", flag: "bangladesh", score: "100/8" }], result: "Australia won by 28 runs (DLS method)" },
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
};

// Function to get match details by ID
export const getMatchDetailsById = (id: string): MatchDetailsData | undefined => {
  // This is now a mock function. In a real app, you'd fetch this from Firestore.
  // We return a generic object for now as the detailed view is complex.
  return Object.values(matchDetailsData)[0];
};

    