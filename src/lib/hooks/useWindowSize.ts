import { useLayoutEffect, useState } from 'react'

// shoutout Sophie Alpert: https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react#answer-19014495
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
