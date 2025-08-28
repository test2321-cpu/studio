
import { db } from '@/lib/firebase';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import type { Article } from '@/lib/types';

export async function getArticles(): Promise<Article[]> {
  const articlesCol = collection(db, 'articles');
  const articlesSnapshot = await getDocs(articlesCol);
  const articlesList = articlesSnapshot.docs.map(doc => {
    const data = doc.data() as DocumentData;
    // Note: Firestore Timestamps need to be converted to strings or Dates.
    // Assuming 'date' is stored as a string for simplicity here.
    return {
      id: doc.id, // The document ID from firestore
      ...data,
    } as Article;
  });
  return articlesList;
}
