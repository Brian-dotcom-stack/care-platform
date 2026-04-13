import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import {FormsModule} from "@angular/forms";
import { StaffService } from "../staff";
import { Staff } from "../models/staff";

@Component({
  selector: "app-staff-list",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: `./staff-list.html`,
  styleUrl: `./staff-list.scss`
})
export class StaffListComponent implements OnInit {
  staff: Staff[] = [];
  filtered: Staff[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  loading = true;
  error = '';

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.staffService.getAll().subscribe({
      next: (data) => {
        this.staff = data;
        this.filtered = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load staff members. Is the Django server running?';
        this.loading = false;
      }
    });
  }

  filter() {
    this.filtered = this.staff.filter(s => {
      const matchSearch = s.full_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || s.job_title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchRole = this.selectedRole ? s.role === this.selectedRole : true;
      return matchSearch && matchRole;
    });
}

getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

getRoleBadge(role: string): string {
  const map: Record<string, string> = {
    admin: 'badge-red',
    manager: 'badge-blue',
    senior_carer: 'badge-amber',
    carer: 'badge-green',
  };
    return map[role] || 'badge-gray';
  }

  getRoleLabel(role: string): string {
    const map: Record<string, string> = {
      admin: 'Admin',
      manager: 'Manager',
      senior_carer: 'Senior Carer',
      carer: 'Carer',
    };
    return map[role] || role;
  }
}
