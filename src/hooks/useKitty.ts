import { useVerificationCode } from "~/components/verification/store";
import { useToast } from "./use-toast";
import { useMutation } from "@tanstack/react-query";
import { Kitty, saveKitty } from "~/client/api";

// Hook for handling CRUD operations on kitty
export function useKitty(){
    const { toast } = useToast();
    const { requestCode } = useVerificationCode();

    const saveMutation = useMutation({
      mutationFn: async (data: Kitty) => {
        await requestCode((code) => saveKitty(data.id, data, code));
      },
      onSuccess: () =>
        toast({
          title: "Exito!",
          description: "Gatito guardado exitosamente",
        }),
    });

    return {saveMutation}
}