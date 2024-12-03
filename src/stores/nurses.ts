import { defineStore } from 'pinia';
import { Nurse } from '@/types';
import nursesData from '@/data/nurses.json';
import {useDepartmentsStore} from "./departments.ts";

export const useNursesStore = defineStore('nurses', {
  state: () => ({
    nurses: [] as Nurse[],
  }),
  actions: {
    GET_ALL() {
      if (this.nurses.length > 0) {
        return;
      }

      const departmentsStore = useDepartmentsStore();

      if (departmentsStore.departments.length === 0) {
        departmentsStore.GET_ALL();
      }

      const nursesList = nursesData as Nurse[];

      this.nurses = nursesList.map((nurse) => {
        const department = departmentsStore.departments.find(
          (dept) => dept.id === nurse.departmentId
        );
        return {
          ...nurse,
          department,
        };
      });
    },
    CREATE(nurse: Nurse) {
      nurse.id = this.nurses.length + 1;
      this.nurses.push(nurse);
    },
    UPDATE(updatedNurse: Nurse) {
      const index = this.nurses.findIndex((n) => n.id === updatedNurse.id);
      if (index !== -1) {
        this.nurses.splice(index, 1, updatedNurse);
      }
    },
    DELETE(id: number) {
      this.nurses = this.nurses.filter((nurse) => nurse.id !== id);
    },
  },

  getters: {
    getNurses: (state) => state.nurses,
  }
});
