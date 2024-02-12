import cssText from "data-text:~contents/styles.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React, { useEffect,useState } from "react"

import { readStorageAsBoolean, watchSettings } from "~storage"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`input[aria-label="Search query"]`)

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const AdvancedSearchLink = () => {
  const [display, setDisplay] = useState(true)

  watchSettings(() => {
    readStorageAsBoolean("add_advanced_search").then((value) => {
      setDisplay(value)
    })
  })

  watchSettings(() => {
    readStorageAsBoolean("add_advanced_search").then((value) => {
      setDisplay(value)
    })
  })

  return (
    display && (
      <a
        href="https://twitter.com/search-advanced"
        className="w-32 pt-[13px] text-gray-400 text-sm block no-underline outline-none border-none">
        Advanced Search
      </a>
    )
  )
}

export default AdvancedSearchLink
