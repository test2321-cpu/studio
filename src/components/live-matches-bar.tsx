
'use client';

import Link from 'next/link';
import { matches } from '@/data/dummy-data';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CountdownTimer } from './countdown-timer';
import { getDynamicMatchStatus } from '@/lib/utils';
import type { Match } from '@/lib/types';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const MatchItem = ({ match, isLast }: { match: Match, isLast: boolean }) => {
  const [dynamicStatus, setDynamicStatus] = useState(match.status);
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
        setDynamicStatus(getDynamicMatchStatus(match));
    }, 1000);
    return () => clearInterval(interval);
  }, [match]);

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
    <div className="flex items-center space-x-4">
      <Link href={`/match/${match.id}`} className="block hover:bg-muted/50 transition-colors rounded-lg">
        <Card className="p-4 shadow-sm border min-w-[300px] md:min-w-[320px]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground font-semibold">
              {match.tournament} &bull; {match.date.startsWith('Today') || match.date.startsWith('Tomorrow') ? '' : ' '}
              {match.date.replace(/, \d{1,2}:\d{2} [AP]M$/, '')}
            </p>
            {isClient ? getStatusBadge(dynamicStatus) : getStatusBadge(match.status)}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center font-medium gap-3">
              <Image src={`https://cdn.countryflags.com/thumbs/${match.teams[0].flag}/flag-400.png`} alt={match.teams[0].name} width={24} height={18} className="object-contain" />
              <span>{match.teams[0].name}</span>
              {match.teams[0].score && <span className="ml-auto font-bold">{match.teams[0].score}</span>}
            </div>
            <div className="flex items-center font-medium gap-3">
               <Image src={`https://cdn.countryflags.com/thumbs/${match.teams[1].flag}/flag-400.png`} alt={match.teams[1].name} width={24} height={18} className="object-contain" />
              <span>{match.teams[1].name}</span>
              {match.teams[1].score && <span className="ml-auto font-bold">{match.teams[1].score}</span>}
            </div>
          </div>
          {isClient && dynamicStatus === 'Upcoming' ? (
            <div className="mt-3">
              <CountdownTimer targetDate={match.startTime} />
            </div>
          ) : (
            <p className="text-xs text-primary mt-3">
              {isClient && dynamicStatus === 'Recent' ? match.result : (isClient && dynamicStatus === 'Live' ? 'Match is live. Stay tuned for updates.' : match.result)}
            </p>
          )}
        </Card>
      </Link>
      {!isLast && <Separator orientation="vertical" className="h-20" />}
    </div>
  )
}

export function LiveMatchesBar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or nothing on the server
    return (
       <div className="bg-background border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center space-x-4 overflow-x-auto py-3 no-scrollbar">
            {/* You can add a skeleton loader here if you want */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background border-b">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center space-x-4 overflow-x-auto py-3 no-scrollbar">
          {matches.map((match, index) => (
            <MatchItem key={match.id} match={match} isLast={index === matches.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
