import { postRequest } from "@/apiActions/reusableActios/post.action";
import { ADD_APARTMENT_URL } from "../../constants";
import { createRequest } from "../../meta.payload.wrapper";
import { revalidatePath } from "next/cache";
import { Apartment } from "@/app/lcmapplication/types/invoice";
import { ApartmentFormData } from "../../dto/Apartment.dto";

export const addApartmentsService = async (apartmentData: ApartmentFormData
) => {
  const url = `http://localhost:8080/api/${ADD_APARTMENT_URL}`;

  const payload = {
    name: apartmentData.name,
    address: apartmentData.location,
    status: apartmentData.status,
    unitTypes: apartmentData.unitType,
    waterUnitCost: apartmentData.waterUnitCost,
  };

  const data = createRequest(payload, "ADD_APARTMENTS");
  const response = await postRequest({
    url,
    data: data,
  });
  return response;
};

