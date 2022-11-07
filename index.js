const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// POST /webhook
app.post("/webhook", (req, res) => {
  const payload = req.body;

  console.log("payload:", payload);

  return res.status(200).json();
});

app.listen(port, () => {
  console.log("Listening to streams");
});
