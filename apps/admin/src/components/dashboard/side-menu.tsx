import { Separator } from "@/components/ui";
import { UserSwitcher } from "../ui";
import {
  Home,
  Package,
  Shield,
  Users,
  Lock,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { StorageUtility } from "@/utils";

type Props = {
  to?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export function SidebarLink({ to, children, onClick }: Props) {
  if (!to && onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 pr-4 text-sm text-muted-foreground transition-all hover:bg-white/5 hover:text-primary  hover:ring hover:ring-white/10",
        )}
      >
        <div className="flex flex-row items-center gap-3">{children}</div>
        <ChevronRight className="h-3 w-3" />
      </button>
    );
  }
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2 pr-4 text-sm text-muted-foreground transition-all hover:bg-white/5 hover:text-primary  hover:ring hover:ring-white/10",
        window.location.pathname === to &&
          "bg-white/10 !text-white hover:bg-white/10",
      )}
    >
      <div className="flex flex-row items-center gap-3">{children}</div>
      <ChevronRight className="h-3 w-3" />
    </Link>
  );
}

export function SideMenu() {
  const navigate = useNavigate();

  function logout() {
    StorageUtility.removeToken();
    navigate({
      to: "/",
    });
  }

  return (
    <div className="flex h-full max-w-[290px] flex-1 flex-col border-r border-white/5 px-2 py-4">
      <div className="p-6 py-2">
        <img src="/logo-name.svg" />
      </div>
      <Separator className="my-3.5" />
      <div className="flex flex-1 flex-col">
        <nav className="grid items-start gap-y-3 px-2 text-sm font-medium tracking-tight lg:px-2">
          <SidebarLink to="/dashboard">
            <Home className="h-4 w-4" />
            Dashboard
          </SidebarLink>
          <SidebarLink to="/dashboard/requests">
            <Package className="h-4 w-4" />
            Solicitações
          </SidebarLink>
          <SidebarLink to="/dashboard/manage-clients">
            <Users className="h-4 w-4" />
            Gerenciar Clientes
          </SidebarLink>
          <SidebarLink to="/dashboard/manage-users">
            <Shield className="h-4 w-4" />
            Gerenciar Administradores
          </SidebarLink>
        </nav>
      </div>
      <div className="space-y-2">
        <Separator className="my-3.5" />
        <SidebarLink onClick={logout}>
          <LogOut className="h-3.5 w-3.5" />
          Sair
        </SidebarLink>
        <SidebarLink to="/user/change-password">
          <Lock className="h-3.5 w-3.5" />
          Change password
        </SidebarLink>
        <UserSwitcher className="w-full !bg-transparent" />
      </div>
    </div>
  );
}
