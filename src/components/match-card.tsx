
import Link from 'next/link';
import type { Match } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CountdownTimer } from './countdown-timer';

export function MatchCard({ match }: { match: Match }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Live':
        return <Badge variant="destructive">Live</Badge>;
      case 'Upcoming':
        return <Badge variant="secondary">Upcoming</Badge>;
      case 'Recent':
        return <Badge variant="outline">Recent</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Link href={`/match/${match.id}`} className="block hover:shadow-lg transition-shadow rounded-lg">
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-semibold">
                      {match.tournament}
                    </p>
                    {getStatusBadge(match.status)}
                </div>
                 <p className="text-xs text-muted-foreground pt-1">
                    {match.date.replace(/, \d{1,2}:\d{2} [AP]M$/, '')}
                </p>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-sm">
                <div className="flex items-center font-medium gap-3">
                    <span className="text-lg">{match.teams[0].flag}</span>
                    <span>{match.teams[0].name}</span>
                    {match.teams[0].score && <span className="ml-auto font-bold">{match.teams[0].score}</span>}
                </div>
                <div className="flex items-center font-medium gap-3">
                    <span className="text-lg">{match.teams[1].flag}</span>
                    <span>{match.teams[1].name}</span>
                    {match.teams[1].score && <span className="ml-auto font-bold">{match.teams[1].score}</span>}
                </div>
            </CardContent>
            <CardFooter>
                 {match.status === 'Upcoming' ? (
                    <div className="w-full">
                      <CountdownTimer targetDate={match.dateTime} />
                    </div>
                  ) : (
                    <p className="text-xs text-primary">
                      {match.result}
                    </p>
                  )}
            </CardFooter>
        </Card>
    </Link>
  );
}
