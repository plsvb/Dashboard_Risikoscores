import { useState } from "react";
import CVEListItem from "./CVEListItem";

export default function CVEList({ items }: { items: any[] }) {
  const [expandedCVE, setExpandedCVE] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCVE(expandedCVE === id ? null : id);
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <CVEListItem
          key={item.cve.CVE_data_meta.ID}
          item={item}
          isExpanded={expandedCVE === item.cve.CVE_data_meta.ID}
          onClick={() => toggleExpand(item.cve.CVE_data_meta.ID)}
        />
      ))}
    </ul>
  );
}
