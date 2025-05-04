<script setup>
import { ref, computed, onMounted } from 'vue';
import search from './search.vue';
import buttons from './buttons.vue';
import filterPop from './filterPop.vue';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnXXJ1R-lkoheA8LEJuHLzy2kjUvcC4-w",
  authDomain: "myproject-35bc3.firebaseapp.com",
  projectId: "myproject-35bc3",
  storageBucket: "myproject-35bc3.firebasestorage.app",
  messagingSenderId: "1064017138140",
  appId: "1:1064017138140:web:b294ccd4f2b9c9762abf19"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const searchQuery = ref('');
// Показывать ли окно фильтра
const showFilterPopup = ref(false);

// Значения фильтра
const filterDistance = ref(null);
const filterParticipants = ref(null);
const filterAudience = ref(""); // Новое состояние
const filterMinDuration = ref(0);
const filterMaxDuration = ref(300);

const favoritesLoaded = ref(false);
// Загружаем фильтры из localStorage при монтировании компонента
// onMounted(() => {
//   const savedFilters = JSON.parse(localStorage.getItem('filters'));
//   if (savedFilters) {
//     filterDistance.value = savedFilters.filterDistance;
//     filterParticipants.value = savedFilters.filterParticipants;
//   }

//   const savedSearchQuery = localStorage.getItem('searchQuery');
//   if (savedSearchQuery) {
//     searchQuery.value = savedSearchQuery;
//   }
// });

const routes = ref([
  { title: "«Сократ»: научно-популярный маршрут гуманитарной направленности", route: "routeSokrat", page: 'page2_sokrat', distance: 8.5, participants: 15, isFavorite: false, audience: '15-17', duration:240},
  { title: "Уфа физико-математическая: «Циолковский». Уфа сквозь призму математики и физики", route: "routeTsiolkovsky", page: "page2_tsiolkovsky", distance: 22, participants: 15, isFavorite: false, audience: '12-18', duration:220},
  { title: "«Уфа естественно-научная: от зарождения жизни на Земле к ноосфере В.И. Вернадского»", route: "routeVernadsky", page: "page2_vernadsky", distance: 1, participants: 15, isFavorite: false, audience: '12-18', duration:245},
  { title: "«Пифагор». IT-UFA", route: "routePif", page: "page2", distance: 14.3, participants: 15, isFavorite: false, audience: '16-18',duration:275},
  { title: "«Авиценна». Биолого-медицинская экскурсия", route: null, isFavorite: false, duration: 240},
  { title: "Шень Ко: мир научно-технических разработок", route: "routeShenko", page: "page2_shenko", distance: 8.7, participants: 25, isFavorite: false, audience: '16-18', duration:220},
  { title: "«Дмитрий Менделеев». Уфа – химическая столица России: от атомов к материалам будущего»", route: "routeMendeleev", page: "page2_mendeleev", distance: 14, participants: 15, isFavorite: false, audience: '12-18', duration:240}
]);


const filteredRoutes = computed(() => {
  return routes.value.filter(route => {
    return (
      route.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterDistance.value === null || (route.distance !== undefined && route.distance <= filterDistance.value)) &&
      (filterParticipants.value === null || (route.participants !== undefined && route.participants <= filterParticipants.value)) &&
      (filterAudience.value === "" || route.audience === filterAudience.value) &&
      (route.duration >= filterMinDuration.value && route.duration <= filterMaxDuration.value) // Фильтр по длительности
    );
  });
});


// Функция для применения фильтров
const applyFilters = (filters) => {
  filterDistance.value = filters.minDistance;
  filterParticipants.value = filters.maxParticipants;
  filterAudience.value = filters.selectedAudience;
  filterMinDuration.value = filters.minDuration;
  filterMaxDuration.value = filters.maxDuration;

  localStorage.setItem('filters', JSON.stringify({
    filterDistance: filters.minDistance,
    filterParticipants: filters.maxParticipants,
    filterAudience: filters.selectedAudience,
    filterMinDuration: filters.minDuration,
    filterMaxDuration: filters.maxDuration
  }));
  showFilterPopup.value = false;
};

// Функция для сброса фильтров
const resetFilters = () => {
  searchQuery.value = ''; // Очистить строку поиска
  filterDistance.value = null; // Сбросить фильтр по расстоянию
  filterParticipants.value = null; // Сбросить фильтр по количеству участников
  filterAudience.value = "";
  filterMinDuration.value = 0; // Сбросить минимальную продолжительность
  filterMaxDuration.value = 300; // Сбросить максимальную продолжительность
  localStorage.removeItem('filters'); // Удалить сохраненные фильтры из localStorage
  localStorage.removeItem('searchQuery'); // Удалить строку поиска из localStorage
};

// Убедитесь, что функция toggleFavorite вызывается правильно
// const toggleFavorite = (route) => {
//   route.isFavorite = !route.isFavorite;
//   // Сохраняем только названия избранных маршрутов
//   const favoritesTitles = routes.value
//     .filter(r => r.isFavorite)
//     .map(r => r.title);
//   localStorage.setItem('favorites', JSON.stringify(favoritesTitles));
// };


// Загрузка избранных при монтировании
// onMounted(() => {
//   const savedTitles = JSON.parse(localStorage.getItem('favorites') || '[]');
//   routes.value.forEach(route => {
//     route.isFavorite = savedTitles.includes(route.title);
//   });
// });

// Функция загрузки избранных маршрутов
const loadFavorites = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const savedFavorites = userDoc.data().favorites || [];
      
      // Обновляем isFavorite для всех маршрутов, сравнивая по title
      routes.value.forEach(route => {
        route.isFavorite = savedFavorites.some(fav => fav.title === route.title);
      });
    }
  } else {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    routes.value.forEach(route => {
      route.isFavorite = savedFavorites.some(fav => fav.title === route.title);
    });
  }
};

// Функция переключения избранного маршрута
const toggleFavorite = async (route) => {
  route.isFavorite = !route.isFavorite;
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, { favorites: [] });
    }

    let favorites = (await getDoc(userDocRef)).data().favorites || [];
    if (route.isFavorite) {
      favorites.push(route);
    } else {
      favorites = favorites.filter(item => item.title !== route.title);
    }

    await updateDoc(userDocRef, { favorites });

  } else {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    const simplifiedRoute = { 
      title: route.title, 
      route: route.route, 
      page: route.page 
    };
    
    if (route.isFavorite) {
      favorites.push(simplifiedRoute);
    } else {
      favorites = favorites.filter(item => item.title !== route.title);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};


// При монтировании загружаем фильтры, поисковый запрос и избранные маршруты
onMounted(async () => {
  const savedFilters = JSON.parse(localStorage.getItem('filters'));
  if (savedFilters) {
    filterDistance.value = savedFilters.filterDistance;
    filterParticipants.value = savedFilters.filterParticipants;
    filterAudience.value = savedFilters.filterAudience;
    filterMinDuration.value = savedFilters.filterMinDuration; // Восстанавливаем слайдер
    filterMaxDuration.value = savedFilters.filterMaxDuration; // Восстанавливаем слайдер
  }
  const savedSearchQuery = localStorage.getItem('searchQuery');
  if (savedSearchQuery) {
    searchQuery.value = savedSearchQuery;
  }
  await loadFavorites();
  favoritesLoaded.value = true;
});

// Отслеживание изменения авторизации и обновление избранного
onAuthStateChanged(auth, () => {
  loadFavorites();
});

// Экспонируем routes для доступа из родительского компонента
defineExpose({
  routes
});
</script>

<template>
  
  <span class="text-white text-3xl text-center">Научно-образовательные маршруты по Уфе</span>
  
  <!-- Поле поиска -->
  <search v-model="searchQuery" placeholderText="найти маршрут" :showFilter="true" @click-filter="showFilterPopup = true" />

  <!-- Фильтрованный список маршрутов -->
  <div v-if="favoritesLoaded" class="space-y-3" style="width: 420px">
    <buttons 
      v-for="route in filteredRoutes" 
      :key="route.title" 
      :title="route.title" 
      :is-favorite="route.isFavorite" 
      @toggle-favorite="toggleFavorite(route)" 
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
    :min-distance="filterDistance"
    :max-participants="filterParticipants"
    :selected-audience="filterAudience"
    :min-duration="filterMinDuration"
    :max-duration="filterMaxDuration"
    @apply="applyFilters" 
    @close="showFilterPopup = false"
  />

</template>
