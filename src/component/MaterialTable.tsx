/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_Row,
  MRT_RowData,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type MaterialTableProps<TData> = {
  data: TData[];
  columns: any;
};

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const isMobileDevice = () => window.innerWidth <= 768;

function MaterialTable<TData extends MRT_RowData>({
  data,
  columns,
}: MaterialTableProps<TData>) {
  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c: { header: any }) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      // @ts-expect-error autotable
      body: tableData,
    });

    doc.save("mrt-pdf-example.pdf");
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const table = useMaterialReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          CSV
        </Button>

        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          pDF
        </Button>
      </Box>
    ),
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableFullScreenToggle: !isMobileDevice(),
    initialState: {
      density: "compact",
    },
  });

  return <MaterialReactTable table={table} />;
}

export default MaterialTable;
