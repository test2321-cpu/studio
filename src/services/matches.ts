
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, DocumentData, Timestamp, onSnapshot, increment } from 'firebase/firestore';
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

// Listen for real-time updates to a match
export function onMatchUpdate(id: string, callback: (match: Match | null) => void): () => void {
    const matchDocRef = doc(db, 'matches', id);
    const unsubscribe = onSnapshot(matchDocRef, (doc) => {
        if (doc.exists()) {
            callback(processMatchDoc(doc));
        } else {
            callback(null);
        }
    });
    return unsubscribe;
}

// Add a vote to a team in a match
export async function addVoteToMatch(id: string, team: 'teamA' | 'teamB'): Promise<void> {
    const matchDocRef = doc(db, 'matches', id);
    const fieldToUpdate = team === 'teamA' ? 'poll.teamA_votes' : 'poll.teamB_votes';
    
    // We need to convert the string to a number for increment,
    // but Firestore increment works on number fields.
    // The poll votes are stored as strings, so we will read, increment, and write back.
    // This is not atomic, but for a simple poll it's acceptable. For a critical system,
    // you would use a transaction or a Cloud Function.
    const matchSnap = await getDoc(matchDocRef);
    if (matchSnap.exists()) {
        const data = matchSnap.data();
        const currentVotesStr = team === 'teamA' ? data.poll?.teamA_votes : data.poll?.teamB_votes;
        const currentVotes = parseInt(currentVotesStr || '0', 10);
        const newVotes = currentVotes + 1;

        await updateDoc(matchDocRef, {
            [fieldToUpdate]: String(newVotes)
        });
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
                if (value && typeof value === 'object') {
                  const cleaned = cleanObject(value);
                  if (Object.keys(cleaned).length > 0) {
                     acc[key] = cleaned;
                  }
                } else if (value !== undefined) {
                   acc[key] = value;
                }
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
