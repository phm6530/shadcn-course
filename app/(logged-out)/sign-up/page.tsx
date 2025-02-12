"use client";
import FormFieldWrapper from "@/components/form/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar1Icon, PersonStandingIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AccountTypes = ["personal", "company"] as const;

export const formSchema = z
  .object({
    email: z.string().email("이메일 형식이 아닙니다."),
    accountType: z
      .string()
      .min(1, "필수 입력 사항입니다.")
      .refine(
        (val) => AccountTypes.includes(val as (typeof AccountTypes)[number]),
        {
          message: "잘못된 값이 입력되었습니다.",
        }
      ),
    companyName: z.string().optional(),
    employeeCount: z.number().optional(),
    dayofbirth: z.date({ required_error: "생년월일을 입력해주세요." }),
  })
  .superRefine((data, ctx) => {
    if (data.accountType === "company" && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "회사 이름을 입력해주세요.",
        path: ["companyName"],
      });
    }

    if (
      data.accountType === "company" &&
      (!data.employeeCount || data.employeeCount <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "직원 수를 입력해주세요.",
        path: ["employeeCount"],
      });
    }
  });

export default function Page() {
  const formMethod = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      accountType: "",
      companyName: "",
      employeeCount: 0,
      dayofbirth: undefined,
    },

    resolver: zodResolver(formSchema),
  });

  const isTypeCompany = formMethod.watch("accountType");

  const onSignupHandler = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <PersonStandingIcon size={40} className="mb-5" />
      <Card className="max-w-sm w-full ">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>Sign up to your supportMe account..</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form Provider 있음 */}
          <Form {...formMethod}>
            <form
              className="flex flex-col gap-4"
              onSubmit={formMethod.handleSubmit(onSignupHandler)}
            >
              <FormFieldWrapper fieldLabel={"Email"} fieldName={"email"} />

              <FormField
                control={formMethod.control}
                name={"accountType"}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          {AccountTypes.map((val, idx) => (
                            <SelectItem value={val} key={`val-${idx}`}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {isTypeCompany === "company" && (
                <>
                  <FormFieldWrapper
                    fieldLabel={"company Name"}
                    fieldName={"companyName"}
                  />
                  <FormFieldWrapper
                    fieldLabel={"직원 수"}
                    fieldName={"employeeCount"}
                    fieldType={"number"}
                  />
                </>
              )}

              <FormField
                name="dayofbirth"
                control={formMethod.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>생년월일</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="flex justify-between"
                            >
                              <span>
                                {!!field.value
                                  ? field.value.toLocaleDateString("ko-KR", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })
                                  : "Pick a date"}
                              </span>
                              <Calendar1Icon size={20} />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          align="start"
                          className="w-auto p-0 border-none"
                        >
                          <Calendar
                            mode="single"
                            defaultMonth={field.value}
                            selected={field.value}
                            onSelect={field.onChange}
                            className="rounded-md border"
                            fixedWeeks //주마다 6주로 고정
                            weekStartsOn={0} //일주일 시작 요일
                            toDate={new Date()}
                            fromYear={new Date().getFullYear() - 100}
                            // fromYear는 toDate랑 fromYear를 같이 써야함
                            captionLayout="dropdown-buttons"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter className="flex justify-between">
          <p>Dont have account Id </p>
          <Button asChild variant={"outline"} size={"sm"}>
            <Link href={"/sign-up"}>SIGN UP</Link>
          </Button>
        </CardFooter> */}
      </Card>
    </>
  );
}
