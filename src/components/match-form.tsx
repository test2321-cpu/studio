
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import type { Match } from '@/lib/types';
import { createMatch, updateMatch } from '@/services/matches';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';

const matchTeamSchema = z.object({
  name: z.string().min(1, "Team name is required."),
  flag: z.string().min(1, "Flag name is required."),
  score: z.string().optional(),
});

const playerSchema = z.object({
  name: z.string().min(1, "Player name is required."),
  role: z.string().min(1, "Player role is required."),
});

const playingXISchema = z.object({
  team: z.string().min(1, "Team name is required."),
  players: z.array(playerSchema),
});

const recentMatchSchema = z.object({
    id: z.string().min(1, "ID is required"),
    type: z.string().min(1, "Type is required"),
    date: z.string().min(1, "Date is required"),
    status: z.string().min(1, "Status is required"),
    teams: z.array(matchTeamSchema).length(2),
    result: z.string().min(1, "Result is required")
})

const headToHeadMatchSchema = z.object({
    teams: z.array(matchTeamSchema).length(2),
    result: z.string().min(1, "Result is required")
})

const formSchema = z.object({
  tournament: z.string().min(2, "Tournament name is required."),
  teams: z.array(matchTeamSchema).length(2, "There must be exactly two teams."),
  date: z.string().min(1, "Date is required."),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)."),
  status: z.enum(['Upcoming', 'Live', 'Recent']),
  result: z.string().optional(),
  details: z.object({
    venue: z.string().optional(),
    toss: z.string().optional(),
    season: z.string().optional(),
    format: z.string().optional(),
  }).optional(),
  playingXI: z.array(playingXISchema).optional(),
  headToHead: z.object({
      summary: z.string().optional(),
      last5: z.array(headToHeadMatchSchema).optional()
  }).optional(),
  poll: z.object({
      teamA_votes: z.coerce.number().optional(),
      teamB_votes: z.coerce.number().optional(),
  }).optional(),
  recentMatches: z.array(recentMatchSchema).optional(),
});

interface MatchFormProps {
  match?: Match | null;
}

export function MatchForm({ match }: MatchFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditing = !!match;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditing && match ? {
      ...match,
      details: match.details || {},
      playingXI: match.playingXI || [],
      headToHead: match.headToHead || { summary: '', last5: [] },
      poll: match.poll || {},
      recentMatches: match.recentMatches || [],
    } : {
      tournament: '',
      teams: [
        { name: '', flag: '', score: '' },
        { name: '', flag: '', score: '' }
      ],
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      status: 'Upcoming',
      result: '',
      details: { venue: '', toss: '', season: '', format: '' },
      playingXI: [{team: '', players: Array(11).fill({name: '', role: ''})} , {team: '', players: Array(11).fill({name: '', role: ''})}],
      headToHead: { summary: '', last5: Array(5).fill({ teams: [{name: '', flag:'', score: ''}, {name: '', flag:'', score: ''}], result: ''}) },
      poll: { teamA_votes: 0, teamB_votes: 0 },
      recentMatches: Array(5).fill({id: '', type: '', date: '', status: '', teams: [{name: '', flag:'', score: ''}, {name: '', flag:'', score: ''}], result: ''})
    },
  });
  
  const { fields: teamFields } = useFieldArray({ control: form.control, name: "teams" });
  const { fields: playingXIFields, update: updatePlayingXI } = useFieldArray({ control: form.control, name: "playingXI" });
  const { fields: h2hFields, update: updateH2H } = useFieldArray({ control: form.control, name: "headToHead.last5" });
  const { fields: recentMatchFields, update: updateRecentMatches } = useFieldArray({ control: form.control, name: "recentMatches" });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing && match) {
        await updateMatch(match.id, values);
        toast({ title: "Success", description: "Match updated successfully." });
      } else {
        await createMatch(values as Omit<Match, 'id'>);
        toast({ title: "Success", description: "Match created successfully." });
      }
      router.push('/admin/matches');
      router.refresh();
    } catch (error) {
      console.error("Failed to save match:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save match. " + (error instanceof Error ? error.message : ""),
      });
    }
  };
  
  const statusOptions = ['Upcoming', 'Live', 'Recent'];

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/admin/matches"><ArrowLeft className="mr-2 h-4 w-4" />Back to Matches</Link>
        </Button>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Match' : 'Create New Match'}</CardTitle>
            <CardDescription>Basic match details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField control={form.control} name="tournament" render={({ field }) => ( <FormItem> <FormLabel>Tournament</FormLabel> <FormControl><Input placeholder="e.g., T20 World Cup" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            {teamFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md space-y-4">
                     <h4 className="font-semibold">Team {index + 1}</h4>
                    <FormField control={form.control} name={`teams.${index}.name`} render={({ field }) => ( <FormItem> <FormLabel>Team Name</FormLabel> <FormControl><Input placeholder="e.g., India" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name={`teams.${index}.flag`} render={({ field }) => ( <FormItem> <FormLabel>Flag Name</FormLabel> <FormControl><Input placeholder="e.g., india" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name={`teams.${index}.score`} render={({ field }) => ( <FormItem> <FormLabel>Score (Optional)</FormLabel> <FormControl><Input placeholder="e.g., 150/2 (15.3 ov)" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField control={form.control} name="date" render={({ field }) => ( <FormItem> <FormLabel>Date</FormLabel> <FormControl><Input type="date" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
               <FormField control={form.control} name="time" render={({ field }) => ( <FormItem> <FormLabel>Time (24h format)</FormLabel> <FormControl><Input type="time" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            </div>
            <FormField control={form.control} name="status" render={({ field }) => ( <FormItem> <FormLabel>Status</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select a status" /> </SelectTrigger> </FormControl> <SelectContent> {statusOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )}/>
            <FormField control={form.control} name="result" render={({ field }) => ( <FormItem> <FormLabel>Result (Optional)</FormLabel> <FormControl><Input placeholder="e.g., India won by 5 wickets" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Match Details</CardTitle>
                <CardDescription>Venue, toss and other info.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField control={form.control} name="details.venue" render={({ field }) => ( <FormItem> <FormLabel>Venue</FormLabel> <FormControl><Input placeholder="e.g., Kensington Oval, Barbados" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="details.toss" render={({ field }) => ( <FormItem> <FormLabel>Toss</FormLabel> <FormControl><Input placeholder="e.g., Australia won the toss and elected to field" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="details.season" render={({ field }) => ( <FormItem> <FormLabel>Season</FormLabel> <FormControl><Input placeholder="e.g., 2024" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="details.format" render={({ field }) => ( <FormItem> <FormLabel>Format</FormLabel> <FormControl><Input placeholder="e.g., T20I" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Playing XI</CardTitle>
                <CardDescription>Enter the players for each team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               {playingXIFields.map((teamField, teamIndex) => (
                    <div key={teamField.id} className="p-4 border rounded-md space-y-4">
                        <FormField control={form.control} name={`playingXI.${teamIndex}.team`} render={({ field }) => ( <FormItem> <FormLabel>Team Name</FormLabel> <FormControl><Input placeholder="Team name for Playing XI" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <h5 className="font-semibold mt-4">Players</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(teamField as any).players.map((player: any, playerIndex: number) => (
                             <div key={playerIndex} className="p-2 border rounded-md space-y-2">
                                <FormField control={form.control} name={`playingXI.${teamIndex}.players.${playerIndex}.name`} render={({ field }) => ( <FormItem> <FormLabel>Player {playerIndex + 1} Name</FormLabel> <FormControl><Input placeholder="Player Name" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={form.control} name={`playingXI.${teamIndex}.players.${playerIndex}.role`} render={({ field }) => ( <FormItem> <FormLabel>Role</FormLabel> <FormControl><Input placeholder="e.g., Batsman" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                             </div>
                        ))}
                        </div>
                    </div>
               ))}
            </CardContent>
        </Card>

        <Card>
             <CardHeader>
                <CardTitle>Head-to-Head</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
                <FormField control={form.control} name="headToHead.summary" render={({ field }) => ( <FormItem> <FormLabel>Summary</FormLabel> <FormControl><Textarea placeholder="Head to head summary..." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <h5 className="font-semibold mt-4">Last 5 Matches</h5>
                 { (h2hFields as any).map((h2hMatch: any, index: number) => (
                     <div key={index} className="p-2 border rounded-md space-y-2">
                        <FormField control={form.control} name={`headToHead.last5.${index}.teams.0.name`} render={({ field }) => ( <FormItem> <FormLabel>Team 1</FormLabel> <FormControl><Input placeholder="Team Name" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`headToHead.last5.${index}.teams.0.score`} render={({ field }) => ( <FormItem> <FormLabel>Team 1 Score</FormLabel> <FormControl><Input placeholder="Score" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`headToHead.last5.${index}.teams.1.name`} render={({ field }) => ( <FormItem> <FormLabel>Team 2</FormLabel> <FormControl><Input placeholder="Team Name" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`headToHead.last5.${index}.teams.1.score`} render={({ field }) => ( <FormItem> <FormLabel>Team 2 Score</FormLabel> <FormControl><Input placeholder="Score" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`headToHead.last5.${index}.result`} render={({ field }) => ( <FormItem> <FormLabel>Result</FormLabel> <FormControl><Input placeholder="Match Result" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                     </div>
                 ))}
             </CardContent>
        </Card>
        
         <Card>
            <CardHeader><CardTitle>Poll Data</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
                <FormField control={form.control} name="poll.teamA_votes" render={({ field }) => ( <FormItem> <FormLabel>Team A Votes</FormLabel> <FormControl><Input type="number" placeholder="0" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="poll.teamB_votes" render={({ field }) => ( <FormItem> <FormLabel>Team B Votes</FormLabel> <FormControl><Input type="number" placeholder="0" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            </CardContent>
         </Card>

         <Card>
            <CardHeader><CardTitle>Recent Matches (for display)</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                 {(recentMatchFields as any).map((match: any, index: number) => (
                      <div key={index} className="p-2 border rounded-md space-y-2">
                        <FormField control={form.control} name={`recentMatches.${index}.id`} render={({ field }) => ( <FormItem> <FormLabel>Match ID</FormLabel> <FormControl><Input placeholder="Unique ID" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.type`} render={({ field }) => ( <FormItem> <FormLabel>Type</FormLabel> <FormControl><Input placeholder="e.g. T20I" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.date`} render={({ field }) => ( <FormItem> <FormLabel>Date</FormLabel> <FormControl><Input placeholder="e.g. 24 Jun 2024" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.status`} render={({ field }) => ( <FormItem> <FormLabel>Status</FormLabel> <FormControl><Input placeholder="e.g. Completed" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.teams.0.name`} render={({ field }) => ( <FormItem> <FormLabel>Team 1 Name</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.teams.0.flag`} render={({ field }) => ( <FormItem> <FormLabel>Team 1 Flag</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.teams.0.score`} render={({ field }) => ( <FormItem> <FormLabel>Team 1 Score</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.teams.1.name`} render={({ field }) => ( <FormItem> <FormLabel>Team 2 Name</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.teams.1.flag`} render={({ field }) => ( <FormItem> <FormLabel>Team 2 Flag</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.teams.1.score`} render={({ field }) => ( <FormItem> <FormLabel>Team 2 Score</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name={`recentMatches.${index}.result`} render={({ field }) => ( <FormItem> <FormLabel>Result</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                      </div>
                 ))}
             </CardContent>
         </Card>

        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting ? 'Saving...' : (isEditing ? 'Update Match' : 'Create Match')}
        </Button>
        </form>
        </Form>
      </div>
    </div>
  );
}
