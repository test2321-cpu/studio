
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { matchDetails } from '@/data/dummy-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const TeamDisplay = ({ name, flag }: { name: string, flag: string }) => (
    <div className="flex items-center text-3xl md:text-5xl font-bold gap-4">
        <span className="text-4xl md:text-6xl">{flag}</span>
        <h2>{name}</h2>
    </div>
);

const MatchInfo = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between py-3 border-b">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-right">{value}</span>
    </div>
);

const RecentMatch = ({ match }: { match: any }) => (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
        <div>
            <div className="text-xs text-muted-foreground">{match.type} &bull; {match.date}</div>
            <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-2 font-medium">
                    {match.teams[0].flag} {match.teams[0].name}
                    <span className="ml-auto font-bold">{match.teams[0].score}</span>
                </div>
                 <div className="flex items-center gap-2 font-medium">
                    {match.teams[1].flag} {match.teams[1].name}
                    <span className="ml-auto font-bold">{match.teams[1].score}</span>
                </div>
            </div>
            <p className="text-sm mt-2 text-primary">{match.result}</p>
        </div>
        <div className="text-xs font-semibold text-muted-foreground self-start mt-1">
            {match.status}
        </div>
    </div>
);


export default function MatchPage() {
    const { details, teams, countdown, poll, recentMatches } = matchDetails;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50/50">
                <SectionWrapper className="bg-card border-b py-6 md:py-8">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">{details.date}</p>
                        <h1 className="text-xl md:text-2xl font-bold mt-1">{details.series}</h1>
                        <p className="text-sm text-muted-foreground mt-1">{details.venue}</p>
                    </div>

                    <div className="flex items-center justify-around my-8">
                        <TeamDisplay name={teams.a.name} flag={teams.a.flag} />
                        <div className="text-center text-primary font-bold text-lg">VS</div>
                        <TeamDisplay name={teams.b.name} flag={teams.b.flag} />
                    </div>

                    <div className="text-center">
                        <div className="bg-amber-100 text-amber-800 inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3">
                            {details.status}
                        </div>
                        {countdown && <p className="text-lg text-muted-foreground">{countdown}</p>}
                    </div>
                </SectionWrapper>

                <SectionWrapper>
                    <Tabs defaultValue="overview" className="w-full max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-2 md:w-[300px] mb-6">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="match-details">Match Details</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Who will win the game?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span>{teams.a.name}</span>
                                                    <span>{poll.a.percentage}% ({poll.a.votes})</span>
                                                </div>
                                                <Progress value={poll.a.percentage} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span>{teams.b.name}</span>
                                                    <span>{poll.b.percentage}% ({poll.b.votes})</span>
                                                </div>
                                                <Progress value={poll.b.percentage} className="h-2" />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 mt-6">
                                            <Button className="w-full" variant="outline"><Check className="mr-2 h-4 w-4" /> Vote {teams.a.name}</Button>
                                            <Button className="w-full" variant="outline"><Check className="mr-2 h-4 w-4" /> Vote {teams.b.name}</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                     <CardHeader>
                                        <CardTitle>Recent 5 Matches</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        {recentMatches.map(match => (
                                            <RecentMatch key={match.id} match={match} />
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="match-details">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Match Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <MatchInfo label="Match" value={details.match} />
                                    <MatchInfo label="Series" value={details.seriesFull} />
                                    <MatchInfo label="Toss" value={details.toss} />
                                    <MatchInfo label="Season" value={details.season} />
                                    <MatchInfo label="Format" value={details.format} />
                                    <MatchInfo label="Venue" value={details.venue} />
                                    <MatchInfo label="Match Date" value={details.matchDate} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}
