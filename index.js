require("dotenv").config();
const express = require("express");
const app = express();
const discord = require("discord.js");
const port = 3000;
const Moralis = require("moralis").default;

// Setup Discord bot:
const client = new discord.Client({ intents: [] });
client.login(process.env.DISCORD_BOT_TOKEN);

app.use(express.json());

// POST /webhook
app.post("/webhook", async (req, res) => {
  // see `./webhook-body_sample.json` for an example payload.
  const { body, headers } = req;

  try {
    // make sure this request is coming from your Moralis account
    // (see below `Moralis.start`)
    Moralis.Streams.verifySignature({
      body,
      signature: headers["x-signature"],
    });

    let from = body.txs[0].fromAddress;
    // dividing by 18 decimals (which is what MATIC uses)
    let amount = Number(body.txs[0].value / 1e18);
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
    let msg = `New Donation submitted by ${from}, for ${amount.toFixed(
      2
    )} MATIC!`;
    channel.send(msg);
    console.log(msg);

    return res.status(200).json();
  } catch (e) {
    console.log("Invalid Request");

    return res.status(400).json();
  }
});

// Specify the Moralis instance as yours
Moralis.start({
  apiKey: process.env.MORALIS_APIKEY,
}).then(() => {
  app.listen(port, () => {
    console.log("Listening to streams");
  });
});
