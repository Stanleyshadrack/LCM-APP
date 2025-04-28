import './dashboard.css';


const Dashboard = () => {
  return (
    <div className="dashboard-container">

      <div className="dashboard-content">

        <div className="main-dashboard">
          <h2>DASHBOARD</h2>

          <div className="stats-grid">
            <div className="card">
              <div>Total Apartments</div>
              <h3>45</h3>
            </div>

            <div className="card">
              <div>Total Units</div>
              <h3>142</h3>
            </div>

            <div className="card">
              <div>Total Amount Paid</div>
              <h3>KES 56456.00</h3>
            </div>

            <div className="card">
              <div>Total Expense</div>
              <h3>KES 56456.00</h3>
            </div>

            {/* Repeat cards */}
            <div className="card">
              <div>Total Amount Paid</div>
              <h3>KES 56456.00</h3>
            </div>

            <div className="card">
              <div>Total Amount Paid</div>
              <h3>KES 56456.00</h3>
            </div>

            <div className="card">
              <div>Total Amount Paid</div>
              <h3>KES 56456.00</h3>
            </div>
          </div>

          <div className="payment-section">
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
              <button className="see-invoices-button">See Invoices</button>
            </div>

            <div className="payment-card">
              <h4>Arrears</h4>
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
              <button className="see-invoices-button">See Invoices</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
