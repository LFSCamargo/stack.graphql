import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  to?: string;
  className?: string;
};

export function DashboardCard({
  title,
  description,
  icon,
  className,
  to,
}: Props) {
  const navigate = useNavigate();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!to) return;
    navigate({
      to,
    });
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex h-44 w-44 cursor-pointer flex-col justify-between rounded-2xl border border-white/10 p-4",
        className,
      )}
    >
      {icon}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
