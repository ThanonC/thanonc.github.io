import { Webhook } from "discord-webhook-node";
import config from "../../config.json" assert {"type": "json"}

const hook = new Webhook(config["discord.webhook"]);

export default async function sendHook(message) {
    try {
        await hook.send(message);
    } catch(error) {
        console.log(error)
    }
}