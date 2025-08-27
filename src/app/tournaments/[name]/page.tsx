
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { MatchCard } from '@/components/match-card';
import { matches } from '@/data/dummy-data';
import {_decodeURIComponent} from 'next/dist/shared/lib/router/utils/querystring';

export default function TournamentMatchesPage({ params }: { params: { name: string } }) {
  const tournamentName = decodeURIComponent(params.name);
  const tournamentMatches = matches.filter(m => m.tournament === tournamentName);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionWrapper>
          <h1 className="text-3xl font-bold mb-8 text-center">{tournamentName}</h1>
          {tournamentMatches.length > 0 ? (
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
