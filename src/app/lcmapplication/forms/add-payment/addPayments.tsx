import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import "./addPayments.css";

const { Option } = Select;

interface AddPaymentFormProps {
  onSuccess: (payment: {
    unitId: string;
    apartment: string;
    paidAmount: string;
    phoneNumber: string;
    refCode: string;
    dateTime: string;
    arrears: "Owed" | "Not owed";
  }) => void;
}

const apartmentUnits: Record<string, string[]> = {
  "Bima Heights": ["A01", "A02", "A03", "A04"],
  "LCM Apartments": ["L01", "L02", "L03"],
  "H&R Apartments": ["H01", "H02", "H03"],
  "Sunset Villas": ["S01", "S02"],
  "Lakeview Residency": ["LV1", "LV2", "LV3", "LV4"],
};

const AddPaymentForm: React.FC<AddPaymentFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [unitOptions, setUnitOptions] = useState<string[]>([]);

  const onApartmentChange = (value: string) => {
    form.setFieldsValue({ unitId: undefined });
    setUnitOptions(apartmentUnits[value] || []);
  };

  const onFinish = (values: any) => {
    const paymentData = {
      unitId: values.unitId,
      apartment: values.apartment,
      paidAmount: `KES ${values.amount}`,
      phoneNumber: values.phone,
      refCode: values.refCode,
      dateTime: values.date.format("DD/MM/YYYY"),
      arrears: values.arrears,
    };
    onSuccess(paymentData);
    form.resetFields();
    setUnitOptions([]);
  };

  return (
    <div className="add-payment-container">
      <h2 className="form-title">Add Payment</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="payment-form"
      >
        <Form.Item
          label="Apartment Name"
          name="apartment"
          rules={[{ required: true, message: "Please select an apartment" }]}
        >
          <Select placeholder="Select an apartment" onChange={onApartmentChange} allowClear>
            {Object.keys(apartmentUnits).map((apt) => (
              <Option key={apt} value={apt}>
                {apt}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Unit ID"
          name="unitId"
          rules={[{ required: true, message: "Please select a unit" }]}
        >
          <Select
            placeholder="Select a unit"
            showSearch
            optionFilterProp="children"
            disabled={unitOptions.length === 0}
          >
            {unitOptions.map((unit) => (
              <Option key={unit} value={unit}>
                {unit}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount Paid"
          name="amount"
          rules={[{ required: true, message: "Please enter the amount" }]}
        >
          <InputNumber<number>
            className="full-width-input"
            min={0}
            placeholder="e.g., 8000"
            formatter={(value) => `KES ${value}`}
            parser={(value) => (value ? parseInt(value.replace(/[^\d]/g, ""), 10) : 0)}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="e.g., 254742792965" />
        </Form.Item>

        <Form.Item
          label="Reference Code"
          name="refCode"
          rules={[{ required: true, message: "Please enter reference code" }]}
        >
          <Input placeholder="e.g., TDI08N80BK" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please pick a date" }]}
        >
          <DatePicker className="full-width-input" />
        </Form.Item>

        <Form.Item
          label="Arrears Status"
          name="arrears"
          rules={[{ required: true, message: "Please select arrears status" }]}
        >
          <Select placeholder="Select status">
            <Option value="Not owed">Not owed</Option>
            <Option value="Owed">Owed</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Submit Payment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPaymentForm;
