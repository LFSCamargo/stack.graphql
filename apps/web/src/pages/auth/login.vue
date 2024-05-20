<script lang="ts" setup>
import * as zod from "zod";
import { toast } from "vue-sonner";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "../../components";
import { StorageUtility } from "../../utils";
import { useCardUserSignInMutation } from "@ipe.stack/apollo";
import { useRouter } from "vue-router";

const router = useRouter();

const { mutate } = useCardUserSignInMutation();

const validationSchema = toTypedSchema(
  zod.object({
    cardNumber: zod.number(),
    password: zod.string().nonempty(),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: cardNumber } = useField("cardNumber", validationSchema);
const { value: password } = useField("password", validationSchema);

const onSubmit = handleSubmit(async (values) => {
  const t = toast.loading("Fazendo Login...");
  try {
    const result = await mutate({
      input: {
        cardNumber: values.cardNumber.toString(),
        password: values.password,
      },
    });

    if (result?.errors) {
      throw new Error(result.errors[0].message);
    }

    if (result?.data?.signInCardUser?.token) {
      StorageUtility.setToken(result.data.signInCardUser.token);
      toast.success("Login Realizado com Sucesso", {
        id: t,
      });
      return router.push("/account");
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message, {
        id: t,
      });
    }
  } finally {
    console.log("finally");
  }
});
</script>

<template>
  <div
    class="w-screen bg-dot-white/20 h-screen flex items-center justify-center"
  >
    <div
      className="absolute pointer-events-none inset-0 hidden md:flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    ></div>
    <form @submit="onSubmit" class="flex flex-col p-5 md:max-w-lg w-full gap-3">
      <div class="flex flex-col p-2 gap-2">
        <img src="/logo-name.svg" class="h-10 w-32" />
        <h1 class="text-2xl">Acessar Conta Cartão</h1>
        <span class="opacity-40">
          Acesse sua conta, preenchendo o número do cartão e a senha
        </span>
      </div>
      <input
        id="cardNumber"
        v-model="cardNumber"
        placeholder="Numero do Cartão"
        type="number"
        autocomplete="off"
      />
      <div v-if="errors.cardNumber">
        <p class="text-red-500 text-sm font-medium">{{ errors.cardNumber }}</p>
      </div>
      <input
        id="password"
        v-model="password"
        placeholder="Senha"
        type="password"
        autocomplete="off"
      />
      <div v-if="errors.password">
        <p class="text-red-500 text-sm font-medium">{{ errors.password }}</p>
      </div>

      <div class="flex flex-row gap-1 mt-2">
        <Button variant="primary"> Acessar Conta </Button>
      </div>
    </form>
  </div>
</template>
