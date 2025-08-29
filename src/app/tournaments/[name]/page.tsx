

'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { getMatches } from '@/services/matches';
import {_decodeURIComponent} from 'next/dist/shared/lib/router/utils/querystring';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { Match } from '@/lib/types';

const MatchCard = dynamic(() => import('@/components/match-card').then(mod => mod.MatchCard), { 
  ssr: false,
  loading: () => (
    <div className="flex flex-col h-full animate-pulse bg-muted/50 rounded-lg p-4">
      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
      <div className="flex-grow space-y-2">
        <div className="h-5 bg-muted rounded w-full"></div>
        <div className="h-5 bg-muted rounded w-full"></div>
      </div>
      <div className="h-3 bg-muted rounded w-1/2 mt-4"></div>
    </div>
  )
});

export default function TournamentMatchesPage({ params }: { params: { name: string } }) {
  const tournamentName = decodeURIComponent(params.name);
  const [tournamentMatches, setTournamentMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const allMatches = await getMatches();
        const filteredMatches = allMatches.filter(m => m.tournament === tournamentName);
        setTournamentMatches(filteredMatches);
      } catch (error) {
        console.error("Failed to fetch tournament matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [tournamentName]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionWrapper>
          <h1 className="text-3xl font-bold mb-8 text-center">{tournamentName}</h1>
          {loading ? (
            <div className="text-center text-muted-foreground">Loading matches...</div>
          ) : tournamentMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournamentMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
             <div className="text-center text-muted-foreground">
                No matches found for this tournament.
            </div>
          )}
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}

    