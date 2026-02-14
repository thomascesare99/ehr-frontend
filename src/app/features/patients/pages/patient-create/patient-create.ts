import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Material Imports
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-create',
  standalone: true,
  // IMPORT ReactiveFormsModule HERE
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // Add Material Modules here
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './patient-create.html',
  styleUrls: ['./patient-create.scss']
})
export class PatientCreate implements OnInit {

  patientForm: FormGroup;
  isEditMode = false;
  patientId?: number;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute ) {

    // Define the form structure and validators
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      sex: ['M', Validators.required], // Default to 'M'
      fiscalCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{16}$/)]] // Simple regex for length
    });

  }

  ngOnInit(): void {
    // Check if there is an ID in the URL
    const idString = this.route.snapshot.paramMap.get('id');

    if (idString) {
      this.isEditMode = true;
      this.patientId = Number(idString);

      // Load data and fill form
      this.patientService.getPatientById(this.patientId).subscribe(patient => {
        if (patient) {
          this.patientForm.patchValue(patient); // Magic! Fills the form matching names
        }
      });
    }
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const formValue = this.patientForm.value;

      if (this.isEditMode && this.patientId) {
        // UPDATE Logic
        const updatedPatient: Patient = {
          id: this.patientId,
          ...formValue
        };
        this.patientService.updatePatient(updatedPatient);
      } else {
        // CREATE Logic
        const newPatient: Patient = {
          id: 0,
          ...formValue
        };
        this.patientService.createPatient(newPatient);
      }

      // After saving, navigate back to the list
      this.router.navigate(['/patients']);
    }
  }
}
