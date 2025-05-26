<template>
  <div class="bg-gray-800 p-4 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold mb-2">Prochain lancement</h2>
    <div v-if="launch">
      <p class="text-xl">{{ launch.name }}</p>
      <p class="text-sm text-gray-400">{{ formattedDate }}</p>
      <p class="text-lg mt-2">⏳ {{ formattedCountdown }}</p>
    </div>
    <div v-else>
      <p class="text-xl text-gray-300">Aucun lancement à venir.</p>
      <p class="text-sm text-gray-400">⏳ 0j 0h 0m 0s</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { fetchNextLaunch } from '../composables/useSpaceX'

const launch = ref<any | null>(null)
const countdown = ref<number>(0)
let intervalId: number | null = null

onMounted(async () => {
  launch.value = await fetchNextLaunch()
  updateCountdown()

  intervalId = setInterval(() => {
    updateCountdown()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId)
})

function updateCountdown() {
  if (launch.value?.date_unix) {
    const now = Math.floor(Date.now() / 1000)
    countdown.value = Math.max(launch.value.date_unix - now, 0)
  } else {
    countdown.value = 0
  }
}

const formattedDate = computed(() =>
  launch.value ? new Date(launch.value.date_utc).toLocaleString('fr-FR') : ''
)

function formatCountdown(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${days}j ${hours}h ${minutes}m ${secs}s`
}

const formattedCountdown = computed(() =>
  formatCountdown(countdown.value)
)
</script>
