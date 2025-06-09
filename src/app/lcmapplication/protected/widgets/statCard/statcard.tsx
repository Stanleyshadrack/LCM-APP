'use client';
import React from 'react';
import CountUp from 'react-countup';

interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
  const hasCurrency = value.trim().startsWith("KES");

  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon ? icon : <div className="default-icon">💼</div>}
      </div>
      <div className="stat-details">
        <div className="stat-label">{label}</div>
        <div className="stat-value">
          {isNaN(numericValue) ? (
            value
          ) : (
            <>
              {hasCurrency && 'KES '}
              <CountUp
                end={numericValue}
                duration={2}
                separator=","
                decimals={2}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
