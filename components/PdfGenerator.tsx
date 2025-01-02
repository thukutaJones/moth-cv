"use client";

import { useState } from "react";
import axios from "axios";
import Templates from "@/constants/templates";

const PdfGenerator = ({
  setPageError,
  template,
}: {
  setPageError: any;
  template: string;
}) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generatePdf = async () => {
    setIsGenerating(true);
    setPageError("");
    try {
      if (!template) {
        setPageError("Please select a template first");
        return;
      }

      const token: string = localStorage.getItem("moth-cv-token") || "";
      const templates = await Templates(token);
      const htmlContent = templates[template as keyof typeof templates] || "";

      const response = await axios.post(
        "/api/generate-pdf",
        { htmlContent },
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "document.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setPageError("Error exporting CV");
      }
    } catch (error) {
      setPageError("Error exporting CV");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="bg-green-500 px-8 py-2  rounded-lg shadow-lg text-white font-bold font-sans cursor-pointer hover:scale-105"
      onClick={!isGenerating ? generatePdf : () => null}
    >
      {isGenerating ? (
        <div className="w-5 h-5 border-t-2 border-r-2 border-white-600 rounded-full animate-spin" />
      ) : (
        <p>Export as pdf</p>
      )}
    </div>
  );
};

export default PdfGenerator;
