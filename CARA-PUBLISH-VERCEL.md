# Cara Publish Website Esport 90 ke Vercel

Panduan ini khusus untuk situs ini: **situs statis** (HTML + CSS + JS, tanpa build step).
Tidak ada database, tidak ada backend, jadi proses deploy-nya singkat.

> Penting: Vercel **tidak** punya fitur drag-and-drop folder seperti Netlify.
> Jadi ada 2 jalur resmi: **lewat GitHub** (tanpa install apa pun) atau **lewat Vercel CLI** (butuh Node.js).
> Pilih salah satu saja.

---

## Prasyarat: struktur folder harus benar

`index.html` **wajib** ada di paling atas folder proyek, bukan di dalam subfolder.

```
Default Project/
├── index.html          <-- wajib di root
├── README.md
└── assets/
    ├── css/style.css
    └── js/main.js
```

Kalau `index.html` ditaruh di dalam folder lain, hasil deploy akan muncul **404 NOT_FOUND**.

---

## Opsi 1 — Lewat GitHub (tanpa install apa pun) ⭐ paling mudah

Cocok kalau kamu tidak mau install Node.js. Sekali setup, update berikutnya otomatis.

### 1. Siapkan akun
- Buat/ login **GitHub** di <https://github.com>
- Buat/ login **Vercel** di <https://vercel.com> (bisa langsung "Continue with GitHub")

### 2. Buat repository baru
1. Buka <https://github.com/new>
2. **Repository name:** `esport90`
3. Pilih **Public**
4. Jangan centang "Add a README file"
5. Klik **Create repository**

### 3. Upload file situs
1. Di halaman repo kosong, klik link **uploading an existing file**
2. Buka folder `Default Project` di File Explorer
3. **Drag** `index.html`, `README.md`, dan folder `assets` ke area upload browser
4. Tunggu semua file masuk, lalu klik **Commit changes**

> Cara drag folder: tarik folder `assets` utuh (jangan dibuka dulu). Browser akan mengunggah isinya sekaligus.

### 4. Import ke Vercel
1. Buka <https://vercel.com/new>
2. Di bagian **Import Git Repository**, pilih repo `esport90` → **Import**
3. Isi pengaturan:
   - **Framework Preset:** `Other`
   - **Build Command:** kosongkan
   - **Output Directory:** kosongkan
   - **Install Command:** kosongkan
4. Klik **Deploy** dan tunggu ±20 detik

### 5. Selesai
Kamu dapat URL seperti:

```
https://esport90.vercel.app
```

Kalau nama project-nya bentrok, Vercel menambahkan akhiran, misal `esport90-abc123.vercel.app`.

**Update situs nanti:** edit file di GitHub (atau upload ulang), commit — Vercel otomatis deploy lagi.

---

## Opsi 2 — Lewat Vercel CLI (deploy langsung dari PC)

Cocok kalau kamu sering mengubah file di komputer dan mau sekali perintah langsung online.

### 1. Install Node.js LTS
Download di <https://nodejs.org> → pilih **LTS** → install (Next, Next, Finish).

Atau lewat PowerShell:

```powershell
winget install --id OpenJS.NodeJS.LTS -e
```

Tutup lalu buka ulang PowerShell supaya perintah `node` dan `npm` terbaca.

### 2. Install Vercel CLI

```powershell
npm install -g vercel
```

### 3. Masuk ke folder proyek

```powershell
cd "C:\Users\adity\OneDrive\Dokumen\Default Project"
```

### 4. Login

```powershell
vercel login
```

Pilih **Continue with GitHub** (atau email), lalu selesaikan konfirmasi di browser.

### 5. Deploy pertama (preview)

```powershell
vercel
```

Jawab pertanyaannya seperti ini:

| Pertanyaan | Jawaban |
|---|---|
| Set up and deploy "…"? | `Y` |
| Which scope do you want to deploy to? | pilih nama akunmu |
| Link to existing project? | `N` |
| What's your project's name? | `esport90` |
| In which directory is your code located? | `./` |
| Want to modify these settings? | `N` |

Setelah selesai, muncul URL preview (misal `https://esport90-xxxx.vercel.app`).

### 6. Deploy ke produksi

```powershell
vercel --prod
```

URL produksi yang dipakai publik:

```
https://esport90.vercel.app
```

**Update situs nanti:** cukup jalankan `vercel --prod` lagi dari folder yang sama.

---

## Checklist sebelum dibuka ke publik

Ganti data placeholder berikut:

- [ ] **Nomor WhatsApp** `6281234567890` → ada di `index.html` dan `assets/js/main.js`
- [ ] **Email** `mlbb90@sekolah.sch.id` → di `index.html`
- [ ] **Link sosial media** yang masih `#` → isi akun asli (Instagram/TikTok/YouTube)
- [ ] **Video contoh YouTube** → ganti ID di array `videos` pada `assets/js/main.js`
- [ ] **Catatan "Rekaman contoh dari YouTube…"** → hapus di fungsi `openVideo()` setelah video asli dipakai
- [ ] **Data tim, skor, lawan, review** → masih contoh/fiktif, ganti dengan data scrim asli

---

## Masalah umum

| Gejala | Penyebab & solusi |
|---|---|
| **404 NOT_FOUND** saat buka situs | `index.html` tidak di root, atau Output Directory diisi. Kosongkan Output Directory. |
| Halaman tampil tanpa CSS/JS | Struktur folder `assets/` salah. Pastikan `assets/css/style.css` dan `assets/js/main.js` ikut ter-upload. |
| Muncul 404 di `/assets/...` | Path di HTML harus `assets/css/style.css`, bukan `./assets/...` yang salah tulis atau `C:\...` |
| Video tidak bisa diputar | Video YouTube-nya melarang embed. Ganti dengan video yang mengizinkan embed. |
| Perubahan belum terlihat | Tunggu deploy selesai, lalu hard refresh `Ctrl + F5`. |
| Deploy gagal "No Output Directory" | Framework Preset harus `Other`, semua kolom build/install/output dikosongkan. |

---

## Batasan paket gratis (Hobby)

- Gratis untuk proyek non-komersial (cocok untuk ekskul sekolah)
- Bandwidth ±100 GB/bulan — jauh lebih dari cukup
- HTTPS otomatis
- Domain bawaan `*.vercel.app` gratis selamanya
- Bisa pasang domain sendiri (misal `esport90.sch.id`) lewat **Settings → Domains**, tapi domainnya beli/urus terpisah

---

## Ringkasan cepat

**Tanpa install:** GitHub → upload file → vercel.com/new → Import → Deploy.

**Dengan CLI:** `npm i -g vercel` → `vercel login` → `vercel --prod`.

Dua-duanya menghasilkan URL publik permanen yang bisa dibuka siapa saja.
