"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  teamName: string;
  isTeamLeader: boolean;
  avatar?: string;
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "avatar",
    header: "Status",
    cell: ({ row }) => {
      const avatars = row.getValue("avatar");

      return (
        <Avatar>
          {!!avatars ? (
            <AvatarFallback>OK</AvatarFallback>
          ) : (
            <AvatarFallback>FALSE</AvatarFallback>
          )}
        </Avatar>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "firstName",
  },
  {
    accessorKey: "lastName",
    header: "lastName",
  },
  {
    accessorKey: "teamName",
    header: "teamName",
  },
  {
    accessorKey: "isTeamLeader",
    header: "isTeamLeader",
  },
];
