import { UnitStatus } from "@/app/lcmapplication/types/invoice";

export interface UnitApiResponse {
  meta: {
    success: boolean;
    message: string;
  };
  payload: UnitPayload[];
}

export interface UnitPayload {
  unitId: number;
  apartmentId: number;
  unitCode: string;
  unitType: string;
  status: string; // extend if there are other statuses
  floor: string;
  monthlyRent: string;
  createdAt: string;
}



export interface UnitFormData {
  id:number
  unitCode: string;
  unitType: string;
  unitRent: string;
  apartmentId: number;
  status: UnitStatus;
  floor?: string;
  monthlyRent?: string;
}
