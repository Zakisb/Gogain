"use client";
import { useState, useImperativeHandle, forwardRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Progress } from "@/components/ui/progress";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useUser } from "@clerk/clerk-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
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
import { type User } from "@prisma/client";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";
import { ErrorMessage } from "@/components/ui/error-message";

interface NutritionPreferencesFormProps {
  handleProgress: (value: string) => void;
  data: Pick<User, "nutrition" | "externalId"> | null;
}

export default function NutritionPreferences({
  handleProgress,
  data,
}: NutritionPreferencesFormProps) {
  const [step, setStep] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useTimeOutMessage();

  const formSchema = yup.object({
    isTakingSupplements: yup.object({
      taking: yup.boolean(),
      supplements: yup.array(),
    }),
    isIntolerant: yup.object({
      tolerance: yup.boolean(),
      list: yup.array(),
    }),
    flavor_preference: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      isTakingSupplements: data?.nutrition?.isTakingSupplements || {
        taking: false,
        supplements: [],
      },
      isIntolerant: data?.nutrition?.isIntolerant || {
        tolerance: false,
        list: [],
      },
      flavor_preference: data?.nutrition?.flavor_preference || "no_preference",
    },
  });

  type HealthHistoryFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: HealthHistoryFields) => {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_URL}/api/onboarding/nutrition`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       nutrition: values,
    //       externalId: user?.id,
    //     }),
    //   }
    // );
    // if (!response.ok) {
    //   setError("Une erreur est survenur. Veuillez réessayer.");
    //   return;
    // }
    router.refresh();
    handleProgress("next");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="isTakingSupplements.taking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Consommez-vous des compliments Alimentaire ?{" "}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(JSON.parse(value));
                    }}
                    defaultValue={field.value?.toString()}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Oui</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal"> Non</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("isTakingSupplements.taking") === true && (
            <FormField
              control={form.control}
              name="isTakingSupplements.supplements"
              render={({ field }) => (
                <FormItem>
                  <MultipleSelector
                    {...field}
                    creatable
                    placeholder="Saissisez une ou plusieurs réponses et appuyer sur entrée"
                    hidePlaceholderWhenSelected
                    options={[]}
                    value={(field.value ?? []).map((el: string) => ({
                      label: el,
                      value: el,
                    }))}
                    onChange={(values) => {
                      form.setValue(
                        "isTakingSupplements.supplements",
                        values.map((el) => el.value)
                      );
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="isIntolerant.tolerance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Avez vous un pathologie lié à l&apos;alimentation (allergie,
                  maladie de Crohn, intolérance...) ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(JSON.parse(value));
                    }}
                    defaultValue={field.value?.toString()}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Oui</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal"> Non </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("isIntolerant.tolerance") === true && (
            <FormField
              control={form.control}
              name="isIntolerant.list"
              render={({ field }) => (
                <FormItem>
                  <MultipleSelector
                    {...field}
                    creatable
                    placeholder="Saissisez une ou plusieurs réponses et appuyer sur entrée"
                    hidePlaceholderWhenSelected
                    options={[]}
                    value={(field.value ?? []).map((el: string) => ({
                      label: el,
                      value: el,
                    }))}
                    onChange={(values) => {
                      form.setValue(
                        "isIntolerant.list",
                        values.map((el) => el.value)
                      );
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="flavor_preference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quelles sont vos préférences gustatives ?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="salty">Salé</SelectItem>
                  <SelectItem value="sweet">Sucré</SelectItem>
                  <SelectItem value="no_preference">
                    Aucune préférence particulière
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <ErrorMessage description={error} />}

        <div className="w-full flex  justify-end gap-5">
          <Button
            type="submit"
            variant={"outline"}
            className="w-1/3"
            loading={form.formState.isSubmitting}
            onClick={() => handleProgress("previous")}
          >
            Revenir
          </Button>

          <Button type="submit" className="w-1/3">
            Suivant
          </Button>
        </div>
      </form>
    </Form>
  );
}
