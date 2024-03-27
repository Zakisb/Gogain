"use client";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GoalSvg from "/public/assets/images/onboarding/goal.svg";
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
import { revalidatePath } from "next/cache";

interface UserFormProps {
  initialData?: Pick<User, "id" | "goal"> | null | undefined;
}

export default function Goal({ initialData }: UserFormProps) {
  const t = useTranslations("Onboarding.Goal");
  const [error, setError] = useTimeOutMessage();

  const router = useRouter();

  const formSchema = yup.object({
    type: yup.string().required(t("form.fields.type.required")),
    duration: yup.number().required(t("form.fields.duration.required")),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      type: initialData?.goal?.type || "weightLoss",
      duration: initialData?.goal?.duration || 1,
    },
  });

  type GoalFormFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: GoalFormFields) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/onboarding/goal`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          id: initialData?.id,
        }),
      }
    );
    if (!response.ok) {
      setError("Une erreur est survenur. Veuillez réessayer.");
      return;
    }
    router.refresh();
    router.push("/onboarding/nutrition");
  };

  return (
    <div className="flex flex-col container max-w-[800px] mx-auto mt-14">
      <div className="mt-10 space-y-3">
        <div className="flex flex-row gap-x-8 items-center">
          <h2>{t("title")}</h2>
          <span>
            <Image height={50} src={GoalSvg} alt="Goal" />
          </span>
        </div>
        <p className="text-gray-700">{t("description")}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-4 mt-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.fields.type.label")}</FormLabel>
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
                      <SelectItem value="weightLoss">
                        {t("form.fields.type.options.weightLoss")}
                      </SelectItem>
                      <SelectItem value="muscleGain">
                        {t("form.fields.type.options.muscleGain")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {t("form.fields.duration.label")} </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="durée réaliste pour l'atteindre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 mois</SelectItem>

                      <SelectItem value="2">2 mois</SelectItem>

                      <SelectItem value="3">3 mois</SelectItem>

                      <SelectItem value="6">6 mois</SelectItem>

                      <SelectItem value="12">1 année</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    à noter que ces durées sont des estimations et peuvent
                    varier selon l&apos;individualité de chacun.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <ErrorMessage description={error} />}

          <div className="w-full flex  justify-end">
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
    </div>
  );
}
