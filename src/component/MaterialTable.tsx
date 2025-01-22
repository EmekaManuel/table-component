/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_RowData,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PrintIcon from "@mui/icons-material/Print";

type TData = {
  [key: string]: any;
};

type MaterialTableProps = {
  data: TData[];
  columns: any;
};

function MaterialTable({ data, columns }: MaterialTableProps) {
  // Print Function
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHeaders = columns.map((col: { header: string }) => col.header);
    const tableRows = data.map((row) => Object.values(row));

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 1rem;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            @media print {
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
              thead { display: table-header-group; }
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${tableHeaders
                  .map((header: any) => `<th>${header}</th>`)
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${tableRows
                .map(
                  (row) => `
                <tr>
                  ${row.map((cell) => `<td>${cell}</td>`).join("")}
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };
  // PDF Export Function
  const handleExportPDF = (rows: MRT_RowData[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c: { header: any }) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      // @ts-expect-error autotable
      body: tableData,
    });

    doc.save("table-export.pdf");
  };

  // Excel Export Function
  const handleExportExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      XLSX.writeFile(workbook, "table-data.xlsx");
    } catch (error) {
      console.error("Excel Export failed:", error);
    }
  };

  // Copy to Clipboard Function
  const handleCopyToClipboard = async () => {
    try {
      const headers = columns
        .map((col: { header: string }) => col.header)
        .join("\t");
      const rows = data.map((row) => Object.values(row).join("\t")).join("\n");
      const textToCopy = `${headers}\n${rows}`;

      await navigator.clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Copy to clipboard failed:", error);
    }
  };

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const table = useMaterialReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    initialState: {
      density: "compact",
      isFullScreen: false,
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
        <Button onClick={handlePrint} startIcon={<PrintIcon />}>
          Print
        </Button>

        <Button onClick={handleExportExcel} startIcon={<FileDownloadIcon />}>
          Excel
        </Button>
        <Button
          onClick={() => handleExportPDF(table.getPrePaginationRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          PDF
        </Button>
        <Tooltip title="Copy to clipboard">
          <IconButton onClick={handleCopyToClipboard}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
}

export default MaterialTable;
