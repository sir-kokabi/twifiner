import "https://www.googletagmanager.com/gtag/js?id=G-S8LX80SSBC";

import "./styles.css"

import flowbite from "url:/node_modules/flowbite/dist/flowbite.min.js"

import Footer from "./sections/Footer"
import Header from "./sections/Header"
import Main from "./sections/Main"
import { useEffect } from "react"

var script = document.createElement("script")
script.src = flowbite
document.body.appendChild(script)

const IndexPage = () => {

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments) // eslint-disable-line
    }
    window.gtag("js", new Date())
    window.gtag("config", "G-S8LX80SSBC", {
      page_path: "/popup",
      debug_mode: true
    }) 

  }, [])

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
