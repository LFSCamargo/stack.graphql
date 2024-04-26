import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { UserAuthForm } from "@/components/user";
import { buttonVariants } from "@/components/ui";

function Index() {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <img
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-neutral-800" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="logo-name.svg" className="h-8" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Uma plataforma digital capaz de oferecer uma boa
                experiência ao utilizador, para que este possa selecionar os
                benefícios que melhor atendem às suas necessidades individuais,
                sejam estas em relação à saúde ou ao seu bem-estar. &rdquo;
              </p>
              <footer className="text-sm">Jhonny Cunha - Ipê Bank</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Faça o login na sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Preencha os campos abaixo para acessar sua conta.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Não consegue acessar sua conta? fale com o administrador.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const Route = createLazyFileRoute("/")({
  component: Index,
});
