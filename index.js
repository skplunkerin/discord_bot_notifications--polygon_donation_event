const express = require("express");
const app = express();
const notifier = require("node-notifier");
const port = 3000;

app.use(express.json());

// POST /webhook
app.post("/webhook", (req, res) => {
  const webhook = req.body;

  console.log("webhook:", webhook);

  return res.status(200).json();
});

app.listen(port, () => {
  console.log("Listening to streams");
});
