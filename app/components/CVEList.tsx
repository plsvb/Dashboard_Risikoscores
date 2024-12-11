import CVEListItem from "./CVEListItem";
import { CVEData } from "../types/CVEData"; // Pfad anpassen

export default function CVEList({
  items,
  savedCVEIds,
  onToggleSave,
}: {
  items: CVEData[];
  savedCVEIds: string[];
  onToggleSave: (id: string) => void;
}) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <CVEListItem
          key={item.cve.CVE_data_meta.ID}
          item={item}
          isSaved={savedCVEIds.includes(item.cve.CVE_data_meta.ID)}
          onToggleSave={onToggleSave} // Weitergabe der Funktion
        />
      ))}
    </ul>
  );
}
