import express from "express";

const port = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.send(JSON.stringify({ ok: true }));
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
