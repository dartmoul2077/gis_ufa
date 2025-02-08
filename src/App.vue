<script setup>
import Header from './components/Header.vue';
import search from './components/search.vue';
import buttons from './components/buttons.vue';
import page2 from './components/page2.vue';
import page3 from './components/page3.vue';
import carusel from './components/carusel.vue';


</script>

<template>

  <div class="h-20" style="background-color: rgba(0,0,57,255);">

    <Header />
    <div class="bg-indigo-800 min-h-screen w-1/3 flex flex-col items-center space-y-12">

      <span class=" text-white text-3xl text-center" >Научно-образовательные маршруты по Уфе</span>
      <search placeholderText="найти объект" /> 

      <div class="space-y-3" style="width: 420px">
        <buttons title="«Сократ»: научно-популярный маршрут гуманитарной направленности"/>
        <buttons title="Уфа физико-математическая: «Циолковский». Уфа сквозь призму математики и физики"/>
        <buttons title="«Уфа естественно-научная: от зарождения жизни на Земле к ноосфере В.И. Вернадского»"/>
        <!-- <buttons title="«Пифагор». IT-UFA"/> -->

        <router-link to="/page3">
          <buttons title="«Пифагор». IT-UFA"/>
        </router-link>

        <buttons title="«Авиценна». Биолого-медицинская экскурсия"/>
        <buttons title="Шень Ко: мир научно-технических разработок"/>
        <buttons title="«Дмитрий Менделеев». Уфа – химическая столица России: от атомов к материалам будущего»"/>
        
        
      </div>
      
    
      <!-- <page2/> -->
      <!-- <page3/> -->
      <!-- <carusel/> -->

    </div>
    
    
  </div>

</template>

<style scoped></style>
