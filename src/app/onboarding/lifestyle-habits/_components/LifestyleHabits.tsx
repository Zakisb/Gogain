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
import { type User } from "@prisma/client";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";
import { ErrorMessage } from "@/components/ui/error-message";
import { useUser } from "@clerk/clerk-react";

interface LifestyleFormProps {
  handleProgress: (value: string) => void;
  data: Pick<User, "lifestyle" | "externalId"> | null;
}

export default function LifestyleHabits({
  handleProgress,
  data,
}: LifestyleFormProps) {
  const router = useRouter();
  const [error, setError] = useTimeOutMessage();
  const { user } = useUser();
  const formSchema = yup.object({
    sittingHours: yup.string().required("La durée est requise"),
    screenTime: yup.string().required("La durée devant un écran est requise"),
    isSmoker: yup.boolean(),
    alcoholConsumption: yup
      .string()
      .required("La fréquence de consommation d'alcool est requise"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      sittingHours: data?.lifestyle?.sittingHours || "1-2",
      screenTime: data?.lifestyle?.screenTime || "0-2",
      isSmoker: data?.lifestyle?.isSmoker || false,
      alcoholConsumption: data?.lifestyle?.alcoholConsumption || "once",
    },
  });

  type DailyEnvironmentHabitsFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: DailyEnvironmentHabitsFields) => {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_URL}/api/onboarding/lifestyle`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       lifestyle: values,
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
    <>
      <h3>Habitudes de vie</h3>
      <p className="text-gray-700">
        Partagez vos habitudes quotidiennes pour un suivi personnalisé.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 mt-12">
            {/* // Sitting hours */}
            <FormField
              control={form.control}
              name="sittingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Combien d’heure en moyenne êtes-vous assis par jour ?
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
                      <SelectItem value="0-4">Moins de 4 heures</SelectItem>
                      <SelectItem value="4-8">Entre 4 et 8 heures</SelectItem>
                      <SelectItem value="8-12">Entre 8 et 12 heures</SelectItem>
                      <SelectItem value="+12">Plus de 12 heures</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* sleeping hours  */}
            <FormField
              control={form.control}
              name="screenTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Combien de temps passez-vous devant un écran par jour ?
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
                      <SelectItem value="0-2">Moins de 2 heures</SelectItem>
                      <SelectItem value="2-4">Entre 2 et 4 heures</SelectItem>
                      <SelectItem value="4-6">Entre 4 et 6 heures</SelectItem>
                      <SelectItem value="+6">Plus de 6 heures</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* is smoker */}
            <FormField
              control={form.control}
              name="isSmoker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Êtes-vous fumeur ?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
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

            {/* alchool consumption  */}
            <FormField
              control={form.control}
              name="alcoholConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Combien de fois buvez-vous de l&apos;alcool par semaine ?
                    Combien de fois buvez-vous de l&apos;alcool par semaine ?
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
                      <SelectItem value="zero">Jamais</SelectItem>
                      <SelectItem value="once">Une fois par semaine</SelectItem>
                      <SelectItem value="twice">
                        Deux fois par semaine
                      </SelectItem>
                      <SelectItem value="three">
                        Trois fois par semaine
                      </SelectItem>
                      <SelectItem value="four">
                        Quatre fois par semaine
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <ErrorMessage description={error} />}

          <div className="w-full flex  justify-end gap-5">
            <Button
              type="submit"
              variant={"outline"}
              className="w-1/3"
              onClick={() => handleProgress("previous")}
            >
              Revenir
            </Button>
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
