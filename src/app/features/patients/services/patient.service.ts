import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' // Available application-wide
})
export class PatientService {

  // Mock data mimicking a database
  private patients: Patient[] = [
    {
      id: 1,
      firstName: 'Mario',
      lastName: 'Rossi',
      dateOfBirth: '1980-05-10',
      sex: 'M',
      fiscalCode: 'RSSMRA80E10H501Z'
    },
    {
      id: 2,
      firstName: 'Luigi',
      lastName: 'Bianchi',
      dateOfBirth: '1975-11-22',
      sex: 'M',
      fiscalCode: 'BNCGLG75S22H501X'
    }
  ];

  // Simulate getting all patients
  getPatients(): Observable<Patient[]> {
    return of(this.patients);
  }

  // Simulate getting one patient by ID
  getPatientById(id: number): Observable<Patient | undefined> {
    const patient = this.patients.find(p => p.id === id);
    return of(patient);
  }

  // Simulate creating a patient (we will use this later)
  createPatient(patient: Patient): void {
    // Generate a new fake ID
    const newId = this.patients.length > 0 ? Math.max(...this.patients.map(p => p.id)) + 1 : 1;
    patient.id = newId;
    this.patients.push(patient);
  }

  // Add this method to your PatientService class
  updatePatient(updatedPatient: Patient): void {
    const index = this.patients.findIndex(p => p.id === updatedPatient.id);
    if (index !== -1) {
      this.patients[index] = updatedPatient;
    }
}
}
