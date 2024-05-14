/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";

export function exportToXlsx<T extends Record<string, unknown>>(
  data: T[],
  fileName: string,
  sheetName = "Sheet1",
): void {
  // Convert the array of objects to a worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  // Create a workbook with the worksheet
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // Save the workbook as an XLSX file
  XLSX.writeFile(wb, fileName + ".xlsx");
}

export const readXlsx = async <T>(file: File): Promise<T[]> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      // replace spaces from keys with underscores
      const formattedJson = json.map((item: any) => {
        return Object.keys(item).reduce((acc, key) => {
          const formattedKey = key.replace(/\s/g, "_");
          return { ...acc, [formattedKey]: String(item[key]) };
        }, {});
      });
      resolve(formattedJson as T[]);
    };

    reader.onerror = (e) => {
      reject(e);
    };

    reader.readAsBinaryString(file);
  });
};
