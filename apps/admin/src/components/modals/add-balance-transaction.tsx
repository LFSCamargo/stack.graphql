// Create a modal to confirm the deletion of a user using the shadcn dialog component
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui";
import { FormField } from "../form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useCardUserByIdQuery,
  useInjestTransactionsMutation,
} from "@ipe.stack/apollo/generated/react";
import { toast } from "sonner";

type Props = {
  cardUserId: string;
  visible?: boolean;
  onOpenChange?: (_: boolean) => void;
};

export function AddUserBalanceModal({
  visible,
  onOpenChange = () => {},
  cardUserId,
}: Props) {
  const { data } = useCardUserByIdQuery({
    variables: {
      cardUserByIdId: cardUserId,
    },
    fetchPolicy: "cache-first",
  });
  const [injestTransaction] = useInjestTransactionsMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<{
    balance: string;
  }>({
    defaultValues: {
      balance: "0",
    },
    resolver: zodResolver(
      z.object({
        balance: z
          .string()
          .refine((v) => v !== "", {
            message: "O campo de saldo é obrigatório",
          })
          .refine((v) => Number(v) >= 0, {
            message: "O saldo deve ser maior que 0",
          }),
      }),
    ),
  });

  const onSubmit = handleSubmit(async ({ balance }) => {
    const t = toast.loading("Adicionando saldo ao usuário...");
    try {
      const newBalance = Number(data?.cardUserById?.balance) + Number(balance);
      await injestTransaction({
        variables: {
          input: {
            cardUserId,
            transactions: [
              {
                amount: Number(balance),
                date: new Date().toISOString(),
                balanceUpdated: newBalance,
                description: "Adicionado saldo ao usuário",
              },
            ],
          },
        },
        refetchQueries: ["TransactionsByCardUserId", "CardUserById"],
      });
      toast.success("Saldo adicionado com sucesso", {
        id: t,
      });
    } catch (error) {
      toast.error("Erro ao adicionar saldo ao usuário", {
        id: t,
      });
    }
  });

  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button>Adicionar Saldo</Button>
      </DialogTrigger>
      <DialogHeader>
        <DialogClose onClick={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent>
        <DialogTitle>Adicionar Saldo</DialogTitle>
        <DialogDescription>
          Quanto de Saldo você deseja adicionar a este usuário?
        </DialogDescription>
        <FormField
          id="balance"
          name="balance"
          placeholder="0.00"
          type="number"
          error={errors.balance}
          register={register}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => onOpenChange(false)} variant="ghost">
            Cancelar
          </Button>
          <Button
            disabled={isSubmitting || !isDirty}
            variant="default"
            onClick={onSubmit}
          >
            Adicionar Saldo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
