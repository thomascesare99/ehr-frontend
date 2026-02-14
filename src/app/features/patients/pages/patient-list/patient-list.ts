import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

// Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.scss']
})
export class PatientList implements OnInit {

  patients: Patient[] = [];

  // DEFINING COLUMNS:
  // The strings here must match the 'matColumnDef' names in the HTML
  displayedColumns: string[] = ['name', 'fiscalCode', 'dob', 'actions'];

  // Inject the service
  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    // Subscribe to the observable to get data
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }
}
