import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function RiskAssessmentApp() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    hazard: "",
    who: "",
    controls: "",
    risk: "",
    additional: "",
    revised: ""
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const addEntry = () => {
    setEntries([...entries, form]);
    setForm({ hazard: "", who: "", controls: "", risk: "", additional: "", revised: "" });
  };

  const riskColor = (value) => {
    const score = parseInt(value);
    if (score <= 3) return "green";
    if (score <= 6) return "orange";
    return "red";
  };

  const exportPDF = () => {
    const input = document.getElementById("print-area");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("risk-assessment.pdf");
    });
  };

  return (
    <div className="p-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <img src="/logo.png" alt="Carter Safety Templates Logo" style={{ height: "60px", margin: "auto", display: "block" }} />
      <h1 style={{ textAlign: "center" }}>Risk Assessment Builder</h1>
      <div style={{ marginBottom: "20px" }}>
        <input placeholder="Hazard" value={form.hazard} onChange={handleChange("hazard")} />
        <input placeholder="Who Might Be Harmed" value={form.who} onChange={handleChange("who")} />
        <textarea placeholder="Existing Controls" value={form.controls} onChange={handleChange("controls")} />
        <input placeholder="Risk Rating (L x S)" value={form.risk} onChange={handleChange("risk")} />
        <textarea placeholder="Further Controls Needed" value={form.additional} onChange={handleChange("additional")} />
        <input placeholder="Revised Risk Rating" value={form.revised} onChange={handleChange("revised")} />
        <button onClick={addEntry}>Add Entry</button>
        <button onClick={exportPDF}>Export to PDF</button>
      </div>
      <div id="print-area">
        {entries.map((entry, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p><strong>Hazard:</strong> {entry.hazard}</p>
            <p><strong>Who:</strong> {entry.who}</p>
            <p><strong>Controls:</strong> {entry.controls}</p>
            <p style={{ backgroundColor: riskColor(entry.risk) }}><strong>Risk Rating:</strong> {entry.risk}</p>
            <p><strong>Further Controls:</strong> {entry.additional}</p>
            <p style={{ backgroundColor: riskColor(entry.revised) }}><strong>Revised Rating:</strong> {entry.revised}</p>
          </div>
        ))}
      </div>
    </div>
  );
}