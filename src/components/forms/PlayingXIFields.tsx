
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFieldArray, Control } from "react-hook-form"

interface PlayingXIFieldsProps {
  control: Control<any>
}

export function PlayingXIFields({ control }: PlayingXIFieldsProps) {
  const { fields } = useFieldArray({ control, name: "playingXI" })

  return (
    <>
      {fields.map((teamField, teamIndex) => (
        <div key={teamField.id} className="p-4 border rounded-md space-y-4">
          <FormField control={control} name={`playingXI.${teamIndex}.team`} render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl><Input placeholder="Team name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <h5 className="font-semibold mt-4">Players</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(teamField as any).players.map((_: any, playerIndex: number) => (
              <div key={playerIndex} className="p-2 border rounded-md space-y-2">
                <FormField control={control} name={`playingXI.${teamIndex}.players.${playerIndex}.name`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player {playerIndex + 1}</FormLabel>
                    <FormControl><Input placeholder="Player Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={control} name={`playingXI.${teamIndex}.players.${playerIndex}.role`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl><Input placeholder="e.g., Batsman" {...field} /></FormControl>
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
