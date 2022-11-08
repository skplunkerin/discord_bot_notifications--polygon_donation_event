const express = require("express");
const app = express();
const Moralis = require("moralis").default;
const port = 3000;
require("dotenv").config();

app.use(express.json());

// POST /webhook
app.post("/webhook", (req, res) => {
  // see `./webhook-body_sample.json` for an example.
  const { body, headers } = req;

  try {
    Moralis.Streams.verifySignature({
      body,
      signature: headers["x-signature"],
    });

    console.log("========================");
    console.log("body:", body);
    console.log("--------------------");
    console.log("abi.inputs:", body.abi[0].inputs);
    console.log("========================");
    return res.status(200).json();
  } catch (e) {
    console.log("Invalid Request");

    return res.status(400).json();
  }
});

Moralis.start({
  apiKey: process.env.MORALIS_APIKEY,
}).then(() => {
  app.listen(port, () => {
    console.log("Listening to streams");
  });
});
