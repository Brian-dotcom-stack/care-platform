export interface Staff {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: 'admin' | 'manager' | 'senior_carer' | 'carer';
  job_title: string;
  contract_type: 'full_time' | 'part_time' | 'bank';
  start_date: string;
  phone: string;
  photo: string | null;
  is_active: boolean;
  date_of_birth: string | null;
  address: string;
  ni_number: string;
  manager_name: string | null;
  nok_name: string;
  nok_phone: string;
  nok_relationship: string;
}

export interface TrainingRecord {
  id: number;
  staff: number;
  course_name: string;
  completed_on: string;
  expiry_date: string | null;
  certificate: string | null;
  notes: string;
}

export interface ClockRecord {
  id: number;
  staff: number;
  clock_in: string;
  clock_out: string | null;
  hours_worked: number | null;
}