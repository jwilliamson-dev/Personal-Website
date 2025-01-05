export const transitionMixin = {
  opacity: 0,
  transition: 'opacity 0.2s linear',
  '@media (prefers-reduced-motion)': {
    transition: 'unset',
  },
  '&.transitioned': {
    opacity: 1,
  },
}
