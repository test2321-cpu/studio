
import { MatchForm } from '@/components/match-form';
import { getMatchById } from '@/services/matches';

export default async function EditMatchPage({ params }: { params: { id: string } }) {
    const match = await getMatchById(params.id);

    return <MatchForm match={match} />;
}
