
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { PlayerSearch } from '@/components/player-search';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlayersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionWrapper>
          <div className="max-w-2xl mx-auto">
             <Card>
                <CardHeader className="text-center">
                    <CardTitle>Find a Player</CardTitle>
                    <CardDescription>Search for your favorite cricket players</CardDescription>
                </CardHeader>
                <CardContent>
                    <PlayerSearch />
                </CardContent>
             </Card>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
