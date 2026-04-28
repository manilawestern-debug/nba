import express from "express";
import fetch from "node-fetch";

const app = express();

let viewers = 0;

// endpoint para sa player
app.get("/watch", (req, res) => {
  viewers++;
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

// endpoint para sa count
app.get("/viewers", (req, res) => {
  res.json({ viewers });
});

// proxy ng m3u8
app.get("/stream", async (req, res) => {
  const url = "PASTE_M3U8_LINK";

  const response = await fetch(url, {
    headers: {
      "Referer": "https://streamfree.app/embed/basketball/",
      "Origin": "https://streamfree.app",
      "User-Agent": "Mozilla/5.0"
    }
  });

  const data = await response.text();

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.send(data);
});

app.listen(3000);
