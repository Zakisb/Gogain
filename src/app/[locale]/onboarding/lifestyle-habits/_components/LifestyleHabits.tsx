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
  const t = useTranslations("Onboarding.LifeStyleHabits");
  const router = useRouter();
  const [error, setError] = useTimeOutMessage();
  const { user } = useUser();
  const formSchema = yup.object({
    sittingHours: yup.string().required(t("form.fields.sittingHours.required")),
    screenTime: yup.string().required(t("form.fields.screenTime.required")),
    isSmoker: yup.boolean(),
    alcoholConsumption: yup
      .string()
      .required(t("form.fields.alcohol.required")),
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
      <h3>{t("title")}</h3>
      <p className="text-gray-700">{t("description")}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 mt-12">
            {/* // Sitting hours */}
            <FormField
              control={form.control}
              name="sittingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.fields.sittingHours.label")}</FormLabel>
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
                      <SelectItem value="1-2">
                        {t("form.fields.sittingHours.options.lessThan4")}
                      </SelectItem>
                      <SelectItem value="3-4">
                        {t("form.fields.sittingHours.options.between4And8")}
                      </SelectItem>
                      <SelectItem value="5-6">
                        {t("form.fields.sittingHours.options.between8And12")}
                      </SelectItem>
                      <SelectItem value="7-8">
                        {t("form.fields.sittingHours.options.moreThan12")}
                      </SelectItem>
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
                  <FormLabel>{t("form.fields.screenTime.label")}</FormLabel>
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
                      <SelectItem value="0-2">
                        {t("form.fields.screenTime.options.lessThan2")}
                      </SelectItem>
                      <SelectItem value="2-4">
                        {t("form.fields.screenTime.options.between2And4")}
                      </SelectItem>
                      <SelectItem value="4-6">
                        {t("form.fields.screenTime.options.between4And6")}
                      </SelectItem>
                      <SelectItem value="+6">
                        {t("form.fields.screenTime.options.moreThan6")}
                      </SelectItem>
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
                  <FormLabel>{t("form.fields.smoking.label")}</FormLabel>
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
                        <FormLabel className="font-normal">
                          {t("form.fields.smoking.options.yes")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {" "}
                          {t("form.fields.smoking.options.no")}
                        </FormLabel>
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
                  <FormLabel>{t("form.fields.alcohol.label")}</FormLabel>
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
                      <SelectItem value="once">
                        {t("form.fields.alcohol.options.onceAWeek")}
                      </SelectItem>
                      <SelectItem value="twice">
                        {t("form.fields.alcohol.options.twiceAWeek")}
                      </SelectItem>
                      <SelectItem value="three">
                        {t("form.fields.alcohol.options.threeTimesAWeek")}
                      </SelectItem>
                      <SelectItem value="four">
                        {t("form.fields.alcohol.options.fourTimesAWeek")}
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
              {t("form.submission.submit")}
            </Button>
          </div>

          <div></div>
        </form>
      </Form>
    </>
  );
}
