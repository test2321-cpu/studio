
'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function PlayerSearch() {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for search logic
        alert(`Searching for: ${query}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by player name..."
            />
            <Button type="submit" size="icon">
                <Search />
            </Button>
        </form>
    );
}
