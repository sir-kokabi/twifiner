import { useEffect, useState } from "react"

import {
  readStorageAsString,
  removeDuplicatesAndWriteToStorage,
  writeStorage
} from "~storage"

const TextArea = ({ id, label = "", placeholder = "" }) => {
  let [content, setContent] = useState("")
  let [errorMessage, setErrorMessage] = useState("")
  let [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    readStorageAsString(id).then((value) => {
      setContent(value)
    })
  }, [])

  const handleChange = (event) => {
    setErrorMessage("")
    const newValue = event.target.value
    setContent(newValue)
  }

  const handleClick = () => {
    content = content.trim().replace(/\n{2,}/g, '\n').replace(/ {2,}/g, ' ').replace(/ \n/g, '\n');
    if (content.length === 0) {
      writeStorage(id, "")
      setSuccessMessage("Saved successfully")
    } else {
      const lines = content
        .split(/\r?\n/)
        .map((line) => line.trim()); 
     
      setContent(lines.join("\n"));      
      

      for (const line of lines) {        
        if (line.length < 2) {        
          setErrorMessage(`Some entries are less than 2 characters.`)
          return
        }
      }
      
      removeDuplicatesAndWriteToStorage(id, lines)
      setSuccessMessage("Saved successfully")
    }

    setTimeout(() => {
      setSuccessMessage("")
    }, 800)
  }

  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-base font-normal pe-1 text-gray-700 dark:text-white">
        {label}
      </label>
      <div className="flex flex-col">
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm placeholder:text-gray-400 placeholder:text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 whitespace-pre-wrap"
          onChange={handleChange}
          value={content}
          placeholder={placeholder}
        />
        <div className="flex mt-2 justify-between">
          <div className="flex relative w-full items-center">
            <span className="absolute text-red-600">{errorMessage}</span>
            <span className="absolute text-green-600">{successMessage}</span>
          </div>
          <div>
            <button
              type="button"
              onClick={handleClick}
              className="px-4 py-1 pb-[7px] text-xs text-center bg-gray-100 rounded-md hover:bg-[#e0e7ff] active:translate-y-[1px]">
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextArea
