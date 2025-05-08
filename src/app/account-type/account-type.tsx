import React, { useState } from "react";
import "./account-type.css";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Correct import for App Router

const accountTypes = [
  {
    id: "tenant",
    title: "Tenant",
    description: "Find a place & pay rent online.",
  },
  {
    id: "landlord",
    title: "Landlord",
    description: "Accept rent online & manage rental.",
  },
  {
    id: "employee",
    title: "Employee",
    description: "Manage requests from landlords & tenants.",
  },
];

const AccountTypePage: React.FC = () => {
  const [selected, setSelected] = useState("tenant");
  const router = useRouter();

  // Function to handle next button click
  const handleNext = () => {
    // Redirecting to the login page with the selected account type as query parameter
    router.push(`/login?accountType=${selected}`);
  };

  // Function to handle back button click
  const handleBack = () => {
    // Redirecting to the previous page or any other page, for example, home
    router.back();
  };

  return (
    <div className="ert-page">
      <div className="ert-logo">L.C.M</div>
      <div className="ert-content">
        <Image
          src="/acct.svg"
          alt="acct"
          width={140}
          height={140}
          className="ert-illustration"
        />

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
              className={`ert-option ${
                selected === type.id ? "ert-option-selected" : ""
              }`}
              onClick={() => setSelected(type.id)}
            >
              <div className="ert-option-title">{type.title}</div>
              <div className="ert-option-desc">{type.description}</div>
              <input
                type="radio"
                className="ert-radio"
                checked={selected === type.id}
                readOnly
              />
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
