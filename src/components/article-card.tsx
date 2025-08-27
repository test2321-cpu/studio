import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/types';
import { Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  isFeatured?: boolean;
}

export function ArticleCard({ article, className, layout = 'vertical', isFeatured = false }: ArticleCardProps) {
  const cardContent = (
    <>
      <div className={cn(
        "overflow-hidden relative",
        layout === 'vertical' ? 'w-full aspect-video' : 'w-1/3 md:w-1/4',
        isFeatured && 'aspect-[4/3]'
      )}>
        <Link href={`/news/${article.slug}`}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            data-ai-hint={article.imageHint}
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </Link>
      </div>
      <div className={cn(
        "flex flex-col",
        layout === 'vertical' ? 'p-4' : 'p-4 w-2/3 md:w-3/4'
      )}>
        <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
        <h3 className={cn(
          "font-bold leading-tight",
          isFeatured ? "text-xl md:text-2xl" : "text-lg",
          layout === 'horizontal' && 'text-base',
        )}>
          <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h3>
        {layout === 'vertical' && (
          <p className={cn(
            "mt-2 text-sm text-muted-foreground",
            isFeatured ? "line-clamp-3" : "line-clamp-2"
          )}>
            {article.excerpt}
          </p>
        )}
        <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-muted-foreground">
          {article.author && (
            <div className="flex items-center gap-1.5">
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex",
      layout === 'vertical' ? 'flex-col' : 'flex-row items-center',
      className
    )}>
      {cardContent}
    </Card>
  );
}
