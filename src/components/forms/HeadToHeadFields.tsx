
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFieldArray, Control } from "react-hook-form"
import { Button } from "@/components/ui/button"
import type { FormValues } from "../match-form"

interface HeadToHeadFieldsProps {
  control: Control<FormValues>
}

export function HeadToHeadFields({ control }: HeadToHeadFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "headToHead.last5",
  })

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="headToHead.summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl><Textarea placeholder="Head to head summary..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <h5 className="font-semibold mt-4">Last 5 Matches</h5>
      <div className="space-y-4">
        {fields.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-md space-y-4 relative">
            <h6 className="font-medium">Match {index + 1}</h6>
            <div className="grid grid-cols-2 gap-4">
              {/* Team 1 */}
              <div className="space-y-2">
                <FormField control={control} name={`headToHead.last5.${index}.teams.0.name`} render={({ field }) => (<FormItem><FormLabel>Team 1 Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={control} name={`headToHead.last5.${index}.teams.0.flag`} render={({ field }) => (<FormItem><FormLabel>Team 1 Flag</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={control} name={`headToHead.last5.${index}.teams.0.score`} render={({ field }) => (<FormItem><FormLabel>Team 1 Score</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
              </div>
              {/* Team 2 */}
              <div className="space-y-2">
                <FormField control={control} name={`headToHead.last5.${index}.teams.1.name`} render={({ field }) => (<FormItem><FormLabel>Team 2 Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={control} name={`headToHead.last5.${index}.teams.1.flag`} render={({ field }) => (<FormItem><FormLabel>Team 2 Flag</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={control} name={`headToHead.last5.${index}.teams.1.score`} render={({ field }) => (<FormItem><FormLabel>Team 2 Score</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
              </div>
            </div>
            <FormField control={control} name={`headToHead.last5.${index}.result`} render={({ field }) => (<FormItem><FormLabel>Result</FormLabel><FormControl><Input placeholder="Match Result" {...field} /></FormControl></FormItem>)} />
            <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>Remove Match</Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ teams: [{ name: "", flag: "", score: "" }, { name: "", flag: "", score: "" }], result: "" })}
      >
        Add H2H Match
      </Button>
    </div>
  )
}
