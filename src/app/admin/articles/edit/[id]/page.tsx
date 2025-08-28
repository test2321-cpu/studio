
import { ArticleForm } from '@/components/article-form';
import { getArticleById } from '@/services/firestore';

export default async function EditArticlePage({ params }: { params: { id: string } }) {
    const article = await getArticleById(params.id);

    return <ArticleForm article={article} />;
}
