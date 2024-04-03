"use client";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Users, Euro, FolderPenIcon, Mail, Factory } from "lucide-react";
import { useForm } from "react-hook-form";
import { Organization, type LicenseType } from "@prisma/client";
import { isEmailLinkError, useClerk, useSignUp } from "@clerk/nextjs";
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

interface ExtendedOrganization extends Organization {
  hrEmail?: string;
  licenseTypeId?: string;
  validUntil?: string;
}
interface OrganizationFormProps {
  initialData?: ExtendedOrganization | null | undefined;
  licenses?: LicenseType[];
  type?: "create" | "update";
}

const EmployeesForm = ({
  initialData,
  licenses,
  type = "create",
}: OrganizationFormProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  // const [error, setError] = useState(null);
  const [error, setError] = useTimeOutMessage();
  const [expired, setExpired] = useState(false);
  const [verified, setVerified] = useState(false);
  const submitButtonText = initialData ? "Update" : "Create";
  const { signUp, isLoaded, setActive } = useSignUp();

  const router = useRouter();

  const formSchema = yup.object({
    email: yup.string().email().required("Email is required"),
  });

  type OrganizationFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "zakisb97@gmail.com",
    },
  });

  const addOrganization = async (values: OrganizationFormFields) => {
    try {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, validUntil: new Date() }),
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

  if (!isLoaded) {
    return null;
  }

  const onSubmit = async (values: OrganizationFormFields) => {
    // setSubmitting(true);
    console.log(values);

    if (!isLoaded) {
      return null;
    }
    console.log(process.env.NEXT_PUBLIC_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/invitations`, {
      method: "POST",
      body: JSON.stringify({ email_address: "zakisb97@gmail.com" }),
    });

    console.log(res);
  };

  return (
    <div className="mt-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid-cols-1 gap-8 md:grid max-w-xl">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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

            {error && <ErrorMessage description={error} />}

            {/* {error && } */}
          </div>

          <div className="space-x-4">
            <Button loading={isSubmitting} className="ml-auto" type="submit">
              {isSubmitting ? "Loading..." : submitButtonText}
            </Button>
            <Button className="ml-auto" type="submit">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeesForm;
