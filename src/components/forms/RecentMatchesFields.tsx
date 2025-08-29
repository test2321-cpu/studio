
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFieldArray, Control } from "react-hook-form"

interface RecentMatchesFieldsProps {
  control: Control<any>
}

export function RecentMatchesFields({ control }: RecentMatchesFieldsProps) {
  const { fields } = useFieldArray({ control, name: "recentMatches" })

  return (
    <div className="space-y-4">
      {fields.map((_, index) => (
        <div key={index} className="p-2 border rounded-md space-y-2">
          <FormField control={control} name={`recentMatches.${index}.id`} render={({ field }) => (
            <FormItem><FormLabel>Match ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={control} name={`recentMatches.${index}.type`} render={({ field }) => (
            <FormItem><FormLabel>Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={control} name={`recentMatches.${index}.date`} render={({ field }) => (
            <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          <FormField control={control} name={`recentMatches.${index}.status`} render={({ field }) => (
            <FormItem><FormLabel>Status</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
          {["0", "1"].map(teamIdx => (
            <>
              <FormField control={control} name={`recentMatches.${index}.teams.${teamIdx}.name`} render={({ field }) => (
                <FormItem><FormLabel>Team {Number(teamIdx)+1} Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={control} name={`recentMatches.${index}.teams.${teamIdx}.flag`} render={({ field }) => (
                <FormItem><FormLabel>Team {Number(teamIdx)+1} Flag</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={control} name={`recentMatches.${index}.teams.${teamIdx}.score`} render={({ field }) => (
                <FormItem><FormLabel>Team {Number(teamIdx)+1} Score</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
            </>
          ))}
          <FormField control={control} name={`recentMatches.${index}.result`} render={({ field }) => (
            <FormItem><FormLabel>Result</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )}/>
        </div>
      ))}
    </div>
  )
}
