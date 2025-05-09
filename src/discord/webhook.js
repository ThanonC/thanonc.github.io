import { Webhook } from "discord-webhook-node";
import dotenv from 'dotenv';
dotenv.config();

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

const hook = await new Webhook(webhookUrl);

export default async function sendHook(message) {
    try {
        await hook.send(message);
    } catch(error) {
        console.log(error)
    }
}