
"use client";

import { Suspense } from "react";
import LeasingAgreementPage, { AgreementDetails } from "./leasing-agreement";
import LeasingAgreement from "./leasing-agreement";



export default function LoginPage() {
    const agreementData: AgreementDetails = {
  landlordName: "John Mwangi",
  landlordAddress: "Nairobi, Kenya",
  tenantName: "Jane Doe",
  tenantAddress: "Nairobi, Kenya",
  propertyAddress: "Apartment 3B, Riverside Drive, Nairobi",
  leaseTerm: "12 months",
  startDate: "1st September 2025",
  endDate: "31st August 2026",
  rentAmount: "KES 25,000",
  paymentDue: "5th of every month",
  depositAmount: "KES 25,000",
  utilities: ["Water", "Electricity", "Garbage collection"],
  terminationNotice: "2 months written notice",
  governingLaw: "Republic of Kenya",
  witnesses: ["Peter Kariuki", "Mary Wanjiku"],
};
  return (
    <Suspense>
    
      <LeasingAgreement agreement={agreementData} />
    </Suspense>
  );
}
