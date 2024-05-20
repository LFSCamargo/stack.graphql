<script lang="ts" setup>
import * as zod from "zod";
import { toast } from "vue-sonner";
import { useCreateChangeCardPasswordRequestMutation } from "@ipe.stack/apollo";
import { toTypedSchema } from "@vee-validate/zod";
import { BackButton, Button } from "../../components";
import { useRequireAuth } from "../../guards";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";

const { mutate: changePassword, loading } =
  useCreateChangeCardPasswordRequestMutation();

const router = useRouter();

const validationSchema = toTypedSchema(
  zod
    .object({
      password: zod.string().refine(
        (data) => {
          return !isNaN(Number(data));
        },
        {
          message: "A senha atual deve ser um número",
        },
      ),
      newPassword: zod.string().refine(
        (data) => {
          return !isNaN(Number(data));
        },
        {
          message: "A senha atual deve ser um número",
        },
      ),
      confirmNewPassword: zod.string().refine(
        (data) => {
          return !isNaN(Number(data));
        },
        {
          message: "A senha atual deve ser um número",
        },
      ),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "As senhas não coincidem",
      path: ["confirmNewPassword"],
    }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: password } = useField("password", validationSchema);
const { value: newPassword } = useField("newPassword", validationSchema);
const { value: confirmNewPassword } = useField(
  "confirmNewPassword",
  validationSchema,
);

const onSubmit = handleSubmit(async (values) => {
  const t = toast.loading("Fazendo Solicitação...");
  try {
    await changePassword({
      input: {
        oldCardPassword: values.newPassword.toString(),
        newCardPassword: values.password.toString(),
      },
    });
    toast.success("Solicitação Realizada com Sucesso", {
      id: t,
    });
    router.go(-1);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message, {
        id: t,
      });
    }
  }
});

useRequireAuth();
</script>

<template>
  <div
    class="w-screen bg-dot-white/20 h-screen flex items-center justify-center"
  >
    <div
      className="absolute pointer-events-none inset-0 hidden md:flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    ></div>
    <form
      @submit="onSubmit"
      class="flex flex-col p-5 md:max-w-lg animate-fade w-full gap-3"
    >
      <BackButton />
      <div class="flex flex-col p-2 gap-2">
        <img src="/logo-name.svg" class="h-10 w-32" />
        <h1 class="text-2xl">Solicitar Troca de Senha do Cartão</h1>
        <span class="opacity-40 max-w-xs">
          Preencha os campos abaixo para alterar a senha do seu cartão no-name
        </span>
      </div>
      <input
        id="password"
        v-model="password"
        placeholder="Senha Atual"
        type="password"
        autocomplete="off"
      />
      <div v-if="errors.password">
        <p class="text-red-500 text-sm font-medium">{{ errors.password }}</p>
      </div>
      <input
        id="newPassword"
        v-model="newPassword"
        placeholder="Nova Senha"
        type="password"
        autocomplete="off"
      />
      <div v-if="errors.newPassword">
        <p class="text-red-500 text-sm font-medium">{{ errors.newPassword }}</p>
      </div>
      <input
        id="newPassword"
        v-model="confirmNewPassword"
        placeholder="Confirmar Nova Senha"
        type="password"
        autocomplete="off"
      />
      <div v-if="errors.confirmNewPassword">
        <p class="text-red-500 text-sm font-medium">
          {{ errors.confirmNewPassword }}
        </p>
      </div>

      <div class="flex flex-row gap-1 mt-2">
        <Button :disabled="loading" variant="primary"> Alterar Senha </Button>
      </div>
    </form>
  </div>
</template>
