import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HealthReport {
  id?: number;
  client: number;
  client_name?: string;
  date_recorded: string;
  mood?: string;
  appetite?: string;
  observations?: string;
  concerns?: string;
}

@Injectable({ providedIn: 'root' })
export class HealthService {
  private apiUrl = 'http://127.0.0.1:8000/api/health-reports/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<HealthReport[]> {
    return this.http.get<HealthReport[]>(this.apiUrl);
  }

  get(id: number): Observable<HealthReport> {
    return this.http.get<HealthReport>(`${this.apiUrl}${id}/`);
  }

  create(data: HealthReport) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: HealthReport) {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}