
'use client';

import Link from 'next/link';
import type { Match } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CountdownTimer } from './countdown-timer';
import { getDynamicMatchStatus } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';


function MatchCardInternal({ match }: { match: Match }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
      setIsClient(true);
  }, []);

  const [dynamicStatus, setDynamicStatus] = useState(match.status);

  useEffect(() => {
    const updateStatus = () => {
      setDynamicStatus(getDynamicMatchStatus(match));
    };
    if (isClient) {
      updateStatus();
      const interval = setInterval(updateStatus, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [isClient, match]);

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
  
  if (!isClient) {
    return (
      <Card className="flex flex-col h-full animate-pulse">
        <CardHeader>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2 mt-1"></div>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
            <div className="h-5 bg-muted rounded w-full"></div>
            <div className="h-5 bg-muted rounded w-full"></div>
        </CardContent>
        <CardFooter>
            <div className="h-3 bg-muted rounded w-1/2"></div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Link href={`/match/${match.id}`} className="block hover:shadow-lg transition-shadow rounded-lg">
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-semibold">
                      {match.tournament}
                    </p>
                    {getStatusBadge(dynamicStatus)}
                </div>
                 <p className="text-xs text-muted-foreground pt-1">
                    {match.date.replace(/, \d{1,2}:\d{2} [AP]M$/, '')}
                </p>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-sm">
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
            </CardContent>
            <CardFooter>
                 {dynamicStatus === 'Upcoming' ? (
                    <div className="w-full">
                      <CountdownTimer targetDate={match.startTime} />
                    </div>
                  ) : (
                    <p className="text-xs text-primary">
                      {dynamicStatus === 'Recent' ? match.result : (dynamicStatus === 'Live' ? 'Match is live. Stay tuned!' : (match.result || ''))}
                    </p>
                  )}
            </CardFooter>
        </Card>
    </Link>
  );
}

export { MatchCardInternal as MatchCard };
    
