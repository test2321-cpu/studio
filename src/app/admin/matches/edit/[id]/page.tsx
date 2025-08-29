
'use client';

import { MatchForm, type FormValues } from '@/components/match-form';
import { useToast } from '@/hooks/use-toast';
import { getMatchById, updateMatch } from '@/services/matches';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Match } from '@/lib/types';

export default function EditMatchPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const [match, setMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const fetchedMatch = await getMatchById(params.id);
                setMatch(fetchedMatch);
            } catch (error) {
                console.error("Failed to fetch match:", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to load match data.' });
            } finally {
                setLoading(false);
            }
        };
        fetchMatch();
    }, [params.id, toast]);

    const handleSubmit = async (data: FormValues) => {
        if (!match) return;

        try {
            const matchData: Partial<Match> = {
                ...data,
                status: data.status as 'upcoming' | 'live' | 'completed',
                 poll: {
                    teamA_votes: data.poll.teamA_votes,
                    teamB_votes: data.poll.teamB_votes,
                }
            };
            if (!data.playingXI || data.playingXI.length === 0) {
                matchData.playingXI = [];
            }
             if (!data.recentMatches || data.recentMatches.length === 0) {
                matchData.recentMatches = [];
            }
            await updateMatch(match.id, matchData);
            toast({ title: "Success", description: "Match updated successfully." });
            router.push('/admin/matches');
            router.refresh();
        } catch (error) {
            console.error("Failed to update match:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update match."
            });
        }
    };
    
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!match) {
        return <div className="flex items-center justify-center min-h-screen">Match not found.</div>;
    }
    
    // Convert match data to form-compatible default values
    const defaultValues: FormValues = {
        ...match,
        status: match.status as 'upcoming' | 'live' | 'completed',
        poll: {
            teamA_votes: String(match.poll?.teamA_votes || 0),
            teamB_votes: String(match.poll?.teamB_votes || 0),
        },
        headToHead: match.headToHead || { summary: "", last5: [] },
        recentMatches: match.recentMatches || [],
        playingXI: match.playingXI && match.playingXI.length > 0 ? match.playingXI : [],
    };

    return <MatchForm isEditing defaultValues={defaultValues} onSubmitForm={handleSubmit} />;
}
