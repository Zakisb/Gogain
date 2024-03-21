"use client";
import { useState, useImperativeHandle, forwardRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
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
import { on } from "events";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "Remix", value: "remix" },
  { label: "React", value: "react" },
];

const NutritionPreferences = forwardRef(({ handleProgress }, ref) => {
  const [step, setStep] = useState(0);

  const t = useTranslations("Onboarding.HealthHistory");
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    submit() {
      onSubmit(form.getValues());
    },
  }));

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
      isTakingSupplements: {
        taking: false,
        supplements: [],
      },
      isIntolerant: {
        tolerance: false,
        list: [],
      },
      flavor_preference: "no_preference",
    },
  });

  type HealthHistoryFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: HealthHistoryFields) => {
    console.log("shit");
    handleProgress("next");
    // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
    // router.push("/onboarding/congratulations");
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
                      <FormLabel className="font-normal">
                        {t("form.fields.surgery.options.yes")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {" "}
                        {t("form.fields.surgery.options.no")}
                      </FormLabel>
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
                  Avez vous un pathologie lié à l'alimentation (allergie,
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
                      <FormLabel className="font-normal">
                        {t("form.fields.surgery.options.yes")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {" "}
                        {t("form.fields.surgery.options.no")}
                      </FormLabel>
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

        <div className="w-full flex  justify-end gap-5">
          <Button
            type="submit"
            variant={"outline"}
            className="w-1/3"
            onClick={() => handleProgress("previous")}
          >
            Revenir
          </Button>

          <Button type="submit" className="w-1/3">
            {t("form.submission.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
});

export default NutritionPreferences;
