import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // For Ward selection

@Component({
  selector: 'app-admission-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './admission-dialog.html',
  styleUrls: ['./admission-dialog.scss']
})
export class AdmissionDialog {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdmissionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: number }
  ) {
    this.form = this.fb.group({
      admissionDate: [new Date(), Validators.required], // Default to today
      ward: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      // Return the form value to the caller
      this.dialogRef.close(this.form.value);
    }
  }
}
