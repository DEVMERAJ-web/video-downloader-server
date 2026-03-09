const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.json());

app.post("/download", (req, res) => {
  const { url } = req.body;

  exec(`yt-dlp -g ${url}`, (err, stdout) => {
    if (err) return res.json({ error: "download failed" });

    res.json({ link: stdout.trim() });
  });
});

app.listen(3000, () => console.log("Server running"));
