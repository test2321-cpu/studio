"use client"

import { useFieldArray, Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { FormValues } from "../match-form"

interface TeamFieldsProps {
  control: Control<FormValues>
}

export function TeamFields({ control }: TeamFieldsProps) {
  const { fields } = useFieldArray({
    control,
    name: "teams",
  })

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-md space-y-4">
          <h4 className="font-semibold">Team {index + 1}</h4>
          <FormField
            control={control}
            name={`teams.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl><Input placeholder="e.g., India" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={control}
            name={`teams.${index}.logo`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Logo URL (Optional)</FormLabel>
                <FormControl><Input placeholder="https://example.com/logo.png" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
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
            control={control}
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
    </div>
  )
}
