<script setup>
import { ref, computed, onMounted } from 'vue';
import search from './search.vue';
import buttons from './buttons.vue';
import filterPop from './filterPop.vue';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
  { title: "«Сократ»: научно-популярный маршрут гуманитарной направленности", route: "routeSokrat", page: 'page2_sokrat', distance: 8.5, participants: 15, isFavorite: false},
  { title: "Уфа физико-математическая: «Циолковский». Уфа сквозь призму математики и физики", route: "routeTsiolkovsky", page: "page2_tsiolkovsky", distance: 22, participants: 15, isFavorite: false},
  { title: "«Уфа естественно-научная: от зарождения жизни на Земле к ноосфере В.И. Вернадского»", route: "routeVernadsky", page: "page2_vernadsky", distance: 1, participants: 15, isFavorite: false},
  { title: "«Пифагор». IT-UFA", route: "routePif", page: "page2", distance: 14.3, participants: 15, isFavorite: false },
  { title: "«Авиценна». Биолого-медицинская экскурсия", route: null, isFavorite: false },
  { title: "Шень Ко: мир научно-технических разработок", route: "routeShenko", page: "page2_shenko", distance: 8.7, participants: 25, isFavorite: false },
  { title: "«Дмитрий Менделеев». Уфа – химическая столица России: от атомов к материалам будущего»", route: "routeMendeleev", page: "page2_mendeleev", distance: 14, participants: 15, isFavorite: false }
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

const toggleFavorite = async (route) => {
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const favorites = userDoc.data().favorites || [];
      if (favorites.includes(route.title)) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(route.title)
        });
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(route.title)
        });
      }
    } else {
      await setDoc(userDocRef, {
        favorites: [route.title]
      });
    }
  } else {
    // Если пользователь не авторизован, используем localStorage
    const savedTitles = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (savedTitles.includes(route.title)) {
      const newFavorites = savedTitles.filter(title => title !== route.title);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...savedTitles, route.title]));
    }
  }

  route.isFavorite = !route.isFavorite;
};

onMounted(async () => {
  const savedFilters = JSON.parse(localStorage.getItem('filters'));
  if (savedFilters) {
    filterDistance.value = savedFilters.filterDistance;
    filterParticipants.value = savedFilters.filterParticipants;
  }
  const savedSearchQuery = localStorage.getItem('searchQuery');
  if (savedSearchQuery) {
    searchQuery.value = savedSearchQuery;
  }

  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const savedTitles = userDoc.data().favorites || [];
      routes.value.forEach(route => {
        route.isFavorite = savedTitles.includes(route.title);
      });
    }
  } else {
    const savedTitles = JSON.parse(localStorage.getItem('favorites') || '[]');
    routes.value.forEach(route => {
      route.isFavorite = savedTitles.includes(route.title);
    });
  }
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
  <div class="space-y-3" style="width: 420px">
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
    @apply="applyFilters" 
    @close="showFilterPopup = false"
  />

</template>
