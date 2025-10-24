"use client";

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./terms.css";
import { CloudDownloadOutlined } from "@ant-design/icons";

export default function TermsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("terms-of-service.pdf");
  };

  return (
    <div className="body">
      <div className="terms-container" ref={contentRef}>
        <h1 id="terms-title" className="terms-title">
          <div className="pdf-btn-container">
            <button onClick={handleDownloadPDF} className="pdf-btn">
              <CloudDownloadOutlined />
            </button>
          </div>
          Terms of Service
        </h1>

        <main className="terms-content" aria-labelledby="terms-title">
          <section className="terms-section" aria-labelledby="acceptance">
            <h2 id="acceptance" className="terms-section-title">
              1. Acceptance of Terms
            </h2>
            <p className="terms-text">
              By accessing or using ApartmentPro, you agree to comply with and be
              bound by these Terms of Service. If you do not agree, you may not
              use the platform.
            </p>
          </section>

          <section className="terms-section" aria-labelledby="usage">
            <h2 id="usage" className="terms-section-title">2. User Responsibilities</h2>
            <p className="terms-text">
              You agree to use ApartmentPro responsibly, avoid misuse of features,
              and comply with applicable laws and regulations while using our
              services.
            </p>
          </section>

          <section className="terms-section" aria-labelledby="privacy">
            <h2 id="privacy" className="terms-section-title">3. Privacy</h2>
            <p className="terms-text">
              Your use of ApartmentPro is also governed by our{" "}
              <a href="/privacy" className="terms-link">Privacy Policy</a>.
            </p>
          </section>

          <section className="terms-section" aria-labelledby="changes">
            <h2 id="changes" className="terms-section-title">4. Changes to Terms</h2>
            <p className="terms-text">
              We reserve the right to update or modify these terms at any time.
              Any significant changes will be communicated to users.
            </p>
          </section>
        </main>

        <footer className="terms-footer">
          © {new Date().getFullYear()} LCMApartmentPro. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
