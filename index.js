import express from "express";
import fetch from "node-fetch";

const app = express();

// 🔥 ilagay mo embed page mo dito
const EMBED_URL = "https://streamfree.app/embed/basketball/detroit-pistons-vs-orlando-magic";

async function getM3U8() {
  const res = await fetch(EMBED_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const html = await res.text();

  // 🔥 hanapin .m3u8 sa page
  const match = html.match(/https?:\/\/[^"]+\.m3u8[^"]*/);

  if (match) {
    return match[0];
  }

  throw new Error("No m3u8 found");
}

app.get("/stream", async (req, res) => {
  try {
    const m3u8 = await getM3U8();

    const response = await fetch(m3u8, {
      headers: {
        "Referer": EMBED_URL,
        "Origin": "https://streamfree.app",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.text();

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(data);

  } catch (err) {
    res.status(500).send("Failed to fetch stream");
  }
});

app.listen(3000, () => console.log("Running"));
