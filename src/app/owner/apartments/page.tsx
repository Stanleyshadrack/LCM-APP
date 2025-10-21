

import { fetchApartmentService } from "@/apiActions/tenantsApis/services/apartments/fetch.apartment.service";
import Apartments from "./apartments";



export default async function ApartmentsPage() {

  const apartments = await fetchApartmentService()
  return <Apartments apartments={apartments} />;
}
