
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { MatchCard } from '@/components/match-card';
import { matches } from '@/data/dummy-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatchCentrePage() {
  const liveMatches = matches.filter(m => m.status === 'Live');
  const upcomingMatches = matches.filter(m => m.status === 'Upcoming');
  const recentMatches = matches.filter(m => m.status === 'Recent');

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
                {liveMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {upcomingMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recent">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {recentMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
