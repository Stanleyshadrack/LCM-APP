

import { apiRequest } from "@/apiActions/reusableActios/fetchAction";
import { UnitApiResponse, UnitFormData } from "../../dto/units.tdo";
import { ApartmentUnits, UnitStatus } from "@/app/lcmapplication/types/invoice";
import { Console } from "console";

export const fetchUnitSevice = async (apartmentId:string):Promise<ApartmentUnits[]> => {
  const units:UnitApiResponse = await apiRequest({
    url: `http://localhost:8080/api/v1/apartment-units/apartment/${apartmentId}`,
   

  
    method: "GET",
  });

  console.log(units)
  const unitsData = units.payload

  const data:ApartmentUnits[] = unitsData.map((unitData)=>({
    id:unitData.unitId,
    unitCode: unitData.unitCode,
    unitType: unitData.unitType,
    apartmentId: unitData.apartmentId,
    unitRent:unitData.monthlyRent,
    status: unitData.status as UnitStatus,
    floor: unitData.floor,
    monthlyRent: unitData.monthlyRent,
    createdAt:unitData.createdAt!
  }))

  console.log("Units:", units);

  return data;
};

