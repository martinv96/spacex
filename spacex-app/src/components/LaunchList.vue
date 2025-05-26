<template>
  <div class="bg-gray-800 p-4 rounded-xl shadow-md">
    <label class="block mb-2 text-sm font-medium">Filtrer :</label>
    <select v-model="filter" class="bg-gray-700 text-white p-2 rounded mb-4">
      <option value="all">Tous les lancements</option>
      <option value="success">Succès</option>
      <option value="fail">Échecs</option>
    </select>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <LaunchItem
        v-for="launch in launches"
        :key="launch.id"
        :launch="launch"
        @click="selected = launch"
      />
    </div>

    <LaunchModal v-if="selected" :launch="selected" @close="selected = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { fetchLaunches } from '../composables/useSpaceX'
import LaunchItem from './LaunchItem.vue'
import LaunchModal from './LaunchModal.vue'

const launches = ref<any[]>([])
const filter = ref('all')
const selected = ref<any | null>(null)

watchEffect(async () => {
  launches.value = await fetchLaunches(filter.value)
})
</script>
