
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRankings, deleteRanking } from '@/services/rankings';
import type { RankingTeam } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RankingsTable = ({ teams, handleDelete }: { teams: RankingTeam[], handleDelete: (id: string) => void }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {teams.map(team => (
                <TableRow key={team.id}>
                    <TableCell>{team.rank}</TableCell>
                    <TableCell className="font-medium">{team.team}</TableCell>
                    <TableCell>{team.rating}</TableCell>
                    <TableCell className="text-right">
                        <Button asChild variant="ghost" size="icon">
                            <Link href={`/admin/rankings/edit/${team.id}`}><Edit className="h-4 w-4" /></Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>This action cannot be undone. This will permanently delete the ranking entry.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(team.id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);


export default function AdminRankingsPage() {
    const [rankings, setRankings] = useState<RankingTeam[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const fetchedRankings = await getRankings();
                setRankings(fetchedRankings);
            } catch (error) {
                console.error("Failed to fetch rankings:", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to load rankings.' });
            } finally {
                setLoading(false);
            }
        };
        fetchRankings();
    }, [toast]);

    const handleDelete = async (id: string) => {
        try {
            await deleteRanking(id);
            setRankings(rankings.filter(r => r.id !== id));
            toast({ title: 'Success', description: 'Ranking deleted successfully.' });
        } catch (error) {
            console.error("Failed to delete ranking:", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete ranking.' });
        }
    };

    const t20iRankings = rankings.filter(r => r.format === 't20i');
    const odiRankings = rankings.filter(r => r.format === 'odi');
    const testRankings = rankings.filter(r => r.format === 'test');

    return (
        <div className="min-h-screen bg-muted/40 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <Button asChild variant="outline" size="sm" className="mb-4">
                    <Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
                </Button>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Manage Rankings</CardTitle>
                            <CardDescription>A list of all team rankings in your database.</CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/admin/rankings/new"><PlusCircle className="mr-2 h-4 w-4" /> Add Ranking</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Loading rankings...</p>
                        ) : (
                           <Tabs defaultValue="t20i" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="t20i">T20I</TabsTrigger>
                                    <TabsTrigger value="odi">ODI</TabsTrigger>
                                    <TabsTrigger value="test">Test</TabsTrigger>
                                </TabsList>
                                <TabsContent value="t20i">
                                    <RankingsTable teams={t20iRankings} handleDelete={handleDelete} />
                                </TabsContent>
                                <TabsContent value="odi">
                                    <RankingsTable teams={odiRankings} handleDelete={handleDelete} />
                                </TabsContent>
                                <TabsContent value="test">
                                    <RankingsTable teams={testRankings} handleDelete={handleDelete} />
                                </TabsContent>
                            </Tabs>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
