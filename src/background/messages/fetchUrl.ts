import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    let url = req.body
    const response = await fetch(url)
    const match = (await response.text()).match(/URL=([^'"]+)/)
    const finalUrl = match ? match[1] : url

    res.send(finalUrl)
  } catch (error) {
    res.send(undefined)
  }
}

export default handler
