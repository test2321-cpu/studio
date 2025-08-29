
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { TeamFields } from "./forms/TeamFields"
import { PlayingXIFields } from "./forms/PlayingXIFields"
import { HeadToHeadFields } from "./forms/HeadToHeadFields"
import { PollFields } from "./forms/PollFields"
import { RecentMatchesFields } from "./forms/RecentMatchesFields"

const formSchema = z.object({
  tournament: z.string().min(1, "Tournament is required"),
  teams: z.array(
    z.object({
      name: z.string().min(1, "Team name is required"),
      flag: z.string().min(1, "Flag is required"),
      score: z.string().optional(),
    })
  ).length(2, "Two teams are required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  status: z.string().min(1, "Status is required"),
  result: z.string().optional(),
  playingXI: z.array(
    z.object({
      team: z.string().min(1),
      players: z.array(
        z.object({
          name: z.string().min(1),
          role: z.string().min(1),
        })
      ).length(11),
    })
  ).length(2),
  headToHead: z.object({
    summary: z.string().optional(),
    last5: z.array(
      z.object({
        teams: z.array(
          z.object({
            name: z.string(),
            flag: z.string(),
            score: z.string(),
          })
        ).length(2),
        result: z.string(),
      })
    ).max(5),
  }),
  poll: z.object({
    teamA_votes: z.string(),
    teamB_votes: z.string(),
  }),
  recentMatches: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      date: z.string(),
      status: z.string(),
      teams: z.array(
        z.object({
          name: z.string(),
          flag: z.string(),
          score: z.string(),
        })
      ).length(2),
      result: z.string(),
    })
  ),
})

export type FormValues = z.infer<typeof formSchema>

interface MatchFormProps {
  isEditing?: boolean
  defaultValues?: FormValues
  onSubmitForm: (data: FormValues) => void
}

export function MatchForm({ isEditing = false, defaultValues, onSubmitForm }: MatchFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      tournament: "",
      teams: [
        { name: "", flag: "", score: "" },
        { name: "", flag: "", score: "" },
      ],
      date: "",
      time: "",
      status: "upcoming",
      result: "",
      playingXI: [
        { team: "", players: Array(11).fill({ name: "", role: "" }) },
        { team: "", players: Array(11).fill({ name: "", role: "" }) },
      ],
      headToHead: { summary: "", last5: [] },
      poll: { teamA_votes: "0", teamB_votes: "0" },
      recentMatches: [],
    },
  })

  function onSubmit(data: FormValues) {
    onSubmitForm(data)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <div className="flex items-center space-x-2">
        <Link href="/admin/matches">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">{isEditing ? "Edit Match" : "New Match"}</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>Enter match details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tournament */}
              <FormField control={form.control} name="tournament" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament</FormLabel>
                  <FormControl><Input placeholder="e.g., ICC World Cup" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* Teams */}
              <TeamFields control={form.control} />
              {/* Date */}
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* Time */}
              <FormField control={form.control} name="time" render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl><Input type="time" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* Status */}
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* Result */}
              <FormField control={form.control} name="result" render={({ field }) => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <FormControl><Input placeholder="Match Result" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </CardContent>
          </Card>

          <Card><CardHeader><CardTitle>Playing XI</CardTitle></CardHeader><CardContent><PlayingXIFields control={form.control} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Head-to-Head</CardTitle></CardHeader><CardContent><HeadToHeadFields control={form.control} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Poll</CardTitle></CardHeader><CardContent><PollFields control={form.control} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Recent Matches</CardTitle></CardHeader><CardContent><RecentMatchesFields control={form.control} /></CardContent></Card>

          <Button type="submit" className="w-full">{isEditing ? "Update Match" : "Save Match"}</Button>
        </form>
      </Form>
    </div>
  )
}
