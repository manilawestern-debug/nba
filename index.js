import express from "express";

const app = express();

app.get("/", (req, res) => {
  const m3u8 = process.env.M3U8_URL || "";

  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ESPN LIVE</title>

<style>
body {
  margin:0;
  background:black;
  font-family:Arial;
  overflow:hidden;
}

/* VIDEO */
video {
  position:fixed;
  width:100%;
  height:100%;
  object-fit:cover;
}

/* GLASS HEADER */
.header {
  position:absolute;
  top:0;
  width:100%;
  padding:15px;
  display:flex;
  justify-content:space-between;
  backdrop-filter: blur(12px);
  background:rgba(0,0,0,0.3);
}

.logo {
  color:red;
  font-weight:bold;
}

.live {
  color:red;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {opacity:0.4;}
}

/* GLASS OVERLAY */
.overlay {
  position:absolute;
  bottom:40px;
  left:20px;
  backdrop-filter: blur(15px);
  background:rgba(0,0,0,0.4);
  padding:20px;
  border-radius:15px;
}

.title {
  font-size:28px;
  font-weight:bold;
}

.desc {
  color:#ccc;
  margin-top:5px;
}
</style>
</head>

<body>

<div class="header">
  <div class="logo">ESPN PREMIUM</div>
  <div class="live">● LIVE</div>
</div>

<video id="video" autoplay muted controls></video>

<div class="overlay">
  <div class="title">ESPN LIVE</div>
  <div class="desc">No click • Smooth stream • Glass UI</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

<script>
const video = document.getElementById("video");

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource("${m3u8}");
  hls.attachMedia(video);

  hls.on(Hls.Events.ERROR, function(){
    console.log("Stream failed");
  });

} else {
  video.src = "${m3u8}";
}
</script>

</body>
</html>
  `);
});

app.listen(3000);
