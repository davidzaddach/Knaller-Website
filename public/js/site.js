(function () {
  const YOUTUBE_IDS = ["ms5RiABeN7g", "AuoGRCvr2mU"];
  const ROTATE_MS = 18000;

  const wrap = document.getElementById("hero-video-wrap");
  const dots = document.getElementById("hero-dots");
  if (!wrap || !dots) return;

  let index = 0;
  let timer = null;
  const iframes = [];

  function embedUrl(id) {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      controls: "0",
      rel: "0",
      playsinline: "1",
      modestbranding: "1",
      enablejsapi: "1",
      loop: "1",
      playlist: id,
      cc_load_policy: "0",
    });
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  }

  function markHeroReady() {
    wrap.classList.add("is-ready");
  }

  YOUTUBE_IDS.forEach((id, i) => {
    const iframe = document.createElement("iframe");
    iframe.title = `Knaller Soundsystem Video ${i + 1}`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.className = i === 0 ? "is-active" : "is-fading";
    if (i === 0) {
      iframe.addEventListener("load", markHeroReady, { once: true });
      window.setTimeout(markHeroReady, 3000);
      iframe.src = embedUrl(id);
    }
    wrap.appendChild(iframe);
    iframes.push(iframe);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Video ${i + 1}`);
    dot.setAttribute("aria-current", i === 0 ? "true" : "false");
    dot.addEventListener("click", () => goTo(i, true));
    dots.appendChild(dot);
  });

  function goTo(next, userTriggered) {
    if (next === index && !userTriggered) return;
    const prev = iframes[index];
    const nextFrame = iframes[next];
    index = next;

    dots.querySelectorAll("button").forEach((btn, i) => {
      btn.setAttribute("aria-current", i === index ? "true" : "false");
    });

    nextFrame.src = embedUrl(YOUTUBE_IDS[index]);
    nextFrame.className = "is-active";
    prev.className = "is-fading";

    window.setTimeout(() => {
      if (prev !== nextFrame) {
        prev.removeAttribute("src");
      }
    }, 900);

    if (userTriggered) restartTimer();
  }

  function restartTimer() {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(() => goTo((index + 1) % YOUTUBE_IDS.length), ROTATE_MS);
  }

  restartTimer();
})();
