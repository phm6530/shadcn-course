import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeesList from "./employees-list";
import { Suspense } from "react";
import SkeletonTable from "@/components/loading/skeleton-table";

export default function EmployeesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
      </CardHeader>
      <Suspense
        fallback={
          <>
            <SkeletonTable />
            <SkeletonTable />
            <SkeletonTable />
          </>
        }
      >
        {/* List */}
        <EmployeesList />
      </Suspense>
    </Card>
  );
}
