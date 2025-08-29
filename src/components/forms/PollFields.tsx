import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"

interface PollFieldsProps {
  control: Control<any>
}

export function PollFields({ control }: PollFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField control={control} name="poll.teamA_votes" render={({ field }) => (
        <FormItem>
          <FormLabel>Team A Votes</FormLabel>
          <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}/>
      <FormField control={control} name="poll.teamB_votes" render={({ field }) => (
        <FormItem>
          <FormLabel>Team B Votes</FormLabel>
          <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}/>
    </div>
  )
}
