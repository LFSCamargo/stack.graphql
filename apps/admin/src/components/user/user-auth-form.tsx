import * as React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "@ipe.stack/apollo/generated/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button, Icons, Label } from "../ui";
import { FormField } from "../form";
import { StorageUtility } from "@/utils";
import { useNavigate } from "@tanstack/react-router";

type FormData = {
  email: string;
  password: string;
};

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    ),
  });

  async function onSubmit(values: FormData) {
    const t = toast.loading("Autenticando...");
    try {
      const { data } = await signIn({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });

      if (data?.signIn?.token) {
        StorageUtility.setToken(data?.signIn?.token);
        navigate({
          to: "/dashboard",
        });
        toast.success("Autenticado com sucesso!", {
          id: t,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Invalid email or password.")) {
          return toast.error("Email ou senha inválidos", {
            id: t,
          });
        }
        toast.error(error.message, {
          id: t,
        });
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <FormField
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              error={errors.email}
              register={register}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Senha
            </Label>
            <FormField
              id="password"
              name="password"
              placeholder="*********************"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              error={errors.password}
              register={register}
              autoCorrect="off"
              disabled={isSubmitting}
            />
          </div>
          <Button disabled={isSubmitting || !isDirty}>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}
