import { Accordion } from "~popup/components/Accordion"
import Navigation from "./Navigation"
import Features from "./Features"
import Filtering from "./Filtering"

const items = [
  { title: "Navigation", children: <Navigation/> },
  { title: "Features", children: <Features/> },
  { title: "Filtering", children: <Filtering/> }
]

const Main = () => {
  return ( 

      <Accordion items={items}/>
       
  )
}

export default Main
