

'use client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Users, History, Swords, Vote } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { Player, Match, HeadToHeadMatch, RecentMatch as RecentMatchType, MatchTeam } from '@/lib/types';
import { CountdownTimer } from '@/components/countdown-timer';
import { getDynamicMatchStatus } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getMatchById, addVoteToMatch, onMatchUpdate } from '@/services/matches';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const TeamDisplay = ({ team }: { team: MatchTeam }) => (
    <div className="flex items-center text-3xl md:text-5xl font-bold gap-4">
        <Image 
            src={team.logo || `https://cdn.countryflags.com/thumbs/${team.flag}/flag-400.png`} 
            alt={team.name} 
            width={60} 
            height={40} 
            className="object-contain" 
        />
        <h2>{team.name}</h2>
    </div>
);

const MatchInfo = ({ label, value }: { label: string, value: string | undefined }) => (
    <div className="flex justify-between py-3 border-b">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-right">{value || '-'}</span>
    </div>
);

const RecentMatch = ({ match }: { match: RecentMatchType }) => {
    const TeamImage = ({ team }: { team: MatchTeam }) => (
        <Image 
            src={team.logo || `https://cdn.countryflags.com/thumbs/${team.flag}/flag-400.png`} 
            alt={team.name} 
            width={20} 
            height={15} 
            className="object-contain" 
        />
    );
    return (
        <div className="flex items-center justify-between p-4 border-b last:border-b-0">
            <div>
                <div className="text-xs text-muted-foreground">{match.type} &bull; {match.date}</div>
                <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2 font-medium">
                        <TeamImage team={match.teams[0]} /> {match.teams[0].name}
                        <span className="ml-auto font-bold">{match.teams[0].score}</span>
                    </div>
                     <div className="flex items-center gap-2 font-medium">
                        <TeamImage team={match.teams[1]} /> {match.teams[1].name}
                        <span className="ml-auto font-bold">{match.teams[1].score}</span>
                    </div>
                </div>
                <p className="text-sm mt-2 text-primary">{match.result}</p>
            </div>
            <div className="text-xs font-semibold text-muted-foreground self-start mt-1">
                {match.status}
            </div>
        </div>
    )
};

const HeadToHeadResult = ({ match }: { match: HeadToHeadMatch }) => (
    <div className="text-sm p-3 bg-muted/50 rounded-lg">
        <div className="flex justify-between">
            <span>{match.teams[0].name} <span className="font-bold">{match.teams[0].score}</span></span>
            <span>vs</span>
            <span><span className="font-bold">{match.teams[1].score}</span> {match.teams[1].name}</span>
        </div>
        <p className="text-xs text-primary mt-1 text-center">{match.result}</p>
    </div>
)

const PlayerCard = ({ player }: { player: Player }) => (
    <div className="p-3 bg-muted/50 rounded-lg flex justify-between items-center">
        <span className="font-medium">{player.name}</span>
        <span className="text-xs text-muted-foreground">{player.role}</span>
    </div>
);

export default function MatchPage() {
    const params = useParams();
    const matchId = params.id as string;
    const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [dynamicStatus, setDynamicStatus] = useState<Match['status'] | undefined>();
    const { toast } = useToast();
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!matchId) return;

        // Check if user has already voted
        const votedStatus = localStorage.getItem(`voted_match_${matchId}`);
        if (votedStatus) {
            setHasVoted(true);
        }

        const unsubscribe = onMatchUpdate(matchId, (match) => {
            setCurrentMatch(match);
            if (match) {
                setDynamicStatus(getDynamicMatchStatus(match));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [matchId]);

    useEffect(() => {
        if (currentMatch) {
            const interval = setInterval(() => {
                setDynamicStatus(getDynamicMatchStatus(currentMatch));
            }, 60000);
            return () => clearInterval(interval);
        }
    }, [currentMatch]);
    
    const handleVote = async (team: 'teamA' | 'teamB') => {
        if (!currentMatch || hasVoted) return;
        try {
            await addVoteToMatch(currentMatch.id, team);
            toast({ title: "Success", description: "Your vote has been counted!" });
            localStorage.setItem(`voted_match_${currentMatch.id}`, 'true');
            setHasVoted(true);
        } catch (error) {
            console.error("Failed to vote:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to cast your vote." });
        }
    };


    if (loading || !isClient) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8">
                        <p className="text-muted-foreground">Loading match details...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!currentMatch) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Match not found</h1>
                </main>
                <Footer />
            </div>
        );
    }

    const { details, poll, recentMatches, playingXI, headToHead } = currentMatch;
    const teams = { a: currentMatch.teams[0], b: currentMatch.teams[1] };
    
    const teamAVotes = parseInt(poll?.teamA_votes || '0', 10);
    const teamBVotes = parseInt(poll?.teamB_votes || '0', 10);
    const totalVotes = teamAVotes + teamBVotes;
    const teamAPercentage = totalVotes > 0 ? Math.round((teamAVotes / totalVotes) * 100) : 0;
    const teamBPercentage = totalVotes > 0 ? 100 - teamAPercentage : 0;


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50/50">
                <SectionWrapper className="bg-card border-b py-6 md:py-8">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">{currentMatch.start_date}</p>
                        <h1 className="text-xl md:text-2xl font-bold mt-1">{currentMatch.tournament}</h1>
                        <p className="text-sm text-muted-foreground mt-1">{details?.venue}</p>
                    </div>

                    <div className="flex items-center justify-around my-8">
                        <TeamDisplay team={teams.a} />
                        <div className="text-center text-primary font-bold text-lg">VS</div>
                        <TeamDisplay team={teams.b} />
                    </div>

                    <div className="text-center">
                        {dynamicStatus === 'Upcoming' ? (
                            <div className="flex flex-col items-center gap-2 mb-3">
                                <span className="text-sm font-semibold text-muted-foreground">Match Starts In</span>
                                <CountdownTimer targetDate={`${currentMatch.start_date}T${currentMatch.start_time}`} />
                            </div>
                        ) : (
                            <>
                                <div className="bg-amber-100 text-amber-800 inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3">
                                    {dynamicStatus === 'Live' ? 'Live' : (dynamicStatus === 'Recent' ? 'Match Ended' : dynamicStatus)}
                                </div>
                                {currentMatch.result ? (
                                    <p className="text-lg text-muted-foreground">{currentMatch.result}</p>
                                ): (
                                     <p className="text-lg text-muted-foreground">Stay tune.</p>
                                )}
                            </>
                        )}
                    </div>
                </SectionWrapper>

                <SectionWrapper>
                    <Tabs defaultValue="overview" className="w-full max-w-5xl mx-auto">
                        <TabsList className="grid w-full grid-cols-2 md:w-[450px] mb-6">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="details">Detailed View</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {poll && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Who will win the game?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span>{teams.a.name}</span>
                                                    <span>{teamAPercentage}% ({teamAVotes})</span>
                                                </div>
                                                <Progress value={teamAPercentage} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span>{teams.b.name}</span>
                                                    <span>{teamBPercentage}% ({teamBVotes})</span>
                                                </div>
                                                <Progress value={teamBPercentage} className="h-2" />
                                            </div>
                                        </div>
                                        {hasVoted ? (
                                            <div className="mt-6 text-center text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                                                <Vote className="h-4 w-4" /> You have voted.
                                            </div>
                                        ) : (
                                            <div className="flex gap-4 mt-6">
                                                <Button className="w-full" variant="outline" onClick={() => handleVote('teamA')} disabled={hasVoted}><Check className="mr-2 h-4 w-4" /> Vote {teams.a.name}</Button>
                                                <Button className="w-full" variant="outline" onClick={() => handleVote('teamB')} disabled={hasVoted}><Check className="mr-2 h-4 w-4" /> Vote {teams.b.name}</Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                                )}
                                {recentMatches && recentMatches.length > 0 && (
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
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="details">
                             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    {playingXI && playingXI.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2"><Users /> Playing XI</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {playingXI.map(team => (
                                                    <div key={team.team}>
                                                        <h3 className="font-bold text-lg mb-3">{team.team}</h3>
                                                        <div className="space-y-2">
                                                            {team.players.map(player => <PlayerCard key={player.name} player={player} />)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                    )}

                                    {headToHead && headToHead.last5 && headToHead.last5.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2"><Swords /> Head-to-Head</CardTitle>
                                            <CardDescription>{headToHead.summary}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <h4 className="font-semibold mb-3">Last 5 Matches</h4>
                                            <div className="space-y-3">
                                                {headToHead.last5.map((match, i) => (
                                                   <HeadToHeadResult key={i} match={match} />
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                    )}
                                </div>
                                <div className="lg:col-span-1">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2"><History /> Match Details</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <MatchInfo label="Match" value={`${teams.a.name} vs ${teams.b.name}`} />
                                            <MatchInfo label="Series" value={currentMatch.tournament} />
                                            <MatchInfo label="Toss" value={details?.toss} />
                                            <MatchInfo label="Season" value={details?.season} />
                                            <MatchInfo label="Format" value={details?.format} />
                                            <MatchInfo label="Venue" value={details?.venue} />
                                            <MatchInfo label="Match Date" value={currentMatch.start_date} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}
