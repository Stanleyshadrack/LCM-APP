import { apiRequest } from "@/apiActions/reusableActios/fetchAction";

export const deleteTenantService =async (tenantId:string)=>{
     const deletedTenant = await apiRequest({
        url: `http://localhost:8080/api/v1/tenants/${tenantId}`,
        method: "DELETE",
      });
      console.log(deletedTenant)
}