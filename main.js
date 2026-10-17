// Chef portfolio — dependency-free interactions.
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- Full-screen menu ----------
  const burger = $(".burger");
  const menu = $("#menu");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  menu.addEventListener("click", (e) => { if (e.target === menu) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // ---------- Line headings: each line darkens as it scrolls up ----------
  const lines = $$("[data-lines] span");
  const updateLines = () => {
    const trigger = window.innerHeight * 0.72;
    lines.forEach((l) => l.classList.toggle("is-on", l.getBoundingClientRect().top < trigger));
  };
  if (reduce) lines.forEach((l) => l.classList.add("is-on"));
  else {
    window.addEventListener("scroll", updateLines, { passive: true });
    window.addEventListener("resize", updateLines);
    updateLines();
  }

  // ---------- Reveal on scroll ----------
  const revealTargets = $$(".label, .svc, .two > div, .stat, .reel, .pcard, .person-card, .tile, .quote__card, .pricing, .team, .faq, .cta .wrap, .news, .footer__cols, .footer__info, .intro-center, .band__addr");
  if (!reduce && "IntersectionObserver" in window) {
    revealTargets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealTargets.forEach((el) => io.observe(el));
  }

  // ---------- Odometer numbers ----------
  $$(".odo").forEach((el) => {
    const value = String(el.dataset.value);
    el.setAttribute("aria-label", value + (el.dataset.suffix || ""));
    el.innerHTML = "";
    [...value].forEach((d) => {
      const digit = document.createElement("span");
      digit.className = "odo__digit";
      digit.setAttribute("aria-hidden", "true");
      const col = document.createElement("span");
      col.className = "odo__col";
      // two full turns then land on the digit
      for (let i = 0; i <= 20 + Number(d); i++) {
        const s = document.createElement("span");
        s.textContent = i % 10;
        col.appendChild(s);
      }
      col.dataset.target = 20 + Number(d);
      digit.appendChild(col);
      el.appendChild(digit);
    });
    if (el.dataset.suffix) {
      const suf = document.createElement("span");
      suf.className = "odo__suffix";
      suf.setAttribute("aria-hidden", "true");
      suf.textContent = el.dataset.suffix;
      el.appendChild(suf);
    }
  });
  const runOdo = (el) => $$(".odo__col", el).forEach((c, i) => {
    c.style.transitionDelay = `${i * 120}ms`;
    c.style.transform = `translateY(-${c.dataset.target}em)`;
  });
  if (reduce) $$(".odo").forEach((el) => { $$(".odo__col", el).forEach((c) => { c.style.transition = "none"; }); runOdo(el); });
  else {
    const oio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runOdo(e.target); oio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    $$(".odo").forEach((el) => oio.observe(el));
  }

  // ---------- Services tabs ----------
  const tabs = $$(".svc__list [role=tab]");
  const title = $("#svc-title");
  const desc = $("#svc-desc");
  const img = $("#svc-img");
  tabs.forEach((t) => t.addEventListener("click", () => {
    tabs.forEach((o) => o.setAttribute("aria-selected", String(o === t)));
    title.textContent = t.dataset.title;
    desc.textContent = t.dataset.desc;
    img.classList.add("is-swapping");
    setTimeout(() => {
      img.src = t.dataset.img;
      img.onload = () => img.classList.remove("is-swapping");
      if (img.complete) img.classList.remove("is-swapping");
    }, 250);
  }));

  // ---------- Process carousel arrows ----------
  const track = $(".carousel__track");
  const arrows = $$(".carousel__nav .arrow");
  const updateArrows = () => {
    arrows[0].disabled = track.scrollLeft < 4;
    arrows[1].disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  arrows.forEach((b) => b.addEventListener("click", () => {
    const card = $(".pcard", track);
    const step = card.getBoundingClientRect().width + 16;
    track.scrollBy({ left: step * Number(b.dataset.dir), behavior: reduce ? "auto" : "smooth" });
  }));
  track.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();

  // ---------- Package toggle ----------
  const planTabs = $$(".toggle [role=tab]");
  planTabs.forEach((t) => t.addEventListener("click", () => {
    planTabs.forEach((o) => o.setAttribute("aria-selected", String(o === t)));
    $$(".plan").forEach((p) => { p.hidden = p.dataset.plan !== t.dataset.plan; });
  }));

  // ---------- FAQ: one open at a time ----------
  const items = $$(".accordion details");
  items.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
  }));
})();
