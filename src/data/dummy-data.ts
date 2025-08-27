
import type { Article, Match, RankingTeam, MatchDetailsData } from '@/lib/types';

const getFutureDateISO = (days: number, hours: number, minutes: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

const getPastDateISO = (days: number, hours: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  if (hours) {
    date.setHours(date.getHours() - hours);
  }
  return date.toISOString();
}

const getLiveMatchTimes = () => {
    const now = new Date();
    const startTime = new Date(now.getTime() - 1 * 60 * 60 * 1000); // 1 hour ago
    const endTime = new Date(now.getTime() + 2.5 * 60 * 60 * 1000); // 2.5 hours from now
    return { startTime: startTime.toISOString(), endTime: endTime.toISOString() };
}

const liveMatchTimes = getLiveMatchTimes();

export const matches: Match[] = [
  {
    id: 1,
    status: 'Live', // This will be dynamically overridden
    tournament: 'T20 World Cup',
    teams: [
      { name: 'IND', score: '150/2 (15.3 ov)', flag: 'india' },
      { name: 'AUS', score: '188/5 (20 ov)', flag: 'australia' },
    ],
    date: 'Today',
    startTime: liveMatchTimes.startTime,
    endTime: liveMatchTimes.endTime,
    result: 'India need 39 runs in 27 balls.',
  },
  {
    id: 2,
    status: 'Recent',
    tournament: 'Bilateral Series',
    teams: [
      { name: 'ENG', score: '205/10', flag: 'england' },
      { name: 'SA', score: '208/4', flag: 'south-africa' },
    ],
    date: 'Yesterday',
    startTime: getPastDateISO(1, 4),
    endTime: getPastDateISO(1, 0),
    result: 'South Africa won by 6 wickets.',
  },
  {
    id: 3,
    status: 'Upcoming',
    tournament: 'T20 World Cup',
    teams: [
      { name: 'PAK', flag: 'pakistan' },
      { name: 'NZ', flag: 'new-zealand' },
    ],
    date: 'Tomorrow, 7:30 PM',
    startTime: getFutureDateISO(1, 19, 30),
    endTime: getFutureDateISO(1, 23, 0),
  },
  {
    id: 4,
    status: 'Upcoming',
    tournament: 'Champions Trophy',
    teams: [
      { name: 'BAN', flag: 'bangladesh' },
      { name: 'SL', flag: 'sri-lanka' },
    ],
    date: '2 days from now, 3:00 PM',
    startTime: getFutureDateISO(2, 15, 0),
    endTime: getFutureDateISO(2, 18, 30),
  },
  {
    id: 5,
    status: 'Recent',
    tournament: 'Bilateral Series',
    teams: [
        { name: 'WI', score: '178/8', flag: 'west-indies' },
        { name: 'AFG', score: '179/5', flag: 'afghanistan' },
    ],
    date: '2 days ago',
    startTime: getPastDateISO(2, 4),
    endTime: getPastDateISO(2, 0),
    result: 'Afghanistan won by 5 wickets.',
  },
];

export const articles: Article[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    teams: { a: { name: 'India', flag: 'india' }, b: { name: 'Australia', flag: 'australia' } },
    countdown: 'Match is live',
    poll: { a: { votes: 840, percentage: 65 }, b: { votes: 455, percentage: 35 } },
    recentMatches: [
       { id: 1, type: "T20I", date: "24 Jun 2024", status: "Completed", teams: [{ name: "Australia", flag: "australia", score: "205/5" }, { name: "India", flag: "india", score: "181/7" }], result: "Australia won by 24 runs" },
       { id: 2, type: "T20I", date: "22 Jun 2024", status: "Completed", teams: [{ name: "Afghanistan", flag: "afghanistan", score: "148/6" }, { name: "Australia", flag: "australia", score: "127" }], result: "Afghanistan won by 21 runs" },
       { id: 3, type: "T20I", date: "20 Jun 2024", status: "Completed", teams: [{ name: "Australia", flag: "australia", score: "140/8" }, { name: "Bangladesh", flag: "bangladesh", score: "100/8" }], result: "Australia won by 28 runs (DLS method)" },
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
    teams: { a: { name: 'England', flag: 'england' }, b: { name: 'South Africa', flag: 'south-africa' } },
    countdown: 'Match completed',
    poll: { a: { votes: 320, percentage: 40 }, b: { votes: 480, percentage: 60 } },
    recentMatches: [
       { id: 1, type: "ODI", date: "26 Jun 2024", status: "Completed", teams: [{ name: "England", flag: "england", score: "302/8" }, { name: "South Africa", flag: "south-africa", score: "298/9" }], result: "England won by 4 runs" },
       { id: 2, type: "ODI", date: "24 Jun 2024", status: "Completed", teams: [{ name: "England", flag: "england", score: "250" }, { name: "South Africa", flag: "south-africa", score: "251/3" }], result: "South Africa won by 7 wickets" },
       { id: 3, type: "Test", date: "15 Jun 2024", status: "Completed", teams: [{ name: "England", flag: "england", score: "450 & 230" }, { name: "South Africa", flag: "south-africa", score: "350 & 150" }], result: "England won by 180 runs" },
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
    teams: { a: { name: 'Pakistan', flag: 'pakistan' }, b: { name: 'New Zealand', flag: 'new-zealand' } },
    countdown: 'Match starts tomorrow',
    poll: { a: { votes: 620, percentage: 55 }, b: { votes: 505, percentage: 45 } },
    recentMatches: [
       { id: 1, type: "T20I", date: "25 Jun 2024", status: "Completed", teams: [{ name: "Pakistan", flag: "pakistan", score: "159/8" }, { name: "Ireland", flag: "ireland', score: '160/7' }], result: "Ireland won by 3 wickets" },
       { id: 2, type: "T20I", date: "23 Jun 2024", status: "Completed", teams: [{ name: "Pakistan", flag: "pakistan", score: "182/6" }, { name: "Canada", flag: "canada", score: "178/7" }], result: "Pakistan won by 4 runs" },
       { id: 3, type: "T20I", date: "21 Jun 2024", status: "Completed", teams: [{ name: "Pakistan", flag: "pakistan", score: "137/7" }, { name: "USA", flag: "united-states-of-america", score: "138/5" }], result: "USA won by 5 wickets" },
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
    teams: { a: { name: 'Bangladesh', flag: 'bangladesh' }, b: { name: 'Sri Lanka', flag: 'sri-lanka' } },
    countdown: 'Match starts in 2 days',
    poll: { a: { votes: 410, percentage: 48 }, b: { votes: 440, percentage: 52 } },
    recentMatches: [
       { id: 1, type: "ODI", date: "20 Jun 2024", status: "Completed", teams: [{ name: "Bangladesh", flag: "bangladesh", score: "276/9" }, { name: "Netherlands", flag: 'netherlands', score: "251" }], result: "Bangladesh won by 25 runs" },
       { id: 2, type: "ODI", date: "18 Jun 2024", status: "Completed", teams: [{ name: "Bangladesh", flag: "bangladesh", score: "265/8" }, { name: "South Africa", flag: "south-africa", score: "266/6" }], result: "South Africa won by 4 runs" },
       { id: 3, type: "ODI", date: "16 Jun 2024", status: "Completed", teams: [{ name: "Bangladesh", flag: "bangladesh", score: "306/7" }, { name: "Sri Lanka", flag: "sri-lanka", score: "307/8" }], result: "Sri Lanka won by 2 wickets" },
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
    teams: { a: { name: 'West Indies', flag: 'west-indies' }, b: { name: 'Afghanistan', flag: 'afghanistan' } },
    countdown: 'Match completed',
    poll: { a: { votes: 380, percentage: 45 }, b: { votes: 460, percentage: 55 } },
    recentMatches: [
       { id: 1, type: "T20I", date: "25 Jun 2024", status: "Completed", teams: [{ name: "West Indies", flag: "west-indies", score: "150/7" }, { name: "New Zealand", flag: "new-zealand", score: "151/5" }], result: "New Zealand won by 5 wickets" },
       { id: 2, type: "T20I", date: "23 Jun 2024", status: "Completed", teams: [{ name: "West Indies", flag: "west-indies", score: "202/5" }, { name: "Uganda", flag: "uganda", score: "63" }], result: "West Indies won by 139 runs" },
       { id: 3, type: "T20I", date: "21 Jun 2024", status: "Completed", teams: [{ name: "West Indies", flag: "west-indies", score: "189/5" }, { name: "Papua New Guinea", flag: 'papua-new-guinea', score: "190/7" }], result: "PNG won by 3 wickets" },
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
