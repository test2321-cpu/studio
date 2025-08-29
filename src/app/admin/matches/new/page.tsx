
'use client';

import { MatchForm, type FormValues } from '@/components/match-form';
import { useToast } from '@/hooks/use-toast';
import { createMatch } from '@/services/matches';
import { useRouter } from 'next/navigation';

export default function NewMatchPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (data: FormValues) => {
        try {
            // The status from the form is a string, but the Match type might expect a specific literal type.
            // We cast it here, assuming the form values ('upcoming', 'live', 'completed') are valid.
            const matchData = {
                ...data,
                status: data.status as 'upcoming' | 'live' | 'completed',
                poll: {
                    teamA_votes: parseInt(data.poll.teamA_votes, 10),
                    teamB_votes: parseInt(data.poll.teamB_votes, 10),
                }
            };
            await createMatch(matchData as any); // Use `any` to bypass strict type checks if complex object structures differ
            toast({ title: "Success", description: "Match created successfully." });
            router.push('/admin/matches');
            router.refresh();
        } catch (error) {
            console.error("Failed to create match:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create match."
            });
        }
    };

    return <MatchForm onSubmitForm={handleSubmit} />;
}
