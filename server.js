const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  exec(`yt-dlp -f "bestvideo+bestaudio/best" -g "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
      return res.json({ error: "download failed" });
    }

    res.json({ link: stdout.trim() });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
