import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { StaffService } from '../staff';
import { Staff } from '../models/staff';

@Component({
  selector: 'app-staff-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './staff-form.html',
  styleUrl: './staff-form.scss'
})
export class StaffFormComponent implements OnInit {
  isEditMode = false;
  staffId: number | null = null;
  loading = false;
  saving = false;
  error = '';
  success = '';

  formData: Partial<Staff> & { password?: string } = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    job_title: '',
    role: 'carer',
    contract_type: 'full_time',
    start_date: '',
    address: '',
    ni_number: '',
    nok_name: '',
    nok_phone: '',
    nok_relationship: '',
    password: ''
  };

  constructor(
    private staffService: StaffService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.staffId = Number(id);
      this.loading = true;
      this.staffService.getOne(this.staffId).subscribe({
        next: (data) => {
          this.formData = { ...data };
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load staff member.';
          this.loading = false;
        }
      });
    }
  }

  save() {
    this.saving = true;
    this.error = '';
    if (this.isEditMode && this.staffId) {
      this.staffService.update(this.staffId, this.formData).subscribe({
        next: () => {
          this.router.navigate(['/staff', this.staffId]);
        },
        error: () => {
          this.error = 'Could not save changes. Please check all fields.';
          this.saving = false;
        }
      });
    } else {
      this.staffService.create(this.formData).subscribe({
        next: (created) => {
          this.router.navigate(['/staff', created.id]);
        },
        error: () => {
          this.error = 'Could not create staff member. Please check all fields.';
          this.saving = false;
        }
      });
    }
  }
}