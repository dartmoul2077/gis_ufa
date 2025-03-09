<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const savedTitles = userDoc.data().favorites || [];
      favorites.value = allRoutes.filter(route => savedTitles.includes(route.title));
    } else {
      favorites.value = [];
    }
  } else {
    const savedTitles = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.value = allRoutes.filter(route => savedTitles.includes(route.title));
  }
});
</script>

<template>
  <div class="p-4 bg-indigo-800 text-white text-center">
    <h2 class="text-2xl mb-4 ">Избранные маршруты</h2>
    <div v-if="favorites.length === 0">Нет избранных маршрутов</div>
    <div v-else>
      <div v-for="route in favorites" :key="route.title" class="py-2 border-b border-gray-600">
        {{ route.title }}
      </div>
    </div>
  </div>
</template>
