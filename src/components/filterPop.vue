<script setup>
import { ref } from 'vue';

const emit = defineEmits(['apply', 'close']);
const minDistance = ref(null);
const maxParticipants = ref(null);

const applyFilters = () => {
  emit('apply', { minDistance: minDistance.value, maxParticipants: maxParticipants.value });
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-5 rounded-lg w-96">
      <h2 class="text-lg font-bold">Фильтр маршрутов</h2>
      
      <label class="block mt-3">Максимальная протяженность (км)</label>
      <input v-model="minDistance" type="number" class="border p-1 w-full">

      <label class="block mt-3">Макс. кол-во участников</label>
      <input v-model="maxParticipants" type="number" class="border p-1 w-full">

      <div class="flex justify-end mt-4 space-x-2">
        <button @click="applyFilters" class="bg-blue-500 text-white px-4 py-2 rounded">Применить</button>
        <button @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded">Закрыть</button>
      </div>
    </div>
  </div>
</template>
