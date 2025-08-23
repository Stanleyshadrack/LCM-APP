import { useState, useEffect } from "react";
import "./add-tenants.css";

interface Unit {
  name: string;
  occupied: boolean; // ✅ mark if already occupied
}

interface Apartment {
  name: string;
  units: Unit[];
}

interface CreateTenantFormProps {
  title: string;
  apartments: Apartment[]; // ✅ dynamic apartment list
  initialValues?: {
    fullName: string;
    email: string;
    idNumber: string;
    phoneNumber: string;
    apartment: string;
    unit: string;
    status: "inResidence" | "vacated";
    dateVacated?: string;
  } | null;
  onCancel: () => void;
  onSubmit: (formData: {
    fullName: string;
    email: string;
    idNumber: string;
    phoneNumber: string;
    apartment: string;
    unit: string;
    status: "inResidence" | "vacated";
    dateVacated?: string;
  }) => void;
}

const CreateTenantForm = ({
  title,
  apartments,
  initialValues,
  onCancel,
  onSubmit,
}: CreateTenantFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    idNumber: "",
    phoneNumber: "",
    apartment: "",
    unit: "",
    status: "inResidence" as "inResidence" | "vacated",
    dateVacated: "",
  });

  const [availableUnits, setAvailableUnits] = useState<Unit[]>([]);

  // Populate initialValues if editing
  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
      // Preload available units for the selected apartment
      const selectedApartment = apartments.find(
        (apt) => apt.name === initialValues.apartment
      );
      if (selectedApartment) {
        setAvailableUnits(selectedApartment.units);
      }
    }
  }, [initialValues, apartments]);

  // Update available units when apartment changes
  useEffect(() => {
    if (formData.apartment) {
      const selectedApartment = apartments.find(
        (apt) => apt.name === formData.apartment
      );
      if (selectedApartment) {
        setAvailableUnits(selectedApartment.units);
        setFormData((prev) => ({ ...prev, unit: "" })); // reset unit when apartment changes
      }
    }
  }, [formData.apartment, apartments]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value as "inResidence" | "vacated";
    setFormData((prev) => ({
      ...prev,
      status: newStatus,
      dateVacated: newStatus === "vacated" ? prev.dateVacated : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onSubmit(formData);

    setFormData({
      fullName: "",
      email: "",
      idNumber: "",
      phoneNumber: "",
      apartment: "",
      unit: "",
      status: "inResidence",
      dateVacated: "",
    });
    setAvailableUnits([]);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">{title}</h2>

      {/* Full name */}
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      {/* ID Number */}
      <div className="form-group">
        <label>ID Number</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      {/* Phone */}
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      {/* Apartment & Unit */}
      <div className="form-row">
        <div className="form-group">
          <label>Apartment</label>
          <select
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Apartment</option>
            {apartments.map((apt) => (
              <option key={apt.name} value={apt.name}>
                {apt.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="form-input"
            required
            disabled={!formData.apartment}
          >
            <option value="">Select Unit</option>
            {availableUnits.map((u) => (
              <option
                key={u.name}
                value={u.name}
                disabled={
                  u.occupied &&
                  !(initialValues &&
                    initialValues.unit === u.name &&
                    initialValues.apartment === formData.apartment)
                }
              >
                {u.name} {u.occupied ? "(Occupied)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status */}
      <div className="form-group">
        <label>Status</label>
        <div className="status-options">
          <label>
            <input
              type="radio"
              name="status"
              value="inResidence"
              checked={formData.status === "inResidence"}
              onChange={handleStatusChange}
            />
            In Residence
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="vacated"
              checked={formData.status === "vacated"}
              onChange={handleStatusChange}
            />
            Vacated
          </label>
        </div>
      </div>

      {/* Date Vacated */}
      {formData.status === "vacated" && (
        <div className="form-group">
          <label>Date Vacated</label>
          <input
            type="date"
            name="dateVacated"
            value={formData.dateVacated}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
      )}

      <div className="form-buttons">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateTenantForm;
