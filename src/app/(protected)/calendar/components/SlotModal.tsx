import { Button } from "@/components/ui/button";
import {
  useState,
  useOptimistic,
  useTransition,
  useEffect,
  useRef,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { sessionTypes } from "@/constants/session-types.constant";
import { Clock, PlusCircle, MinusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@/components/ui/error-message";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format, set } from "date-fns";
import { locales } from "@/constants/locales.constant";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { QueryObserverResult } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as yup from "yup";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";
import { getOrganizations } from "@/services/OrganizationServices";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { TimePickerInput } from "@/components/ui/time-picker-input";

interface SlotModalProps {
  isOpen?: boolean;
  setIsOpen: (value: boolean) => () => void;
  refetchEvents: () => Promise<QueryObserverResult<any>>;
}

const fetchOrganizationsList = async () => {
  const response = await fetch("/api/organizations");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const fetchOrganizationsLicenses = async (id: string) => {
  const response = await fetch(`/api/organizations/licenses?orgId=${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const fetchAvailableCoaches = async (id: string) => {
  const response = await fetch(`/api/accounts?role=coach`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const weekDaysOptions: Option[] = [
  { value: "2", label: "Lundi" },
  { value: "3", label: "Mardi" },
  { value: "4", label: "Mercredi" },
  { value: "5", label: "Jeudi" },
  { value: "6", label: "Vendredi" },
];

export default function SlotModal({
  isOpen = false,
  setIsOpen,
  refetchEvents,
}: SlotModalProps) {
  const [error, setError] = useTimeOutMessage();
  const [orgLicensesList, setOrgLicensesList] = useState([]);
  const [coachesList, setCoachesList] = useState([]);
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  const optionSchema = yup.object().shape({
    value: yup.string().required(),
    label: yup.string().required(),
  });

  const formSchema = yup.object({
    organization: yup.string().required(`L'organization est requise`),
    debutDate: yup.date(),
    license: yup.string().required(`La license est requise`),
    period: yup.string().required(`la période de la séance est requise`),
    schedule: yup.array().of(
      yup.object().shape({
        coachId: yup.string().required(`le coach est requis`),
        dayOfWeek: yup.string().required(`le jour est requis`),
        startTime: yup.date().required(`l'horaire est requise`),
        sessionType: yup.string().required(`le type de sessions est requis`),
        sessionDuration: yup
          .string()
          .required(`la durée de la séance est requise`),
      })
    ),
  });

  type LicenseFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      organization: "",
      debutDate: new Date(),
      license: "",
      period: "1",
      schedule: [],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });
  const onSubmit = async (values: LicenseFormFields) => {
    try {
      const response = await fetch("/api/coaching-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      toast.success("Créneaux ajoutées avec succès");
      refetchEvents();
      setIsOpen(false);
      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const { data: organizationsList, refetch } = useQuery({
    queryKey: ["organizationsList"],
    queryFn: fetchOrganizationsList,
    enabled: false,
  });

  const getOrganizationLicenses = async (id: string) => {
    try {
      const res = await fetchOrganizationsLicenses(id);
      setOrgLicensesList(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getCoaches = async () => {
    try {
      const res = await fetchAvailableCoaches();
      console.log(res);
      setCoachesList(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[725px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Réserver une session</DialogTitle>
          <DialogDescription>
            Sélectionnez les informations nécessaires pour un créneau
            hebdomadaire
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
          >
            <div className="grid-cols-1 gap-8 md:grid max-w-xl">
              {/* Organizations   */}
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entreprise</FormLabel>
                    <Select
                      onValueChange={async (value) => {
                        setOrgLicensesList([]);
                        form.setValue("license", "");
                        form.setValue("schedule", []);
                        form.setValue("organization", value);
                        await getOrganizationLicenses(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Veuillez séléctionner l'entreprise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {organizationsList?.map((organization) => (
                          <SelectItem
                            key={`${organization.id}-${organization.name}`}
                            value={organization.id.toString()}
                          >
                            {organization.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Licenses  */}
              {orgLicensesList.length > 0 && (
                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Licence</FormLabel>
                      <Select
                        onValueChange={async (value) => {
                          const selectedLicense = orgLicensesList.find(
                            (el) => el.id == value
                          );
                          await getCoaches();
                          for (
                            let i = 0;
                            i < selectedLicense.sessionNumber;
                            i++
                          ) {
                            append({
                              coachId: "",
                              dayOfWeek: "2",
                              startTime: new Date(),
                              sessionType: "yoga",
                              sessionDuration: "30",
                            });
                          }
                          form.setValue("license", value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Veuillez séléctionner la licence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {orgLicensesList?.map((license) => (
                            <SelectItem
                              key={`${license.id}-${license.name}`}
                              value={license.id.toString()}
                            >
                              {license.licenseType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Période (en semaine)</FormLabel>
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
                        <SelectItem value="1">1 semaine</SelectItem>
                        <SelectItem value="2">2 semaines</SelectItem>
                        <SelectItem value="3">3 semaines</SelectItem>
                        <SelectItem value="4">4 semaines</SelectItem>
                        <SelectItem value="5">5 semaines</SelectItem>
                        <SelectItem value="6">6 semaines</SelectItem>
                        <SelectItem value="7">7 semaines</SelectItem>
                        <SelectItem value="8">8 semaines</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="debutDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-1">
                      Date de début
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

              <Accordion
                type="single"
                defaultValue="item-0"
                collapsible
                className="w-full"
              >
                {orgLicensesList.length > 0 &&
                  fields.map((field, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={`item-${index}`}
                    >
                      <AccordionTrigger>Session {index + 1}</AccordionTrigger>
                      <AccordionContent>
                        <div
                          key={field.id}
                          className="grid grid-cols-4 items-center gap-4"
                        >
                          <div className="col-span-2">
                            <FormField
                              control={form.control}
                              name={`schedule.${index}.dayOfWeek`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Jour de semaine</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Le jour" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {weekDaysOptions.map((el) => (
                                        <SelectItem
                                          key={el.value}
                                          value={el.value}
                                        >
                                          {el.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`schedule.${index}.sessionDuration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Durée (en minutes)</FormLabel>
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
                                    <SelectItem value="30">
                                      30 minutes
                                    </SelectItem>
                                    <SelectItem value="45">
                                      45 minutes
                                    </SelectItem>
                                    <SelectItem value="60">
                                      60 minutes
                                    </SelectItem>
                                    <SelectItem value="90">
                                      90 minutes
                                    </SelectItem>
                                    <SelectItem value="120">
                                      120 minutes
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`schedule.${index}.startTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Horaire
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <div className="flex flex-row items-center gap-5">
                                    <div className="flex items-end gap-1">
                                      <div className="grid gap-1 text-center">
                                        <TimePickerInput
                                          picker="hours"
                                          date={new Date(field.value)}
                                          setDate={(date) => {
                                            form.setValue(
                                              `schedule.${index}.startTime`,
                                              date
                                            );
                                          }}
                                          ref={hourRef}
                                          onRightFocus={() =>
                                            minuteRef.current?.focus()
                                          }
                                        />
                                      </div>
                                      <div className="grid gap-1 text-center">
                                        <TimePickerInput
                                          picker="minutes"
                                          date={new Date(field.value)}
                                          setDate={(date) => {
                                            form.setValue(
                                              `schedule.${index}.startTime`,
                                              date
                                            );
                                          }}
                                          ref={minuteRef}
                                          onLeftFocus={() =>
                                            hourRef.current?.focus()
                                          }
                                          onRightFocus={() =>
                                            secondRef.current?.focus()
                                          }
                                        />
                                      </div>
                                      <div className="flex h-10 items-center">
                                        <Clock className="ml-2 h-4 w-4" />
                                      </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2"></div>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="col-span-2">
                            <FormField
                              control={form.control}
                              name={`schedule.${index}.coachId`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Coachs disponibles</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Veuillez séléctionner le coach" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {coachesList.map((el) => (
                                        <SelectItem
                                          value={el.id.toString()}
                                          key={`${el.id}-${el.user.firstName}`}
                                          className="capitalize"
                                        >
                                          {el.user.firstName} {el.user.lastName}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-2">
                            <FormField
                              control={form.control}
                              name={`schedule.${index}.sessionType`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Type de session</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="type d'entraînement" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {sessionTypes.map((el) => (
                                        <SelectItem
                                          value={el.value}
                                          key={el.value}
                                        >
                                          {el.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>

              {error && <ErrorMessage description={error} />}

              {/* {error && } */}
            </div>

            <div className="space-x-4 ml-auto">
              <Button
                loading={form.formState.isSubmitting}
                className="ml-auto"
                type="submit"
              >
                {form.formState.isSubmitting ? "Loading..." : "Ajouter"}
              </Button>
              <Button
                className="ml-auto"
                variant={"outline"}
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
