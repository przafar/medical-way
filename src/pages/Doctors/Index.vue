<template>
  <div class="container mx-auto mt-8">
    <div class="flex flex-row justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Врачи</h1>
      </div>
      <div>
        <button
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            @click="openModal('create')"
        >
          Добавить врача
        </button>
      </div>
    </div>

    <div class="mt-4">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
        <tr class="text-left">
          <th class="py-2 px-4 border-b border-gray-200">ФИО</th>
          <th class="py-2 px-4 border-b border-gray-200">Отделение</th>
          <th class="py-2 px-4 border-b border-gray-200">Заведующий отделения</th>
          <th class="py-2 px-4 border-b border-gray-200 text-center" >Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="doctor in getDoctors"
            :key="doctor.id"
            class="hover:bg-gray-100"
        >
          <td class="py-2 px-4 border-b border-gray-200">{{ doctor.fullName }}</td>
          <td class="py-2 px-4 border-b border-gray-200">
            {{ doctor.department ? doctor.department.name : '-' }}
          </td>
          <td class="py-2 px-4 border-b border-gray-200">
            {{ doctor.isHead ? 'Да' : 'Нет' }}
          </td>
          <td class="py-2 px-4 border-b border-gray-200 text-right">
            <button
                class="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                @click="openModal('edit', doctor)"
            >
              Редактировать
            </button>
            <button
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                @click="deleteHandle(doctor.id)"
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
        :doctorData="selectedDoctor"
        @submit="submitHandler"
        @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useDoctorsStore } from '@/stores/doctors';
import { useDepartmentsStore } from '@/stores/departments';
import { Doctor } from '@/types';
import Modal from './components/Modal.vue';

const store = useDoctorsStore();
const departmentsStore = useDepartmentsStore();

const isModalVisible = ref(false);
const selectedDoctor = ref<Doctor | null>(null);
const modalAction = ref<'create' | 'edit'>('create');


onMounted(() => {
  store.GET_ALL();
  departmentsStore.GET_ALL();
});

const getDoctors = computed(() => store.getDoctors);

const openModal = (action: 'create' | 'edit', doctor?: Doctor) => {
  modalAction.value = action;
  if (action === 'edit' && doctor) {
    selectedDoctor.value = { ...doctor };
  } else {
    selectedDoctor.value = null;
  }
  isModalVisible.value = true;
};

const submitHandler = (doctorData: Doctor) => {
  if (modalAction.value === 'create') {
    store.CREATE(doctorData);
  } else if (modalAction.value === 'edit') {
    store.UPDATE(doctorData);
  }
  isModalVisible.value = false;
};

const deleteHandle = (doctorId: number) => {
  store.DELETE(doctorId);
};

const handleCancel = () => {
  isModalVisible.value = false;
};
</script>

<style scoped>
</style>
