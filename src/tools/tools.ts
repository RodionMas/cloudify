import React from "react";

export const useClickOutside = (ref: React.MutableRefObject<HTMLDivElement | null>, callback: { (): void; (): void; }) => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    React.useEffect(() => {
      document.addEventListener("mousedown", handleClick)
      return () => {
        document.addEventListener("mousedown", handleClick)
      }
    }, [])
  }