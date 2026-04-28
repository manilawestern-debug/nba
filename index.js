import express from "express";
import fetch from "node-fetch";

const app = express();

// health check
app.get("/", (req, res) => res.send("OK"));

// proxy ng m3u8
app.get("/stream", async (req, res) => {
  try {
    const url = "M3U8_LINK"; // <-- palitan mo dito

    const response = await fetch(url, {
      headers: {
        // gamitin yung embed referer (gaya sa DevTools mo)
        "Referer": "https://streamfree.app/embed/basketball/",
        "Origin": "https://streamfree.app",
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const text = await response.text();

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(text);
  } catch (e) {
    res.status(500).send("Error fetching stream");
  }
});

app.listen(3000, () => console.log("Running on 3000"));
