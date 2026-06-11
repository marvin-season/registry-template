'use client'

import { useEffect, useRef, useState } from 'react'

const useCD = (interval = 1000, onCD?: (cd: number) => void) => {
  const [timestamp, setTimestamp] = useState(() => Date.now())
  const onCDRef = useRef(onCD)

  useEffect(() => {
    onCDRef.current = onCD
  })

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now()
      setTimestamp(now)
      onCDRef.current?.(now)
    }, interval)
    return () => clearInterval(id)
  }, [interval])

  return timestamp
}

export default useCD
