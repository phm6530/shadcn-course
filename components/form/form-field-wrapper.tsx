"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { formSchema } from "@/app/(logged-out)/sign-up/page";
import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { PasswordInput } from "../ui/input-password";

export default function FormFieldWrapper({
  fieldLabel,
  fieldName,
  fieldDescription,
  fieldType = "text", // Default
  ...rest
}: {
  fieldLabel: string;
  fieldName: keyof z.infer<typeof formSchema>;
  fieldDescription?: string;
  fieldType?: HTMLInputTypeAttribute;
} & InputHTMLAttributes<HTMLInputElement>) {
  const { control } = useFormContext();

  return (
    <FormField
      name={fieldName}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{fieldLabel}</FormLabel>
            <FormControl>
              <Input {...field} type={fieldType} />
            </FormControl>
            {fieldDescription && (
              <FormDescription>{fieldDescription}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
