<script setup>
import { RouterLink } from 'vue-router';
    defineProps({
        title: String
    })
</script>

<template>

    <button class="w-full py-2 border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition">
        {{ title }}
    
    </button>
</template>

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