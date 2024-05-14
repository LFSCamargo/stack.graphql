import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCardUserMutation } from "@ipe.stack/apollo/generated/react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button, Icons, Label } from "../ui";
import { FormField } from "../form";

type AddClientForm = {
  cardNumber: string;
  password: string;
  name: string;
};

interface AddClientFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AddClientForm(props: AddClientFormProps) {
  const navigate = useNavigate();
  const [addClient] = useCreateCardUserMutation();
  const {
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
    register,
  } = useForm<AddClientForm>({
    resolver: zodResolver(
      z.object({
        cardNumber: z.string().min(16),
        password: z.string().min(6),
        name: z.string().min(3),
      }),
    ),
  });

  async function onSubmit(values: AddClientForm) {
    const t = toast.loading("Adicionando cliente...");
    try {
      await addClient({
        variables: {
          input: {
            cardNumber: values.cardNumber,
            password: values.password,
            name: values.name,
          },
        },
        refetchQueries: ["CardUsers"],
      });
      toast.success("Cliente adicionado com sucesso!", {
        id: t,
      });
      navigate({
        to: "/dashboard/manage-clients",
      });
    } catch (error) {
      toast.error("Erro ao adicionar cliente", {
        id: t,
      });
    }
  }

  return (
    <div {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2 p-1">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Nome
            </Label>
            <FormField
              id="name"
              name="name"
              placeholder="Nome ex: John Doe"
              type="name"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              error={errors.name}
              register={register}
            />
          </div>
          <div className="mt-2 grid gap-2">
            <Label className="sr-only" htmlFor="cardNumber">
              Número do Cartão
            </Label>
            <FormField
              id="cardNumber"
              name="cardNumber"
              placeholder="Número do Cartão ex: 1234567890123456"
              type="cardNumber"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              error={errors.name}
              register={register}
            />
          </div>
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Senha
            </Label>
            <FormField
              id="password"
              name="password"
              placeholder="Senha ex: 123456"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              error={errors.password}
              register={register}
              autoCorrect="off"
              disabled={isSubmitting}
            />
          </div>
          <div className="mt-2">
            <Button disabled={isSubmitting || !isDirty}>
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Adicionar Cliente
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
