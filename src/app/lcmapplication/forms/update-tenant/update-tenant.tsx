
import { useState } from "react";
import "./update-tenants.css";

interface CreateTenantFormProps {
  title: string;
}

const UpdateTenantForm = ({ title }: CreateTenantFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    idNumber: "",
    phoneNumber: "",
    apartment: "",
    unit: "",
    status: "inResidence",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Tenant submitted! (Check console)");
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      idNumber: "",
      phoneNumber: "",
      apartment: "",
      unit: "",
      status: "inResidence",
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">{title}</h2>

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
            <option value="Apartment A">Apartment A</option>
            <option value="Apartment B">Apartment B</option>
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
          >
            <option value="">Select Unit</option>
            <option value="Unit 101">Unit 101</option>
            <option value="Unit 102">Unit 102</option>
          </select>
        </div>
      </div>

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

      <div className="form-buttons">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateTenantForm;
