import React, { useEffect, useState } from "react"

import { readStorageAsBoolean, writeStorage } from "~storage"

const CircleToggle = ({ id, svgPath, label = "" }) => {
  const [isChecked, setIsChecked] = useState(false)

  readStorageAsBoolean(id).then((value) => {
    setIsChecked(value)
  })

  const handleChecked = () => {
    const value = !isChecked
    setIsChecked(value)
    writeStorage(id, value.toString())
  }

  return (

      <div
        className="flex flex-col items-center">
        <div
          onClick={handleChecked}
          className={`mb-2 select-none cursor-pointer flex justify-center items-center rounded-full border-4 w-14 h-14 ${
            isChecked ? "border-[#1da1f2]" : "border-gray-100"
          } `}>
          <div
            className={`w-6 h-6 ${isChecked ? "opacity-100" : "opacity-50"}`}>
            <svg className="w-10 h-10">
              <path d={svgPath} />
            </svg>
          </div>
        </div>
        <div className={`${isChecked ? "opacity-100" : "opacity-50"}`}>
          {label}
        </div>
      </div>      

  )
}

export default CircleToggle
