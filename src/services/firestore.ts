
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, DocumentData } from 'firebase/firestore';
import type { Article } from '@/lib/types';

// Fetch all articles
export async function getArticles(): Promise<Article[]> {
  const articlesCol = collection(db, 'articles');
  const articlesSnapshot = await getDocs(articlesCol);
  const articlesList = articlesSnapshot.docs.map(doc => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      ...data,
    } as Article;
  });
  return articlesList;
}

// Fetch a single article by ID
export async function getArticleById(id: string): Promise<Article | null> {
    const articleDocRef = doc(db, 'articles', id);
    const articleSnapshot = await getDoc(articleDocRef);
    if (articleSnapshot.exists()) {
        return { id: articleSnapshot.id, ...articleSnapshot.data() } as Article;
    } else {
        return null;
    }
}

// Create a new article
export async function createArticle(article: Omit<Article, 'id'>): Promise<string> {
    const articlesCol = collection(db, 'articles');
    const docRef = await addDoc(articlesCol, article);
    return docRef.id;
}

// Update an existing article
export async function updateArticle(id: string, article: Partial<Article>): Promise<void> {
    const articleDocRef = doc(db, 'articles', id);
    await updateDoc(articleDocRef, article);
}

// Delete an article
export async function deleteArticle(id: string): Promise<void> {
    const articleDocRef = doc(db, 'articles', id);
    await deleteDoc(articleDocRef);
}
