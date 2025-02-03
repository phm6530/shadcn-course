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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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

/**
 * Zod 에서는
 * 스키마에서 유효성 검사가 실패할 경우,
 * superRefine의 유효성 검사를 수행하지 않을 수 있다.
 *
 * 이를 해결 하기 위해 단일 스키마로 분리하여 superRefine을 사용해야한다.
 * 지금 코드는 문제가 없다.
 *
 */
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
    companyName: z.string().nullable(),
    employeeCount: z.number().nullable(),
    dayofbirth: z.date().nullable(),
    password: z
      .string()
      .min(8, "8자 이상 입력해주세요.")
      .refine(
        (val) => {
          const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
          return reg.test(val);
        },
        { message: "영문, 숫자를 포함한 8자 이상 입력해주세요." }
      ),
    passwordConfirm: z.string(),
    agree: z.coerce.boolean().refine((val) => val === true, {
      message: "필수 동의 사항입니다.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
      });
    }

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

    const today = new Date();
    const userBirsh = data?.dayofbirth?.getFullYear();
    if (!userBirsh) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "생년월일을 입력해주세요.",
        path: ["dayofbirth"],
      });
      return;
    }
    const isAdult = today.getFullYear() - userBirsh >= 18;
    if (!isAdult) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "만 18세 이상만 가입 가능합니다.",
        path: ["dayofbirth"],
      });
    }
  });

export default function Page() {
  const formMethod = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      accountType: "",
      companyName: "", // "" 대신 undefined
      employeeCount: 0, // 0 대신 undefined
      dayofbirth: null,
      password: "",
      passwordConfirm: "",
    },

    resolver: zodResolver(formSchema),
  });

  const isTypeCompany = formMethod.watch("accountType");
  const onSignupHandler = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  console.log(formMethod.watch());

  return (
    <>
      <PersonStandingIcon size={40} className="mb-5" />
      <Card className="max-w-sm w-full ">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
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
                            defaultMonth={field.value || undefined}
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            className="rounded-md border flex"
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

              <FormFieldWrapper
                fieldLabel={"비밀번호"}
                fieldName={"password"}
                fieldType="password"
                placeholder="8자 이상 입력해주세요."
              />

              <FormFieldWrapper
                fieldLabel={"비밀번호 확인"}
                fieldName={"passwordConfirm"}
                fieldType="password"
                placeholder="8자 이상 입력해주세요."
              />

              <FormField
                name="agree"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Use different settings for my mobile devices
                        </FormLabel>
                        <FormDescription>
                          You can manage your mobile notifications in the{" "}
                          {/* <Link href="/examples/forms">mobile settings</Link>{" "} */}
                          page.
                        </FormDescription>
                        <FormMessage />
                      </div>
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
