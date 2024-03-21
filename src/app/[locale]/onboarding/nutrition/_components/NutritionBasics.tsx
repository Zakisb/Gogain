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

const NutritionBasics = forwardRef(({ handleProgress }, ref) => {
  const [step, setStep] = useState(0);

  const t = useTranslations("Onboarding.HealthHistory");
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    submit() {
      onSubmit(form.getValues());
    },
  }));

  const formSchema = yup.object({
    regime: yup.string().required("Ce champ est requis"),
    surgery: yup.object({
      done: yup.boolean(),
      zone: yup.string(),
    }),
    injury: yup.object({
      done: yup.boolean(),
      zone: yup.string(),
    }),
    isTakingMedication: yup.object({
      taking: yup.boolean(),
      medicaments: yup.array(),
    }),
    isPregnant: yup.boolean(),
    hasBeenHospitalized: yup.boolean(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      regime: "no_regime",
      meals_per_day: "3_meals",
      surgery: {
        done: false,
        zone: "",
      },
      injury: {
        done: false,
        zone: "",
      },
      isTakingMedication: {
        taking: false,
        medicaments: [],
      },
      isPregnant: false,
      hasBeenHospitalized: false,
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
        <FormField
          control={form.control}
          name="surgery.done"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aimez-vous cuisiner ?</FormLabel>
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
        <FormField
          control={form.control}
          name="regime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Suivez vous un régime alimentaire particulier ?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="no_regime">
                    Sans régime particulier
                  </SelectItem>
                  <SelectItem value="flexitarien">Flexitarien</SelectItem>
                  <SelectItem value="végératien">Végétarien</SelectItem>
                  <SelectItem value="sans_gluten">Sans gluten</SelectItem>
                  <SelectItem value="sans_viande">Sans Viande</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meals_per_day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Combien de repas aimeriez-vous prendre par jour ?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2_meals">2 repas / jour</SelectItem>
                  <SelectItem value="3_meals">3 repas / jour</SelectItem>
                  <SelectItem value="4_meals">4 repas / jour</SelectItem>
                  <SelectItem value="5_meals">5 repas / jour</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meals_per_day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Quel type de boisson consommez vous le plus ? *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2_meals">Eau</SelectItem>
                  <SelectItem value="3_meals">
                    Boissons sucrés (soda, jus de fruit, sirop)
                  </SelectItem>
                  <SelectItem value="4_meals">Café, thé</SelectItem>
                  <SelectItem value="5_meals">Boissons énergisantes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex  justify-end ">
          <Button type="submit" className="w-1/3">
            {t("form.submission.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
});

export default NutritionBasics;
