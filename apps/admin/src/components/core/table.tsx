import { cn } from "@/lib/utils";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";

type TableProps<Data> = React.ComponentProps<typeof TableComponent> & {
  data: Data[];
  onRowClick?: (row: Data) => void;
  hiddenColumns?: string[];
  footer?: React.ReactNode;
  columns?: string[];
};

export function Table<T extends Record<string, React.ReactNode>>({
  data,
  columns,
  footer,
  className,
  hiddenColumns,
  onRowClick = () => {},
  ...props
}: TableProps<T>) {
  const rowsWithHiddenFields = data.map((row) => {
    const keys = Object.keys(row).filter(
      (key) => !hiddenColumns?.includes(key),
    );

    return keys.reduce(
      (acc, key) => {
        acc[key] = row[key];
        return acc;
      },
      {} as Record<string, React.ReactNode>,
    ) as T;
  });

  return (
    <TableComponent className={cn("overflow-y-auto", className)} {...props}>
      <TableHeader>
        <TableRow className="divide-x">
          {!columns &&
            Object.keys(data[0]).map((key) => (
              <TableHead key={key} className="min-w-52">
                {key}
              </TableHead>
            ))}
          {columns &&
            columns.map((column) => (
              <TableHead key={column} className="min-w-52">
                {column}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowsWithHiddenFields.map((row, index) => (
          <TableRow
            className="cursor-pointer divide-x"
            onClick={() => onRowClick(data[index])}
            key={index}
          >
            {Object.values(row).map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {footer && <TableFooter>{footer}</TableFooter>}
    </TableComponent>
  );
}
