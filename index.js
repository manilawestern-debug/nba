import express from "express";

const app = express();

// 🔥 function para kunin teams from URL
function extractGame(url){
  if(!url) return "No Game";

  try {
    let part = url.split("/basketball/")[1];
    if(!part) return "Unknown Game";

    part = part.split("?")[0];

    let [team1, team2] = part.split("-vs-");

    team1 = team1.replaceAll("-", " ");
    team2 = team2.replaceAll("-", " ");

    // capitalize
    team1 = team1.replace(/\b\w/g, c => c.toUpperCase());
    team2 = team2.replace(/\b\w/g, c => c.toUpperCase());

    return team1 + " vs " + team2;

  } catch {
    return "Live NBA Game";
  }
}

app.get("/", (req, res) => {
  const stream = process.env.STREAM_URL || "";
  const gameTitle = extractGame(stream);

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>${gameTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
      body {
        margin:0;
        background:#0b0b0b;
        font-family:Arial;
        color:white;
      }

      .header {
        padding:15px;
        font-size:18px;
        background:#111;
        display:flex;
        justify-content:space-between;
      }

      .live {
        color:red;
      }

      .container {
        padding:15px;
      }

      iframe {
        width:100%;
        height:50vh;
        border:none;
        border-radius:10px;
      }

      .title {
        font-size:20px;
        font-weight:bold;
        margin-top:10px;
      }

      .desc {
        color:#aaa;
        margin-top:5px;
      }

      .btn {
        margin-top:15px;
        width:100%;
        padding:10px;
        background:#222;
        border:none;
        color:white;
        border-radius:8px;
      }
    </style>
  </head>

  <body>

  <div class="header">
    NBA PREMIUM
    <span class="live">● LIVE</span>
  </div>

  <div class="container">

    <iframe src="${stream}" allowfullscreen></iframe>

    <div class="title">${gameTitle}</div>
    <div class="desc">Auto detected from stream link</div>

    <button class="btn" onclick="reload()">Reload</button>

  </div>

  <script>
    function reload(){
      let f = document.querySelector("iframe");
      f.src = f.src;
    }
  </script>

  </body>
  </html>
  `);
});

app.listen(3000, () => console.log("Running"));
