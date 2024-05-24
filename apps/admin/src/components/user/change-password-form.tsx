import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@ipe.stack/apollo/generated/react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormField } from "../form";
import { Icons, Label, Button } from "../ui";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface ChangePasswordFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ChangePasswordForm({
  className,
  ...props
}: ChangePasswordFormProps) {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(
      z
        .object({
          currentPassword: z.string().min(6),
          newPassword: z.string().min(6),
          confirmPassword: z.string().min(6),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: "As senhas não coincidem",
          path: ["confirmPassword"],
        }),
    ),
  });

  async function onSubmit(values: FormData) {
    const t = toast.loading("Alterando senha...");
    try {
      const { data } = await changePassword({
        variables: {
          input: {
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
      });

      if (data?.changePassword) {
        navigate({
          to: "/dashboard",
        });
        toast.success("Senha alterada com sucesso!", {
          id: t,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Invalid old password.")) {
          return toast.error("Senha atual inválida", {
            id: t,
          });
        }
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label className="sr-only" htmlFor="currentPassword">
            Senha Atual
          </Label>
          <FormField
            id="currentPassword"
            type="password"
            name="currentPassword"
            placeholder="Senha Atual"
            error={errors.currentPassword}
            register={register}
          />
        </div>
        <div className="grid gap-2">
          <Label className="sr-only" htmlFor="currentPassword">
            Nova Senha
          </Label>
          <FormField
            id="newPassword"
            type="password"
            name="newPassword"
            placeholder="Nova Senha"
            error={errors.newPassword}
            register={register}
          />
        </div>
        <div className="grid gap-2">
          <Label className="sr-only" htmlFor="currentPassword">
            Confirmar Nova Senha
          </Label>
          <FormField
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Nova Senha"
            error={errors.confirmPassword}
            register={register}
          />
        </div>

        <Button className="mt-4" disabled={isSubmitting || !isDirty}>
          {isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Trocar Senha
        </Button>
      </form>
    </div>
  );
}
