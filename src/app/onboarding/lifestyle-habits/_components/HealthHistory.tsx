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
import useTimeOutMessage from "@/hooks/useTimeOutMessage";
import { ErrorMessage } from "@/components/ui/error-message";
import { useUser } from "@clerk/clerk-react";
import { type User } from "@prisma/client";

interface LifestyleFormProps {
  handleProgress: (value: string) => void;
  data: Pick<User, "lifestyle" | "externalId"> | null;
}

export default function HealthHistory({
  handleProgress,
  data,
}: LifestyleFormProps) {
  const router = useRouter();
  const [error, setError] = useTimeOutMessage();
  const { user } = useUser();

  const formSchema = yup.object({
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
    defaultValues: data?.lifestyle?.surgery || {
      surgery: {
        done: false,
        zone: "",
      },
      injury: data?.lifestyle?.injury || {
        done: false,
        zone: "",
      },
      isTakingMedication: data?.lifestyle?.isTakingMedication || {
        taking: false,
        medicaments: [],
      },
      isPregnant: data?.lifestyle?.isPregnant || false,
      hasBeenHospitalized: data?.lifestyle?.hasBeenHospitalized || false,
    },
  });

  type HealthHistoryFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: HealthHistoryFields) => {
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
    router.push("/onboarding/congratulations");
  };

  return (
    <>
      <h3>Antécédents et Santé Actuelle</h3>
      <p className="text-gray-700">
        Partagez vos antécédents médicaux pour un suivi personnalisé.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 mt-12">
            {/* sleeping hours  */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="surgery.done"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avez-vous déjà été opéré ?</FormLabel>
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
              {form.watch("surgery.done") === true && (
                <FormField
                  control={form.control}
                  name="surgery.zone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={"Veuillez mentionner la zone"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="injury.done"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Avez-vous déjà été blessé de manière significative?
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
                          <FormLabel className="font-normal">Non</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("injury.done") === true && (
                <FormField
                  control={form.control}
                  name="injury.zone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={"Veuillez mentionner la zone"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* medication  */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isTakingMedication.taking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prenez-vous des médicaments ?</FormLabel>
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
                          <FormLabel className="font-normal">Non</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("isTakingMedication.taking") == true && (
                <FormField
                  control={form.control}
                  name="isTakingMedication.medicaments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Éprouvez-vous des douleurs physiques chroniques ? Si
                        oui, précisez
                      </FormLabel>
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
                            "isTakingMedication.medicaments",
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
            {/* pregnant  */}
            <FormField
              control={form.control}
              name="isPregnant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Si vous êtes une femme, êtes-vous enceinte ?
                  </FormLabel>
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
                        <FormLabel className="font-normal">Non</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* hospitalized  */}
            <FormField
              control={form.control}
              name="hasBeenHospitalized"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Avez-vous déjà été hospitalisé au cours des 12 derniers
                    mois?
                  </FormLabel>
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
                        <FormLabel className="font-normal">Non</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
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
