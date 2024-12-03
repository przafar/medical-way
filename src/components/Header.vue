<template>
  <nav class="bg-[#003fe2]">
    <div class="container mx-auto flex items-center justify-between p-4">
      <a href="#" class="flex items-center">
        <img src="../assets/logo.png" class="h-8" alt="Логотип медучреждения" />
      </a>
      <div class="flex space-x-4">
        <router-link
            :to="{ name: 'Doctors' }"
            :class="linkClass('Doctors')"
        >
          Врачи
        </router-link>
        <router-link
            :to="{ name: 'Nurses' }"
            :class="linkClass('Nurses')"
        >
          Медсестры
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const linkClass = (routeName: string) => {
  return [
    'hover:text-gray-200',
    route.name === routeName ? 'text-[#ff3f3f]' : 'text-white',
  ];
};
</script>

<style scoped>
</style>
