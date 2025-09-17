import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/src/components/page-container";
import { db } from "@/src/db";
import { patientsTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";

import AddPatientButton from "./_components/add-patient-button";
import PatientCard from "./_components/patient-card";
import { patientTableColumns } from "./_components/table-columns";
import { DataTable } from "@/src/components/data-table";

const PatientsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinic.id),
  });
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPatientButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataTable columns={patientTableColumns} data={patients} />
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
