import { MouseEvent as ReactMouseEvent } from 'react'

const openUrl = (event: ReactMouseEvent, url: string | URL) => {
  event.preventDefault()
  window.open(url, '_blank', 'noopener,noreferrer')
}

const getLinkProps = (href: string, color: string) => {
  return {
    href: href,
    color: color,
    target: '_blank',
    rel: 'noopener noreferrer'
  }
}

export {
  openUrl,
  getLinkProps
}