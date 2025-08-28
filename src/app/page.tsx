
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { ArticleCard } from '@/components/article-card';
import { RankingsSection } from '@/components/rankings-table';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getArticles } from '@/services/firestore';
import type { Article } from '@/lib/types';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const LiveMatchesBar = dynamic(() => import('@/components/live-matches-bar').then(mod => mod.LiveMatchesBar), { ssr: false });

const SectionHeader = ({ title, href }: { title: string, href: string }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    <Button asChild variant="ghost" className="text-primary hover:text-primary">
      <Link href={href}>
        View All <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  </div>
);

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        // You can render an error message here if you want
      }
    };
    fetchArticles();
  }, []);


  const latestNews = articles.filter(a => a.category === 'Latest News');
  const featuredArticles = articles.filter(a => a.category === 'Featured').slice(0, 2);
  const opinionArticles = articles.filter(a => a.category === 'Opinion').slice(0, 3);
  const stories = articles.filter(a => a.category === 'Stories').slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <LiveMatchesBar />

        {/* Latest Section */}
        <SectionWrapper>
          <SectionHeader title="Latest News" href="/news" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {latestNews.length > 0 && <ArticleCard article={latestNews[0]} isFeatured={true} />}
            </div>
            <div className="flex flex-col gap-4">
              {latestNews.slice(1, 5).map(article => (
                <ArticleCard key={article.id} article={article} layout="horizontal" />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Featured Section */}
        <SectionWrapper>
          <SectionHeader title="Featured" href="/news" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </SectionWrapper>

        {/* Opinion Section */}
        <SectionWrapper>
          <SectionHeader title="Opinion" href="/news"/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opinionArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </SectionWrapper>

        {/* Stories Section */}
        <SectionWrapper>
          <SectionHeader title="Stories" href="/news" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </SectionWrapper>
        
        {/* Rankings Section */}
        <SectionWrapper>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-center">ICC Team Rankings</h2>
          <div className="max-w-4xl mx-auto">
            <RankingsSection />
          </div>
        </SectionWrapper>

      </main>
      <Footer />
    </div>
  );
}
