
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { getRankings } from '@/services/rankings';
import type { RankingTeam } from '@/lib/types';
import { Card } from './ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface RankingsTableProps {
  data: RankingTeam[];
}

function RankingsTable({ data }: RankingsTableProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((team) => (
            <TableRow key={team.id}>
              <TableCell className="font-medium">{team.rank}</TableCell>
              <TableCell className="font-medium flex items-center gap-3">
                <Image src={`https://cdn.countryflags.com/thumbs/${team.flag}/flag-400.png`} alt={team.team} width={24} height={18} className="object-contain" />
                {team.team}
              </TableCell>
              <TableCell className="text-right">{team.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export function RankingsSection() {
    const [rankings, setRankings] = useState<RankingTeam[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const fetchedRankings = await getRankings();
                setRankings(fetchedRankings);
            } catch (error) {
                console.error("Failed to fetch rankings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRankings();
    }, []);
    
    if (loading) {
        return <p className="text-center text-muted-foreground">Loading rankings...</p>;
    }

    const t20iData = rankings.filter(r => r.format === 't20i');
    const odiData = rankings.filter(r => r.format === 'odi');
    const testData = rankings.filter(r => r.format === 'test');

    return (
        <Tabs defaultValue="t20i" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="t20i">T20I</TabsTrigger>
                <TabsTrigger value="odi">ODI</TabsTrigger>
                <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>
            <TabsContent value="t20i">
                <RankingsTable data={t20iData} />
            </TabsContent>
            <TabsContent value="odi">
                <RankingsTable data={odiData} />
            </TabsContent>
            <TabsContent value="test">
                <RankingsTable data={testData} />
            </TabsContent>
        </Tabs>
    )
}
