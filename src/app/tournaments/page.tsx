

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { matches } from '@/data/dummy-data';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TournamentsPage() {
    const tournaments = [...new Set(matches.map(match => match.tournament))];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SectionWrapper>
                    <h1 className="text-3xl font-bold mb-8 text-center">Tournaments</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tournaments.map(tournament => (
                            <Link href={`/tournaments/${encodeURIComponent(tournament)}`} key={tournament}>
                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle>{tournament}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}
