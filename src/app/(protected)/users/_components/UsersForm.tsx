"use client";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Users, Euro, FolderPenIcon, Mail, Dumbbell } from "lucide-react";
import { useForm } from "react-hook-form";
import { type Account, type User } from "@prisma/client";
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

interface UserWithMainAccount extends User {
  accounts: Account[];
}

interface UserFormProps {
  initialData?: UserWithMainAccount | null | undefined;
  type?: "create" | "update";
}

const UsersForm = ({ initialData, type = "create" }: UserFormProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  // const [error, setError] = useState(null);
  const [error, setError] = useTimeOutMessage();
  const submitButtonText = initialData ? "Mettre à jour" : "Créer";
  const router = useRouter();

  const formSchema = yup.object({
    firstName: yup.string().required("Prénom est requis"),
    lastName: yup.string().required("Nom est requis"),
    email: yup
      .string()
      .email("L'adresse email est invalide")
      .required("Email est requis"),
    role: yup.string().required("Role est requis"),
  });

  type OrganizationFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    context: { type },
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      role: initialData?.accounts[0]?.role || "ADMIN",
    },
  });

  const addUser = async (values: OrganizationFormFields) => {
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

  const editOrganizations = async (values: OrganizationFormFields) => {
    try {
      const { firstName, lastName } = values;
      const response = await fetch(`/api/users/${initialData?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
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

  const onSubmit = async (values: OrganizationFormFields) => {
    setSubmitting(true);

    if (initialData) {
      toast.promise(editOrganizations(values), {
        loading: "Loading",
        success: (data) => {
          router.refresh();
          return `Profile utilisateur mis à jour avec succès`;
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
      toast.promise(addUser(values), {
        loading: "Loading",
        success: (data) => {
          router.refresh();
          return `Succès! Utilisateur créé. Il recevra un lien de création de compte via email.`;
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
              name="lastName"
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Prénom
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-2xl">
                      <Mail className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        {...field}
                        className="pl-8"
                        disabled={type === "update"}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={type === "update"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Specify the organization industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userRoleOptions.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default UsersForm;
