'use client';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Tournaments', href: '#' },
  { name: 'Match Centre', href: '#' },
  { name: 'News', href: '#' },
  { name: 'Players', href: '#' },
  { name: 'Rankings', href: '#' },
];

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string; }) => (
    <Link href={href} className={cn("text-sm font-medium text-muted-foreground transition-colors hover:text-primary", className)}>
        {children}
    </Link>
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center px-4">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 ml-10">
            {navLinks.map((link) => (
                <NavLink key={link.name} href={link.href}>
                    {link.name}
                </NavLink>
            ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:block w-full max-w-xs">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9" />
              </div>
            </form>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col p-6">
                <Logo />
                <nav className="mt-8 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <NavLink key={link.name} href={link.href} className="text-lg">
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
