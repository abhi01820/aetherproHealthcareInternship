import React from "react";
import Footer from "@/components/Footer";
import EHRReportComponenet from "@/components/EHRReport";
import AppHeader from "../dashboard/_components/AppHeader";

function EHRReport() {
  return (
    <main className="min-h-screen bg-white text-gray-800 pt-28 px-4">
      <div className="print:hidden">
        <AppHeader />
      </div>
      <EHRReportComponenet />
      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}

export default EHRReport;
