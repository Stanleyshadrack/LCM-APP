import { apiRequest } from "@/apiActions/reusableActios/fetchAction";
import { createRequest } from "../../meta.payload.wrapper";


export const updatedApartmentService = async (apartmentData: any, id:number) => {
  // 1. Build the payload
  const updatePayload = {
    name: apartmentData.name,
    address: apartmentData.location,
    status: apartmentData.status,
    unitTypes: apartmentData.unitType,
    waterUnitCost: apartmentData.waterUnitCost,
  };

  console.log(updatePayload)
  // 2. Wrap payload with meta (if required by your backend)
   const requestBody = createRequest(updatePayload, "UPDATE_APARTMENT")
console.log(id)
  // 3. Replace tenant ID in the URL dynamically
  const updatedApartment = await apiRequest({
    url: `http://localhost:8080/api/v1/apartments/${id}`,
  
    method: "PUT",
    data: requestBody,
  });

  console.log(updatedApartment)
  return updatedApartment;
};

