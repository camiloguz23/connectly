import { toast } from "sonner";

export const useCopy = () => {
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copiado");
    });
  };
  return { copy };
};
