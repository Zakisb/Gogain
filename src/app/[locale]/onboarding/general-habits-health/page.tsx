"use client";
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

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "Remix", value: "remix" },
  { label: "React", value: "react" },
];

export default function GeneralHealthHabits() {
  const t = useTranslations("Onboarding.GeneralHabits");
  const router = useRouter();

  const formSchema = yup.object({
    sleepHours: yup.string().required(t("form.fields.sleepDuration.required")),
    sportsHours: yup.string().required(t("form.fields.activityLevel.required")),
    pain: yup.array().of(yup.string()),
    stressLevel: yup.number().required(t("form.fields.duration.required")),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      sleepHours: "",
      sportsHours: "",
      pain: [],
      stressLevel: 0,
    },
  });

  type GeneralHealthHabitsFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: GeneralHealthHabitsFields) => {
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
    <div className="flex flex-col container mx-auto mt-16">
      <h2>{t("title")}</h2>
      <p className="text-gray-700">{t("description")}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 mt-12">
            {/* sleeping hours  */}
            <FormField
              control={form.control}
              name="sleepHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.fields.sleepDuration.label")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0-5">
                        {t("form.fields.sleepDuration.options.lessThan5")}
                      </SelectItem>
                      <SelectItem value="5-7">
                        {t("form.fields.sleepDuration.options.between5And7")}
                      </SelectItem>
                      <SelectItem value="7-0">
                        {t("form.fields.sleepDuration.options.between7And9")}
                      </SelectItem>
                      <SelectItem value="+9">
                        {t("form.fields.sleepDuration.options.moreThan9")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* sports hours  */}
            <FormField
              control={form.control}
              name="sportsHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Combien d’heure en moyenne faites-vous du sport par semaine
                    ?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="4">4 heures/semaine</SelectItem>
                      <SelectItem value="5">5 heures/semaine</SelectItem>
                      <SelectItem value="6">6 heures/semaine</SelectItem>
                      <SelectItem value="7">7 heures/semaine</SelectItem>
                      <SelectItem value="+7">+ de 7 heures/semaine</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* pain  */}
            <FormField
              control={form.control}
              name="pain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Éprouvez-vous des douleurs physiques chroniques ? Si oui,
                    précisez
                  </FormLabel>
                  <MultipleSelector
                    {...field}
                    creatable
                    placeholder="Saissisez une ou plusieurs réponses et appuyer sur entrée"
                    hidePlaceholderWhenSelected
                    options={[]}
                    value={field.value.map((el: string) => ({
                      label: el,
                      value: el,
                    }))}
                    onChange={(values) => {
                      form.setValue(
                        "generalLifestyleHealthHabits.pain",
                        values.map((el) => el.value)
                      );
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* stress level  */}
            <FormField
              control={form.control}
              name="generalLifestyleHealthHabits.stressLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quel est votre niveau de stress habituel sur une échelle de
                    1 à 10?
                  </FormLabel>
                  <Slider defaultValue={[0]} step={0.01} min={0} max={5} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex  justify-end">
            <Button type="submit" className="w-1/3">
              {t("form.submission.submit")}
            </Button>
          </div>

          <div></div>
        </form>
      </Form>
    </div>
  );
}
