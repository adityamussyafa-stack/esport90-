# MLBB 90 — Markas Divisi Mobile Legends

> **Live:** <https://adityamussyafa-stack.github.io/esport90-/>
> Repo: <https://github.com/adityamussyafa-stack/esport90->

Website statis (HTML + CSS + JavaScript, tanpa build step) untuk markas Divisi Mobile Legends **Esport 90**. Isinya fokus ke empat hal:

1. **Video scrim** Tim 1–4 (bisa difilter per tim, diputar lewat modal).
2. **Materi** singkat yang bisa dibaca sebelum scrim.
3. **Review hasil scrim** dari coach.
4. **Rekam jejak Tim 1–4** (rekor, roster, lima scrim terakhir).

Tampilannya sengaja dibuat santai seperti buku catatan markas: kertas krem, garis tinta tebal, stiker, dan aksen lime. Bukan situs resmi Moonton.

---

## Cara membuka

Paling gampang: klik dua kali `index.html`.

Kalau mau lewat server lokal (biar semua fitur stabil):

```bash
python -m http.server 8080
```

Lalu buka `http://localhost:8080`.

Tidak perlu install apa pun. Tidak ada database, tidak ada proses build.

---

## Struktur file

```text
.
├── index.html              # semua konten halaman
├── assets/
│   ├── css/style.css       # desain, animasi, dan aturan responsif
│   └── js/main.js          # data video/materi + semua interaksi
└── README.md
```

---

## Yang perlu diganti sebelum dipakai

Semua data tim, lawan, skor, roster, dan coach saat ini **data contoh**. Ganti dengan data asli.

### 1. Video scrim

Buka `assets/js/main.js`, cari `var videos = [`.

Tiap video punya bentuk:

```js
{
  team: 1,
  title: "Team 1 vs Falcon Esports",
  meta: "TEAM 1 · 12 NOV 2026 · SCRIM #18",
  chips: ["BO3", "Scrim #18", "Coach Dika", "24:18"],
  youtube: "n_kItJlq37Q",          // ID video YouTube
  source: "Judul asli video",
  author: "Nama channel",
  notes: [
    "Catatan review pertama.",
    "Catatan review kedua.",
    "PR untuk scrim berikutnya."
  ]
}
```

- Ganti `youtube` dengan ID rekaman scrim sendiri. ID adalah bagian setelah `v=` pada URL YouTube.
  Contoh: `https://www.youtube.com/watch?v=ABC123xyz` → `ABC123xyz`.
- Judul kartu, tanggal, skor, dan badge hasil ada di `index.html` (bagian `#video`). Samakan dengan data di `main.js`.
- `source` dan `author` hanya dipakai untuk keterangan "rekaman contoh" di dalam modal. Kalau semua video sudah milik sendiri, keterangan itu bisa dihapus di bagian `openVideo()`.

Video saat ini memakai video publik YouTube sebagai contoh. Modal menampilkan keterangan sumbernya. Ganti dengan rekaman tim sendiri supaya tidak membingungkan.

### 2. Materi

Masih di `assets/js/main.js`, cari `var materials = [`.

```js
{
  tag: "Draft",
  time: "4 menit baca",
  title: "Draft & Ban 101",
  content: "<h4>Judul bagian</h4><p>Isi materi...</p>",
  pr: "PR minggu ini."
}
```

`content` berisi HTML sederhana (`<h4>`, `<p>`, `<ul>`, `<li>`). Boleh ditambah teks biasa tanpa tag.

Judul kartu materi dan ringkasannya ada di `index.html` (bagian `#materi`).

### 3. Tim, rekor, dan review

Semua ada langsung di `index.html`:

- `#review` — kartu review hasil scrim.
- `#tim` — rekor, statistik, roster, dan daftar scrim tiap tim.

Rumus winrate yang dipakai: `menang / total scrim × 100`, dibulatkan. Kalau mengubah jumlah scrim, sesuaikan angka winrate, rekor W–L, dan streak.

### 4. Kontak dan jadwal

Cari di `index.html`:

- Nomor WhatsApp: `628999354786` (muncul di tombol CTA dan footer).
- Email: `mlbb90@sekolah.sch.id`.
- Alamat/lab dan jadwal latihan di bagian CTA dan footer.
- Link sosial media di footer masih `#` (placeholder).

### 5. Warna dan font

Di `assets/css/style.css`, bagian `:root`:

```css
--paper: #f7f3e8;   /* warna kertas */
--ink: #10131c;     /* warna tinta */
--lime: #d9ff57;    /* aksen utama */
--blue: #9dc0ff;
--orange: #ffb27a;
--purple: #c9b0ff;
--green: #8dedbf;
```

Font diambil dari Google Fonts: Bricolage Grotesque, Plus Jakarta Sans, dan Space Mono.

---

## Catatan teknis

- Video diputar lewat `youtube-nocookie.com` di dalam modal. Saat modal ditutup, iframe dikosongkan supaya video berhenti.
- Filter tim hanya menyembunyikan kartu; tidak menghapus data.
- Menu mobile, modal, dan animasi tetap bisa dipakai tanpa library eksternal.
- Animasi otomatis dimatikan kalau pengguna mengaktifkan *reduce motion*.
- Semua tautan internal (`#video`, `#materi`, `#review`, `#tim`) sudah dicek tidak ada yang putus.
- Tidak ada backend. Kalau butuh pendaftaran atau penyimpanan data, tambahkan Google Forms atau API sendiri.

## Hasil audit

Diuji dengan Lighthouse (desktop): **Accessibility 100, Best Practices 100, SEO 100**. Layout dicek di lebar 360, 390, 768, 1024, 1180, dan 1440 px tanpa scroll horizontal.
