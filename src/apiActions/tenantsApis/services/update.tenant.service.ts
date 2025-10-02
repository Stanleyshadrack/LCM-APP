import { apiRequest } from "@/apiActions/reusableActios/fetchAction";
import { createRequest } from "../meta.payload.wrapper";

export const updatedTenantService = async (tenantData: any, tenantId:string) => {
  // 1. Build the payload
  const updatePayload = {
    fullName: tenantData.fullName,
    email: tenantData.email,
    idNumber: tenantData.idNumber,
    phoneNumber: tenantData.phoneNumber,
    apartment: tenantData.apartment,
    unit: tenantData.unit,
    status: tenantData.status,
    tenancyAgreement: tenantData.leaseAgreement,
  };

  // 2. Wrap payload with meta (if required by your backend)
   const requestBody = createRequest(updatePayload, "UPDATE_TENANT")
console.log(tenantId)
  // 3. Replace tenant ID in the URL dynamically
  const updatedTenant = await apiRequest({
    url: `http://localhost:8080/api/v1/tenants/${tenantId}`,
    method: "PUT",
    data: requestBody,
  });

  console.log(updatedTenant)
  return updatedTenant;
};
