import React, { useState } from "react"

import { readStorageAsBoolean, writeStorage } from "~storage"

const Toggle = ({ id, title = "", tooltip = "", small = true }) => {
  let [isChecked, setIsChecked] = useState(false)

  readStorageAsBoolean(id).then((value) => {
    setIsChecked(value)
  })

  const handleChecked = async () => {
    const value = !isChecked
    setIsChecked(value)
    writeStorage(id, value.toString())

    const isEnabled = await readStorageAsBoolean("enable_twifiner")
    if (isEnabled === false) {
      writeStorage("enable_twifiner", "true");

      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(tab => {
          const url = tab.url;
          
          if (url && url.match(/https:\/\/(twitter|x)\.com\/.*/)) {
            chrome.tabs.reload(tab.id, {}, () => {
              chrome.management.setEnabled(chrome.runtime.id, false);
            });
          }
      
        });
      });

      
    }
  }

  return (
    <div className="flex justify-between items-center pt-3">
      {title && (
        <span
          className={`text-sm ${
            isChecked ? "text-black font-medium" : "text-gray-400 font-medium"
          }`}>
          {title}
        </span>
      )}
      <label
        className="relative inline-flex items-center cursor-pointer"
        {...(tooltip && {
          "data-tooltip-target": `tooltip-${id}`,
          "data-tooltip-placement": "bottom"
        })}>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={handleChecked}
          checked={isChecked}
        />
        <div
          className={`${
            small
              ? "w-9 h-5 after:w-4 after:h-4"
              : "w-11 h-6 after:w-5 after:h-5"
          } bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:bg-blue-600`}></div>
      </label>
      {tooltip && (
        <div
          id={`tooltip-${id}`}
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
          {tooltip}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  )
}

export default Toggle
