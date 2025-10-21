import { postRequest } from "@/apiActions/reusableActios/post.action";
import { ADD_TENANTS_URL } from "../../constants";
import { createRequest } from "../../meta.payload.wrapper";
import { revalidatePath } from "next/cache";

export const addTenantsService = async (tenantData: any) => {
  const url = `http://localhost:8080/api/${ADD_TENANTS_URL}`;

  const payload = {
    fullName: tenantData.fullName,
    email: tenantData.email,
    idNumber: tenantData.idNumber,
    phoneNumber: tenantData.phoneNumber,
    apartment: tenantData.apartment,
    unit: tenantData.unit,
    status: tenantData.status,
    tenancyAgreement: tenantData.leaseAgreement,
  };

  const data = createRequest(payload, "ADD_TENANTS");
  const response = await postRequest({
    url,
    data: data,
  });
  return response;
};
