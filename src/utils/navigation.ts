import { MouseEvent } from 'react'

export const openUrl = (event: MouseEvent, url: string) => {
  event.preventDefault()
  window.open(url, '_blank', 'noopener,noreferrer')
}
