import { cn } from "@/lib/utils";
import { SideMenu } from "./side-menu";
import { BreadcrumbRoutes } from "./breadcrumbs-routes";

type Props = {
  children?: React.ReactNode;
  className?: string;
  breadcrumbRoutes: { name: string; href: string }[];
  pageTitle: string;
};

export function DashboardLayout({
  children,
  breadcrumbRoutes,
  pageTitle,
}: Props) {
  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden">
      <SideMenu />
      <div
        className={cn(
          "flex h-full w-full flex-1 flex-col overflow-hidden p-4 px-4",
        )}
      >
        <div className="mb-4 flex flex-col border-b pb-4">
          <h1 className="text-xl font-bold tracking-tight">{pageTitle}</h1>
          <BreadcrumbRoutes options={breadcrumbRoutes} />
        </div>
        {children}
      </div>
    </div>
  );
}
