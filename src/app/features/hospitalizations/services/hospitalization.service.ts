import { Injectable } from '@angular/core';
import { Hospitalization } from '../models/hospitalization.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalizationService {

  // Mock Data
  private hospitalizations: Hospitalization[] = [
    {
      id: 101,
      patientId: 1, // Mario Rossi
      admissionDate: '2023-01-15T08:00:00',
      dischargeDate: '2023-01-20T14:00:00',
      ward: 'Surgery',
      reason: 'Appendicitis',
      status: 'discharged',
      deleted: false
    },
    {
      id: 102,
      patientId: 1, // Mario Rossi (Re-admitted later)
      admissionDate: '2023-11-10T10:30:00',
      ward: 'Cardiology',
      reason: 'Chest Pain',
      status: 'active', // No discharge date yet!
      deleted: false
    },
    {
      id: 103,
      patientId: 2, // Luigi Bianchi
      admissionDate: '2023-05-05T09:00:00',
      dischargeDate: '2023-05-06T11:00:00',
      ward: 'Emergency',
      reason: 'Minor Concussion',
      status: 'discharged',
      deleted: false
    }
  ];

  // Get all hospitalizations for a SPECIFIC patient
  getByPatientId(patientId: number): Observable<Hospitalization[]> {
    const list = this.hospitalizations.filter(h => h.patientId === patientId);
    // Sort by date descending (newest first)
    list.sort((a, b) => new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime());
    return of(list);
  }

  // Admit a patient
  admitPatient(hospitalization: Hospitalization): Observable<Hospitalization> {
    // Generate ID
    const newId = Math.max(...this.hospitalizations.map(h => h.id), 100) + 1;
    hospitalization.id = newId;
    hospitalization.status = 'active';
    this.hospitalizations.push(hospitalization);
    return of(hospitalization);
  }

  // Discharge a patient
  dischargePatient(id: number, date: string): Observable<void> {
    const record = this.hospitalizations.find(h => h.id === id);
    if (record) {
      record.dischargeDate = date;
      record.status = 'discharged';
    }
    return of(void 0);
  }
}
