<!-- <script setup>
import search from './search.vue';
import buttons from './buttons.vue';

const highlightRoute = (routeId) => {
  // Вызываем событие для выделения маршрута
  $emit('highlightRoute', routeId);
};

const resetRouteHighlight = () => {
  // Вызываем событие для сброса выделения маршрута
  $emit('resetRouteHighlight');
};
</script>

<template>
    <span class=" text-white text-3xl text-center" >Научно-образовательные маршруты по Уфе</span>
    <search placeholderText="найти маршрут" /> 

    <div class="space-y-3" style="width: 420px">
            
        <buttons title="«Сократ»: научно-популярный маршрут гуманитарной направленности" @mouseover="highlightRoute('sokrat')"  @mouseout="resetRouteHighlight"/>
        <buttons title="Уфа физико-математическая: «Циолковский». Уфа сквозь призму математики и физики" @mouseover="highlightRoute('tsiolkovsky')" @mouseout="resetRouteHighlight"/>
        <buttons title="«Уфа естественно-научная: от зарождения жизни на Земле к ноосфере В.И. Вернадского»" @mouseover="highlightRoute('vernadsky')" @mouseout="resetRouteHighlight"/>
        <buttons title="«Пифагор». IT-UFA" @click="() => { $emit('navigate'); $emit('selectRoute', 'routePif') }" @mouseover="highlightRoute('pifagor')" @mouseout="resetRouteHighlight"/>
        <buttons title="«Авиценна». Биолого-медицинская экскурсия" @mouseover="highlightRoute('avicena')" @mouseout="resetRouteHighlight"/>
        <buttons title="Шень Ко: мир научно-технических разработок" @mouseover="highlightRoute('shen_ko')" @mouseout="resetRouteHighlight"/>
        <buttons title="«Дмитрий Менделеев». Уфа – химическая столица России: от атомов к материалам будущего»" @mouseover="highlightRoute('mendeleev')" @mouseout="resetRouteHighlight"/>
    </div>

</template> -->

<script setup>
import { ref, computed, onMounted } from 'vue';
import search from './search.vue';
import buttons from './buttons.vue';
import filterPop from './filterPop.vue';

const searchQuery = ref('');
// Показывать ли окно фильтра
const showFilterPopup = ref(false);

// Значения фильтра
const filterDistance = ref(null);
const filterParticipants = ref(null);


// Загружаем фильтры из localStorage при монтировании компонента
onMounted(() => {
  const savedFilters = JSON.parse(localStorage.getItem('filters'));
  if (savedFilters) {
    filterDistance.value = savedFilters.filterDistance;
    filterParticipants.value = savedFilters.filterParticipants;
  }

  const savedSearchQuery = localStorage.getItem('searchQuery');
  if (savedSearchQuery) {
    searchQuery.value = savedSearchQuery;
  }
});

const routes = ref([
  { title: "«Сократ»: научно-популярный маршрут гуманитарной направленности", route: "routeSokrat", page: 'page2_sokrat', distance: 8.5, participants: 15 },
  { title: "Уфа физико-математическая: «Циолковский». Уфа сквозь призму математики и физики", route: null },
  { title: "«Уфа естественно-научная: от зарождения жизни на Земле к ноосфере В.И. Вернадского»", route: null },
  { title: "«Пифагор». IT-UFA", route: "routePif", page: "page2", distance: 14.3, participants: 15 },
  { title: "«Авиценна». Биолого-медицинская экскурсия", route: null },
  { title: "Шень Ко: мир научно-технических разработок", route: "routeShenko", page: "page2_shenko", distance: 8.7, participants: 25 },
  { title: "«Дмитрий Менделеев». Уфа – химическая столица России: от атомов к материалам будущего»", route: null }
]);


const filteredRoutes = computed(() => {
  return routes.value.filter(route => {
    return (
      route.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterDistance.value === null || (route.distance !== undefined && route.distance <= filterDistance.value)) &&
      (filterParticipants.value === null || (route.participants !== undefined && route.participants <= filterParticipants.value))
    );
  });
});


// Функция для применения фильтров
const applyFilters = (filters) => {
  filterDistance.value = filters.minDistance;
  filterParticipants.value = filters.maxParticipants;
  localStorage.setItem('filters', JSON.stringify({
    filterDistance: filters.minDistance,
    filterParticipants: filters.maxParticipants
  }));
  showFilterPopup.value = false;
};

// Функция для сброса фильтров
const resetFilters = () => {
  searchQuery.value = ''; // Очистить строку поиска
  filterDistance.value = null; // Сбросить фильтр по расстоянию
  filterParticipants.value = null; // Сбросить фильтр по количеству участников
  localStorage.removeItem('filters'); // Удалить сохраненные фильтры из localStorage
  localStorage.removeItem('searchQuery'); // Удалить строку поиска из localStorage
};
</script>

<template>
  
  <span class="text-white text-3xl text-center">Научно-образовательные маршруты по Уфе</span>
  
  <!-- Поле поиска -->
  <search v-model="searchQuery" placeholderText="найти маршрут" :showFilter="true" @click-filter="showFilterPopup = true" />

  <!-- Фильтрованный список маршрутов -->
  <div class="space-y-3" style="width: 420px">
    <buttons 
      v-for="route in filteredRoutes" 
      :key="route.title" 
      :title="route.title" 
      @click="() => {
        console.log('Нажали маршрут:', route.title);
        console.log('Переключаем на страницу:', route.page);
        console.log('Переключаем карту на:', route.route);
        
        if (route.page) $emit('navigate', route.page);
        if (route.route) $emit('selectRoute', route.route);
      }"
    />
  </div>

  <button @click="resetFilters" class="bg-red-500 text-white px-4 py-2 mt-4 rounded">Сбросить фильтры</button>

  <filterPop 
    v-if="showFilterPopup" 
    @apply="applyFilters" 
    @close="showFilterPopup = false"
  />

</template>
