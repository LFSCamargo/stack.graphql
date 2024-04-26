import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { LogOut } from "lucide-react";
import { useMeQuery } from "@ipe.stack/apollo/generated/react";
import { StorageUtility } from "@/utils";
import { useNavigate } from "@tanstack/react-router";
import { Dialog } from "@radix-ui/react-dialog";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export function UserSwitcher({ className }: TeamSwitcherProps) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const { data } = useMeQuery();

  function logout() {
    StorageUtility.removeToken();
    navigate({
      to: "/",
    });
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/axasdklasjdlasj.png`}
                alt="avatar"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span className="tracking-tight">{data?.me?.name}</span>

            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[270px] bg-muted p-0">
          <div className="flex flex-col gap-2">
            <button
              onClick={logout}
              className="flex items-center gap-3 rounded-sm px-4 py-3 text-sm text-primary transition-all hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              Sair da conta
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
