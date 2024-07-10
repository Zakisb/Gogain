"use client";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Users, Euro, FolderPenIcon, Dumbbell } from "lucide-react";
import { useForm } from "react-hook-form";
import { type LicenseType } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/error-message";
import { Button } from "@/components/ui/button";
import {
  apiCreateLicense,
  apiCreateLicensee,
  apiUpdateLicense,
} from "@/services/LicenseServices";
import { toast } from "sonner";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";

interface NewLicenseType extends Omit<LicenseType, "id"> {}

interface EmployeeFormProps {
  initialData?: LicenseType | null | undefined;
}

const LicensesForm = ({ initialData }: EmployeeFormProps) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const [error, setError] = useTimeOutMessage();
  const submitButtonText = initialData ? "Mettre à jour" : "Créer";
  const router = useRouter();

  const formSchema = yup.object({
    name: yup.string().required("Nom est requis"),
    price: yup.number().required("Prix est requis"),
  });

  type LicenseFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
    },
  });

  const onSubmit = async (values: LicenseFormFields) => {
    setSubmitting(true);
    if (initialData) {
      toast.promise(apiUpdateLicense(values), {
        loading: "Chargement...",
        success: (data) => {
          router.refresh();
          router.back();
          return `Succès! License a été mise à jour.`;
        },
        error: (data) => {
          setError(data?.message);
          return "Erreur lors de la mise à jour de la licence";
        },
        finally: () => {
          setSubmitting(false);
        },
      });
    } else {
      toast.promise(apiCreateLicensee({ ...values, type: "ORGANIZATION" }), {
        loading: "Chargement...",
        success: (data) => {
          router.refresh();
          router.back();
          return `Succès! Licence crèe avec succès`;
        },
        error: (error) => {
          setError(error?.message);
          return "Erreur lors de la création de la licence";
        },
        finally: () => {
          setSubmitting(false);
        },
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid-cols-1 gap-8 md:grid max-w-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-2xl">
                      <FolderPenIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        {...field}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-2xl">
                      <Euro className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />

                      <Input
                        {...field}
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
              {isSubmitting ? "Loading..." : submitButtonText}
            </Button>
            <Button className="ml-auto" type="submit">
              Annuler
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LicensesForm;
