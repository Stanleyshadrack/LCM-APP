"use client";

import Login from "./lcmapplication/auth/login/login";
import CreateTenantForm from "./lcmapplication/forms/add-tenants/add-tenant";
import ApartmentDetailsModal from "./lcmapplication/protected/modals/apartment-details/view-apartment";
import InvoicePage from "./lcmapplication/protected/modals/view-invoice/view-invoice";
import StatCard from "./lcmapplication/protected/widgets/statCard/statcard";




export default function ApartmentsPage() {
  return <StatCard label={"Total Apartments"} value={"456"} icon={undefined} />; 
}
