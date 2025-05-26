<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 space-y-8">
    <h1 class="text-4xl font-bold text-center">🚀 SpaceX Launch Viewer</h1>
    <NextLaunch />
    <LaunchList />
  </div>
</template>

<script setup lang="ts">
import NextLaunch from './components/NextLaunch.vue'
import LaunchList from './components/LaunchList.vue'
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
