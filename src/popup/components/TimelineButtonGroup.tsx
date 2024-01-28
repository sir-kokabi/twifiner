import React, { useState } from "react"

import { readStorageAsString, writeStorage } from "~storage"

const TimelineButtonGroup = ({ id, value = "normal" }) => {
  const [timelineWidth, setTimelineWidth] = useState(value)

  readStorageAsString(id).then((value) => {
    setTimelineWidth(value)
  })

  const handleRadioChange = (event) => {
    const value = event.target.id
    setTimelineWidth(value)
    writeStorage("timeline_width", value);
  }

  return (
    <div className="inline-flex rounded-lg shadow-sm w-full" role="group">
      <label
        htmlFor="narrow"
        className={`px-4 py-2 text-sm font-medium w-1/3 text-center border ${
          timelineWidth === "narrow"
            ? "text-white bg-blue-600 hover:bg-blue-600 hover:text-white border-blue-600"
            : "text-gray-900 bg-transparent hover:bg-gray-100 border-gray-200"
        } rounded-s-lg`}>
        Narrow
        <input
          id="narrow"
          type="radio"
          className="hidden"
          onChange={handleRadioChange}
          checked={timelineWidth === "narrow"}
        />
      </label>
      <label
        htmlFor="normal"
        className={`px-4 py-2 text-sm font-medium  w-1/3 text-center border ${
          timelineWidth === "normal"
            ? "text-white bg-blue-600 hover:bg-blue-600 hover:text-white border-blue-600"
            : "text-gray-900 bg-transparent hover:bg-gray-100 border-gray-200"
        }`}>
        Normal
        <input
          id="normal"
          type="radio"
          className="hidden"
          onChange={handleRadioChange}
          checked={timelineWidth === "normal"}
        />
      </label>
      <label
        htmlFor="wide"
        className={`px-4 py-2 text-sm font-medium  w-1/3 text-center border ${
          timelineWidth === "wide"
            ? "text-white bg-blue-600 hover:bg-blue-600 hover:text-white border-blue-600"
            : "text-gray-900 bg-transparent hover:bg-gray-100 border-gray-200"
        } rounded-e-lg  `}>
        Wide
        <input
          id="wide"
          type="radio"
          className="hidden"
          onChange={handleRadioChange}
          checked={timelineWidth === "wide"}
        />
      </label>
    </div>
  )
}

export default TimelineButtonGroup
