import React, { useState } from "react"

import { readStorageAsString, writeStorage } from "~storage"

const Slider = ({ id, label, min, max, value = "14", classNames="" }) => {
  const [inputValue, setInputValue] = useState(value)

  readStorageAsString(id).then((value) => {
    setInputValue(value)
  })

  const handleChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    writeStorage(id, value)
  }

  const handleResetValue = () => {    
    setInputValue("15")
    writeStorage(id, "15")
  }

  return (
    <div className={`flex flex-col ${classNames}`}>
      <div className="w-full">
      <label
        htmlFor={`slider-${id}`}
        className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input      
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min={min}
        max={max}
        value={inputValue}
        onChange={handleChange}
        onDoubleClick={handleResetValue}
        step="1"
        id={`slider-${id}`}
      />

      </div>
      <span className="block self-end">{inputValue}</span>
     
    </div>
  )
}

export default Slider
