
'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CountdownTimer } from './countdown-timer';
import { getDynamicMatchStatus } from '@/lib/utils';
import type { Match } from '@/lib/types';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getMatches } from '@/services/matches';

const MatchItem = ({ match, isLast }: { match: Match, isLast: boolean }) => {
  const [dynamicStatus, setDynamicStatus] = useState(match.status);
  
  const getMatchDate = (dateStr: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const matchDate = new Date(dateStr.replace(/-/g, '/'));

    if (matchDate.toDateString() === today.toDateString()) return 'Today';
    if (matchDate.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return dateStr;
  }

  useEffect(() => {
    const updateStatus = () => {
      setDynamicStatus(getDynamicMatchStatus(match));
    };
    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
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
              {match.tournament} &bull; {getMatchDate(match.date)}
            </p>
            {getStatusBadge(dynamicStatus)}
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
          {dynamicStatus === 'Upcoming' ? (
            <div className="mt-3">
              <CountdownTimer targetDate={`${match.date}T${match.time}`} />
            </div>
          ) : (
            <p className="text-xs text-primary mt-3">
              {dynamicStatus === 'Recent' ? match.result : (dynamicStatus === 'Live' ? 'Match is live. Stay tuned for updates.' : (match.result || ''))}
            </p>
          )}
        </Card>
      </Link>
      {!isLast && <Separator orientation="vertical" className="h-20" />}
    </div>
  )
}

function LiveMatchesBarInternal() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const fetchedMatches = await getMatches();
                setMatches(fetchedMatches);
            } catch (error) {
                console.error("Failed to fetch matches:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    if (loading) {
        return (
            <div className="bg-background border-b">
                <div className="container mx-auto max-w-7xl px-4">
                <div className="h-[124px] flex items-center">
                    <p className="text-muted-foreground">Loading matches...</p>
                </div>
                </div>
            </div>
        );
    }
    
    if (matches.length === 0) {
        return (
             <div className="bg-background border-b">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="h-[124px] flex items-center">
                        <p className="text-muted-foreground">No matches scheduled.</p>
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

export { LiveMatchesBarInternal as LiveMatchesBar };

    