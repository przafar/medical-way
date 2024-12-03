import { defineStore } from 'pinia';
import { Doctor } from '@/types';
import doctorsData from '@/data/doctors.json';
import { useDepartmentsStore } from './departments';

export const useDoctorsStore = defineStore('doctors', {
  state: () => ({
    doctors: [] as Doctor[],
  }),
  actions: {
    GET_ALL() {
      if (this.doctors.length > 0) {
        return;
      }

      const departmentsStore = useDepartmentsStore();

      if (departmentsStore.departments.length === 0) {
        departmentsStore.GET_ALL();
      }

      const doctorsList = doctorsData as Doctor[];

      this.doctors = doctorsList.map((doctor) => {
        const department = departmentsStore.departments.find(
          (dept) => dept.id === doctor.departmentId
        );
        return {
          ...doctor,
          department,
        };
      });
    },
    CREATE(doctor: Doctor) {
      doctor.id = this.doctors.length + 1;
      this.doctors.push(doctor);
    },
    UPDATE(updatedDoctor: Doctor) {
      const index = this.doctors.findIndex((d) => d.id === updatedDoctor.id);
      if (index !== -1) {
        this.doctors.splice(index, 1, updatedDoctor);
      }
    },
    DELETE(id: number) {
      this.doctors = this.doctors.filter((doctor) => doctor.id !== id);
    },
  },

  getters: {
    getDoctors: (state) => state.doctors,
  }
});
