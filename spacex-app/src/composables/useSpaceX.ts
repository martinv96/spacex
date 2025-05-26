const BASE_URL = 'https://api.spacexdata.com/v5/launches'
const BASE_LAUNCHPADS = 'https://api.spacexdata.com/v4/launchpads'
const BASE_PAYLOADS = 'https://api.spacexdata.com/v4/payloads'

// Récupère le prochain lancement à venir (celui dont la date est la plus proche dans le futur)
export async function fetchNextLaunch() {
  const res = await fetch(`${BASE_URL}/upcoming`)
  const launches = await res.json()

  const now = Date.now()

  const filtered = launches
    .filter((l: any) => l.upcoming === true && new Date(l.date_utc).getTime() > now)
    .sort((a: any, b: any) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime())

  return filtered[0] || null
}

// Récupère les lancements selon un filtre : "all" ou "success"
export async function fetchLaunches(filter: string) {
  const res = await fetch(`https://api.spacexdata.com/v5/launches/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: filter === 'all' ? {} : { success: filter === 'success' },
      options: { sort: { date_unix: 'desc' }, limit: 10 }
    })
  })
  const data = await res.json()
  return data.docs
}

// Détail d’un lancement par son id
export async function fetchLaunchDetail(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return await res.json()
}

// Récupère le détail d’un launchpad par son id
export async function fetchLaunchpad(id: string) {
  const res = await fetch(`${BASE_LAUNCHPADS}/${id}`)
  return await res.json()
}

// Récupère le détail d’un payload par son id
export async function fetchPayload(id: string) {
  const res = await fetch(`${BASE_PAYLOADS}/${id}`)
  return await res.json()
}
