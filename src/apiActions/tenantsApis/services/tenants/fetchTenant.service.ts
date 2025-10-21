import { apiRequest } from "@/apiActions/reusableActios/fetchAction";
import { Tenant, TenantAPiResponse } from "../../dto/tenant.dto";

export const fetchTenantsSevice = async ():Promise<Tenant[]> => {
  const tenants:TenantAPiResponse[] = await apiRequest<undefined, any[]>({
    url: "http://localhost:8080/api/v1/tenants",
    method: "GET",
  });

  const data:Tenant[] = tenants.map((tenant)=>({
    key: tenant.id.toString(),
    name: tenant.fullName,
    email: tenant.email,
    idNumber: tenant.idNumber,
    phoneNumber: tenant.phoneNumber,
    apartment: tenant.apartment,
    unit: tenant.unit,
    dateCreated: tenant.dateCreated,
    status: tenant.status,
    tenancyAgreement:tenant.tenancyAgreement!,
  }))

  console.log("Tenants:", tenants);

  return data;
};
