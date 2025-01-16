// @ts-check
import { ActivityHandler, MessageFactory } from '@microsoft/agents-bot-hosting';

let counter = 0

export class EchoBot extends ActivityHandler {
    constructor() {
        super()
        this.onMessage(async (context, next) => {
            const replyText = `Echo ${counter++}: ${ context.activity.text } 🤖`
            await context.sendActivity(MessageFactory.text(replyText, replyText))
            await next()
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded
            const welcomeText = 'Hello from the Agents SDK and welcome!'

            if (membersAdded === undefined) {
                return await next()
            }
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                await context.sendActivity(MessageFactory.text(membersAdded[cnt].id))
                if (membersAdded[cnt].id !== context.activity.recipient?.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText))
                }
            }
            await next()
        })
    }
}
