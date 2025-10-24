import { postRequest } from "@/apiActions/reusableActios/post.action";
import {  ADD_UNIT_URL } from "../../constants";
import { createRequest } from "../../meta.payload.wrapper";
import { revalidatePath } from "next/cache";
import { UnitFormData } from "../../dto/units.tdo";
import { Key } from "lucide-react";

export const addUnitsService = async (unitData: UnitFormData) => {
  const url = `http://localhost:8080/api/${ADD_UNIT_URL}`;
  
  
  console.log(unitData)
  const payload = {
    
    unitCode: unitData.unitCode,
    unitType: unitData.unitType,
    apartmentId: unitData.apartmentId,
    status: unitData.status,
    floor: unitData.floor,
    monthlyRent: unitData.monthlyRent,
  };

  console.log(payload)
 
  const data = createRequest(payload, "ADD_UNITS");
  const response = await postRequest({
    url,
    data: data,
  });
  return response;
};

