
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
    date: data.date, // Keep as YYYY-MM-DD string
    time: data.time, // Keep as HH:MM string
    status: data.status,
    result: data.result || '',
  };

  const now = new Date();
  const matchDateTime = getCombinedDateTime(match.date, match.time);

  if (match.status !== 'Recent') {
      if (now > matchDateTime) {
          // If current time is past match time, but it's not marked recent, it's probably live or just ended.
          // A more sophisticated system might have a "Live" window.
          // For now, we'll rely on the status set in the form.
      }
  }
  
  return match;
}

// Fetch all matches
export async function getMatches(): Promise<Match[]> {
  const matchesCol = collection(db, 'matches');
  const matchesSnapshot = await getDocs(matchesCol);
  const matchesList = matchesSnapshot.docs.map(processMatchDoc);
  return matchesList.sort((a, b) => {
    const dateA = getCombinedDateTime(a.date, a.time);
    const dateB = getCombinedDateTime(b.date, b.time);
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

// Create a new match
export async function createMatch(match: Omit<Match, 'id'>): Promise<string> {
    const matchesCol = collection(db, 'matches');
    const docRef = await addDoc(matchesCol, match);
    return docRef.id;
}

// Update an existing match
export async function updateMatch(id: string, match: Partial<Omit<Match, 'id'>>): Promise<void> {
    const matchDocRef = doc(db, 'matches', id);
    await updateDoc(matchDocRef, match);
}

// Delete a match
export async function deleteMatch(id: string): Promise<void> {
    const matchDocRef = doc(db, 'matches', id);
    await deleteDoc(matchDocRef);
}
