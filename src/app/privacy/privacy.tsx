"use client";

import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./privacy.css";
import { CloudDownloadOutlined } from "@ant-design/icons";

export default function PrivacyPage() {
  const contentRef = useRef<HTMLDivElement>(null);

 const downloadPDF = async () => {
  if (!contentRef.current) return;

  const element = contentRef.current;
  const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Add extra pages if content is longer than one page
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save("PrivacyPolicy.pdf");
};


  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <div className="pdf-btn-container">
        <button onClick={downloadPDF} className="pdf-btn">
          <CloudDownloadOutlined />
        </button>
        </div>
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: August 21, 2025</p>
        
      </header>

      <div className="privacy-content" ref={contentRef}>
        <section className="section">
          <div className="section-header">
            <div className="section-number">1</div>
            <h2 className="section-title">Information We Collect</h2>
          </div>
          <div className="section-content">
            <p>
              We may collect personal information such as name, email, and usage
              data when you use our platform.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <div className="section-number">2</div>
            <h2 className="section-title">How We Use Information</h2>
          </div>
          <div className="section-content">
            <p>
              Information is used to provide services, improve user experience,
              and communicate important updates.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <div className="section-number">3</div>
            <h2 className="section-title">Data Protection</h2>
          </div>
          <div className="section-content">
            <p>
              We implement reasonable measures to protect user data but cannot
              guarantee absolute security.
            </p>
          </div>
        </section>

        <div className="contact-info">
          <p className="contact-title">Have questions?</p>
          <a
            href="mailto:lcmsupport@apartmentpro.com"
            className="contact-email"
          >
            <i className="fas fa-envelope"></i> lcmsupport@apartmentpro.com
          </a>
        </div>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} ApartmentPro. All rights reserved.
      </footer>
    </div>
  );
}
