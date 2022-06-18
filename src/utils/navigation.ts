import React from 'react'

export const openUrl = (event: React.MouseEvent, url: string) => {
  event.preventDefault()
  window.open(url, '_blank')
}
