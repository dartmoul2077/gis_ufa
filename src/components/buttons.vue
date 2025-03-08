<!-- <script setup>
import { RouterLink } from 'vue-router';
    defineProps({
        title: String
    })
</script>

<template>

    <button class="w-full py-2 border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition">
        {{ title }}
    
    </button>
</template> -->


<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  title: String,
  isFavorite: Boolean // Добавьте проп для отслеживания избранного
});

const emit = defineEmits(['toggle-favorite']);
</script>

<template>
  <button 
    class="w-full py-2 border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition" 
    @click="$emit('click')"
  >
    {{ title }}
    <!-- Добавьте кнопку сердца -->
    <img 
      :src="isFavorite ? '/heart_fill.svg' : '/heart_empty.svg'" 
      @click.stop="emit('toggle-favorite')"
      class="w-6 h-6 ml-2 inline-block cursor-pointer"
    />
  </button>
</template>

<style>
/* Добавьте стили для кнопки сердца */
button img {
  vertical-align: middle;
}
</style>



<!-- <template>
    <button
        class="w-full py-2 border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
        @mouseover="onMouseOver"
    >
        {{ title }}
    </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits();

defineProps({
    title: String,
    routeId: String // добавляем пропс для уникального идентификатора маршрута
});

const onMouseOver = () => {
    emit('highlightRoute', routeId); // передаем информацию о маршруте родителю
}
</script> -->