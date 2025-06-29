import React from "react";

interface Props {
  unitId: string;
}

const PaymentInfo: React.FC<Props> = ({ unitId }) => (
  <div className="payment-info">
    <p>PAY BILL NUMBER: <span className="highlight">4069089</span></p>
    <p>ACCOUNT: <span className="highlight">{unitId}</span></p>
  </div>
);

export default PaymentInfo;

