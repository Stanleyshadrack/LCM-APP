"use client";

import React from "react";
import "./leasing-agreement.css";

export type AgreementDetails = {
  landlordName: string;
  landlordAddress: string;
  tenantName: string;
  tenantAddress: string;
  propertyAddress: string;
  leaseTerm: string; // e.g., "12 months"
  startDate: string;
  endDate: string;
  rentAmount: string; // e.g., "KES 25,000"
  paymentDue: string; // e.g., "5th of every month"
  depositAmount: string;
  utilities: string[];
  terminationNotice: string; // e.g., "2 months written notice"
  governingLaw: string;
  witnesses?: string[];
};

interface LeasingAgreementProps {
  agreement: AgreementDetails;
}

const LeasingAgreement: React.FC<LeasingAgreementProps> = ({ agreement }) => {
  return (
    <div className="agreement-container">
      <h1 className="agreement-title">Residential Lease Agreement</h1>
      <p className="agreement-intro">
        This Lease Agreement is made and entered into on <b>{agreement.startDate}</b> 
        between <b>{agreement.landlordName}</b> ("Landlord") of {agreement.landlordAddress}, 
        and <b>{agreement.tenantName}</b> ("Tenant") of {agreement.tenantAddress}.
      </p>

      <section>
        <h2>1. Premises</h2>
        <p>The Landlord hereby leases to the Tenant the property located at <b>{agreement.propertyAddress}</b>.</p>
      </section>

      <section>
        <h2>2. Term</h2>
        <p>The lease shall be for a period of <b>{agreement.leaseTerm}</b>, commencing on <b>{agreement.startDate}</b> and ending on <b>{agreement.endDate}</b>.</p>
      </section>

      <section>
        <h2>3. Rent & Deposit</h2>
        <p>The Tenant agrees to pay monthly rent of <b>{agreement.rentAmount}</b>, due on the <b>{agreement.paymentDue}</b>. A refundable security deposit of <b>{agreement.depositAmount}</b> is payable upon signing this agreement.</p>
      </section>

      <section>
        <h2>4. Utilities</h2>
        <p>The Tenant shall be responsible for payment of the following utilities:</p>
        <ul>
          {agreement.utilities.map((u, idx) => (
            <li key={idx}>{u}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>5. Termination</h2>
        <p>Either party may terminate this lease by giving <b>{agreement.terminationNotice}</b>.</p>
      </section>

      <section>
        <h2>6. Governing Law</h2>
        <p>This lease shall be governed by the laws of <b>{agreement.governingLaw}</b>.</p>
      </section>

      <section>
        <h2>7. Signatures</h2>
        <div className="signature-section">
          <div>
            <p>______________________________</p>
            <p><b>{agreement.landlordName}</b> (Landlord)</p>
          </div>
          <div>
            <p>______________________________</p>
            <p><b>{agreement.tenantName}</b> (Tenant)</p>
          </div>
        </div>
        {agreement.witnesses && agreement.witnesses.length > 0 && (
          <div className="witnesses">
            <h3>Witnesses:</h3>
            {agreement.witnesses.map((w, i) => (
              <p key={i}>______________________________ <br /> {w}</p>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default LeasingAgreement;
