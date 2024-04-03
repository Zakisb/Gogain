"use client";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Clapperboard, Euro, FolderPenIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { type Video } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { FcVideoFile } from "react-icons/fc";
import FileItem from "@/components/ui/file-item";
import { toast } from "sonner";
import VideoPlayer from "./VideoPlayer";
import { Textarea } from "@/components/ui/textarea";
import { omit } from "lodash";
import { useFormStatus } from "react-dom";

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
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/error-message";
import { Button } from "@/components/ui/button";
import { apiCreateLicense, apiUpdateLicense } from "@/services/LicenseServices";
import { updateVideo } from "@/actions/videos";
import useTimeOutMessage from "@/hooks/useTimeOutMessage";

interface VideoFormProps {
  initialData?: Video | null | undefined;
  type?: "new" | "edit";
}

const tags: Option[] = [];

const VideoForm = ({ initialData, type = "new" }: VideoFormProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { pending } = useFormStatus();
  // const [error, setError] = useState(null);
  const [error, setError] = useTimeOutMessage();
  const submitButtonText = initialData ? "Mettre à jour" : "Mettre en ligne";
  const router = useRouter();
  const formSchema = yup.object({
    title: yup.string().required("Le titre est obligatoire"),
    description: yup.string(),
    category: yup.string().required("La catégorie est obligatoire"),
    level: yup.string().required("La difficulté est obligatoire"),
    tags: yup.array().of(yup.string()),
    source_video: yup.mixed().when("$type", {
      is: "edit",
      then: (schema) => schema,
      otherwise: (schema) =>
        schema
          .test(
            "filePresence",
            "Veuillez séléctionner un fichier au moins",
            (value) => {
              if (!value || value === "") return false;
              return true;
            }
          )
          .test("fileType", "Format de fichier invalide", (value) => {
            if (!value || value === "") return true; // Allow empty file input
            const supportedFormats = ["video/mp4", "video/quicktime"]; // Add more supported formats if needed
            return supportedFormats.includes(value[0].type);
          })
          .test("fileSize", "Taille du fichier pas supportée", (value) => {
            if (!value || value === "") return true; // Allow empty file input
            const maxSize = 1 * 1024 * 1024 * 1024; // 1GB
            return value[0].size <= maxSize;
          }),
    }),
  });

  type VideoFormFields = yup.InferType<typeof formSchema>;

  const form = useForm({
    resolver: yupResolver(formSchema),
    context: { type: "edit" },
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      level: initialData?.level || "beginner",
      tags: initialData?.tags || [],
      source_video: "",
    },
  });

  const fileRef = form.register("source_video");

  const updateVideoAction = async (data: VideoFormFields) => {
    return await updateVideo(
      omit({ ...data, id: initialData?.id }, "source_video")
    );
  };

  const onSubmit = async (values: VideoFormFields) => {
    if (initialData) {
      await updateVideoAction(values);
      toast.info("Vidéo mise à jour avec succès.");
      return;
    }

    toast.info(
      "Téléchargement de la vidéo en cours, veuillez ne pas quitter la page."
    );
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description ?? "");
    formData.append("category", values.category);
    formData.append("level", values.level);
    formData.append("tags", JSON.stringify(values.tags));
    formData.append("source_video", values.source_video[0]);

    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError(
          "Erreur lors du téléchargement de la vidéo. Veuillez réessayer."
        );
      }

      toast.success("Vidéo ajoutée avec succès");
      form.reset();
      return response;
    } catch (error) {
      console.error("Error uploading video:", error);
      throw error;
    }
  };

  return (
    <div className="relative pb-28">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid-cols-1 gap-8 md:grid max-w-xl">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    onClick={() => console.log(form.getValues("source_video"))}
                  >
                    Titre
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-2xl">
                      <Clapperboard className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        {...field}
                        className="pl-8"
                        placeholder="titre de la vidéo"
                        disabled={form.formState.isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center max-w-2xl">
                      <FolderPenIcon className="absolute left-2 top-3 h-4 w-4 transform" />
                      <Textarea
                        {...field}
                        className="pl-8"
                        placeholder="Description de la vidéo"
                        disabled={form.formState.isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {initialData ? (
              <VideoPlayer embedCode={initialData.embedCode} />
            ) : (
              <FormField
                control={form.control}
                name="source_video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label htmlFor="picture">Vidéo</Label>

                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      {form.getValues("source_video")?.length > 0 ? (
                        <FileItem file={form.getValues("source_video")[0]}>
                          {" "}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2"
                            onClick={() => form.setValue("source_video", "")}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </FileItem>
                      ) : (
                        <div className="col-span-full">
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <FcVideoFile
                                className="mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="source_video"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Téléchargez une vidéo </span>
                                  <Input
                                    id="source_video"
                                    type="file"
                                    className="hidden"
                                    {...fileRef}
                                  />
                                </label>
                                <p className="pl-1">
                                  ou bien faites-la glisser
                                </p>
                              </div>
                              <p className="text-xs leading-5 text-gray-600">
                                format mp4 jusqu&apos;à 1GB
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Séléctionner la catégorie de l'exercice" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="shoulders">Épaules</SelectItem>
                      <SelectItem value="cervical">Cervical</SelectItem>
                      <SelectItem value="coudes">Coudes</SelectItem>
                      <SelectItem value="dorsal">Dorsal</SelectItem>
                      <SelectItem value="hanche">Hanche</SelectItem>
                      <SelectItem value="lombar">lombaire</SelectItem>
                      <SelectItem value="feet">Pieds</SelectItem>
                      <SelectItem value="wrists">wrists</SelectItem>
                      <SelectItem value="static_dynamique_stability">
                        Stabilité statique et dynamique
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <MultipleSelector
                    {...field}
                    creatable
                    placeholder=" Ajouter des tags pour aider l'algorithme de séléction. "
                    hidePlaceholderWhenSelected
                    options={tags}
                    value={(field.value ?? []).map(
                      (value: string | undefined) => ({
                        label: value ?? "",
                        value: value ?? "",
                      })
                    )}
                    onChange={(values) => {
                      form.setValue(
                        "tags",
                        values.map((el) => el.value)
                      );
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <ErrorMessage description={error} />}

            {/* {error && } */}
          </div>

          <div className="space-x-4">
            <Button
              className="ml-auto"
              type="submit"
              loading={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? type == "new"
                  ? "Téléchargement de la vidéo en cours..."
                  : "Mise à jour en cours..."
                : submitButtonText}
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

export default VideoForm;
