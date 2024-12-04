"use client";
import { useState, useEffect } from "react";

type CVEItem = {
  cve: {
    CVE_data_meta: {
      ID: string;
    };
    description: {
      description_data: {
        lang: string;
        value: string;
      }[];
    };
  };
  impact?: {
    baseMetricV3?: {
      cvssV3?: {
        baseSeverity: string;
        baseScore: number;
      };
    };
  };
  publishedDate: string;
};

type CVEData = {
  CVE_data_numberOfCVEs: string;
  CVE_data_timestamp: string;
  CVE_Items: CVEItem[];
};

export default function Home() {
  const [cveData, setCveData] = useState<CVEData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/nvdcve-1.1-2024.json");
      const data = await response.json();
      setCveData(data);
    };

    fetchData();
  }, []);

  if (!cveData) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  const totalCVEs = cveData.CVE_data_numberOfCVEs;
  const lastUpdated = new Date(cveData.CVE_data_timestamp).toLocaleDateString();

  const topCVEs = cveData.CVE_Items.slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          CVE Dashboard
        </h1>
        <p className="text-center text-gray-600">
          Übersicht über aktuelle Sicherheitslücken
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total CVEs</h2>
          <p className="text-2xl font-bold text-gray-900">{totalCVEs}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Last Updated
          </h2>
          <p className="text-2xl font-bold text-gray-900">{lastUpdated}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Critical CVEs
          </h2>
          <p className="text-2xl font-bold text-red-600">
            {
              cveData.CVE_Items.filter(
                (item) =>
                  item.impact?.baseMetricV3?.cvssV3?.baseSeverity === "CRITICAL"
              ).length
            }
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Top 5 CVEs</h2>
        <ul className="space-y-4">
          {topCVEs.map((item) => (
            <li
              key={item.cve.CVE_data_meta.ID}
              className="bg-white shadow-md p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item.cve.CVE_data_meta.ID}
              </h3>
              <p className="text-gray-700 mt-2">
                {item.cve.description.description_data[0]?.value}
              </p>
              {item.impact?.baseMetricV3 && (
                <p className="text-sm text-gray-500 mt-2">
                  Severity:{" "}
                  <span
                    className={`font-semibold ${
                      item.impact.baseMetricV3.cvssV3.baseSeverity === "CRITICAL"
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    {item.impact.baseMetricV3.cvssV3.baseSeverity}
                  </span>
                  {" - Score: "}
                  {item.impact.baseMetricV3.cvssV3.baseScore}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
