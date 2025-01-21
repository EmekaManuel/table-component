// src/columns/personColumns.ts
import { MRT_ColumnDef } from "material-react-table";

type Person = {
  id: number;
  name: string;
  age: number;
  registeredOn: Date;
  score: number;
  isActive: boolean;
  notes: string;
};

export const personColumns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 150,
  },
  {
    accessorKey: "age",
    header: "Age",
    size: 100,
  },
  {
    accessorKey: "registeredOn",
    header: "Registered On",
    size: 200,
    Cell: ({ cell }) =>
      new Date(cell.getValue() as string).toLocaleDateString(), // Formatting date
  },
  {
    accessorKey: "score",
    header: "Score",
    size: 100,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    size: 100,
    Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"), // Formatting boolean as Yes/No
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 250,
  },
];
