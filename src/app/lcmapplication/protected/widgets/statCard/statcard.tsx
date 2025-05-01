import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode; // Icon is optional
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon ? icon : <div className="default-icon">💼</div>} {/* Fallback if no icon */}
      </div>
      <div className="stat-details">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
