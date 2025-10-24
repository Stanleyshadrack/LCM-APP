"use client";

import React from "react";
import Link from "next/link";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footerContent">
      <p className="copy">© {new Date().getFullYear()} LcmApartmentPro</p>
      <div className="footerLinks">
        <Link href="/terms" target="_blank">
          Terms
        </Link>
        <Link href="/privacy" target="_blank">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
