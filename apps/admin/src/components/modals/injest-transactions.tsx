import { PlusIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
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
import { useState } from "react";
import { readXlsx } from "@/utils/xlsx";
import { toast } from "sonner";
import { useInjestTransactionsMutation } from "@ipe.stack/apollo/generated/react";
import { z } from "zod";

import dayjs from "dayjs";
import { FormatUtility } from "@/utils/formatting";

const transactionSchema = z.array(
  z.object({
    Data: z.string(),
    Valor: z.string(),
    Descrição: z.string(),
    Saldo: z.optional(z.string()),
  }),
);

type Props = {
  cardUserId: string;
  visible?: boolean;
  onOpenChange?: (_: boolean) => void;
};

export function InjestTransactionModal({
  cardUserId,
  onOpenChange,
  visible,
}: Props) {
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [mutate] = useInjestTransactionsMutation();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    onDrop: async (acceptedFiles) => {
      if (isReadingFile) return;
      const t = toast.loading("Lendo arquivo...");
      try {
        setIsReadingFile(true);
        const file = acceptedFiles[0];
        const json = await readXlsx(file);

        const transactions = transactionSchema
          .parse(json)
          .filter((value) => value["Descrição"] !== "Saldo Final");

        console.log(transactions);

        await mutate({
          variables: {
            input: {
              cardUserId,
              transactions: transactions.map((transaction) => {
                return {
                  amount: parseFloat(transaction.Valor),
                  date: dayjs(
                    FormatUtility.formatDateBrazilToSystem(transaction.Data),
                  ).toISOString(),
                  description: transaction["Descrição"],
                  balanceUpdated: parseFloat(transaction.Saldo as string),
                };
              }),
            },
          },
          refetchQueries: ["TransactionsByCardUserId", "CardUserById"],
        });

        toast.success("Transações adicionadas com sucesso", {
          id: t,
        });
        if (onOpenChange) {
          onOpenChange(false);
        }
      } catch (error) {
        toast.error("Erro ao ler arquivo", {
          id: t,
        });
      } finally {
        setIsReadingFile(false);
      }
    },
  });

  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogTrigger className="w-full">
        <Button className="mt-2 w-full gap-2">
          <PlusIcon className="w-4" /> Adicionar Transações
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen w-screen flex-col items-center justify-center lg:h-auto lg:w-auto">
        <DialogHeader className="w-full">
          <DialogTitle className="text-left">Adicionar Transações</DialogTitle>
          <DialogDescription className="text-left">
            Arraste e solte um arquivo XLSX para adicionar transações
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <div
          {...getRootProps()}
          className=" flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-white/10 lg:mx-0 lg:h-32"
        >
          <input {...getInputProps()} />
          <span className="max-w-52 text-center text-gray-400">
            Arraste e solte um arquivo XLSX aqui, ou clique para selecionar
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
