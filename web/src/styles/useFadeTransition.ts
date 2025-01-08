import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function useFadeTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    ref.current?.classList.remove('transitioned')
  }, [])

  useEffect(() => {
    setTimeout(() => {
      ref.current?.classList.add('transitioned')
    }, 50)
  }, [location])

  return { ref }
}
