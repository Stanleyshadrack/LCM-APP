import React from 'react';
import { Button } from 'antd';
import './AddTenantButton.css';

interface AddTenantButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
}

const AddTenantButton: React.FC<AddTenantButtonProps> = ({
  onClick,
  label = '+ Add Tenant',
  className = '',
  type = 'primary',
}) => {
  return (
    <Button type={type} className={`add-tenant-button ${className}`} onClick={onClick}>
      {label}
    </Button>
  );
};

export default AddTenantButton;

