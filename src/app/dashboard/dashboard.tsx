import React from 'react';
import StatCard from '../lcmapplication/protected/widgets/statCard/statcard';
import './dashboard.css';
import { MoneyCollectOutlined } from "@ant-design/icons";
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="main-dashboard">
          <h2>DASHBOARD</h2>

          <div className="stats-grid">
            <StatCard label="Total Apartments" value="45" icon={<MoneyCollectOutlined />} />
            <StatCard label="Total Units" value="142" icon={undefined} />
            <StatCard label="Total Amount Paid" value="KES 56,456.00" icon={undefined} />
            <StatCard label="Total Expense" value="KES 56,456.00" icon={undefined} />
            <StatCard label="Total Amount Paid" value="KES 56,456.00" icon={undefined} />
          </div>

          <div className="payment-section">
            {/* Payment History */}
            <div className="payment-card">
              <h4>Payment History</h4>
              <table>
                <thead>
                  <tr>
                    <th>Payment Date</th>
                    <th>Amount</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>September 2023</td>
                    <td>Kes 4568.00</td>
                    <td>A02</td>
                  </tr>
                  <tr>
                    <td>October 2023</td>
                    <td>Kes 4568.00</td>
                    <td>B03</td>
                  </tr>
                  <tr>
                    <td>November 2023</td>
                    <td>Kes 4568.00</td>
                    <td>H02</td>
                  </tr>
                </tbody>
              </table>
              <Link href="/payments">
  <button className="see-invoices-button">View Invoices</button>
</Link>

            </div>

            {/* Arrears */}
            <div className="payment-card">
              <h4>Invoices</h4>
              <table>
                <thead>
                  <tr>
                    <th>Payment Date</th>
                    <th>Amount</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>September 2023</td>
                    <td>Kes 4568.00</td>
                    <td>B03</td>
                  </tr>
                  <tr>
                    <td>October 2023</td>
                    <td>Kes 4568.00</td>
                    <td>C01</td>
                  </tr>
                  <tr>
                    <td>November 2023</td>
                    <td>Kes 4568.00</td>
                    <td>M02</td>
                  </tr>
                </tbody>
              </table>
              <Link href="/invoices">
  <button className="see-invoices-button">View Payments</button>
</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
