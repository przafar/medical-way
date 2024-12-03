<template>
  <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg overflow-hidden w-11/12 max-w-md mx-auto">
      <div class="p-4">
        <div class="flex flex-row justify-between items-center">
            <h2 class="text-xl font-bold">
              {{ isEditMode ? 'Редактировать врача' : 'Добавить врача' }}
            </h2>
            <span @click="closeModal" class="p-2 cursor-pointer">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </span>
        </div>
        <div class="space-y-4 mt-4">
          <div>
            <label class="block text-gray-700">ФИО</label>
            <input
                v-model="formData.fullName"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700">Отделение</label>
            <select
                v-model="formData.departmentId"
                class="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option
                  v-for="dept in getDepartments"
                  :key="dept.id"
                  :value="dept.id"
              >
                {{ dept.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center">
            <input
                v-model="formData.isHead"
                type="checkbox"
                id="isHead"
                class="mr-2"
            />
            <label for="isHead" class="text-gray-700">
              Заведующий отделения
            </label>
          </div>
        </div>
        <div class="mt-4 flex justify-end space-x-2">
          <button
              class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              @click="closeModal()"
          >
            Отмена
          </button>
          <button
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              @click="submitHandler"
          >
            {{ isEditMode ? 'Сохранить' : 'Добавить' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, computed, onMounted } from 'vue';
import { Doctor } from '@/types';
import { useDepartmentsStore } from '@/stores/departments';

const store = useDepartmentsStore();

const emit = defineEmits(['submit', 'cancel']);
const props = defineProps<{
  doctorData?: Doctor;
}>();

const formData = reactive<Doctor>({
  id: 0,
  fullName: '',
  departmentId: 0,
  isHead: false,
});

onMounted(() => {
  fetchDetails()
});

const fetchDetails = () => {
  if (store.departments.length === 0) {
    store.GET_ALL();
  }
  if (isEditMode.value) {
    Object.assign(formData, props.doctorData);
  } else {
    formData.id = 0;
    formData.fullName = '';
    formData.departmentId = null;
    formData.isHead = false;
  }
};

const getDepartments = computed(() => store.getDepartments);
const isEditMode = computed(() => !!props.doctorData);



const submitHandler = () => {
  if (!formData.fullName || formData.fullName.trim() === '' && !formData.departmentId) {
    return;
  }
  emit('submit', { ...formData });
};

const closeModal = () => {
  emit('cancel');
};
</script>

<style scoped>
</style>
