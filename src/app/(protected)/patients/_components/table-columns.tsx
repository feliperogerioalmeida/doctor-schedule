"use client";

import { patientsTable } from "@/src/db/schema";
import { ColumnDef } from "@tanstack/react-table";

import PatientsTableActions from "./table-actions";

type Patient = typeof patientsTable.$inferSelect;

export const patientTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: ({ row }) => {
      const patient = row.original;
      const phoneNumber = patient.phoneNumber;
      if (!phoneNumber) return "";
      const formatted = phoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3",
      );
      return formatted;
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: ({ row }) => {
      const patient = row.original;
      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const patient = row.original;
      return <PatientsTableActions patient={patient} />;
    },
  },
];
