
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import type { Match } from '@/lib/types';
import { createMatch, updateMatch } from '@/services/matches';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

const matchTeamSchema = z.object({
  name: z.string().min(2, "Team name must be at least 2 characters."),
  flag: z.string().min(2, "Flag name must be at least 2 characters."),
  score: z.string().optional(),
});

const formSchema = z.object({
  tournament: z.string().min(2, "Tournament name is required."),
  teams: z.array(matchTeamSchema).length(2, "There must be exactly two teams."),
  date: z.string().min(1, "Date is required."),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)."),
  status: z.enum(['Upcoming', 'Live', 'Recent']),
  result: z.string().optional(),
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
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teams"
  });

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
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Match' : 'Create New Match'}</CardTitle>
            <CardDescription>{isEditing ? 'Make changes to the existing match.' : 'Fill out the form to add a new match.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="tournament"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tournament</FormLabel>
                      <FormControl><Input placeholder="e.g., T20 World Cup" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md space-y-4">
                         <h4 className="font-semibold">Team {index + 1}</h4>
                        <FormField
                            control={form.control}
                            name={`teams.${index}.name`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Team Name</FormLabel>
                                <FormControl><Input placeholder="e.g., IND" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`teams.${index}.flag`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Flag Name</FormLabel>
                                <FormControl><Input placeholder="e.g., india" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`teams.${index}.score`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Score (Optional)</FormLabel>
                                <FormControl><Input placeholder="e.g., 150/2 (15.3 ov)" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time (24h format)</FormLabel>
                        <FormControl><Input type="time" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result (Optional)</FormLabel>
                      <FormControl><Input placeholder="e.g., India won by 5 wickets" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Saving...' : (isEditing ? 'Update Match' : 'Create Match')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
