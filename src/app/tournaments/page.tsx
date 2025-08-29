

'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { getMatches } from '@/services/matches';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Tournament {
    name: string;
    logo?: string;
}

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchTournaments = async () => {
        try {
          const matches = await getMatches();
          const tournamentsMap = new Map<string, Tournament>();
          matches.forEach(match => {
            if (!tournamentsMap.has(match.tournament)) {
              tournamentsMap.set(match.tournament, {
                name: match.tournament,
                logo: match.tournamentLogo
              });
            }
          });
          setTournaments(Array.from(tournamentsMap.values()));
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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {tournaments.length > 0 ? tournaments.map(tournament => (
                              <Link href={`/tournaments/${encodeURIComponent(tournament.name)}`} key={tournament.name}>
                                  <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                                      <CardHeader>
                                          <CardTitle>{tournament.name}</CardTitle>
                                      </CardHeader>
                                      <CardContent className="flex-grow flex items-center justify-center">
                                         {tournament.logo && (
                                            <div className="relative w-32 h-32">
                                                <Image 
                                                    src={tournament.logo} 
                                                    alt={`${tournament.name} logo`} 
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                         )}
                                      </CardContent>
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
