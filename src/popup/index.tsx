import "./styles.css"

import flowbite from "url:/node_modules/flowbite/dist/flowbite.min.js"

import Footer from "./sections/Footer"
import Header from "./sections/Header"
import Main from "./sections/Main"

var script = document.createElement("script")
script.src = flowbite
document.body.appendChild(script)

const IndexPage = () => {  
  return (
    <div id="twifiner-container" className="flex flex-col items-center min-w-[400px]">
      <div className="py-2 px-6 border-b w-full bg-[#f7f9f9]">
        <Header />
      </div>

      <div className="mt-4 w-4/5">      
        <Main/>
      </div>

      <div className="py-2 px-8 border-t mt-10 w-full bg-[#f7f9f9]">
        <Footer />
      </div>
    </div>
  )
}

export default IndexPage
