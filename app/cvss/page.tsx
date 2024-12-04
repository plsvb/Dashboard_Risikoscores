export default function CVSSPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">CVSS Score Details</h1>
      
        Der <strong>Common Vulnerability Scoring System (CVSS)</strong> ist ein Industriestandard, 
        mit dem die Kritikalität von Schwachstellen international vergleichbar bewertet wird. 
        <br /> 
        <strong>Erste Version:</strong> 2005
        <br />
        Der technische Schweregrad einer Schwachstelle entspricht nicht dem Risiko. 
        Laut <strong>ISO/IEC 27005</strong> wird Risiko definiert als die Möglichkeit, dass eine Schwachstelle 
        ausgenutzt wird und dadurch ein Schaden für das Unternehmen entsteht. 
        <br />
        Mit <strong>CVSS 4.0</strong> wurden zuvor nicht berücksichtigte Faktoren wie Automatisierbarkeit oder 
        Dringlichkeit eingeführt. Zudem ist die neue Version auch auf Schwachstellen von IoT, industriellen 
        Steuerungssystemen und <em>Operational Technology (OT)</em> anwendbar.
        <br /><br />
        Die Metriken von CVSS 4.0 sind in drei Wertegruppen unterteilt: <strong>Base</strong>, <strong>Environmental</strong> 
        und <strong>Threat</strong>, ergänzt durch die neue Kategorie <strong>Supplemental</strong>.
        <ul className="list-disc ml-6">
          <li>
            <strong>Base Score (CVSS-B):</strong> Maß für die Schwere einer Schwachstelle.
          </li>
          <li>
            <strong>Base + Threat Score (CVSS-BT):</strong> Berücksichtigt zeitlich ändernde Faktoren (ehemals Temporal).
          </li>
          <li>
            <strong>Base + Environmental Score (CVSS-BE):</strong> Integriert eine Analyse der Umgebung.
          </li>
          <li>
            <strong>Base + Threat + Environmental Score (CVSS-BTE):</strong> Kombination aller Faktoren für eine realistische Risikobewertung.
          </li>
          <li>
            <strong>Supplemental:</strong> Liefert zusätzliche Informationen, ohne den Gesamt-Score zu beeinflussen 
            (z. B. Automatisierbarkeit, Dringlichkeit).
          </li>
        </ul>
        Die Scores werden in folgende Stufen eingeteilt:
        <ul className="list-disc ml-6">
          <li>0 = None</li>
          <li>0.1-3.9 = Low</li>
          <li>4.0-6.9 = Medium</li>
          <li>7.0-8.9 = High</li>
          <li>9.0-10.0 = Critical</li>
        </ul>
        <br />
        Laut dem CVSS 4.0 User Guide (<em>2.2</em>) misst der Base Score die <strong>Schwere</strong>, 
        nicht das <strong>Risiko</strong>. Er sollte durch eine Analyse der Umgebung (Environmental Metrics) 
        und durch zeitlich veränderliche Attribute (Threat Metrics) ergänzt werden. 
        Dadurch kann der kombinierte <strong>CVSS-BTE-Score</strong> als realistischere Risikobewertung dienen.
      
    </div>
  );
}

  