export interface Hospitalization {
  id: number;
  patientId: number;        // Foreign Key link to Patient
  admissionDate: string;    // ISO Date string
  dischargeDate?: string;   // Optional (nullable) -> If null, patient is currently admitted
  ward: string;            // Department (e.g., 'Cardiology', 'Emergency')
  reason: string;          // Diagnosis or complaint
  status: 'active' | 'discharged';
  deleted: boolean;        // Soft delete flag
}
