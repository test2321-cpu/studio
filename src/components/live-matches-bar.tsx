import { matches } from '@/data/dummy-data';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function LiveMatchesBar() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-red-500 hover:bg-red-600';
      case 'Upcoming':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Recent':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className="bg-card border-b">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center space-x-4 overflow-x-auto py-3 no-scrollbar">
          {matches.map((match, index) => (
            <div key={match.id} className="flex items-center space-x-4">
              <Card className="p-3 shadow-none border-0 min-w-[300px] md:min-w-[320px] bg-transparent">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{match.tournament}</p>
                  <Badge variant="destructive" className={`text-white text-[10px] px-1.5 py-0.5 rounded-sm h-auto ${getStatusColor(match.status)}`}>
                    {match.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between items-center font-medium">
                    <span>{match.teams[0].flag} {match.teams[0].name}</span>
                    <span className="font-bold">{match.teams[0].score}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span>{match.teams[1].flag} {match.teams[1].name}</span>
                    <span className="font-bold">{match.teams[1].score}</span>
                  </div>
                </div>
                <p className="text-xs text-accent-foreground/80 mt-2 truncate text-accent">{match.result || match.date}</p>
              </Card>
              {index < matches.length - 1 && <Separator orientation="vertical" className="h-16" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
