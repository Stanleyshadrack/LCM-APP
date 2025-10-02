
import { fetchTenantsSevice } from "@/apiActions/tenantsApis/services/fetchTenant.service";
import TenantsTable from "./tenants";




export default async function ApartmentsPage() {


  const response = await fetchTenantsSevice();

  console.log(response)
 
  return <TenantsTable tenantsData = {response}/>;
 
}
