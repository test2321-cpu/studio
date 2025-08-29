
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFieldArray, Control, UseFormReturn } from "react-hook-form"
import type { FormValues } from "../match-form"
import { useEffect } from "react"

interface PlayingXIFieldsProps {
  control: Control<FormValues>
  form: UseFormReturn<FormValues>
}

export function PlayingXIFields({ control, form }: PlayingXIFieldsProps) {
  const { fields, replace } = useFieldArray({ control, name: "playingXI" })

  const team1Name = form.watch("teams.0.name");
  const team2Name = form.watch("teams.1.name");

  useEffect(() => {
    const currentValues = form.getValues("playingXI");
    if (!currentValues || currentValues.length === 0) {
      replace([
        { team: team1Name || "Team 1", players: Array(11).fill({ name: "", role: "" }) },
        { team: team2Name || "Team 2", players: Array(11).fill({ name: "", role: "" }) },
      ]);
    } else {
        const updatedXI = [...currentValues];
        if (updatedXI[0]) updatedXI[0].team = team1Name || 'Team 1';
        if (updatedXI[1]) updatedXI[1].team = team2Name || 'Team 2';
        replace(updatedXI);
    }
  }, [team1Name, team2Name, form, replace]);


  return (
    <>
      {fields.map((teamField, teamIndex) => (
        <div key={teamField.id} className="p-4 border rounded-md space-y-4 mb-4">
            <h3 className="font-bold text-lg mb-3">{teamIndex === 0 ? team1Name || 'Team 1' : team2Name || 'Team 2'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(teamField as any).players.map((_: any, playerIndex: number) => (
              <div key={playerIndex} className="p-2 border rounded-md space-y-2">
                <FormField control={control} name={`playingXI.${teamIndex}.players.${playerIndex}.name`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player {playerIndex + 1}</FormLabel>
                    <FormControl><Input placeholder="Player Name" {...field} value={field.value || ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={control} name={`playingXI.${teamIndex}.players.${playerIndex}.role`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl><Input placeholder="e.g., Batsman" {...field} value={field.value || ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
