import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("이메일 형식이 아닙니다."),
  accountType: z.enum(["personal", "company"]),
  companyName: z.string().optional(),
  employeeCount: z.number().optional(),
});

export default function Page() {
  const formMethod = useForm<z.infer<typeof formSchema>>({});
  return <Card></Card>;
}
