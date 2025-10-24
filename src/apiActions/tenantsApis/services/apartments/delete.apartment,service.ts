import { apiRequest } from "@/apiActions/reusableActios/fetchAction";

export const deleteApartmentService =async (id:number)=>{
     const deletedApartment = await apiRequest({
        url: `http://localhost:8080/api/v1/apartments/${id}`,
        method: "DELETE",
      });
      console.log(deletedApartment)
    
}
