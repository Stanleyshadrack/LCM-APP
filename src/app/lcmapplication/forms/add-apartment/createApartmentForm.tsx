import React, { useState, useEffect } from 'react';
import Select, { MultiValue } from 'react-select';
import { ApartmentStatus } from '../../types/invoice';
import './CreateApartmentForm.css';

type UnitOption = { value: string; label: string };

interface ApartmentFormData {
  name: string;
  unitType: UnitOption[];
  status: ApartmentStatus;
  location: string;
  waterUnitCost: number;
}

interface CreateApartmentFormProps {
  onSubmit: (data: Omit<ApartmentFormData, 'unitType'> & { unitType: string[] }) => void;
  defaultValues?: {
    name: string;
    unitType: string[];
    status: ApartmentStatus;
    location: string;
    waterUnitCost: number;
  };
}

const unitTypeOptions: UnitOption[] = [
  { value: 'Studio', label: 'Studio' },
  { value: '1 Bedroom', label: '1 Bedroom' },
  { value: '2 Bedroom', label: '2 Bedroom' },
  { value: '3 Bedroom', label: '3 Bedroom' },
  { value: 'Penthouse', label: 'Penthouse' },
];

const initialFormState: ApartmentFormData = {
  name: '',
  unitType: [],
 status: ApartmentStatus.Letting,
  location: '',
  waterUnitCost: 250,
};

const CreateApartmentForm: React.FC<CreateApartmentFormProps> = ({ onSubmit, defaultValues }) => {
  const [formData, setFormData] = useState<ApartmentFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof ApartmentFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  // Populate defaults when editing
  useEffect(() => {
    if (defaultValues) {
      setFormData({
        ...defaultValues,
        unitType: defaultValues.unitType.map((val) => ({
          value: val,
          label: val,
        })),
      });
    }
  }, [defaultValues]);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Apartment name is required.';
    if (formData.unitType.length === 0) newErrors.unitType = 'Please select at least one unit type.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    if (formData.waterUnitCost <= 0) newErrors.waterUnitCost = 'Water cost must be greater than zero.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'waterUnitCost' ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleUnitTypeChange = (selected: MultiValue<UnitOption>) => {
    setFormData((prev) => ({ ...prev, unitType: selected as UnitOption[] }));
    setErrors((prev) => ({ ...prev, unitType: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const preparedData = {
      ...formData,
      unitType: formData.unitType.map((u) => u.value),
    };

    onSubmit(preparedData);
    setSubmitted(true);

    if (!defaultValues) {
      setFormData(initialFormState); // Reset only on create
    }
  };

  return (
    <div className="apartment-container">
      <h2 className="form-title">
        {defaultValues ? 'Edit Apartment' : 'Create New Apartment'}
      </h2>

      <form onSubmit={handleSubmit} className="apartment-form" noValidate>
        {/* Apartment Name */}
        <label>
          Apartment Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
            placeholder="e.g. Skyline Heights"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </label>

        {/* Unit Types */}
        <label>
          Unit Types:
          <Select
            isMulti
            options={unitTypeOptions}
            value={formData.unitType}
            onChange={handleUnitTypeChange}
            classNamePrefix={errors.unitType ? 'error' : 'select'}
            placeholder="Select unit types..."
          />
          {errors.unitType && <span className="error-text">{errors.unitType}</span>}
        </label>

        {/* Status */}
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Letting">Letting</option>
            <option value="Under construction">Under construction</option>
            <option value="Sold out">Sold out</option>
          </select>
        </label>

        {/* Location */}
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={errors.location ? 'error' : ''}
            placeholder="e.g. Kilimani, Nairobi"
          />
          {errors.location && <span className="error-text">{errors.location}</span>}
        </label>

        {/* Water Cost */}
        <label>
          Cost of Water per Unit (KES):
          <input
            type="number"
            name="waterUnitCost"
            value={formData.waterUnitCost}
            onChange={handleInputChange}
            className={errors.waterUnitCost ? 'error' : ''}
            min={0}
            step={0.01}
            placeholder="e.g. 75.50"
          />
          {errors.waterUnitCost && <span className="error-text">{errors.waterUnitCost}</span>}
        </label>

        <button type="submit" className="submit-button">
          {defaultValues ? 'Save Changes' : 'Create Apartment'}
        </button>
      </form>

      {!defaultValues && submitted && (
        <p className="success-message">Apartment created successfully!</p>
      )}
    </div>
  );
};

export default CreateApartmentForm;
