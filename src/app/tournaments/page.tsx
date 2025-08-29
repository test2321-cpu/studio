

'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { getMatches } from '@/services/matches';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Match } from '@/lib/types';

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchTournaments = async () => {
        try {
          const matches = await getMatches();
          const tournamentNames = [...new Set(matches.map(match => match.tournament))];
          setTournaments(tournamentNames);
        } catch (error) {
          console.error("Failed to fetch tournaments:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTournaments();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SectionWrapper>
                    <h1 className="text-3xl font-bold mb-8 text-center">Tournaments</h1>
                    {loading ? (
                      <p className="text-center text-muted-foreground">Loading tournaments...</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {tournaments.length > 0 ? tournaments.map(tournament => (
                              <Link href={`/tournaments/${encodeURIComponent(tournament)}`} key={tournament}>
                                  <Card className="hover:shadow-lg transition-shadow">
                                      <CardHeader>
                                          <CardTitle>{tournament}</CardTitle>
                                      </CardHeader>
                                  </Card>
                              </Link>
                          )) : <p className="col-span-3 text-center text-muted-foreground">No tournaments found.</p>}
                      </div>
                    )}
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}

    