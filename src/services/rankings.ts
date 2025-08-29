
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, DocumentData, query, orderBy } from 'firebase/firestore';
import type { RankingTeam } from '@/lib/types';

const rankingsCol = collection(db, 'rankings');

export async function getRankings(): Promise<RankingTeam[]> {
  const q = query(rankingsCol, orderBy('format'), orderBy('rank'));
  const rankingsSnapshot = await getDocs(q);
  const rankingsList = rankingsSnapshot.docs.map(doc => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      ...data,
    } as RankingTeam;
  });
  return rankingsList;
}

export async function getRankingById(id: string): Promise<RankingTeam | null> {
    const rankingDocRef = doc(db, 'rankings', id);
    const rankingSnapshot = await getDoc(rankingDocRef);
    if (rankingSnapshot.exists()) {
        return { id: rankingSnapshot.id, ...rankingSnapshot.data() } as RankingTeam;
    } else {
        return null;
    }
}

export async function createRanking(ranking: Omit<RankingTeam, 'id'>): Promise<string> {
    const docRef = await addDoc(rankingsCol, ranking);
    return docRef.id;
}

export async function updateRanking(id: string, ranking: Partial<Omit<RankingTeam, 'id'>>): Promise<void> {
    const rankingDocRef = doc(db, 'rankings', id);
    await updateDoc(rankingDocRef, ranking);
}

export async function deleteRanking(id: string): Promise<void> {
    const rankingDocRef = doc(db, 'rankings', id);
    await deleteDoc(rankingDocRef);
}
