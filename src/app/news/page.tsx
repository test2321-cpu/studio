
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { getArticles } from '@/services/firestore';
import { ArticleCard } from '@/components/article-card';
import type { Article } from '@/lib/types';

export default async function NewsPage() {
    let articles: Article[] = [];
    try {
        articles = await getArticles();
    } catch (error) {
        console.error("Failed to fetch articles:", error);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SectionWrapper>
                    <h1 className="text-3xl font-bold mb-8 text-center">News</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}
