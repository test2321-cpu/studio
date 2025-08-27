import { Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center gap-2 text-foreground hover:text-primary transition-colors", className)}>
    <Zap className="h-7 w-7 text-primary" />
    <span className="text-xl md:text-2xl font-extrabold tracking-tight font-headline">
      CricketPulse
    </span>
  </Link>
);
