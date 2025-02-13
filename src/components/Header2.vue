<template>
    <div class="h-20" style="background-color: rgba(0,0,57,255);">
      <div class="flex justify-between px-8 py-3 h-20 m-0">
        <div class="flex items-center">
          <img src="/ноц 1.svg" alt="Logo" class="w-30">
        </div>
  
        <ul class="flex space-x-10 items-center">
          <li>
            <span class="text-white cursor-pointer hover:underline" @click="$emit('navigateToWay')">Все маршруты</span>
          </li>
  
          <li>
            <span class="text-white cursor-pointer hover:underline" @click="$emit('navigateToRegister')">Авторизация</span>
          </li>

          <li>
            <span class="text-white cursor-pointer hover:underline" @click="$emit('navigateToLogin')">Войти</span>
          </li>

          <li>
            <span class="text-white cursor-pointer hover:underline"> <button @click="$emit('logout')" v-if="isLoggedIn">Sign Out</button></span>
          </li>

          <!-- <li >
            <span class="text-white cursor-pointer hover:underline" @click="$emit('logout')">Выйти</span>
          </li> -->
        </ul>
      </div>
    </div>
</template>

<script setup>
defineProps(['isLoggedIn']); // Получаем isLoggedIn из родителя
</script>