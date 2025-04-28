import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { getKitty } from "~/client/api";
import { useKitty } from "~/hooks/useKitty";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { MySelect } from "../forms/fields/select";

const kittySchema = z.object({
    name: z.string().min(1),
    size: z.string(),
    age: z.coerce.number(),
    vaccine: z.boolean(),
    levelActivity: z.string()
  });

export function KittyForm(){
    const { query } = useRouter();
  const kittyId = query.kittyId as string;
  const { saveMutation } = useKitty();

  const initialDataQuery = useQuery({
    queryKey: ["kitty", kittyId],
    enabled: !!kittyId,
    queryFn: () => {
      return getKitty(kittyId);
    },
  });

  const editForm = useForm({
    values: initialDataQuery.data,
    resolver: zodResolver(kittySchema),
    defaultValues: {
      name: "",
      size: "",
      age: "",
      vaccine: false,
      levelActivity: "",
    },
  });

  const onSave = editForm.handleSubmit(
    (data) => saveMutation.mutate({...data,id:kittyId}),
    (e) => {
      console.error(e);
    },
  );
    return <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
    <h1 className="text-3xl font-extrabold tracking-tight sm:text-[3rem]">
      Formulario
    </h1>
    {initialDataQuery.isError ? (
      <span className="text-red-500">Error al cargar datos</span>
    ) : (
      <></>
    )}
    {initialDataQuery.isLoading ? (
      <Skeleton className="h-[500px] min-w-96 rounded-xl" />
    ) : (
      <Card className="px-8 py-6 md:min-w-96">
        <h2 className="mb-4 w-full text-2xl font-bold tracking-tight sm:text-[2rem]">
          Michi
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input {...editForm.register("name")}></Input>
          </div>

          <MySelect label="Tamaño" name="size" items={["Enorme","Normal","Chiquito"]} editForm={editForm}/>
          <MySelect label="Nivel de Actividad" name="levelActivity" items={["Duerme todo el dia", "Se come las flores", "Parece que toma cafe"]} editForm={editForm}/>

          <div>
            <Label htmlFor="age">Edad</Label>
            <Input type="number" {...editForm.register("age")}></Input>
          </div>
          <div className="flex gap-2 py-2">
            <Controller
              name="vaccine"
              control={editForm.control}
              render={({ field }) => (
                <Checkbox
                  name="vaccine"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="vaccine">Vacunado</Label>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2 pt-4">
          <Button
            className="w-full"
            onClick={onSave}
            loading={saveMutation.isPending}
          >
            Guardar
          </Button>
          {saveMutation.isError ? (
            <span className="text-red-500">Error al Guardar</span>
          ) : (
            <></>
          )}
        </div>
      </Card>
    )}
  </div>
}