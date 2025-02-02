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
import { HTMLInputTypeAttribute } from "react";

export default function FormFieldWrapper({
  fieldLabel,
  fieldName,
  fieldDescription,
  fieldType = "text", // Default
}: {
  fieldLabel: string;
  fieldName: keyof z.infer<typeof formSchema>;
  fieldDescription?: string;
  fieldType?: HTMLInputTypeAttribute;
}) {
  const { control, watch } = useFormContext();

  const test = watch(fieldName);
  console.log("test:", test);

  return (
    <FormField
      name={fieldName}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{fieldLabel}</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) => {
                  if (fieldType === "number") {
                    const value = e.target.value;
                    const numberValue = parseInt(value);
                    if (!isNaN(numberValue)) {
                      field.onChange(numberValue);
                    }
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                type={fieldType}
              />
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
