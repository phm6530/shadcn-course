"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop2Icon } from "lucide-react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DUMMY_DATA } from "./DUMMY_DATA";

export default function WorkLocationTrend() {
  return (
    <>
      <Card className="mt-4 pl-0">
        <CardHeader>
          <CardTitle className="text-base flex gap-2">
            <Laptop2Icon />
            <span>Emloyeee work location trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width={"100%"} height={350}>
            {/* 데이터 */}
            {/* barChars는 알아서 이터러블 하나봄 */}
            <BarChart
              data={DUMMY_DATA}
              className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-900"
            >
              {/* 가로 */}
              <XAxis dataKey={"name"} stroke="#888888" fontSize={12} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "office") return [value, "Work from Office"];
                  else if (name === "wfh") return [value, "Work from home"];
                }}
                labelClassName="font-bold"
                wrapperClassName="dark:!bg-black rounded-md dark:!border-border text-sm"
              />

              {/* 세로 값 */}
              <YAxis stroke="#888888" fontSize={12} />
              <Legend
                iconType="circle"
                formatter={(value) => {
                  if (value === "wfh") {
                    return <div className="text-xs">Work from home</div>;
                  } else if (value === "office") {
                    return <div className="text-xs">Work from Office</div>;
                  }
                }}
              />
              <Bar dataKey={"office"} stackId={1} fill="#ec4899" />
              <Bar
                dataKey={"wfh"}
                stackId={1}
                fill="#6b7280"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
