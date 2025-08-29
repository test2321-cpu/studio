
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, DocumentData, Timestamp } from 'firebase/firestore';
import type { Match } from '@/lib/types';

function getCombinedDateTime(date: string, time: string): Date {
  // Safari compatibility: use '/' instead of '-'
  const dateString = date.replace(/-/g, '/');
  return new Date(`${dateString} ${time}`);
}

function processMatchDoc(doc: DocumentData): Match {
  const data = doc.data();
  const match: Match = {
    id: doc.id,
    tournament: data.tournament,
    teams: data.teams,
    start_date: data.start_date, // Keep as YYYY-MM-DD string
    start_time: data.start_time, // Keep as HH:MM string
    status: data.status,
    result: data.result || '',
    tournamentLogo: data.tournamentLogo,
    end_date: data.end_date,
    end_time: data.end_time,
    details: data.details,
    playingXI: data.playingXI,
    headToHead: data.headToHead,
    poll: data.poll,
    recentMatches: data.recentMatches,
  };
  
  return match;
}

// Fetch all matches
export async function getMatches(): Promise<Match[]> {
  const matchesCol = collection(db, 'matches');
  const matchesSnapshot = await getDocs(matchesCol);
  const matchesList = matchesSnapshot.docs.map(processMatchDoc);
  return matchesList.sort((a, b) => {
    const dateA = getCombinedDateTime(a.start_date, a.start_time);
    const dateB = getCombinedDateTime(b.start_date, b.start_time);
    return dateB.getTime() - dateA.getTime();
  });
}

// Fetch a single match by ID
export async function getMatchById(id: string): Promise<Match | null> {
    const matchDocRef = doc(db, 'matches', id);
    const matchSnapshot = await getDoc(matchDocRef);
    if (matchSnapshot.exists()) {
        return processMatchDoc(matchSnapshot);
    } else {
        return null;
    }
}

// Recursively remove undefined, null, or empty string properties from an object
const cleanObject = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj
            .map(v => (v && typeof v === 'object') ? cleanObject(v) : v)
            .filter(v => v !== null && v !== undefined && v !== '');
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce(
            (acc, key) => {
                const value = obj[key];
                if (value === undefined || value === '') {
                    return acc;
                }
                acc[key] = (value && typeof value === 'object') ? cleanObject(value) : value;
                return acc;
            },
            {} as { [key: string]: any }
        );
    }
    return obj;
};

// Create a new match
export async function createMatch(match: Omit<Match, 'id'>): Promise<string> {
    const matchesCol = collection(db, 'matches');
    const cleanedMatch = cleanObject(match);
    const docRef = await addDoc(matchesCol, cleanedMatch);
    return docRef.id;
}

// Update an existing match
export async function updateMatch(id: string, match: Partial<Omit<Match, 'id'>>): Promise<void> {
    const matchDocRef = doc(db, 'matches', id);
    const cleanedMatch = cleanObject(match);
    await updateDoc(matchDocRef, cleanedMatch);
}

// Delete a match
export async function deleteMatch(id: string): Promise<void> {
    const matchDocRef = doc(db, 'matches', id);
    await deleteDoc(matchDocRef);
}
