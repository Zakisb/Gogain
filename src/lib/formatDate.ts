import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function formatDate(
  date: string | Date,
  formatStr = "d MMM yyyy, HH:mm"
) {
  return format(new Date(date), formatStr, { locale: fr });
}
