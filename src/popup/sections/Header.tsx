import logoAsBase64 from "data-base64:/assets/icon.png"

import Toggle from "~popup/components/Toggle"

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <a href="https://twifiner.com" target="_blank">
        <div className="flex py-4 items-center">
          <img src={logoAsBase64} alt="Twifiner" className="w-10 h-10" />
          <div className="ps-2">
            <h1 className="text-lg font-medium text-gray-600">Twifiner</h1>

            <span className="text-xs text-gray-500">
              Fine Tunning Twitter (X)
            </span>
          </div>
        </div>
      </a>
      <div>
        <Toggle id="enable_twifiner" tooltip="Enable / Disable Extension" small={false}/>
      </div>
    </div>
  )
}

export default Header
