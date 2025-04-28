
import { Kitty } from "~/client/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Controller, UseFormReturn } from "react-hook-form";
import { Label } from "~/components/ui/label";

interface MySelectProps {
    label:string
    name:"name" | "id" | "size" | "age" | "vaccine" | "levelActivity"
    items:string[]
    editForm: UseFormReturn<Kitty, any, Kitty>
}

export function MySelect({ label,name,items,editForm }:MySelectProps) {

    return <div>
                <Label>{label}</Label>
                <Controller
                  name={name}
                  control={editForm.control}
                  render={({ field }) => (
                    <Select
                      value={field.value as string}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                       { items.map(( item,i ) => <SelectItem value={i+""}>{item}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
            </div>
}