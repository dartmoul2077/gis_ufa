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
import { ref } from 'vue';
import routeAll from './routeAll.vue';
import search from './search.vue';
import buttons from './buttons.vue';

</script>

<template>
  <span class="text-white text-3xl text-center">Научно-образовательные маршруты по Уфе</span>
  <search placeholderText="найти маршрут" />

  <div class="space-y-3" style="width: 420px">
    <buttons
      title="«Сократ»: научно-популярный маршрут гуманитарной направленности"
    />
    <buttons
      title="Уфа физико-математическая: «Циолковский». Уфа сквозь призму математики и физики"
    />
    <buttons
      title="«Уфа естественно-научная: от зарождения жизни на Земле к ноосфере В.И. Вернадского»"
    />
    <buttons
      title="«Пифагор». IT-UFA"
      @click="() => { $emit('navigate'); $emit('selectRoute', 'routePif') }"
    />
    <buttons
      title="«Авиценна». Биолого-медицинская экскурсия"
    />
    <buttons
      title="Шень Ко: мир научно-технических разработок"
    />
    <buttons
      title="«Дмитрий Менделеев». Уфа – химическая столица России: от атомов к материалам будущего»"
    />
  </div>
</template>