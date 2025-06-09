import { Drawer, Form, InputNumber, Select, Button, message, Typography, Input } from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;
const { TextArea } = Input;

const AddMeterReadingDrawer = ({ open, onClose, onSubmit, units, editingReading }: any) => {
  const [form] = Form.useForm();
  const [filteredUnits, setFilteredUnits] = useState<any[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [consumption, setConsumption] = useState<number>(0);

  useEffect(() => {
    if (editingReading) {
      const aptUnits = units.filter((u: any) => u.apartment === editingReading.apartment);
      setFilteredUnits(aptUnits);
      const unit = aptUnits.find((u: any) => u.id === editingReading.unitId);
      setSelectedUnit(unit);
      form.setFieldsValue({
        apartment: editingReading.apartment,
        unitId: editingReading.unitId,
        previousReading: editingReading.previousReading,
        currentReading: editingReading.currentReading,
        note: editingReading.note || '',
      });
      setConsumption(editingReading.currentReading - editingReading.previousReading);
    } else if (!open) {
      form.resetFields();
      setFilteredUnits([]);
      setSelectedUnit(null);
      setConsumption(0);
    }
  }, [editingReading, open, units, form]);

  const handleApartmentChange = (apartment: string) => {
    const matchingUnits = units.filter((u: any) => u.apartment === apartment);
    setFilteredUnits(matchingUnits);
    form.setFieldsValue({ unitId: undefined, previousReading: undefined, currentReading: undefined, note: '' });
    setSelectedUnit(null);
    setConsumption(0);
  };

  const handleUnitChange = (unitId: string) => {
    const unit = filteredUnits.find((u: any) => u.id === unitId);
    if (unit) {
      form.setFieldsValue({
        previousReading: unit.lastReading,
        currentReading: undefined,
        note: '',
      });
      setSelectedUnit(unit);
      setConsumption(0);
    }
  };

  const onValuesChange = (_: any, values: any) => {
    if (values.previousReading != null && values.currentReading != null) {
      setConsumption(values.currentReading - values.previousReading);
    } else {
      setConsumption(0);
    }
  };

  const handleFinish = (values: any) => {
    if (values.currentReading < values.previousReading) {
      return message.error('Current reading must be greater than or equal to previous.');
    }

    const unit = filteredUnits.find((u: any) => u.id === values.unitId);
    if (!unit) return message.error('Selected unit not found.');

    const consumption = values.currentReading - values.previousReading;

    const data = {
      apartment: values.apartment,
      unitId: values.unitId,
      unitName: unit.name,
      previousReading: values.previousReading,
      currentReading: values.currentReading,
      consumption,
      amount: consumption * unit.unitCost,
      timestamp: editingReading?.timestamp ?? new Date().toISOString(),
      note: values.note || '',
    };

    onSubmit(data);
    form.resetFields();
    onClose();
  };

  const uniqueApartments = Array.from(new Set(units.map((u: any) => u.apartment))) as string[];

  return (
    <Drawer
      title={editingReading ? 'Edit Meter Reading' : 'Add Water Meter Reading'}
      placement="right"
      width={400}
      onClose={onClose}
      open={open}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="apartment" label="Apartment" rules={[{ required: true }]}>
          {editingReading ? (
            <Text strong>{editingReading.apartment}</Text>
          ) : (
            <Select placeholder="Select Apartment" onChange={handleApartmentChange}>
              {uniqueApartments.map((apt) => (
                <Select.Option key={apt} value={apt}>
                  {apt}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item name="unitId" label="Unit" rules={[{ required: true }]}>
          {editingReading ? (
            <Text strong>{editingReading.unitName}</Text>
          ) : (
            <Select
              placeholder="Select Unit"
              onChange={handleUnitChange}
              disabled={!filteredUnits.length}
            >
              {filteredUnits.map((unit: any) => (
                <Select.Option key={unit.id} value={unit.id}>
                  {unit.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item name="previousReading" label="Previous Reading">
          <InputNumber disabled style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="currentReading"
          label="Current Reading"
          rules={[{ required: true, message: 'Please enter current reading' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item label="Consumption (units)">
          <InputNumber value={consumption} disabled style={{ width: '100%' }} />
        </Form.Item>

        {selectedUnit && (
          <Form.Item label="Unit Cost (KES)">
            <InputNumber value={selectedUnit.unitCost} disabled style={{ width: '100%' }} />
          </Form.Item>
        )}

        <Form.Item name="note" label="Note (issues or remarks)">
          <TextArea rows={3} placeholder="Add any notes or issues here (optional)" />
        </Form.Item>

        {/* {editingReading && (
          <Form.Item label="Reading Date/Time">
            <Text>{new Date(editingReading.timestamp).toLocaleString()}</Text>
          </Form.Item>
        )} */}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingReading ? 'Update' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddMeterReadingDrawer;
