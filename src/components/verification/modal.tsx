import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useVerificationCode } from "./store";

export function CodeModal() {
  const { visible, onCancel, onSubmit } = useVerificationCode();

  const submitMutation = useMutation<void, Error, string>({
    mutationFn: onSubmit,
    onError: (e) => console.log(e),
  });

  const form = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(
      z.object({
        code: z.string().length(6, "Debe ser 6 números"),
      }),
    ),
  });

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Código de verificación</DialogTitle>
          <DialogDescription>
            Esta acción requiere un paso extra de autenticación. Revisa tu
            telefono para obtener el código correspondiente
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="code">Código</Label>
        <Input
          {...form.register("code")}
          className={
            form.formState.errors.code
              ? "focus-visible:ring-2 focus-visible:ring-red-500"
              : ""
          }
        ></Input>

        <div className="flex w-full flex-col items-center gap-2 pt-4">
          <Button
            onClick={form.handleSubmit(({ code }) =>
              submitMutation.mutate(code),
            )}
            loading={submitMutation.isPending}
            className="w-full"
          >
            Verificar
          </Button>

          {submitMutation.isError ? (
            <span className="text-red-500">{submitMutation.error.message}</span>
          ) : (
            <></>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
