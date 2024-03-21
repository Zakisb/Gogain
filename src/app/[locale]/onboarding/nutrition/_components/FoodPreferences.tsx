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
import { toast } from "sonner";

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

const proteinOptions: Option[] = [
  { label: "Œufs", value: "Œufs" },
  { label: "Barre protéinée", value: "Barre protéinée" },
  {
    label: "Blancs d'oeufs en bouteille",
    value: "Blancs d'oeufs en bouteille",
  },
  { label: "Chorizo (-30% MG)", value: "Chorizo (-30% MG)" },
  { label: "Colin d'alaska", value: "Colin d'alaska" },
  { label: "Dinde", value: "Dinde" },
  { label: "Fromage blanc 0%", value: "Fromage blanc 0%" },
  { label: "Fromage de brebis", value: "Fromage de brebis" },
  { label: "HiPro", value: "HiPro" },
  { label: "Lardons", value: "Lardons" },
  { label: "Poulet", value: "Poulet" },
  { label: "Saumon", value: "Saumon" },
  { label: "Steak haché 5%", value: "Steak haché 5%" },
  { label: "Thon", value: "Thon" },
  { label: "Whey", value: "Whey" },
  { label: "Whey isolate", value: "Whey isolate" },
];

const carbsOptions: Option[] = [
  {
    value: "Pain au levain",
    label: "Pain au levain",
  },
  {
    value: "Pain blanc",
    label: "Pain blanc",
  },
  {
    value: "Pain de seigle",
    label: "Pain de seigle",
  },
  {
    value: "Riz complet",
    label: "Riz complet",
  },
  {
    value: "Tartines au seigle (unité)",
    label: "Tartines au seigle (unité)",
  },
  {
    value: "Wasa au seigle (unité)",
    label: "Wasa au seigle (unité)",
  },
  {
    value: "Wasa léger (unité)",
    label: "Wasa léger (unité)",
  },
  {
    value: "Wasa sésame (unité)",
    label: "Wasa sésame (unité)",
  },
];

const fatOptions: Option[] = [
  {
    label: "Amandes (Almonds)",
    value: "amandes",
  },
  {
    label: "Beurre de cacahuète (Peanut butter)",
    value: "beurre de cacahuète",
  },
  {
    label: "Beurre de cacahuète déshydraté (Dehydrated peanut butter)",
    value: "beurre de cacahuète déshydraté",
  },
  {
    label: "Bûche de chèvre (Goat cheese log)",
    value: "bûche de chèvre",
  },
  {
    label: "Caramel au beurre salé",
    value: "caramel au beurre salé",
  },
  {
    label: "Chavroux (Cheese)",
    value: "chavroux",
  },
  {
    label: "Feta",
    value: "feta",
  },
  {
    label: "Fromage blanc 3%",
    value: "fromage blanc 3%",
  },
  {
    label: "Fromage de chèvre (Goat cheese)",
    value: "fromage de chèvre",
  },
  {
    label: "Graines de sésame (Sesame seeds)",
    value: "graines de sésame",
  },
  {
    label: "Houmous",
    value: "houmous",
  },
  {
    label: "Huile d'olive (Olive oil)",
    value: "huile d'olive",
  },
  {
    label: "Huile de coco (Coconut oil)",
    value: "huile de coco",
  },
  {
    label: "Huile de colza (Canola oil)",
    value: "huile de colza",
  },
  {
    label: "Huile de noix (Walnut oil)",
    value: "huile de noix",
  },
  {
    label: "Huile de sésame (Sesame oil)",
    value: "huile de sésame",
  },
  {
    label:
      "Maquereau en boite- grillé (petit navire) (Mackerel canned - grilled)",
    value: "maquereau en boite- grillé",
  },
  {
    label: "Noisette (Hazelnuts)",
    value: "noisette",
  },
  {
    label: "Noix de cajou (Cashews)",
    value: "noix de cajou",
  },
  {
    label: "Saumon (Salmon)",
    value: "saumon",
  },
  {
    label:
      "Sardine en boîte - à l'huile - petit navire (Sardine in oil, canned)",
    value: "sardine en boîte - à l'huile",
  },
];

export default function FoodPreferences({ handleProgress }) {
  const [step, setStep] = useState(0);

  const t = useTranslations("Onboarding.HealthHistory");
  const router = useRouter();

  const formSchema = yup.object({
    proteinPreferences: yup
      .array()
      .of(yup.string())
      .max(5, "Vous ne pouvez pas sélectionner plus de 5 items"),
    carbsPreferences: yup.array().of(yup.string()),
    fatPreferences: yup.array().of(yup.string()),
    waterIntake: yup.string().required("Ce champ est requis"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      proteinPreferences: [],
      carbsPreferences: [],
      fatPreferences: [],
      waterIntake: "less_1l",
    },
  });

  type HealthHistoryFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: HealthHistoryFields) => {
    // handleProgress("next");
    // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
    router.push("/onboarding/lifestyle-habits");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="waterIntake"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Combien de litre(s) d&apos;eau consommez vous en moyenne à la
                journée ?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="less_1l">Mois d&apos;1L</SelectItem>
                  <SelectItem value="between_1l_1.5l">
                    Entre 1 L et 1,5L
                  </SelectItem>
                  <SelectItem value="between_1.5_2l">
                    Entre 1,5L et 2L
                  </SelectItem>
                  <SelectItem value="plus_2l">Plus de 2L</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="proteinPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Choisissez vos 5 sources de protéines favorites, en ordre de
                préférence
              </FormLabel>
              <MultipleSelector
                {...field}
                placeholder="Saissisez une ou plusieurs réponses "
                hidePlaceholderWhenSelected
                options={proteinOptions}
                value={(field.value ?? []).map((el: string) => ({
                  label: el,
                  value: el,
                }))}
                onChange={(values) => {
                  if (values.length > 5) {
                    toast.error(
                      "Vous ne pouvez pas séléctionner plus de 5 items"
                    );
                    return;
                  }
                  form.setValue(
                    "proteinPreferences",
                    values.map((el) => el.value)
                  );
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carbsPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Choisissez vos 5 sources de gluicide favorites, en ordre de
                préférence
              </FormLabel>
              <MultipleSelector
                {...field}
                placeholder="Saissisez une ou plusieurs réponses "
                hidePlaceholderWhenSelected
                options={carbsOptions}
                value={(field.value ?? []).map((el: string) => ({
                  label: el,
                  value: el,
                }))}
                onChange={(values) => {
                  if (values.length > 5) {
                    toast.error(
                      "Vous ne pouvez pas séléctionner plus de 5 items"
                    );
                    return;
                  }
                  form.setValue(
                    "carbsPreferences",
                    values.map((el) => el.value)
                  );
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fatPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Choisissez vos 5 sources de lipides favorites, en ordre de
                préférence
              </FormLabel>
              <MultipleSelector
                {...field}
                placeholder="Saissisez une ou plusieurs réponses "
                hidePlaceholderWhenSelected
                options={fatOptions}
                value={(field.value ?? []).map((el: string) => ({
                  label: el,
                  value: el,
                }))}
                onChange={(values) => {
                  if (values.length > 5) {
                    toast.error(
                      "Vous ne pouvez pas séléctionner plus de 5 items"
                    );
                    return;
                  }
                  form.setValue(
                    "fatPreferences",
                    values.map((el) => el.value)
                  );
                }}
              />
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
}
