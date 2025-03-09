<script setup>
import { ref, onMounted } from 'vue';

// Полный список маршрутов (нужно, чтобы восстановить избранные маршруты)
const allRoutes = [
  { title: "«Сократ»: научно-популярный маршрут гуманитарной направленности", route: "routeSokrat", distance: 8.5, participants: 15 },
  { title: "Уфа физико-математическая: «Циолковский». Уфа сквозь призму математики и физики", route: "routeTsiolkovsky", distance: 22, participants: 15 },
  { title: "«Уфа естественно-научная: от зарождения жизни на Земле к ноосфере В.И. Вернадского»", route: "routeVernadsky", distance: 1, participants: 15 },
  { title: "«Пифагор». IT-UFA", route: "routePif", distance: 14.3, participants: 15 },
  { title: "«Авиценна». Биолого-медицинская экскурсия", route: null },
  { title: "Шень Ко: мир научно-технических разработок", route: "routeShenko", distance: 8.7, participants: 25 },
  { title: "«Дмитрий Менделеев». Уфа – химическая столица России: от атомов к материалам будущего»", route: "routeMendeleev", distance: 14, participants: 15 }
];

const favorites = ref([]);

onMounted(() => {
  const savedTitles = JSON.parse(localStorage.getItem('favorites') || '[]');

  // Восстанавливаем полные объекты маршрутов по их названиям
  favorites.value = allRoutes.filter(route => savedTitles.includes(route.title));
});
</script>

<template>
  <div class="p-4 bg-indigo-800 text-white">
    <h2 class="text-2xl mb-4">Избранные маршруты</h2>
    <div v-if="favorites.length === 0">Нет избранных маршрутов</div>
    <div v-else>
      <div v-for="route in favorites" :key="route.title" class="py-2 border-b border-gray-600">
        {{ route.title }}
      </div>
    </div>
  </div>
</template>
