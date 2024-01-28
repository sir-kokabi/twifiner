import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

    try {        
        let url = req.body;
        const response = await fetch(url);            
        const text = await response.text();
        res.send(text)
    } catch (error) {
        res.send(undefined);
    }

}

export default handler
