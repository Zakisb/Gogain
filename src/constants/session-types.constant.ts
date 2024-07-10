import { Option } from "@/components/ui/multiple-selector";

export const sessionTypes: Option[] = [
  { value: "cardio", label: "Cardio" },
  { value: "coreTraining", label: "Entraînement du tronc" },
  { value: "functionnalTraining", label: "Entraînement fonctionnel" },
  { value: "mindfulness", label: "Pleine conscience" },
  { value: "pilates", label: "Pilates" },
  { value: "stretching", label: "Étirement" },
  { value: "yoga", label: "Yoga" },
];

export const sessionTypesMapping = {
  cardio: { label: "Cardio", color: "red" },
  coreTraining: { label: "Entraînement du tronc", color: "orange" },
  functionnalTraining: { label: "Entraînement fonctionnel", color: "emerald" },
  mindfulness: { label: "Pleine conscience", color: "purple" },
  pilates: { label: "Pilates", color: "cyan" },
  stretching: { label: "Étirement", color: "green" },
  yoga: { label: "Yoga", color: "yellow" },
};
