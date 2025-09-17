"use client";
import { Button } from "@/src/components/ui/button";
import { Dialog } from "@/src/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import UpsertPatientForm from "./upsert-patient-form";
import { patientsTable } from "@/src/db/schema";
import { useState } from "react";

interface PatientTableActionsProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientTableActions = ({ patient }: PatientTableActionsProps) => {
  const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
    useState(false);
  return (
    <Dialog
      open={isUpsertPatientDialogOpen}
      onOpenChange={setIsUpsertPatientDialogOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsUpsertPatientDialogOpen(true)}>
            <EditIcon />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpsertPatientForm
        patient={patient}
        isOpen={isUpsertPatientDialogOpen}
        onSuccess={() => setIsUpsertPatientDialogOpen(false)}
      />
    </Dialog>
  );
};

export default PatientTableActions;
