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
  Icons,
} from "../ui";

type Props = {
  visible?: boolean;
  onOpenChange?: (_: boolean) => void;
  confirmDeletion: (e: React.SyntheticEvent) => void;
  isConfirming: boolean;
};

export function ConfirmDeleteUserModal({
  visible,
  onOpenChange = () => {},
  confirmDeletion,
  isConfirming,
}: Props) {
  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button>Remover Cliente</Button>
      </DialogTrigger>
      <DialogHeader>
        <DialogClose onClick={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir este usuário?
        </DialogDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button
            onClick={confirmDeletion}
            variant="default"
            className="!bg-red-500 text-white"
            disabled={isConfirming}
          >
            {isConfirming && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sim tenho certeza
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
