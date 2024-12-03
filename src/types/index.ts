export interface Doctor {
  id: number;
  fullName: string;
  departmentId: number;
  department: Department;
  isHead: boolean;
}

export interface Department {
  id: number;
  name: string;
}

export interface Nurse {
  id: number;
  fullName: string;
  departmentId: number;
  department: Department;
}