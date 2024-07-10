"use client";
import { useState, useImperativeHandle, forwardRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ErrorMessage } from "@/components/ui/error-message";

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

interface NutritionBasicsFormProps {
  handleProgress: (value: string) => void;
  data: Pick<User, "nutrition" | "externalId"> | null;
}

export default function NutritionBasics({
  handleProgress,
  data,
}: NutritionBasicsFormProps) {
  const [step, setStep] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useTimeOutMessage();

  const formSchema = yup.object({
    dietary_restrictions: yup.string().required("Ce champ est requis"),
    do_you_like_cooking: yup.boolean(),
    number_of_daily_meals: yup.string().required("Ce champ est requis"),
    preferred_beverages: yup.string().required("Ce champ est requis"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      dietary_restrictions:
        data?.nutrition?.dietary_restrictions || "no_regime",
      do_you_like_cooking: data?.nutrition?.do_you_like_cooking || false,
      number_of_daily_meals:
        data?.nutrition?.number_of_daily_meals || "3_meals",
      preferred_beverages: data?.nutrition?.preferred_beverages || "water",
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
        <FormField
          control={form.control}
          name="do_you_like_cooking"
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
        <FormField
          control={form.control}
          name="dietary_restrictions"
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
          name="number_of_daily_meals"
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
          name="preferred_beverages"
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
                  <SelectItem value="water">Eau</SelectItem>
                  <SelectItem value="sugary_drinks">
                    Boissons sucrés (soda, jus de fruit, sirop)
                  </SelectItem>
                  <SelectItem value="coffee_tea">Café, thé</SelectItem>
                  <SelectItem value="energy_drink">
                    Boissons énergisantes
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <ErrorMessage description={error} />}

        <div className="w-full flex  justify-end ">
          <Button
            type="submit"
            className="w-1/3"
            loading={form.formState.isSubmitting}
          >
            Suivant
          </Button>
        </div>
      </form>
    </Form>
  );
}
