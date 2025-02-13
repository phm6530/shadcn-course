import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeesStats from "./components/emloyees/employees-stats";
import WorkLocationTrend from "./components/emloyees/work-location-trends";

const tabMenu = ["employees", "teams"] as const;

export default function Page() {
  return (
    <>
      <Tabs defaultValue={tabMenu[0]}>
        <TabsList className="mb-4">
          {tabMenu.map((e, idx) => (
            <TabsTrigger key={`menu-${idx}`} value={e}>
              {e}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Menu 1  */}
        <TabsContent value="employees">
          <EmployeesStats />
          <WorkLocationTrend />
        </TabsContent>

        {/* Menu 2 */}
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
