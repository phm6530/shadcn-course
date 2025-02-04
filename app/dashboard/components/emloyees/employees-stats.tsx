import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheckIcon, ConstructionIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function EmployeesStats() {
  return (
    <>
      <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Employees</CardTitle>{" "}
          </CardHeader>
          <CardContent className="justify-between flex">
            <div className="flex gap-4 ">
              <UserIcon />
              <div className="text-4xl font-extrabold">1000</div>
            </div>
            <div>
              <Button asChild size={"xs"}>
                <Link href={"/employees"}>View all</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Employees</CardTitle>{" "}
          </CardHeader>
          <CardContent className="justify-between flex">
            <div className="flex gap-4 ">
              <UserIcon />
              <div className="text-4xl font-extrabold">80</div>
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-green-500 flex text-sm items-center gap-3">
              <BadgeCheckIcon />
              80% of employees are present
            </span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Employees</CardTitle>{" "}
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>TP</AvatarFallback>
            </Avatar>
            <span className="text-2xl">Colin Murray!</span>
          </CardContent>
          <CardFooter>
            <span className="flex text-xs items-center gap-2 text-muted-foreground">
              <ConstructionIcon className="text-pink-500" />
              80% of employees are present
            </span>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
