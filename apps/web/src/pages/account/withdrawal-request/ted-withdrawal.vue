<script lang="ts" setup>
import * as zod from "zod";
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import { BackButton, Button } from "../../../components";

import { useCreateTedRequestMutation } from "@ipe.stack/apollo/generated";
import { useField, useForm } from "vee-validate";

const { mutate: createTedRequest, loading } = useCreateTedRequestMutation();

const validationSchema = toTypedSchema(
  zod.object({
    accountDigit: zod.number(),
    agency: zod.number(),
    ammount: zod.number().positive("O valor deve ser positivo"),
    bankCode: zod.number(),
    cpf: zod
      .string()
      .length(11, "O CPF deve ter 11 dígitos")
      .nonempty("O CPF é obrigatório"),
    name: zod.string().nonempty("O nome é obrigatório"),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: accountDigit } = useField("accountDigit", validationSchema);
const { value: agency } = useField("agency", validationSchema);
const { value: ammount } = useField("ammount", validationSchema);
const { value: bankCode } = useField("bankCode", validationSchema);
const { value: cpf } = useField("cpf", validationSchema);
const { value: name } = useField("name", validationSchema);

const onSubmit = handleSubmit(async (values) => {
  if (loading.value) return;
  const t = toast.loading("Fazendo Solicitação...");
  try {
    await createTedRequest({
      input: {
        accountDigit: values.accountDigit.toString(),
        agency: values.agency.toString(),
        ammount: values.ammount,
        bankCode: values.bankCode.toString(),
        cpf: values.cpf,
        name: values.name,
      },
    });

    toast.success("Solicitação Realizada com Sucesso", {
      id: t,
    });
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message, {
        id: t,
      });
    }
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
    <form
      @submit="onSubmit"
      class="flex flex-col p-5 md:max-w-lg animate-fade w-full gap-3"
    >
      <BackButton />
      <div class="flex flex-col p-2 gap-2">
        <img src="/logo-name.svg" class="h-10 w-32" />
        <h1 class="text-2xl">Solicitar TED</h1>
        <span class="opacity-40 max-w-xs">
          Para efetuar uma transferência informe-nos alguns dados abaixo
        </span>
      </div>

      <input
        id="name"
        name="name"
        v-model="name"
        placeholder="Nome do Beneficiário"
        type="text"
        autocomplete="off"
      />
      <div v-if="errors.name">
        <p class="text-red-500 text-sm font-medium">
          {{ errors.name }}
        </p>
      </div>

      <input
        id="cpf"
        name="cpf"
        v-model="cpf"
        placeholder="CPF do Beneficiário"
        type="tel"
        autocomplete="off"
      />
      <div v-if="errors.cpf">
        <p class="text-red-500 text-sm font-medium">
          {{ errors.cpf }}
        </p>
      </div>

      <input
        id="ammount"
        name="ammount"
        v-model="ammount"
        placeholder="Valor da Transferência"
        type="number"
        autocomplete="off"
      />
      <div v-if="errors.ammount">
        <p class="text-red-500 text-sm font-medium">
          {{ errors.ammount }}
        </p>
      </div>

      <input
        id="accountDigit"
        name="accountDigit"
        v-model="accountDigit"
        placeholder="Número da Conta com Dígito"
        type="number"
        autocomplete="off"
      />
      <div v-if="errors.accountDigit">
        <p class="text-red-500 text-sm font-medium">
          {{ errors.accountDigit }}
        </p>
      </div>

      <input
        id="agency"
        name="agency"
        v-model="agency"
        placeholder="Número da Agência"
        type="number"
        autocomplete="off"
      />
      <div v-if="errors.agency">
        <p class="text-red-500 text-sm font-medium">
          {{ errors.agency }}
        </p>
      </div>

      <input
        id="bankCode"
        name="bankCode"
        v-model="bankCode"
        placeholder="Código do Banco"
        type="number"
        autocomplete="off"
      />
      <div v-if="errors.agency">
        <p class="text-red-500 text-sm font-medium">
          {{ errors.agency }}
        </p>
      </div>

      <div class="flex flex-row gap-1 mt-2">
        <Button :disabled="loading" variant="primary">
          Enviar Solicitação
        </Button>
      </div>
    </form>
  </div>
</template>
