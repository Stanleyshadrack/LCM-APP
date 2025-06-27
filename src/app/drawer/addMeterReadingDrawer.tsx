'use client';

import React, { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  DatePicker,
  message,
} from "antd";
import "./AddMeterReadingDrawer.css";
import dayjs from "dayjs";

const { TextArea } = Input;

interface Unit {
  id: string;
  apartment: string;
  name: string;
  unitCost: number;
  lastReading: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  units: Unit[];
  editingReading: any | null;
}

const AddMeterReadingDrawer: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  units,
  editingReading,
}) => {
  const [form] = Form.useForm();
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [currentReading, setCurrentReading] = useState<number | null>(null);

  useEffect(() => {
    if (editingReading) {
      const unit = units.find((u) => u.id === editingReading.unitId) || null;
      setSelectedUnit(unit);
      setCurrentReading(editingReading.currentReading || null);
      form.setFieldsValue({
        ...editingReading,
        timestamp: editingReading.timestamp ? dayjs(editingReading.timestamp) : undefined,
      });
    } else {
      setSelectedUnit(null);
      setCurrentReading(null);
      form.resetFields();
    }
  }, [editingReading, form, units]);

  const handleUnitChange = (unitId: string) => {
    const unit = units.find((u) => u.id === unitId) || null;
    setSelectedUnit(unit);
    form.setFieldValue("unitId", unitId);
  };

  const handleReadingChange = (val: number | null) => {
    setCurrentReading(val);
    form.setFieldValue("currentReading", val);
  };

  const preview = useMemo(() => {
    if (!selectedUnit || currentReading == null) return null;
    const previous = selectedUnit.lastReading;
    const cost = selectedUnit.unitCost;
    const consumption = currentReading - previous;
    const amount = consumption * cost;
    return consumption >= 0
      ? { consumption, amount }
      : { consumption: null, amount: null };
  }, [selectedUnit, currentReading]);

  const handleFinish = (values: any) => {
    if (!selectedUnit) {
      message.error("Please select a unit.");
      return;
    }

    const previousReading = selectedUnit.lastReading;
    const current = values.currentReading;

    if (current <= previousReading) {
      message.error("Current reading must be greater than previous reading.");
      return;
    }

    const consumption = current - previousReading;
    const amount = consumption * selectedUnit.unitCost;

    const readingData = {
      ...values,
      previousReading,
      consumption,
      amount,
      timestamp: values.timestamp?.toISOString() || new Date().toISOString(),
      apartment: selectedUnit.apartment,
    };

    onSubmit(readingData);
    message.success(editingReading ? "Reading updated!" : "Reading added!");
    form.resetFields();
    setCurrentReading(null);
    setSelectedUnit(null);
  };

  return (
    <Drawer
      title={editingReading ? "Edit Meter Reading" : "Add Meter Reading"}
      open={open}
      onClose={() => {
        onClose();
        form.resetFields();
        setSelectedUnit(null);
        setCurrentReading(null);
      }}
      width={400}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Unit"
          name="unitId"
          rules={[{ required: true, message: "Please select a unit" }]}
        >
          <Select placeholder="Select unit" onChange={handleUnitChange}>
            {units.map((unit) => (
              <Select.Option key={unit.id} value={unit.id}>
                {unit.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {selectedUnit && (
          <div className="unit-info-preview">
            <p><strong>Last Reading:</strong> {selectedUnit.lastReading}</p>
            <p><strong>Unit Cost:</strong> KES {selectedUnit.unitCost}</p>
          </div>
        )}

        <Form.Item
          label="Current Reading"
          name="currentReading"
          rules={[{ required: true, message: "Enter current reading" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="e.g., 120"
            onChange={handleReadingChange}
          />
        </Form.Item>

        {preview?.consumption != null && (
          <div className="preview-box">
            <p><strong>Consumption:</strong> {preview.consumption} units</p>
            <p><strong>Amount:</strong> KES {preview.amount.toFixed(2)}</p>
          </div>
        )}

        <Form.Item
          label="Reading Date"
          name="timestamp"
          rules={[{ required: true, message: "Select reading date/time" }]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="note" label="Note (Optional)">
          <TextArea rows={3} placeholder="Any comments or notes..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingReading ? "Update Reading" : "Add Reading"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddMeterReadingDrawer;



