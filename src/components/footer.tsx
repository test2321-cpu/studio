
'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Logo } from './logo';
import { SectionWrapper } from './section-wrapper';
import { useEffect, useState } from 'react';

const socialLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Youtube, href: '#', name: 'Youtube' },
];

const quickLinks = [
    { name: 'Tournaments', href: '/tournaments' },
    { name: 'Players', href: '/players' },
    { name: 'News', href: '/news' },
    { name: 'Match Centre', href: '/match-centre' },
];
const legalLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
];


export function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className="bg-card border-t">
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your daily pulse of cricket news, scores, and updates from around the globe.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-2">Get the latest cricket updates delivered to your inbox.</p>
            {/* Newsletter form can be added here */}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {isClient ? new Date().getFullYear() : ''} CricketPulse. All Rights Reserved.
          </p>
        </div>
      </SectionWrapper>
    </footer>
  );
}
