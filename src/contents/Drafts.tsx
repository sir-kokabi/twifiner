import cssText from "data-text:~contents/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { RiDraftLine } from "react-icons/ri"

import { readStorageAsBoolean, watchSettings } from "~storage"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"]
}

export const getRootContainer = () => {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (document.querySelector(`#drafts-button`)) return
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

const DraftsButton = () => {
  const [display, setDisplay] = useState(true)

  watchSettings(() => {
    readStorageAsBoolean("display_drafts_button").then((value) => {
      setDisplay(value)
    })
  })

  return (
    display && (
      <a
        id="drafts-button"
        href={`https://twitter.com/compose/tweet/unsent/drafts`}
        aria-label="Drafts"
        className="flex items-center no-underline decoration-inherit text-inherit p-3 hover:bg-[#e7e7e8] hover:rounded-full hover: text-[#0f1419]"
        role="link">
        <RiDraftLine className="w-[22px] h-[22px]" />


          <span id="twifiner-drafts-label" className="text-xl mx-5">
            Drafts
          </span>

      </a>
    )
  )
}

export const render = async ({ anchor, createRootContainer }) => {
  const rootContainer = await createRootContainer()

  const root = createRoot(rootContainer)
  root.render(<DraftsButton />)
}

export default DraftsButton
