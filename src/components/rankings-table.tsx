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
import {
  rankings_odi,
  rankings_t20i,
  rankings_test,
} from '@/data/dummy-data';
import type { RankingTeam } from '@/lib/types';
import { Card } from './ui/card';
import Image from 'next/image';

interface RankingsTableProps {
  title: string;
  data: RankingTeam[];
}

function RankingsTable({ title, data }: RankingsTableProps) {
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
            <TableRow key={team.rank}>
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
    return (
        <Tabs defaultValue="t20i" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="t20i">T20I</TabsTrigger>
                <TabsTrigger value="odi">ODI</TabsTrigger>
                <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>
            <TabsContent value="t20i">
                <RankingsTable title="T20I Rankings" data={rankings_t20i} />
            </TabsContent>
            <TabsContent value="odi">
                <RankingsTable title="ODI Rankings" data={rankings_odi} />
            </TabsContent>
            <TabsContent value="test">
                <RankingsTable title="Test Rankings" data={rankings_test} />
            </TabsContent>
        </Tabs>
    )
}
