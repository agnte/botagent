// @ts-check
import express, { json } from 'express';

import { CloudAdapter, loadAuthConfigFromEnv, authorizeJWT } from '@microsoft/agents-bot-hosting';

import { EchoBot } from './bot.js';

const config = loadAuthConfigFromEnv()
const adapter = new CloudAdapter(config);
const myBot = new EchoBot()


const server = express()
server.use(authorizeJWT(config))
server.use(json())

server.post('/api/messages',
  async (req, res) => {
    await adapter.process(req, res, (context) => myBot.run(context));
  }
)

const port = process.env.PORT || 3978

server.listen(port, () => {
  console.log(`\n lisenting on ${port} for bot ${process.env.clientId}`);
})