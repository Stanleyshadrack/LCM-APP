import React from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import "./addPayments.css";

const { Option } = Select;

const AddPaymentForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Payment Submitted: ", values);
    // Here you can POST to your backend
    form.resetFields();
  };

  return (
    <div className="add-payment-container">
      <h2 className="form-title">Add Payment</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="payment-form"
      >
        <Form.Item
          label="Unit ID"
          name="unitId"
          rules={[{ required: true, message: "Please enter Unit ID" }]}
        >
          <Input placeholder="e.g., A01" />
        </Form.Item>

        <Form.Item
          label="Apartment Name"
          name="apartment"
          rules={[{ required: true, message: "Please enter apartment name" }]}
        >
          <Input placeholder="e.g., Bima Heights" />
        </Form.Item>

        <Form.Item
          label="Amount Paid"
          name="amount"
          rules={[{ required: true, message: "Enter payment amount" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="e.g., 8000"
            formatter={value => `KES ${value}`}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Enter phone number" }]}
        >
          <Input placeholder="e.g., 254742792965" />
        </Form.Item>

        <Form.Item
          label="Reference Code"
          name="refCode"
          rules={[{ required: true, message: "Enter reference code" }]}
        >
          <Input placeholder="e.g., TDI08N80BK" />
        </Form.Item>

        <Form.Item
          label="Date/Time"
          name="date"
          rules={[{ required: true, message: "Pick a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Arrears Status"
          name="arrears"
          rules={[{ required: true, message: "Select arrears status" }]}
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

