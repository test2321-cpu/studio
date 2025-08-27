import Link from 'next/link';
import { matches } from '@/data/dummy-data';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CountdownTimer } from './countdown-timer';
import { getDynamicMatchStatus } from '@/lib/utils';
import type { Match } from '@/lib/types';

export function LiveMatchesBar() {
  const getStatusBadge = (status: Match['status']) => {
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
    <div className="bg-background border-b">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center space-x-4 overflow-x-auto py-3 no-scrollbar">
          {matches.map((match, index) => {
            const dynamicStatus = getDynamicMatchStatus(match);
            return (
              <div key={match.id} className="flex items-center space-x-4">
                <Link href={`/match/${match.id}`} className="block hover:bg-muted/50 transition-colors rounded-lg">
                  <Card className="p-4 shadow-sm border min-w-[300px] md:min-w-[320px]">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-muted-foreground font-semibold">
                        {match.tournament} &bull; {match.date.startsWith('Today') || match.date.startsWith('Tomorrow') ? '' : ' '}
                        {match.date.replace(/, \d{1,2}:\d{2} [AP]M$/, '')}
                      </p>
                      {getStatusBadge(dynamicStatus)}
                    </div>
                    <div className="space-y-2 text-sm">
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
                    </div>
                    {dynamicStatus === 'Upcoming' ? (
                      <div className="mt-3">
                        <CountdownTimer targetDate={match.startTime} />
                      </div>
                    ) : (
                      <p className="text-xs text-primary mt-3">
                        {dynamicStatus === 'Recent' ? match.result : 'Match is live. Stay tuned for updates.'}
                      </p>
                    )}
                  </Card>
                </Link>
                {index < matches.length - 1 && <Separator orientation="vertical" className="h-20" />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
