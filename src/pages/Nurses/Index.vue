<template>
  <div class="container mx-auto mt-8">
    <div class="flex flex-row justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Медсестры</h1>
      </div>
      <div>
        <button
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            @click="openModal('create')"
        >
          Добавить медсестру
        </button>
      </div>
    </div>

    <div class="mt-4">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
        <tr class="text-left">
          <th class="py-2 px-4 border-b border-gray-200">ФИО</th>
          <th class="py-2 px-4 border-b border-gray-200">Отделение</th>
          <th class="py-2 px-4 border-b border-gray-200 text-center" >Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="nurse in getNurses"
            :key="nurse.id"
            class="hover:bg-gray-100"
        >
          <td class="py-2 px-4 border-b border-gray-200">{{ nurse.fullName }}</td>
          <td class="py-2 px-4 border-b border-gray-200">
            {{ nurse.department ? nurse.department.name : '-' }}
          </td>

          <td class="py-2 px-4 border-b border-gray-200 text-right">
            <button
                class="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                @click="openModal('edit', nurse)"
            >
              Редактировать
            </button>
            <button
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                @click="deleteHandle(nurse.id)"
            >
              Удалить
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>


    <Modal
        v-if="isModalVisible"
        :doctorData="selectedNurse"
        @submit="submitHandler"
        @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useNursesStore } from '@/stores/nurses.ts';
import { useDepartmentsStore } from '@/stores/departments';
import { Nurse } from '@/types';
import Modal from './components/Modal.vue';

const store = useNursesStore();
const departmentsStore = useDepartmentsStore();

const isModalVisible = ref(false);
const selectedNurse = ref<Nurse | null>(null);
const modalAction = ref<'create' | 'edit'>('create');


onMounted(() => {
  store.GET_ALL();
  departmentsStore.GET_ALL();
});

const getNurses = computed(() => store.getNurses);

const openModal = (action: 'create' | 'edit', nurse?: Nurse) => {
  modalAction.value = action;
  if (action === 'edit' && nurse) {
    selectedNurse.value = { ...nurse };
  } else {
    selectedNurse.value = null;
  }
  isModalVisible.value = true;
};

const submitHandler = (nurseData: Nurse) => {
  if (modalAction.value === 'create') {
    store.CREATE(nurseData);
  } else if (modalAction.value === 'edit') {
    store.UPDATE(nurseData);
  }
  isModalVisible.value = false;
};

const deleteHandle = (nurseId: number) => {
  store.DELETE(nurseId);
};

const handleCancel = () => {
  isModalVisible.value = false;
};
</script>

<style scoped>
</style>
