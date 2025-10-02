export interface Tenant {
  key: string;
  name: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  apartment: string;
  unit: string;
  dateCreated: string;
  status: string;
  tenancyAgreement?: File | string;
  dateVacated?: string;
}


// src/types/tenant.ts
export interface TenantAPiResponse {
  id: number;
  fullName: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  apartment: string;
  unit: string;
  status: string; // expand if you have more statuses
  tenancyAgreement: string | null;
  dateCreated: string;   // ISO timestamp
  dateUpdated: string | null;
  dateVacated: string | null;
}
