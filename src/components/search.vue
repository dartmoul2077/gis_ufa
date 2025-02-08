<script setup>
  // Определение пропсов
  defineProps({
    placeholderText: {
      type: String,
      default: "найти объект", // Значение по умолчанию
    },
  });
</script>

<template>
    <div class="relative" style="width: 420px">        
        <input type="text" :placeholder="placeholderText" class="w-full p-3 rounded-lg bg-indigo-900 text-white placeholder-gray-400">
        <button class="absolute top-1/2 right-4 transform -translate-y-1/2 text-white">
          <img src="/Group.svg" alt="lupa">
        </button>
    </div>
</template>