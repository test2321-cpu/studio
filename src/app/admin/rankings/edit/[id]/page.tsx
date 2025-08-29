
'use client';

import { RankingForm, type FormValues } from '@/components/ranking-form';
import { useToast } from '@/hooks/use-toast';
import { getRankingById, updateRanking } from '@/services/rankings';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { RankingTeam } from '@/lib/types';

export default function EditRankingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const [ranking, setRanking] = useState<RankingTeam | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const fetchedRanking = await getRankingById(params.id);
                setRanking(fetchedRanking);
            } catch (error) {
                console.error("Failed to fetch ranking:", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to load ranking data.' });
            } finally {
                setLoading(false);
            }
        };
        fetchRanking();
    }, [params.id, toast]);

    const handleSubmit = async (data: FormValues) => {
        if (!ranking) return;
        try {
            await updateRanking(ranking.id, {
                ...data,
                rank: parseInt(data.rank, 10),
                rating: parseInt(data.rating, 10),
            });
            toast({ title: "Success", description: "Ranking updated successfully." });
            router.push('/admin/rankings');
            router.refresh();
        } catch (error) {
            console.error("Failed to update ranking:", error);
            toast({ variant: "destructive", title: "Error", description: "Failed to update ranking." });
        }
    };
    
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!ranking) {
        return <div className="flex items-center justify-center min-h-screen">Ranking not found.</div>;
    }
    
    const defaultValues: FormValues = {
        ...ranking,
        rank: String(ranking.rank),
        rating: String(ranking.rating),
    };

    return <RankingForm isEditing defaultValues={defaultValues} onSubmitForm={handleSubmit} />;
}
