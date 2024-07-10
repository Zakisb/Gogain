import { Button } from "@/components/ui/button";
import {
  useState,
  useOptimistic,
  useTransition,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { useSearchParams } from "next/navigation";
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
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@/components/ui/error-message";
import { LoaderIcon } from "lucide-react";
import { updateTrainingSession } from "@/actions/calendar";
import { useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
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
import { cloneDeep } from "lodash";
interface SlotModalProps {
  isOpen?: boolean;
  setIsOpen: (value: boolean) => () => void;
  refetchEvents: () => Promise<QueryObserverResult<any>>;
}

const fetchSessionData = async ({ queryKey }) => {
  const sessionId = queryKey[1];
  const response = await fetch(`/api/coaching-sessions/${sessionId}`);
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

export default function SessionModal({
  isOpen = false,
  setIsOpen,
  refetchEvents,
  sessionId,
}: SlotModalProps) {
  const [error, setError] = useTimeOutMessage();
  const [orgLicensesList, setOrgLicensesList] = useState([]);
  const [transitionPending, startTransition] = useTransition();
  const [coachesList, setCoachesList] = useState([]);
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const optionSchema = yup.object().shape({
    value: yup.string().required(),
    label: yup.string().required(),
  });

  const formSchema = yup.object({
    coachAccountId: yup.string().required(`le coach est requis`),
    trainingDay: yup.date().required(`la date est requise`),
    startTime: yup.date().required(`l'horaire est requise`),
    sessionType: yup.string().required(`le type de sessions est requis`),
    sessionDuration: yup.string().required(`la durée de la séance est requise`),
  });

  type LicenseFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      coachAccountId: "",
      trainingDay: new Date(),
      startTime: new Date(),
      sessionType: "yoga",
      sessionDuration: "",
      coachesList: [],
    },
  });

  const { data: coaches, isSuccess: isCoachesSuccess } = useQuery({
    queryKey: ["coachesList"],
    queryFn: fetchAvailableCoaches,
    enabled: isOpen,
  });

  const { data: sessionData, isPending } = useQuery({
    queryKey: ["sessionData", sessionId],
    queryFn: fetchSessionData,
    enabled: isCoachesSuccess && isOpen,
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const onSubmit = async (values: LicenseFormFields) => {
    const trainingDate = new Date(values.trainingDay);
    const startTime = new Date(values.startTime);

    trainingDate.setHours(startTime.getHours());
    trainingDate.setMinutes(startTime.getMinutes());
    trainingDate.setSeconds(startTime.getSeconds());

    const { sessionType, coachAccountId, sessionDuration } = values;

    startTransition(async () => {
      toast.promise(
        updateTrainingSession(sessionId, {
          time: trainingDate,
          sessionType,
          coachAccountId: parseInt(coachAccountId),
          duration: parseInt(sessionDuration),
        }),
        {
          loading: "Chargement...",
          success: (data) => {
            setIsOpen(false);
            refetchEvents();
            return `La session a été modifiée avec succès!`;
          },
          error: (data) => {
            console.log("error", data);
            return "erreur";
          },
        }
      );

      setIsOpen(false);
      refetchEvents();
    });
  };

  useEffect(() => {
    if (sessionData) {
      form.setValue("sessionType", sessionData.sessionType);
      form.setValue("coachAccountId", sessionData.coachAccountId.toString());
      form.setValue("sessionDuration", sessionData.duration.toString());
      form.setValue("startTime", sessionData.time);
      form.setValue("trainingDay", sessionData.time);
    }
  }, [sessionData, coaches]);

  if (isPending) {
    return;
  }

  const test = form.watch("sessionType");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[725px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Modifier la session</DialogTitle>
          <DialogDescription>
            Modifier les informations de la session
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col"
            >
              <div className="grid-cols-1 gap-8 md:grid max-w-xl">
                <Controller
                  name="sessionType"
                  control={form.control}
                  defaultValue={form.getValues("sessionType")}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de session</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          if (value === "") {
                            return;
                          } else {
                            field.onChange(value);
                          }
                        }}
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
                              key={`sessionType-${el.value}`}
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
                <Controller
                  name="coachAccountId"
                  control={form.control}
                  defaultValue={form.getValues("coachAccountId")}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coachs disponibles</FormLabel>{" "}
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          if (value === "") {
                            return;
                          } else {
                            field.onChange(value);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Veuillez sélectionner le coach" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {coaches.map((el) => (
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

                <Controller
                  name="sessionDuration"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée (en minutes)</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          if (value === "") {
                            return;
                          } else {
                            field.onChange(value);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Durée de la séance" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="trainingDay"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1">
                        Jour d&apos;entraînement
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
                                <span> Jour d&apos;entraînement</span>
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
                  name={`startTime`}
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
                                  form.setValue(`startTime`, date);
                                }}
                                ref={hourRef}
                                onRightFocus={() => minuteRef.current?.focus()}
                              />
                            </div>
                            <div className="grid gap-1 text-center">
                              <TimePickerInput
                                picker="minutes"
                                date={new Date(field.value)}
                                setDate={(date) => {
                                  form.setValue(`startTime`, date);
                                }}
                                ref={minuteRef}
                                onLeftFocus={() => hourRef.current?.focus()}
                                onRightFocus={() => secondRef.current?.focus()}
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
        )}
      </DialogContent>
    </Dialog>
  );
}
