export type VideoLevel = "beginner" | "intermediate" | "advanced";

export const LEVEL_OPTIONS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export type VideoCategory =
  | "shoulders"
  | "cervical"
  | "coudes"
  | "dorsal"
  | "hanche"
  | "lombar"
  | "feet"
  | "wrists"
  | "static_dynamique_stability";

export const CATEGORY_OPTIONS: Record<string, string> = {
  shoulders: "Épaules",
  cervical: "Cervical",
  coudes: "Coudes",
  dorsal: "Dorsal",
  hanche: "Hanche",
  lombar: "lombaire",
  feet: "Pieds",
  wrists: "Poignets",
  static_dynamique_stability: "Stabilité statique et dynamique",
};
