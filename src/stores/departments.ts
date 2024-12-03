import { defineStore } from 'pinia';
import { Department } from '@/types';
import departmentsData from '@/data/departments.json';

export const useDepartmentsStore = defineStore('departments', {
  state: () => ({
    departments: [] as Department[],
  }),
  actions: {
    GET_ALL() {
      this.departments = departmentsData as Department[];
    },
  },
  getters: {
    getDepartments: (state) => state.departments,
  }
});
