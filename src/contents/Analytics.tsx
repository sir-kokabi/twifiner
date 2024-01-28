import cssText from "data-text:~contents/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { readStorageAsBoolean, watchSettings } from "~storage"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"]
}

export const getRootContainer = () => {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (document.querySelector(`#analytics-button`)) return
      const rootContainerParent = document.querySelector(
        `nav[aria-label="Primary"]`
      ) as HTMLElement

      if (rootContainerParent) {
        const rootContainer = document.createElement("div");        
        rootContainerParent.appendChild(rootContainer);
        resolve(rootContainer);
      }
    }, 137)
  })
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const AnalyticsButton = () => {  
  const [display, setDisplay] = useState(true);

 
  watchSettings(() => {
    readStorageAsBoolean("display_analytics_button").then((value) => {
      setDisplay(value)
    })
  })

  
  const [username, setUsername] = useState("")

  useEffect(() => {
    const profileLink = document.querySelector(
      'nav[aria-label] a[aria-label="Profile"]'
    )
    if (profileLink) {
      setUsername(profileLink.getAttribute("href").replace("/", ""))
    }
  }, [])

  return (
    display && (
      <a
        id="analytics-button"
        href={`https://analytics.twitter.com/user/${username}/home`}
        aria-label="Analytics"
        className="flex items-center no-underline decoration-inherit text-inherit p-3 hover:bg-[#e7e7e8] hover:rounded-full hover: text-[#0f1419]"
        role="link">
        <svg
          viewBox="0 0 24 24"
          width="26.25px"
          height="26.25px"
          aria-hidden="true">
          <g>
            <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
          </g>
        </svg>

          <span id="twifiner-analytics-label" className="text-xl mx-5">Analytics</span>
  
      </a>
    )
  )
}

export const render = async ({ anchor, createRootContainer }) => {
  const rootContainer = await createRootContainer()

  const root = createRoot(rootContainer)
  root.render(<AnalyticsButton />)
}

export default AnalyticsButton
