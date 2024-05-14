import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { SideMenu } from "./side-menu";
import { BreadcrumbRoutes } from "./breadcrumbs-routes";
import { Breakpoints } from "@/constants/breakpoints";
import { MobileMenuModal } from "@/components/modals";

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
  const isTabletOrMobile = useMediaQuery(Breakpoints.lg);
  return (
    <div className="flex h-screen w-full flex-row overflow-hidden lg:w-screen">
      {!isTabletOrMobile && <SideMenu />}
      <div
        className={cn(
          "flex h-full w-full flex-1 flex-col overflow-hidden p-4 px-4",
        )}
      >
        {isTabletOrMobile && (
          <MobileMenuModal
            title="Menu"
            subTitle="Navegue entre as páginas do painel"
          />
        )}
        <div className="mb-4 flex flex-col border-b pb-4">
          <h1 className="text-xl font-bold tracking-tight">{pageTitle}</h1>
          <BreadcrumbRoutes options={breadcrumbRoutes} />
        </div>
        <div className="overflow-y-auto overflow-x-hidden pr-2">{children}</div>
      </div>
    </div>
  );
}
