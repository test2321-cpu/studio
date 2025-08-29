
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMatches, deleteMatch } from '@/services/matches';
import type { Match } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminMatchesPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const fetchedMatches = await getMatches();
                setMatches(fetchedMatches);
            } catch (error) {
                console.error("Failed to fetch matches:", error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to load matches.',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, [toast]);

    const handleDelete = async (id: string) => {
        try {
            await deleteMatch(id);
            setMatches(matches.filter(m => m.id !== id));
            toast({
                title: 'Success',
                description: 'Match deleted successfully.',
            });
        } catch (error) {
            console.error("Failed to delete match:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to delete match.',
            });
        }
    };

    return (
        <div className="min-h-screen bg-muted/40 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <Button asChild variant="outline" size="sm" className="mb-4">
                    <Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
                </Button>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Manage Matches</CardTitle>
                            <CardDescription>A list of all matches in your database.</CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/admin/matches/new">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Match
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Loading matches...</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tournament</TableHead>
                                        <TableHead>Teams</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {matches.map(match => (
                                        <TableRow key={match.id}>
                                            <TableCell className="font-medium">{match.tournament}</TableCell>
                                            <TableCell>{match.teams[0].name} vs {match.teams[1].name}</TableCell>
                                            <TableCell>{match.start_date} at {match.start_time}</TableCell>
                                            <TableCell>{match.status}</TableCell>
                                            <TableCell className="text-right">
                                                <Button asChild variant="ghost" size="icon">
                                                    <Link href={`/admin/matches/edit/${match.id}`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <AlertDialog>
                                                  <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                      <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                  </AlertDialogTrigger>
                                                  <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                      <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the match.
                                                      </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                      <AlertDialogAction onClick={() => handleDelete(match.id)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                  </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
