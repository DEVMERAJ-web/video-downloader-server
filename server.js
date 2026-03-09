const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  exec(`yt-dlp -g "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
      return res.json({ error: "download failed" });
    }

    res.json({ link: stdout.trim() });
  });
});

app.listen(3000, () => {
  console.log("Downloader server running");
});
