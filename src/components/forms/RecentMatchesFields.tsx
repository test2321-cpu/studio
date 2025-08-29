
"use client"

import { useFieldArray, Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { FormValues } from "../match-form"

interface RecentMatchesFieldsProps {
  control: Control<FormValues>
}

export function RecentMatchesFields({ control }: RecentMatchesFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recentMatches",
  })

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {fields.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-md space-y-4 relative">
            <h6 className="font-medium">Recent Match {index + 1}</h6>
             <FormField control={control} name={`recentMatches.${index}.id`} render={({ field }) => (<FormItem><FormLabel>Match ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
             <FormField control={control} name={`recentMatches.${index}.type`} render={({ field }) => (<FormItem><FormLabel>Type</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
             <FormField control={control} name={`recentMatches.${index}.date`} render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
             <FormField control={control} name={`recentMatches.${index}.status`} render={({ field }) => (<FormItem><FormLabel>Status</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
            <div className="grid grid-cols-2 gap-4">
              {/* Team 1 */}
              <div className="space-y-2">
                <FormField control={control} name={`recentMatches.${index}.teams.0.name`} render={({ field }) => (<FormItem><FormLabel>Team 1 Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={control} name={`recentMatches.${index}.teams.0.flag`} render={({ field }) => (<FormItem><FormLabel>Team 1 Flag</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={control} name={`recentMatches.${index}.teams.0.score`} render={({ field }) => (<FormItem><FormLabel>Team 1 Score</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
              </div>
              {/* Team 2 */}
              <div className="space-y-2">
                <FormField control={control} name={`recentMatches.${index}.teams.1.name`} render={({ field }) => (<FormItem><FormLabel>Team 2 Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={control} name={`recentMatches.${index}.teams.1.flag`} render={({ field }) => (<FormItem><FormLabel>Team 2 Flag</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={control} name={`recentMatches.${index}.teams.1.score`} render={({ field }) => (<FormItem><FormLabel>Team 2 Score</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
              </div>
            </div>
            <FormField control={control} name={`recentMatches.${index}.result`} render={({ field }) => (<FormItem><FormLabel>Result</FormLabel><FormControl><Input placeholder="Match Result" {...field} /></FormControl></FormItem>)} />
            <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>Remove Match</Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ id: crypto.randomUUID(), type: "", date: "", status: "", teams: [{ name: "", flag: "", score: "" }, { name: "", flag: "", score: "" }], result: "" })}
      >
        Add Recent Match
      </Button>
    </div>
  )
}
