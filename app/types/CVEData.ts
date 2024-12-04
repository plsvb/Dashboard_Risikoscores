export interface CVEData {
    cve: {
      CVE_data_meta: {
        ID: string;
      };
      description: {
        description_data: { value: string }[];
      };
      references: {
        reference_data: { url: string; name?: string }[];
      };
    };
    impact?: {
      baseMetricV3?: {
        cvssV3?: {
          baseSeverity: string;
          baseScore: number;
          attackVector: string;
        };
      };
    };
  }
  