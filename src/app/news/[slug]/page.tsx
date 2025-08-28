
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { getArticles } from '@/services/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const articles = await getArticles();
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionWrapper>
          <article className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              {article.author && (
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
            </div>
            <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    data-ai-hint={article.imageHint}
                    className="object-cover"
                />
            </div>
            <div 
              className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
