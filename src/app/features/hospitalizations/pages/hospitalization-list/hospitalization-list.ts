import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips'; // Nice for status!

import { Hospitalization } from '../../models/hospitalization.model';
import { HospitalizationService } from '../../services/hospitalization.service';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdmissionDialog } from '../../components/admission-dialog/admission-dialog';

@Component({
  selector: 'app-hospitalization-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './hospitalization-list.html',
  styleUrls: ['./hospitalization-list.scss']
})
export class HospitalizationList implements OnInit {
  hospitalizations: Hospitalization[] = [];
  patientId?: number;

  displayedColumns: string[] = ['admissionDate', 'ward', 'reason', 'status', 'dischargeDate', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private hospitalizationService: HospitalizationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.patientId = Number(idString);
      this.loadData();
    }
  }

  loadData() {
    if (this.patientId) {
      this.hospitalizationService.getByPatientId(this.patientId).subscribe(data => {
        this.hospitalizations = data;
      });
    }
  }
  openAdmissionDialog() {
    const dialogRef = this.dialog.open(AdmissionDialog, {
      width: '400px',
      data: { patientId: this.patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked Save and we got data!
        const newAdmission: any = {
          patientId: this.patientId,
          ...result,
          status: 'active'
        };

        this.hospitalizationService.admitPatient(newAdmission).subscribe(() => {
          // Refresh the list to show the new item
          this.loadData();
        });
      }
    });
  }

}
