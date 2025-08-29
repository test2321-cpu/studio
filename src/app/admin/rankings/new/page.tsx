
'use client';

import { RankingForm, type FormValues } from '@/components/ranking-form';
import { useToast } from '@/hooks/use-toast';
import { createRanking } from '@/services/rankings';
import { useRouter } from 'next/navigation';

export default function NewRankingPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (data: FormValues) => {
        try {
            await createRanking({
                ...data,
                rank: parseInt(data.rank, 10),
                rating: parseInt(data.rating, 10),
            });
            toast({ title: "Success", description: "Ranking created successfully." });
            router.push('/admin/rankings');
            router.refresh();
        } catch (error) {
            console.error("Failed to create ranking:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create ranking."
            });
        }
    };

    return <RankingForm onSubmitForm={handleSubmit} />;
}
