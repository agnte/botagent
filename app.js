// @ts-check
const express = require('express')

const {
    CloudAdapter, 
    loadAuthConfigFromEnv,
    authorizeJWT,
} = require('@microsoft/agents-bot-hosting')

const { EchoBot } = require('./bot')

const config = loadAuthConfigFromEnv()
const adapter = new CloudAdapter(config);
const myBot = new EchoBot()


const server = express()
server.use(authorizeJWT(config))
server.use(express.json())

server.post('/api/messages', 
    async (req, res) => {
        await adapter.process(req, res, (context) => myBot.run(context));
    }
)

const port = process.env.PORT || 3978

server.listen(port, () => {
    console.log(`\n lisenting on ${ port } for bot ${ process.env.clientId }`);
})