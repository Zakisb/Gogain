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
  Copyright,
} from "lucide-react";
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

interface ExtendedOrganization extends Organization {
  hrEmail?: string;
  licenseTypeId?: string;
  validUntil?: string;
  sessionNumber: number;
  numberOfEmployees: number;
  numberOfUsers: number;
}
interface OrganizationFormProps {
  initialData?: ExtendedOrganization | null | undefined;
  licenses?: LicenseType[];
  type?: "create" | "update";
}

interface UserFormProps {
  firstName: string;
  lastName: string;
  email: string;
  role: "HR";
}

const OrganizationsForm = ({
  initialData,
  licenses,
  type = "create",
}: OrganizationFormProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  // const [error, setError] = useState(null);
  const [error, setError] = useTimeOutMessage();
  const submitButtonText = initialData ? "Mettre à jour" : "Créer";
  const router = useRouter();

  const formSchema = yup.object({
    name: yup.string().required("Name is required"),
    hrEmail: yup.string().when("$type", ([type], schema) => {
      if (type === "create") {
        return schema.email().required(`L'addresse mail du RH est requise`);
      }
      return schema;
    }),
    licenseTypeId: yup.string(),
    validUntil: yup.string().when("$type", ([type], schema) => {
      if (type === "create") {
        return schema.required("Subscription Duration is required");
      }
      return schema;
    }),
    industry: yup.string().required(`L'industrie de l'entreprise est requise`),
    numberOfEmployees: yup.number().required(`Le nombre d'employés est requis`),
    sessionNumber: yup.number().when("$type", ([type], schema) => {
      if (type === "create") {
        return schema.required(`Le nombre de session coaching est requis`);
      }
      return schema;
    }),
    numberOfUsers: yup.number().required(`Le nombre d'utilisateurs est requis`),
  });

  type OrganizationFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    context: { type },
    defaultValues: initialData || {
      name: "",
      hrEmail: "",
      licenseTypeId: "",
      industry: "automotive",
      numberOfEmployees: 1,
      validUntil: "1",
      sessionNumber: 1,
      numberOfUsers: 1,
    },
  });

  const addOrganization = async (values: OrganizationFormFields) => {
    try {
      const currentDate = new Date();
      const validUntil = new Date(
        currentDate.setMonth(
          currentDate.getMonth() + parseInt(values.validUntil)
        )
      );
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, validUntil }),
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

  const editOrganizations = async (values: OrganizationFormFields) => {
    try {
      const response = await fetch("/api/organizations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: initialData?.id,
          name: values.name,
          industry: values.industry,
        }),
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

  const addUser = async (values: UserFormProps) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      form.reset();

      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const onSubmit = async (values: OrganizationFormFields) => {
    setSubmitting(true);

    if (initialData) {
      toast.promise(editOrganizations(values), {
        loading: "Chargement...",
        success: (data) => {
          router.refresh();
          return `Succès! Organisation mise à jour.`;
        },
        error: (error) => {
          setError(error?.message);
          return error?.message;
        },
        finally: () => {
          setSubmitting(false);
        },
      });
    } else {
      const promises = [
        addOrganization(values),
        addUser({
          firstName: "",
          lastName: "",
          email: values.hrEmail || "",
          role: "HR",
        }),
      ];

      toast.promise(Promise.all(promises), {
        loading: "Chargement...",
        success: (data) => {
          router.refresh();
          return `Succès! Organisation crée.`;
        },
        error: (error) => {
          setError(error?.message);
          return error?.message;
        },
        finally: () => {
          setSubmitting(false);
        },
      });
    }
  };

  return (
    <div className="mt-12">
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
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indusrie de l&apos;entreprise</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Specify the organization industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industryOptions.map((indistry) => (
                        <SelectItem key={indistry.value} value={indistry.value}>
                          {indistry.label}
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
              name="numberOfEmployees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre d&apos;employés</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-2xl ">
                      <Users className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        {...field}
                        placeholder="Nombre d'employés"
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
            {type === "create" && (
              <>
                <FormField
                  control={form.control}
                  name="hrEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HR Email</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center max-w-2xl">
                          <Mail className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                          <Input {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licenseTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License</FormLabel>
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
                          {licenses?.map((license) => (
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
                      <FormLabel>Durée de l&apos;abonnement (mois)</FormLabel>
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
                      <FormLabel>
                        Nombre de sessions coaching par semaine
                      </FormLabel>
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
                      <FormLabel>
                        Nombre d&apos;utilisateur par licence
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center max-w-2xl ">
                          <Copyright className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                          <Input
                            {...field}
                            placeholder="Nombre d'utilisateur par licence"
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
              </>
            )}

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

export default OrganizationsForm;
