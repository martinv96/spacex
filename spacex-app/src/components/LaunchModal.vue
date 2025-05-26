<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
      <button class="absolute top-2 right-2 text-white" @click="$emit('close')">❌</button>
      <h3 class="text-xl font-bold">{{ launchDetail?.name || 'Chargement...' }}</h3>
      <p class="text-sm text-gray-400 mb-2">
        {{ launchDetail ? formattedDate : '' }}
      </p>
      <p v-if="launchDetail?.details" class="mb-2">{{ launchDetail.details }}</p>
<p v-else class="mb-2 text-sm text-gray-400 italic">— Description non disponible pour ce lancement —</p>


      <img v-if="launchDetail?.links?.patch?.small" :src="launchDetail.links.patch.small" class="w-32 mb-2"
        alt="Patch mission" />

      <a v-if="launchDetail?.links?.article" :href="launchDetail.links.article" target="_blank"
        class="text-blue-400 underline">
        Voir l'article
      </a>

      <div class="my-2">
        <label><input type="checkbox" v-model="showVideo" /> Afficher vidéo</label>
        <div v-if="showVideo" class="mt-2">
          <iframe v-if="youtubeEmbedUrl" :key="youtubeEmbedUrl" :src="youtubeEmbedUrl" class="w-full h-64"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
          <p v-else class="text-sm text-gray-400">Aucune vidéo disponible pour ce lancement.</p>
        </div>
      </div>


      <p class="text-sm text-gray-300">Lieu : {{ launchpadName }}</p>
      <p class="text-sm text-gray-300">
        Payloads :
        {{ payloadNames.length ? payloadNames.join(', ') : 'Aucun' }}
      </p>
      <p class="text-sm text-gray-300">
        Clients :
        {{ clientNames.length ? clientNames.join(', ') : 'Aucun' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { fetchLaunchDetail, fetchLaunchpad, fetchPayload } from '../composables/useSpaceX'
import type { Launch, Launchpad, Payload } from '../types'

const props = defineProps<{ launch: Launch }>()
const emit = defineEmits(['close'])

const showVideo = ref(false)
const launchDetail = ref<Launch | null>(null)
const launchpadName = ref('Inconnu')
const payloadNames = ref<string[]>([])
const clientNames = ref<string[]>([])

async function loadDetails() {
  // Charger le détail complet du lancement
  const fullLaunch = await fetchLaunchDetail(props.launch.id)
  launchDetail.value = fullLaunch
  console.log('launchDetail.links:', fullLaunch.links)

  // Charger le nom du launchpad
  if (fullLaunch.launchpad) {
    const lp: Launchpad = await fetchLaunchpad(fullLaunch.launchpad)
    launchpadName.value = lp?.name || 'Inconnu'
  }

  // Charger les payloads et leurs clients
  payloadNames.value = []
  clientNames.value = []

  if (fullLaunch.payloads && fullLaunch.payloads.length > 0) {
    for (const pid of fullLaunch.payloads) {
      const p: Payload = await fetchPayload(pid)
      if (p) {
        payloadNames.value.push(p.name)
        if (p.customers && p.customers.length) {
          clientNames.value.push(...p.customers)
        }
      }
    }
    // Éliminer les doublons clients
    clientNames.value = Array.from(new Set(clientNames.value))
  }
}

loadDetails()

const formattedDate = computed(() =>
  launchDetail.value
    ? new Date(launchDetail.value.date_utc).toLocaleDateString('fr-FR')
    : ''
)

const youtubeEmbedUrl = computed(() => {
  if (!launchDetail.value?.links) return ''

  // On ignore youtube_id car non présent sur SpaceX v5
  const url = launchDetail.value.links.webcast
  if (!url) {
    console.log('No webcast URL found')
    return ''
  }

  // Regex pour capturer l'ID YouTube dans plusieurs formats courants
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|v\/))([\w-]{11})/
  )
  if (match && match[1]) {
    const embedUrl = `https://www.youtube.com/embed/${match[1]}`
    console.log('YouTube embed URL:', embedUrl)
    return embedUrl
  }

  console.log('No YouTube ID found in webcast URL')
  return ''
})

</script>
