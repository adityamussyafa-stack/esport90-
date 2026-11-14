/* =========================================================
   MLBB 90 — interaksi halaman
   (nav, filter video, modal video/materi, reveal, dsb.)
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Data video (placeholder, ganti dengan scrim sendiri) ---------- */
  var videos = [
    {
      team: 1,
      title: "Team 1 vs Falcon Esports",
      meta: "TEAM 1 · 12 NOV 2026 · SCRIM #18",
      chips: ["BO3", "Scrim #18", "Coach Dika", "24:18"],
      youtube: "n_kItJlq37Q",
      source: "I Tested the FINAL Players for My Esports Team in a SCRIM!",
      author: "Zedel Mlbb",
      notes: [
        "Draft 2-2 nyaman. Lolita sering buka map dan bantu rotasi mid.",
        "Turtle kedua diambil gratis karena wave kiri belum clear.",
        "PR: latihan clear wave sebelum masuk turtle. Target 4/4 turtle."
      ]
    },
    {
      team: 1,
      title: "Team 1 vs RRQ Youth",
      meta: "TEAM 1 · 08 NOV 2026 · SCRIM #16",
      chips: ["BO2", "Scrim #16", "Coach Dika", "31:04"],
      youtube: "TJSP6cS24vg",
      source: "I'm Playing the MEC Playoffs",
      author: "Zedel Mlbb",
      notes: [
        "Early game aman, invasi pertama dapat dua kill tanpa kehilangan buff.",
        "Rotasi terlalu cepat balik ke lane, jadi vision river kosong.",
        "PR: satu orang pegang info river sebelum objektif muncul."
      ]
    },
    {
      team: 2,
      title: "Team 2 vs Bigetron Jr",
      meta: "TEAM 2 · 11 NOV 2026 · SCRIM #17",
      chips: ["BO2", "Scrim #17", "Coach Nova", "22:51"],
      youtube: "kM6WTdp7FEM",
      source: "Luke Dkk Vs Albert Dkk | Game 4 Highlights Scrim Tengah Malam",
      author: "Asep Kang",
      notes: [
        "Early game masih oke, tapi sering ke-pickoff di river karena ward habis.",
        "Callout telat. Info musuh masuk setelah fight mulai.",
        "PR: ward sebelum masuk river, main dekat vision."
      ]
    },
    {
      team: 2,
      title: "Team 2 vs EVOS Academy",
      meta: "TEAM 2 · 05 NOV 2026 · SCRIM #15",
      chips: ["BO2", "Scrim #15", "Coach Nova", "26:30"],
      youtube: "ww5NWiWjIok",
      source: "Solo Carry! Mythic Ranked Domination | Mobile Legends Bang Bang (MLBB)",
      author: "MPlayWise",
      notes: [
        "Snowball dari gold lane jalan. Roam cepat, nggak buang waktu.",
        "Terlalu sering split sendirian setelah menang war.",
        "PR: setelah menang war, langsung ambil objektif atau reset bareng."
      ]
    },
    {
      team: 3,
      title: "Team 3 vs EVOS Academy",
      meta: "TEAM 3 · 10 NOV 2026 · SCRIM #17",
      chips: ["BO2", "Scrim #17", "Coach Bima", "28:12"],
      youtube: "Ki3LiiGvsK8",
      source: "TOP 10 PLAYS FROM M5 WORLD CHAMPIONSHIP",
      author: "DJY",
      notes: [
        "Objektif disiplin. Semua turtle di game 1 diambil tanpa drama.",
        "Callout rame. Info turtle ketutup suara lain yang nggak penting.",
        "PR: satu shot caller. Yang lain cukup kasih angka dan lokasi."
      ]
    },
    {
      team: 3,
      title: "Team 3 vs Alter Ego Jr",
      meta: "TEAM 3 · 03 NOV 2026 · SCRIM #15",
      chips: ["BO3", "Scrim #15", "Coach Bima", "33:45"],
      youtube: "-0lmyezL6-A",
      source: "Tutorial Draft Immortal",
      author: "Monkeyplay MLBB",
      notes: [
        "Draft fleksibel, hero nyaman dipakai semua pemain.",
        "Terlalu banyak hero baru sekaligus, jadi eksekusi kombo beda-beda.",
        "PR: maksimal satu hero baru per scrim, sisanya hero nyaman."
      ]
    },
    {
      team: 4,
      title: "Team 4 vs RRQ Youth",
      meta: "TEAM 4 · 09 NOV 2026 · SCRIM #16",
      chips: ["BO2", "Scrim #16", "Coach Zer0", "21:08"],
      youtube: "-bRIhiLaoO0",
      source: "The ONLY Jungle Guide You'll EVER Need | MLBB",
      author: "Zex",
      notes: [
        "Snowball bersih dari gold lane. Rotasi roam cepat dan nggak buang waktu.",
        "Ultimate dibuang buat kill solo, jadi war berikutnya kosong.",
        "PR: simpan ult buat war 5v5. Main sabar kalau lord belum spawn."
      ]
    },
    {
      team: 4,
      title: "Team 4 vs Falcon Esports",
      meta: "TEAM 4 · 02 NOV 2026 · SCRIM #14",
      chips: ["BO3", "Scrim #14", "Coach Zer0", "29:37"],
      youtube: "kxqkoNRIzl4",
      source: "Perfect Rotation Guide for All Role!",
      author: "tsMishal",
      notes: [
        "Rotasi awal rapi, tiga lane dapat bantuan tepat waktu.",
        "Setelah turtle pertama, semua orang ikut war dan lane kosong.",
        "PR: pembagian tugas setelah turtle. Satu orang wajib jaga lane."
      ]
    }
  ];

  /* ---------- Data materi ---------- */
  var materials = [
    {
      tag: "Draft",
      time: "4 menit baca",
      title: "Draft & Ban 101",
      content:
        "<h4>Mulai dari hero nyaman</h4>" +
        "<p>Jangan draft karena hero lagi viral. Draft karena tim bisa pakai hero itu tanpa panik. Urutannya: hero nyaman dulu, counter belakangan.</p>" +
        "<h4>Urutan mikir</h4>" +
        "<ul><li>Tentukan dua role inti yang mau diamankan.</li><li>Ban hero yang bikin semua orang bingung, bukan hero yang paling sering muncul di TikTok.</li><li>Sisakan pick terakhir buat hero yang menutup kelemahan tim.</li></ul>",
      pr: "Coba susun draft 3 hero nyaman sebelum scrim berikutnya."
    },
    {
      tag: "Rotasi",
      time: "5 menit baca",
      title: "Rotasi & Tugas Lane",
      content:
        "<h4>Siapa ngapain</h4>" +
        "<p>Gold lane fokus farm dan scaling. Mid bantu kontrol river. EXP jaga lane dan jadi penopang war. Roam buka map, bukan ikut farm. Jungle ambil objektif, bukan cari kill terus.</p>" +
        "<h4>Aturan simpel</h4>" +
        "<ul><li>Sebelum rotasi, pastikan wave sudah clear.</li><li>Jangan tinggalkan lane kosong tanpa ada yang menggantikan.</li><li>Rotasi bareng lebih aman daripada cepat sendirian.</li></ul>",
      pr: "Hafalkan satu tugas utama tiap role. Jangan kerjakan tugas orang lain."
    },
    {
      tag: "Objektif",
      time: "3 menit baca",
      title: "Turtle, Lord & Timing",
      content:
        "<h4>Jangan kasih gratis</h4>" +
        "<p>Objektif bukan cuma soal damage. Kalau wave belum clear dan vision kosong, musuh lebih cepat sampai. Kadang lebih baik tinggal daripada menyerobot.</p>" +
        "<h4>Checklist sebelum ambil</h4>" +
        "<ul><li>Wave di lane sudah clear.</li><li>Minimal ada dua orang yang melihat area objektif.</li><li>Ultimate dan skill penting sudah siap.</li><li>Ada jalur mundur kalau war kalah.</li></ul>",
      pr: "Sebelum turtle, sebut tiga hal: wave, vision, ulti. Ulangi tiap game."
    },
    {
      tag: "Hero pool",
      time: "4 menit baca",
      title: "Hero Pool yang Sehat",
      content:
        "<h4>Minimal tiga hero per role</h4>" +
        "<p>Satu hero andalan, satu hero cadangan, satu hero yang bisa dimainkan kalau hero utama kena ban. Tidak perlu banyak, yang penting semuanya benar-benar dikuasai.</p>" +
        "<h4>Cara nguji hero pool</h4>" +
        "<ul><li>Mainkan tiap hero minimal lima kali di ranked atau scrim.</li><li>Catat satu kelemahan hero itu dan cara menutupnya.</li><li>Jangan tambah hero baru saat sedang latihan draft.</li></ul>",
      pr: "Tulis 3 hero per role di catatan. Coret yang belum pernah dipakai di scrim."
    },
    {
      tag: "Komunikasi",
      time: "3 menit baca",
      title: "Callout yang Jelas",
      content:
        "<h4>“Waspada” bukan callout</h4>" +
        "<p>Callout yang bagus menyebut angka, lokasi, dan siapa yang harus gerak. Contoh: “dua musuh di river kiri, roam ikut mid sekarang.”</p>" +
        "<h4>Format singkat</h4>" +
        "<ul><li>Jumlah: satu, dua, tiga.</li><li>Lokasi: river kiri, turtle, base musuh.</li><li>Aksi: mundur, tekan, ambil turtle.</li></ul>" +
        "<p>Kalau semua orang bicara, tidak ada yang didengar. Tunjuk satu shot caller.</p>",
      pr: "Latihan callout 3 kata saat scrim. Rekam dan dengar ulang setelahnya."
    },
    {
      tag: "Review",
      time: "5 menit baca",
      title: "Review VOD 15 Menit",
      content:
        "<h4>Jangan nonton semua</h4>" +
        "<p>Pilih tiga momen: kematian pertama, objektif pertama, dan war besar pertama. Tiga momen ini biasanya sudah cukup menunjukkan pola masalah tim.</p>" +
        "<h4>Format catatan</h4>" +
        "<ul><li>Menit berapa kejadiannya.</li><li>Apa yang seharusnya dilakukan.</li><li>Siapa yang bertanggung jawab, tanpa saling menyalahkan.</li><li>Satu latihan kecil untuk scrim berikutnya.</li></ul>",
      pr: "Nonton 15 menit VOD terakhir. Catat 3 momen saja, jangan lebih."
    }
  ];

  /* ---------- Util ---------- */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- Navbar ---------- */
  var header = $("#siteHeader");
  var navToggle = $("#navToggle");
  var navLinks = $("#navLinks");

  function closeNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    $$("a", navLinks).forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (event) {
      if (!navLinks.classList.contains("is-open")) return;
      if (header && header.contains(event.target)) return;
      closeNav();
    });
  }

  function onScrollHeader() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
  }

  onScrollHeader();

  /* ---------- Scroll spy ---------- */
  var spySections = ["video", "materi", "review", "tim"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  var navMap = {};
  if (navLinks) {
    $$("a", navLinks).forEach(function (link) {
      var hash = link.getAttribute("href");
      if (hash && hash.charAt(0) === "#") {
        navMap[hash.slice(1)] = link;
      }
    });
  }

  function updateSpy() {
    var current = "";
    var offset = (header ? header.offsetHeight : 74) + 90;
    spySections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) {
        current = section.id;
      }
    });

    Object.keys(navMap).forEach(function (id) {
      var link = navMap[id];
      if (id === current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = $$(
    ".section-head, .filter-row, .video-card, .review-card, .team-card, .material-grid, .join-inner"
  );

  if (!reduceMotion && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.classList.add("js-reveal");
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Filter video ---------- */
  var filterButtons = $$(".filter-btn");
  var videoCards = $$(".video-card");
  var videoCount = $("#videoCount");

  function applyFilter(filter) {
    var shown = 0;

    videoCards.forEach(function (card) {
      var match = filter === "all" || card.getAttribute("data-team") === filter;
      card.classList.toggle("is-hidden", !match);
      if (match) shown += 1;
    });

    filterButtons.forEach(function (button) {
      var active = button.getAttribute("data-filter") === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (videoCount) {
      videoCount.textContent = shown + " video";
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyFilter(button.getAttribute("data-filter") || "all");
    });
  });

  /* ---------- Modal helper ---------- */
  var openModal = null;
  var lastFocused = null;

  function getFocusable(modal) {
    return $$(
      'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      modal
    ).filter(function (el) {
      return el.offsetParent !== null || el.tagName === "IFRAME";
    });
  }

  function showModal(modal, focusTarget) {
    if (!modal || modal === openModal) return;

    if (openModal) closeModal(openModal, true);

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    openModal = modal;

    var target = focusTarget || $(".modal-close", modal);
    if (target) {
      window.setTimeout(function () {
        target.focus();
      }, 30);
    }
  }

  function closeModal(modal, keepFocus) {
    if (!modal) return;

    modal.hidden = true;

    if (modal === openModal) {
      openModal = null;
      document.body.classList.remove("modal-open");
    }

    var frame = $(".video-frame", modal);
    if (frame) frame.innerHTML = "";

    if (!keepFocus && lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  $$(".modal").forEach(function (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal(modal);
    });

    $$("[data-close]", modal).forEach(function (button) {
      button.addEventListener("click", function () {
        closeModal(modal);
      });
    });
  });

  document.addEventListener("keydown", function (event) {
    if (!openModal) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal(openModal);
      return;
    }

    if (event.key !== "Tab") return;

    var focusable = getFocusable(openModal);
    if (!focusable.length) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* ---------- Modal video ---------- */
  var videoModal = $("#videoModal");
  var videoFrame = $("#videoFrame");
  var videoMeta = $("#videoMeta");
  var videoTitle = $("#videoTitle");
  var videoChips = $("#videoChips");
  var videoNotes = $("#videoNotes");
  var videoBody = videoModal ? $(".video-modal-body", videoModal) : null;
  var sourceEl = null;

  if (videoBody && videoChips) {
    sourceEl = document.createElement("p");
    sourceEl.className = "video-source";
    videoChips.insertAdjacentElement("afterend", sourceEl);
  }

  function openVideo(index) {
    var data = videos[index];
    if (!data || !videoModal) return;

    var embedUrl =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(data.youtube) +
      "?autoplay=1&rel=0&modestbranding=1";

    if (videoFrame) {
      videoFrame.innerHTML =
        '<iframe src="' +
        embedUrl +
        '" title="Video ' +
        escapeHtml(data.title) +
        ' — contoh dari YouTube" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    }

    if (videoMeta) videoMeta.textContent = data.meta;
    if (videoTitle) videoTitle.textContent = data.title;

    if (videoChips) {
      videoChips.innerHTML = data.chips
        .map(function (chip) {
          return "<span>" + escapeHtml(chip) + "</span>";
        })
        .join("");
    }

    if (videoNotes) {
      videoNotes.innerHTML = data.notes
        .map(function (note) {
          return "<li>" + escapeHtml(note) + "</li>";
        })
        .join("");
    }

    if (sourceEl) {
      var watchUrl = "https://www.youtube.com/watch?v=" + encodeURIComponent(data.youtube);
      sourceEl.innerHTML =
        "Rekaman contoh dari YouTube: " +
        '<a href="' +
        watchUrl +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(data.source) +
        "</a> — " +
        escapeHtml(data.author) +
        ". Ganti dengan video scrim tim sendiri di <code>assets/js/main.js</code>.";
    }

    showModal(videoModal);
  }

  $$("[data-video]").forEach(function (button) {
    button.addEventListener("click", function () {
      openVideo(Number(button.getAttribute("data-video")));
    });
  });

  /* ---------- Modal materi ---------- */
  var materialModal = $("#materialModal");
  var materialTag = $("#materialTag");
  var materialTime = $("#materialTime");
  var materialTitle = $("#materialTitle");
  var materialContent = $("#materialContent");
  var materialPr = $("#materialPr");

  function openMaterial(index) {
    var data = materials[index];
    if (!data || !materialModal) return;

    if (materialTag) materialTag.textContent = data.tag;
    if (materialTime) materialTime.textContent = data.time;
    if (materialTitle) materialTitle.textContent = data.title;
    if (materialContent) materialContent.innerHTML = data.content;
    if (materialPr) materialPr.textContent = data.pr;

    showModal(materialModal);
  }

  $$("[data-material]").forEach(function (button) {
    button.addEventListener("click", function () {
      openMaterial(Number(button.getAttribute("data-material")));
    });
  });

  /* ---------- Tahun berjalan ---------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Scroll: header + spy ---------- */
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScrollHeader();
      updateSpy();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 920) closeNav();
    updateSpy();
  });

  updateSpy();
})();
