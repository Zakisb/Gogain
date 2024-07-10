"use client";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Users, Euro, FolderPenIcon, Mail, Dumbbell } from "lucide-react";
import { useForm } from "react-hook-form";
import { Organization, type LicenseType } from "@prisma/client";
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
import { industryOptions } from "@/constants/industries.constant";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/error-message";
import { Button } from "@/components/ui/button";
import { apiCreateLicense, apiUpdateLicense } from "@/services/LicenseServices";
import { toast } from "sonner";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";
import { useSignUp } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

interface UserFormProps {
  firstName: string;
  lastName: string;
  email: string;
  role: "HR";
}

const fetchLicenses = async () => {
  const response = await fetch(`/api/licenses`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const LicensePurchaseForm = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  // const [error, setError] = useState(null);
  const [error, setError] = useTimeOutMessage();
  const submitButtonText = "Acheter";
  const router = useRouter();

  const formSchema = yup.object({
    licenseTypeId: yup.string().required("La license est requise"),
    validUntil: yup.string().required("Subscription Duration is required"),
    sessionNumber: yup
      .number()
      .required(`Le nombre de session coaching est requis`),
    numberOfUsers: yup.number().required(`Le nombre d'utilisateur est requis`),
  });

  type LicensePurchaseFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      licenseTypeId: "",
      validUntil: "1",
      sessionNumber: 1,
      numberOfUsers: 1,
    },
  });

  const { data: licensesList, refetch } = useQuery({
    queryKey: ["organizationsList"],
    queryFn: fetchLicenses,
  });

  const purchaseLicense = async (values: LicensePurchaseFormFields) => {
    try {
      const currentDate = new Date();
      const validUntil = new Date(
        currentDate.setMonth(
          currentDate.getMonth() + parseInt(values.validUntil)
        )
      );

      const response = await fetch("/api/organizations/licenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, organizationId, validUntil }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const onSubmit = async (values: LicensePurchaseFormFields) => {
    setSubmitting(true);
    toast.promise(purchaseLicense(values), {
      loading: "Chargement...",
      success: (data) => {
        router.refresh();
        return `Succès! Licence achetée et accordée avec succès.`;
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
              name="licenseTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licence</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Assigner une license" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {licensesList?.map((license: LicenseType) => (
                        <SelectItem
                          key={license.id}
                          value={license.id.toString()}
                        >
                          {license.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée de l'abonnement (mois)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
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

export default LicensePurchaseForm;
