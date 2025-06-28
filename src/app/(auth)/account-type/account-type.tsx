"use client";

import React, { useState, useEffect } from "react";
import "./account-type.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const accountTypes = [
  { id: "tenant", title: "Tenant", description: "Find a place & pay rent online." },
  { id: "owner", title: "Landlord", description: "Accept rent online & manage rental." },
  { id: "employee", title: "Employee", description: "Manage requests from landlords & tenants." },
];

const AccountTypePage: React.FC = () => {
  const [selected, setSelected] = useState("tenant");
  const router = useRouter();

  const handleNext = () => {
    const signupData = localStorage.getItem("signupData");
    if (!signupData) {
      alert("Please start from registration.");
      router.push("/signup");
      return;
    }

    const parsed = JSON.parse(signupData);
    const fullUser = {
      email: parsed.email,
      password: parsed.password,
      role: selected,
    };

    // Save full user (for now in localStorage or context)
    localStorage.setItem("registeredUser", JSON.stringify(fullUser));
    localStorage.removeItem("signupData");

    router.push("/login");
  };

  const handleBack = () => router.back();

  return (
    <div className="ert-page">
      <div className="ert-logo">L.C.M</div>
      <div className="ert-content">
        <Image src="/acct.svg" alt="acct" width={140} height={140} className="ert-illustration" />

        <h2 className="ert-heading">Account Type</h2>
        <p className="ert-subtext">
          Choose the account type that suits your needs.
          <br />
          Each has a different set of tools and features.
        </p>

        <div className="ert-options">
          {accountTypes.map((type) => (
            <div
              key={type.id}
              className={`ert-option ${selected === type.id ? "ert-option-selected" : ""}`}
              onClick={() => setSelected(type.id)}
            >
              <div className="ert-option-title">{type.title}</div>
              <div className="ert-option-desc">{type.description}</div>
              <input type="radio" className="ert-radio" checked={selected === type.id} readOnly />
            </div>
          ))}
        </div>

        <div className="ert-buttons">
          <button onClick={handleBack} className="ert-back-button">
            Back
          </button>
          <button onClick={handleNext} className="ert-next-btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountTypePage;
