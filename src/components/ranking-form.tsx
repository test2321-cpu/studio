
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import type { RankingTeam } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  format: z.enum(['t20i', 'odi', 'test'], { required_error: "Please select a format." }),
  team: z.string().min(1, { message: "Team name is required." }),
  flag: z.string().min(1, { message: "Flag name is required (e.g., 'india')." }),
  rank: z.string().min(1, { message: "Rank is required." }),
  rating: z.string().min(1, { message: "Rating is required." }),
});

export type FormValues = z.infer<typeof formSchema>;

interface RankingFormProps {
  isEditing?: boolean;
  defaultValues?: FormValues;
  onSubmitForm: (data: FormValues) => void;
}

export function RankingForm({ isEditing = false, defaultValues, onSubmitForm }: RankingFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      format: 't20i',
      team: '',
      flag: '',
      rank: '',
      rating: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    onSubmitForm(values);
  };
  
  const formats = ['t20i', 'odi', 'test'];

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="max-w-xl mx-auto">
        <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/admin/rankings"><ArrowLeft className="mr-2 h-4 w-4" />Back to Rankings</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Ranking' : 'Create New Ranking'}</CardTitle>
            <CardDescription>{isEditing ? 'Make changes to the existing ranking.' : 'Fill out the form to add a new ranking.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Format</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {formats.map(f => <SelectItem key={f} value={f}>{f.toUpperCase()}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="team" render={({ field }) => (
                    <FormItem><FormLabel>Team Name</FormLabel><FormControl><Input placeholder="e.g., India" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="flag" render={({ field }) => (
                    <FormItem><FormLabel>Flag Name</FormLabel><FormControl><Input placeholder="e.g., india" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <div className="grid grid-cols-2 gap-6">
                    <FormField control={form.control} name="rank" render={({ field }) => (
                        <FormItem><FormLabel>Rank</FormLabel><FormControl><Input type="number" placeholder="1" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="rating" render={({ field }) => (
                        <FormItem><FormLabel>Rating</FormLabel><FormControl><Input type="number" placeholder="121" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>

                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Saving...' : (isEditing ? 'Update Ranking' : 'Create Ranking')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
