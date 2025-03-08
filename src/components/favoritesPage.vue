<!-- <template>
  <div class="p-4 bg-indigo-800 text-white">
    <h2 class="text-2xl mb-4">Избранные маршруты</h2>
    <div v-if="favorites.length === 0">
      Нет избранных маршрутов
    </div>
    <div v-else>
      <div 
        v-for="route in favorites" 
        :key="route.title" 
        class="py-2 border-b border-gray-600"
      >
        {{ route.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const favorites = ref([]);

// Загрузка избранных при монтировании
onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
  // Нужно получить все маршруты из way.vue (возможно через props)
});
</script> -->

<script setup>
import { computed } from 'vue';

// Принимаем маршруты через props
const props = defineProps(['routes']);

// Вычисляем избранные маршруты
const favorites = computed(() => 
  props.routes.filter(route => route.isFavorite)
);
</script>

<template>
  <div class="p-4 bg-indigo-800 text-white">
    <h2 class="text-2xl mb-4">Избранные маршруты</h2>
    <div v-if="favorites.length === 0">
      Нет избранных маршрутов
    </div>
    <div v-else>
      <div 
        v-for="route in favorites" 
        :key="route.title" 
        class="py-2 border-b border-gray-600"
      >
        {{ route.title }}
      </div>
    </div>
  </div>
</template>