import React, { useState } from "react"

import { readStorageAsBoolean, writeStorage } from "~storage"

const CircleToggle = ({ id, svgPath, label = "", reverseValue=false }) => {
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
    <div className="flex flex-col items-center">
      <div
        onClick={handleChecked}
        className={`mb-2 select-none cursor-pointer flex justify-center items-center rounded-full border-4 w-14 h-14 ${
          reverseValue
            ? isChecked
            ? "border-[#1da1f2]"
            : "border-gray-100"
             
            : isChecked
            ? "border-gray-100"
            : "border-[#1da1f2]"
        }`}>
        <div
          className={`w-6 h-6 ${reverseValue ? (isChecked ?"opacity-100" : "opacity-50" ) : isChecked ? "opacity-50" : "opacity-100"}`}>
          <svg className="w-10 h-10">
            <path d={svgPath} />
          </svg>
        </div>
      </div>
      <div
        className={`${reverseValue ? (isChecked ?"opacity-100" : "opacity-50") : isChecked ?"opacity-50" : "opacity-100"}`}>
        {label}
      </div>
    </div>
  )
}

export default CircleToggle
