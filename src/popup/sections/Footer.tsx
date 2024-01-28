const Footer = () => {
    return (        
        <div className="flex justify-between">
            <span className="flex items-center">
                Made with
                <div className="px-[3px] pt-[1px]">
                <svg fill="red" viewBox="0 0 256 256" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg"><path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path></svg>
                </div>
                by Ayub Kokabi
            </span>
            <div>
                <a href="https://zarinp.al/kokabi" target="_blank" className="font-bold text-gray-500">Donate</a>
            </div>
        </div>
    )
}

export default Footer