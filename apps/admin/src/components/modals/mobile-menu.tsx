import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  UserSwitcher,
  Separator,
} from "../ui";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { SidebarLink } from "../dashboard/side-menu";
import { Home, Lock, LogOut, Users } from "lucide-react";
import { StorageUtility } from "@/utils";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  visible?: boolean;
  onOpenChange?: (_: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
};

export function MobileMenuModal({
  onOpenChange,
  visible,
  children,
  title = "",
  subTitle = "",
}: Props) {
  const navigate = useNavigate();

  function logout() {
    StorageUtility.removeToken();
    navigate({
      to: "/",
    });
  }

  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogTrigger className="flex w-full flex-row items-center gap-4 pb-6 pt-2">
        <Bars3Icon className="h-6 w-6" />
        <img src="/logo-name.svg" className="h-6" />
        {children}
      </DialogTrigger>
      <DialogContent className="flex h-screen w-screen max-w-[auto] flex-col items-center justify-center lg:h-auto">
        <DialogHeader className="w-full">
          <DialogTitle className="text-left">{title}</DialogTitle>
          <DialogDescription className="text-left">
            {subTitle}
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <div className="flex h-full w-full flex-col gap-2">
          <SidebarLink to="/dashboard" className="border border-white/10">
            <Home className="h-4 w-4" />
            Dashboard
          </SidebarLink>
          <SidebarLink
            to="/dashboard/manage-clients"
            className="border border-white/10"
          >
            <Users className="h-4 w-4" />
            Gerenciar Clientes
          </SidebarLink>
        </div>
        <div className="flex w-full flex-col space-y-2">
          <Separator className="my-3.5" />
          <SidebarLink onClick={logout} className="border border-white/10">
            <LogOut className="h-3.5 w-3.5" />
            Sair
          </SidebarLink>
          <SidebarLink
            to="/user/change-password"
            className="border border-white/10"
          >
            <Lock className="h-3.5 w-3.5" />
            Change password
          </SidebarLink>
          <UserSwitcher className="w-full !bg-transparent" />
        </div>
        {/* <UserSwitcher className="bottom-30 relative w-full !bg-transparent" /> */}
      </DialogContent>
    </Dialog>
  );
}
