export interface Payload {
  name: string
  customers: string[]
}

export interface Launchpad {
  name: string
}

export interface LaunchLinks {
  patch?: {
    small?: string
  }
  article?: string
  webcast?: string  // 'webcast' plutôt que 'youtube_id', correspond à l'url youtube
  youtube_id?: string // parfois présent, mais pas toujours fiable
}

export interface Launch {
  id: string
  name: string
  date_utc: string
  details?: string | null
  links: LaunchLinks
  payloads?: Payload[]
  launchpad?: Launchpad | null
  upcoming?: boolean
  success?: boolean | null
}
