

import { apiRequest } from "@/apiActions/reusableActios/fetchAction";
import { createRequest } from "../../meta.payload.wrapper";
import { UnitApiResponse } from "../../dto/units.tdo";
import { UnitStatus } from "@/app/lcmapplication/types/invoice";


export const updatedUnitService = async (unitData: any, id:number) => {
  // 1. Build the payload
  const updatePayload = {

    unitCode: unitData.unitCode,
    unitType: unitData.unitType,
    apartmentId: unitData.apartmentId,
    status: unitData.status as UnitStatus,
    floor: unitData.floor,
    monthlyRent: unitData.monthlyRent,
  };

  console.log(updatePayload)
  // 2. Wrap payload with meta (if required by your backend)
   const requestBody = createRequest(updatePayload, "UPDATE_UNIT")
console.log(id)
  // 3. Replace tenant ID in the URL dynamically
  const updatedUnit:UnitApiResponse = await apiRequest({
    url: `http://localhost:8080/api/v1/apartment-units/${id}`,
  
    method: "PUT",
    data: requestBody,
  });

  console.log(updatedUnit)
  return updatedUnit;
};
