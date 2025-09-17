"use client";

import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import UpsertPatientForm from "./upsert-patient-form";
import { Button } from "@/src/components/ui/button";

const AddPatientButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar paciente
        </Button>
      </DialogTrigger>
      <UpsertPatientForm onSuccess={() => setIsOpen(false)} isOpen={isOpen} />
    </Dialog>
  );
};

export default AddPatientButton;
