
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { MatchCard } from '@/components/match-card';
import { matches } from '@/data/dummy-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDynamicMatchStatus } from '@/lib/utils';
import { useEffect, useState } from 'react';
import type { Match } from '@/lib/types';


export default function MatchCentrePage() {
  const [isClient, setIsClient] = useState(false);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const interval = setInterval(() => {
        setLiveMatches(matches.filter(m => getDynamicMatchStatus(m) === 'Live'));
        setUpcomingMatches(matches.filter(m => getDynamicMatchStatus(m) === 'Upcoming'));
        setRecentMatches(matches.filter(m => getDynamicMatchStatus(m) === 'Recent'));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isClient]);

  if (!isClient) {
     return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SectionWrapper>
                <h1 className="text-3xl font-bold mb-8 text-center">Match Centre</h1>
                {/* Optional: Add skeleton loaders here */}
                </SectionWrapper>
            </main>
            <Footer />
        </div>
     )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionWrapper>
          <h1 className="text-3xl font-bold mb-8 text-center">Match Centre</h1>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:w-[600px] mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {matches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
             <TabsContent value="live">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {liveMatches.length > 0 ? liveMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                )) : <p className='text-center col-span-3 text-muted-foreground'>No live matches right now.</p>}
              </div>
            </TabsContent>
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {upcomingMatches.length > 0 ? upcomingMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                )) : <p className='text-center col-span-3 text-muted-foreground'>No upcoming matches.</p>}
              </div>
            </TabsContent>
            <TabsContent value="recent">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {recentMatches.length > 0 ? recentMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                )) : <p className='text-center col-span-3 text-muted-foreground'>No recent matches.</p>}
              </div>
            </TabsContent>
          </Tabs>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
