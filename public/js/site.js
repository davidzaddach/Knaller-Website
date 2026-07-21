(function () {
  const header = document.querySelector(".site-header");
  if (header) {
    const compactAt = 64;
    const syncHeader = () => {
      header.classList.toggle("is-compact", window.scrollY > compactAt);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }
})();

(function () {
  // Newest release first
  const YOUTUBE_IDS = ["gta6omaCmQw", "ms5RiABeN7g", "AuoGRCvr2mU"];
  const ROTATE_MS = 18000;

  const wrap = document.getElementById("hero-video-wrap");
  const dots = document.getElementById("hero-dots");
  if (!wrap || !dots) return;

  let index = 0;
  let timer = null;
  const shells = [];
  const players = [];

  function markHeroReady() {
    wrap.classList.add("is-ready");
  }

  function disableCaptions(player) {
    if (!player || typeof player.setOption !== "function") return;
    try {
      player.setOption("captions", "track", {});
    } catch (_) {
      /* ignore */
    }
    try {
      player.setOption("captions", "reload", "0");
    } catch (_) {
      /* ignore */
    }
    try {
      if (typeof player.unloadModule === "function") {
        player.unloadModule("captions");
      }
    } catch (_) {
      /* ignore */
    }
  }

  function playerVars(id) {
    return {
      autoplay: 0,
      mute: 1,
      controls: 0,
      rel: 0,
      playsinline: 1,
      modestbranding: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      disablekb: 1,
      fs: 0,
      loop: 1,
      playlist: id,
      enablejsapi: 1,
      origin: window.location.origin,
    };
  }

  function initPlayers() {
    YOUTUBE_IDS.forEach((id, i) => {
      const shell = document.createElement("div");
      shell.className = "hero-player" + (i === 0 ? " is-active" : " is-fading");
      const mount = document.createElement("div");
      mount.id = "hero-yt-" + i;
      shell.appendChild(mount);
      wrap.appendChild(shell);
      shells.push(shell);

      const player = new YT.Player(mount.id, {
        host: "https://www.youtube-nocookie.com",
        videoId: id,
        playerVars: playerVars(id),
        events: {
          onReady: (event) => {
            const p = event.target;
            p.mute();
            disableCaptions(p);
            if (i === 0) {
              p.playVideo();
              markHeroReady();
              window.setTimeout(markHeroReady, 2500);
            }
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              disableCaptions(event.target);
            }
          },
        },
      });
      players.push(player);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Video " + (i + 1));
      dot.setAttribute("aria-current", i === 0 ? "true" : "false");
      dot.addEventListener("click", () => goTo(i, true));
      dots.appendChild(dot);
    });

    restartTimer();
  }

  function goTo(next, userTriggered) {
    if (next === index && !userTriggered) return;

    const prevShell = shells[index];
    const nextShell = shells[next];
    const prevPlayer = players[index];
    const nextPlayer = players[next];

    prevShell.classList.remove("is-active");
    prevShell.classList.add("is-fading");
    prevPlayer.pauseVideo();

    index = next;
    nextShell.classList.remove("is-fading");
    nextShell.classList.add("is-active");

    dots.querySelectorAll("button").forEach((btn, i) => {
      btn.setAttribute("aria-current", i === index ? "true" : "false");
    });

    nextPlayer.loadVideoById({
      videoId: YOUTUBE_IDS[index],
      startSeconds: 0,
    });
    nextPlayer.mute();
    disableCaptions(nextPlayer);
    nextPlayer.playVideo();

    if (userTriggered) restartTimer();
  }

  function restartTimer() {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(
      () => goTo((index + 1) % YOUTUBE_IDS.length),
      ROTATE_MS
    );
  }

  window.onYouTubeIframeAPIReady = initPlayers;

  const api = document.createElement("script");
  api.src = "https://www.youtube.com/iframe_api";
  api.async = true;
  document.head.appendChild(api);
})();
