import { MouseEvent } from 'react'

export const openUrl = (event: MouseEvent, url: string | URL) => {
  event.preventDefault()
  window.open(url, '_blank', 'noopener,noreferrer')
}
