import cssText from "data-text:~contents/styles.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"


export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
document.querySelector(`input[aria-label="Search query"]`);

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const AdvancedSearchLink = () => {

  return (
    <a href="https://twitter.com/search-advanced" className="w-32 pt-[13px] text-gray-400 text-sm block no-underline outline-none border-none">Advanced Search</a>
 
  )
}

export default AdvancedSearchLink
