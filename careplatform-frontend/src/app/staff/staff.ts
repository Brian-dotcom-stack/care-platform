import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Staff, TrainingRecord, ClockRecord } from "./models/staff";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class StaffService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // staff CRUD 
  getAll (): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.api}/staff/`);
  }

  getOne (id: Number): Observable<Staff> {
    return this.http.get<Staff>(`${this.api}/staff/${id}/`);
  }

  getMe (): Observable<Staff> {
    return this.http.get<Staff>(`${this.api}/staff/me/`);
  }

  create (data: Partial<Staff>): Observable<Staff> {
    return this.http.post<Staff>(`${this.api}/staff/`, data);
  }

  update (id: Number, data: Partial<Staff>): Observable<Staff> {
    return this.http.patch<Staff>(`${this.api}/staff/${id}/`, data);
  }

  delete (id: Number): Observable<void> {
    return this.http.delete<void>(`${this.api}/staff/${id}/`);
  }

  // Training
  getTraining(staffId: Number): Observable<TrainingRecord[]> {
    return this.http.get<TrainingRecord[]>(
      `${this.api}/staff/${staffId}/training/`
    );
  }

  // Clock in/out
  clockIn(): Observable<ClockRecord> {
    return this.http.post<ClockRecord>(`${this.api}/staff/clock_in/`, {});
  }

  clockOut(): Observable<ClockRecord> {
    return this.http.post<ClockRecord>(`${this.api}/staff/clock_out/`, {});
  }
}