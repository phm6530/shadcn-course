"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { PersonStandingIcon } from "lucide-react";

type searchParams = {
  msg: string;
};

const schema = z.object({
  email: z.string().email("이메일 형식이 아닙니다."),
  password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
});

export default function Login({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  console.log(searchParams);

  const formMethod = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = (data: z.infer<typeof schema>) => {
    console.log(data); //제출..
  };

  return (
    <>
      <PersonStandingIcon size={40} className="mb-5" />
      <Card className="max-w-sm w-full ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your supportMe account..</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formMethod}>
            <form
              className="flex flex-col gap-4"
              onSubmit={formMethod.handleSubmit(onSubmitHandler)}
            >
              <FormField
                name="email"
                control={formMethod.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="email" />
                      </FormControl>
                      <FormDescription>test</FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="password"
                control={formMethod.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="password" />
                      </FormControl>
                      <FormDescription>test</FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>Dont have account Id </p>
          <Button asChild variant={"outline"} size={"sm"}>
            <Link href={"/sign-up"}>SIGN UP</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
