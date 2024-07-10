"use client";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Users,
  Euro,
  FolderPenIcon,
  Mail,
  Dumbbell,
  CalendarIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { License, type Account, type User } from "@prisma/client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRoleOptions } from "@/constants/roles.constant";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/error-message";
import { Button } from "@/components/ui/button";
import { apiCreateLicense, apiUpdateLicense } from "@/services/LicenseServices";
import { toast } from "sonner";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";
import { useSignUp } from "@clerk/nextjs";
import { locales } from "@/constants/locales.constant";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";

interface UserFormProps {
  initialData: License;
}

const PurchaseLicenseForm = ({ initialData }: UserFormProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  // const [error, setError] = useState(null);
  const [error, setError] = useTimeOutMessage();
  const submitButtonText = initialData ? "Mettre à jour" : "Créer";
  const router = useRouter();

  const formSchema = yup.object({
    validUntil: yup.date().required("Date de validité est requise"),
    sessionNumber: yup
      .number()
      .required(`Le nombre de session coaching est requis`),
    numberOfUsers: yup.number().required(`Le nombre d'utilisateur est requis`),
  });

  type PurchasedFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      validUntil: initialData.validUntil,
      sessionNumber: initialData.sessionNumber,
      numberOfUsers: initialData.numberOfUsers,
    },
  });

  const editPurchasedLicense = async (values: PurchasedFormFields) => {
    try {
      const response = await fetch(
        `/api/organizations/licenses/${initialData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const onSubmit = async (values: PurchasedFormFields) => {
    setSubmitting(true);

    toast.promise(editPurchasedLicense(values), {
      loading: "Chargement...",
      success: (data) => {
        router.refresh();
        return `Licence mise à jour avec succès`;
      },
      error: (error) => {
        setError(error?.message);
        return error?.message;
      },
      finally: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="mt-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid-cols-1 gap-8 md:grid max-w-xl">
            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">
                    Date de validité
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
                            <span> Date de naissance</span>
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
            <FormField
              control={form.control}
              name="sessionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de sessions coaching par semaine</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-2xl ">
                      <Dumbbell className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        {...field}
                        placeholder="Nombre de session"
                        type="number"
                        className="pl-8"
                        disabled={isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfUsers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre d'utilisateur</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-2xl ">
                      <Users className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        {...field}
                        placeholder="Nombre d'utilisateur"
                        type="number"
                        className="pl-8"
                        disabled={isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <ErrorMessage description={error} />}

            {/* {error && } */}
          </div>

          <div className="space-x-4">
            <Button loading={isSubmitting} className="ml-auto" type="submit">
              {isSubmitting ? "En course d'ajout..." : submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PurchaseLicenseForm;
