<template>
  <div @click="$emit('click')" class="p-4 bg-gray-700 rounded shadow hover:bg-gray-600 cursor-pointer">
    <p class="font-bold">{{ launch.name }}</p>
    <p class="text-sm">{{ new Date(launch.date_utc).toLocaleDateString('fr-FR') }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ launch: any }>()
</script>
