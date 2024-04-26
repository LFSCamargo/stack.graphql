import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";

type Props = {
  options: {
    name: string;
    href: string;
  }[];
};

export function BreadcrumbRoutes({ options }: Props) {
  return (
    <Breadcrumb className="text-2xl">
      <BreadcrumbList>
        {options.map((option, i) => (
          <BreadcrumbItem key={option.href}>
            <Link to={option.href}>{option.name}</Link>
            {options.length - 1 !== i && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
