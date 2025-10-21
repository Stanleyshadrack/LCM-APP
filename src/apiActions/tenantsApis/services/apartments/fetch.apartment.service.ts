import { apiRequest } from "@/apiActions/reusableActios/fetchAction";
import { Apartment, ApartmentStatus } from "@/app/lcmapplication/types/invoice";
import { ApartmentApiResponse } from "../../dto/Apartment.dto";
import { title } from "node:process";
import { Key } from "lucide-react";


export const fetchApartmentService = async (): Promise<Apartment[]> => {
  try {
    const response:ApartmentApiResponse[]= await apiRequest({
      url: "http://localhost:8080/api/v1/apartments",
      method: "GET",
    });

    console.log(response)

   const data: Apartment[] = response.map((apt) => ({
  id:apt.id,
    title: apt.name,
    unitTypes:apt.unitTypes,
    status: apt.status as ApartmentStatus,
    units:[],
   address: apt.address,
  
}));


    console.log("Apartments fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch apartments:", error);
    return [];
  }
};
