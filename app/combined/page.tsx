export default function CombinedPage() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Combined Score</h1>
        <p className="text-lg">
          Der kombinierte Score ist ein Durchschnittswert, der mehrere Faktoren
          wie CVSS, EPSS, SSVC und VPR berücksichtigt, um eine umfassende
          Bewertung der Sicherheitslücke zu liefern.
        </p>
        <p className="text-lg mt-4">
          Diese Seite wird in zukünftigen Versionen detaillierte Einblicke in die
          Berechnung und Interpretation des kombinierten Scores bieten.
        </p>
      </div>
    );
  }
  