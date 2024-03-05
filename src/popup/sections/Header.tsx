import logoAsBase64 from "data-base64:/assets/icon.png"

import { getSimplifiedVersion } from "~utils"

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <a href="https://twifiner.ir" target="_blank">
        <div className="flex py-4 items-center">
          <img src={logoAsBase64} alt="Twifiner" className="w-10 h-10" />
          <div className="ps-2">
            <h1 className="text-lg font-medium text-gray-600 capitalize">{chrome.runtime.getManifest().name}</h1>

            <span className="text-sm text-gray-500">
              {chrome.runtime.getManifest().description}
            </span>
            <span className="block text-text-sm text-gray-500">
              version {getSimplifiedVersion()}              
            </span>
          </div>
        </div>
      </a>     
    </div>
  )
}

export default Header
