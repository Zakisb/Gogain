"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
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
import { locales } from "@/constants/locales.constant";
import { type User } from "@prisma/client";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";
import { ErrorMessage } from "@/components/ui/error-message";

interface UserFormProps {
  initialData?:
    | Pick<
        User,
        | "externalId"
        | "firstName"
        | "lastName"
        | "email"
        | "birthDate"
        | "height"
        | "weight"
        | "gender"
      >
    | null
    | undefined;
}

export default function Registration({ initialData }: UserFormProps) {
  const [error, setError] = useTimeOutMessage();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  const formSchema = yup.object({
    firstName: yup.string().required(t("form.fields.firstName.required")),
    lastName: yup.string().required(t("form.fields.lastName.required")),
    birthDate: yup.date().required(t("form.fields.birthDate.required")),
    gender: yup.string(),
    weight: yup
      .number()
      .positive(t("form.fields.weight.positive"))
      .typeError(t("form.fields.weight.invalid"))
      .required(t("form.fields.weight.required")),
    height: yup
      .number()
      .positive(t("form.fields.height.positive"))
      .typeError(t("form.fields.height.invalid"))
      .required(t("form.fields.height.required")),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      birthDate: initialData?.birthDate || new Date(),
      gender: initialData?.gender || "male",
      weight: initialData?.weight || 70,
      height: initialData?.height || 170,
    },
  });

  type LoginFormFields = yup.InferType<typeof formSchema>;

  const onSubmit = async (values: LoginFormFields) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/onboarding/registration`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          externalId: initialData?.externalId,
        }),
      }
    );
    if (!response.ok) {
      setError("Une erreur est survenur. Veuillez réessayer.");
      return;
    }
    router.refresh();
    router.push("/onboarding/goal");
  };

  return (
    <div className="flex flex-col container  max-w-[800px] mx-auto mt-16">
      <h2>Inscription</h2>
      <p className="text-gray-700">
        Partagez vos infos pour un suivi personnalisé.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4 mt-12">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Prénom
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nom
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-16">
            {/* birthDate  */}
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-1">
                      Date de naissance
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left  mt-10 font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: locales["fr"],
                              })
                            ) : (
                              <span>
                                {" "}
                                {t("form.fields.birthDate.placeholder")}
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={1930}
                          toYear={new Date().getFullYear()}
                          locale={locales["fr"]}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* gender  */}
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      {t("form.fields.gender.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {" "}
                            {t("form.fields.gender.options.male")}{" "}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {" "}
                            {t("form.fields.gender.options.female")}{" "}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-16">
            <div className="w-1/2">
              {/* weight  */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("form.fields.weight.label")} (kg){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              {/* height  */}
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("form.fields.height.label")} (cm){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {error && <ErrorMessage description={error} />}

          <div className="w-full flex  justify-end">
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
    </div>
  );
}
