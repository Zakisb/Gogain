"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import "@/styles/custom.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";

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
import { useUser } from "@clerk/clerk-react";

const OPTIONS: Option[] = [];

const marks = {
  0: <strong>0</strong>,
  1: <strong>1</strong>,
  2: <strong>2</strong>,
  3: <strong>3</strong>,
  4: <strong>4</strong>,
  5: <strong>5</strong>,
};

interface LifestyleFormProps {
  handleProgress: (value: string) => void;
  data: Pick<User, "lifestyle" | "externalId"> | null;
}

export default function HealthHabits({
  handleProgress,
  data,
}: LifestyleFormProps) {
  const router = useRouter();
  const [error, setError] = useTimeOutMessage();
  const { user } = useUser();

  const formSchema = yup.object({
    sleepHours: yup.string().required("Ce champs est requis"),
    sportsHoursPerWeek: yup.string().required("Ce champs est requis"),
    pain: yup.array().of(yup.string()),
    stressLevel_5_scale: yup.number().required("Ce champs est requis"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      sleepHours: data?.lifestyle?.sleepHours || "0-5",
      sportsHoursPerWeek: data?.lifestyle?.sportsHoursPerWeek || "4",
      pain: data?.lifestyle?.pain || [],
      stressLevel_5_scale: data?.lifestyle?.stressLevel_5_scale || 2,
    },
  });

  type GeneralHealthHabitsFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: GeneralHealthHabitsFields) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/onboarding/lifestyle`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lifestyle: values,
          externalId: user?.id,
        }),
      }
    );
    if (!response.ok) {
      setError("Une erreur est survenur. Veuillez réessayer.");
      return;
    }
    router.refresh();
    handleProgress("next");
  };

  return (
    <>
      <h2>Habitudes générales</h2>
      <p className="text-gray-700">
        Partagez vos habitudes pour un suivi personnalisé.
      </p>
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
                      <SelectItem value="0-5">Moins de 5 heures</SelectItem>
                      <SelectItem value="5-7">Entre 5 et 7 heures</SelectItem>
                      <SelectItem value="7-0">Entre 7 et 9 heures</SelectItem>
                      <SelectItem value="+9">Plus de 9 heures</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* sports hours  */}
            <FormField
              control={form.control}
              name="sportsHoursPerWeek"
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
                    options={OPTIONS}
                    value={(field.value as string[]).map((el: string) => ({
                      label: el,
                      value: el,
                    }))}
                    onChange={(values) => {
                      form.setValue(
                        "pain",
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
              name="stressLevel_5_scale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quel est votre niveau de stress habituel sur une échelle de
                    1 à 10?
                  </FormLabel>
                  <Slider
                    defaultValue={field.value}
                    marks={marks}
                    step={1}
                    min={0}
                    onChange={(value) => {
                      form.setValue("stressLevel_5_scale", value);
                    }}
                    styles={{
                      track: {
                        backgroundColor: "hsl(24.6, 95%, 53.1%)", // Directly using the HSL value
                      },
                      handle: {
                        borderColor: "hsl(24.6, 95%, 53.1%)",
                      },
                      // Include other styles if needed
                    }}
                    activeDotStyle={{
                      borderColor: "hsl(24.6, 95%, 53.1%)",
                    }}
                    max={5}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <ErrorMessage description={error} />}

          <div className="w-full flex  justify-end gap-5">
            <Button
              type="submit"
              className="w-1/3"
              loading={form.formState.isSubmitting}
            >
              Suivant
            </Button>
          </div>

          <div></div>
        </form>
      </Form>
    </>
  );
}
