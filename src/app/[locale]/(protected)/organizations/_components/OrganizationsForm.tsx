"use client";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Users, Euro, FolderPenIcon, Mail, Factory } from "lucide-react";
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

interface NewLicenseType extends Omit<LicenseType, "id"> {}

interface OrganizationFormProps {
  initialData?: LicenseType | null | undefined;
  licenses: LicenseType[];
}

const OrganizationsForm = ({
  initialData,
  licenses,
}: OrganizationFormProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  // const [error, setError] = useState(null);
  const [error, setError] = useTimeOutMessage();
  const submitButtonText = initialData ? "Update" : "Create";
  const router = useRouter();

  const formSchema = yup.object({
    name: yup.string().required("Name is required"),
    hrEmail: yup.string().email().required(),
    licenseTypeId: yup.string().required(),
    industry: yup.string().required(),
    validUntil: yup.string().required(),
  });

  type OrganizationFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "test",
      hrEmail: "karim@gmail.com",
      licenseTypeId: "8",
      industry: "automotive",
      validUntil: "1",
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

  const onSubmit = async (values: OrganizationFormFields) => {
    // setSubmitting(true);
    toast.promise(addOrganization(values), {
      loading: "Loading",
      success: (data) => {
        return `Success! License has been created.`;
      },
      error: (error) => {
        setError(error?.message);
        return error?.message;
      },
      finally: () => {
        setSubmitting(false);
      },
    });
    if (initialData) {
      // toast.promise(apiUpdateLicense(values), {
      //   loading: "Loading",
      //   success: (data) => {
      //     router.back();
      //     router.refresh();
      //     return `Success! License has been updated.`;
      //   },
      //   error: (data) => {
      //     setError(data?.message);
      //     return "error";
      //   },
      //   finally: () => {
      //     setSubmitting(false);
      //   },
      // });
    } else {
    }
  };

  return (
    <div className="mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid-cols-1 gap-8 md:grid max-w-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
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
                  <FormLabel> Organization's Industry</FormLabel>
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
                        <SelectValue placeholder="Assign a license" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {licenses.map((license) => (
                        <SelectItem
                          key={license.id}
                          value={license.id.toString()}
                        >
                          {license.name}
                        </SelectItem>
                      ))}
                      {/* <SelectItem value="weightLoss">
                        {t("form.fields.type.options.weightLoss")}
                      </SelectItem>
                      <SelectItem value="muscleGain">
                        {t("form.fields.type.options.muscleGain")}
                      </SelectItem> */}
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
                  <FormLabel>Subscription Duration (months)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    value={field.value.toString()}
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

export default OrganizationsForm;
