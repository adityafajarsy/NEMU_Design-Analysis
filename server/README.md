# NEMU Backend Core Service (Architecture Overview)

Dokumen ini menyajikan ringkasan arsitektur teknis, kontrak API, serta alur pemrosesan data backend untuk platform **NEMU**.

> **Pemberitahuan Proprietary & Keamanan Kode (Proprietary Notice):**  
> Demi menjaga integritas algoritma kecerdasan visual, perlindungan model prompt rekayasa AI, serta kepatuhan keamanan kredensial, seluruh source code implementasi backend logic, prompt multimodal vision, dan rumus kuantisasi warna proprietary tidak dipublikasikan secara terbuka pada repositori showcase publik ini. Backend service aktif berjalan secara private di lingkungan produksi cloud.

---

## 1. Ringkasan Arsitektur Sistem

Layanan backend NEMU dibangun menggunakan arsitektur RESTful berbasis Node.js dan Express, mengintegrasikan pipeline kecerdasan buatan multimodal vision dengan mesin analisis piksel raster lokal.

`	ext
[ Client (React 19) ]
         |
         | Multipart Form-Data (Image Buffer)
         v
[ Express Server Gateway ]
         |
         +---> [ Security & Rate Limiting: Helmet, CORS, Express-Rate-Limit ]
         |
         +---> [ Multer Memory Storage Buffer ]
         |
         +---> [ Cloudinary Secure Asset Storage (CDN) ]
         |
         +---> [ Raster Pixel Quantization Engine: Jimp & Vibrant ]
         |       - Deteksi kanvas latar belakang (Canvas / Paper)
         |       - Ekstraksi dominansi warna (~16.000 sampel piksel)
         |       - Perhitungan rasio kontras WCAG
         |
         +---> [ Multimodal AI Vision Engine: OpenRouter API ]
         |       - Dekonstruksi visual DNA (Gaya, Era, Komposisi)
         |       - Analisis teks gambar & padanan Google Fonts
         |       - Formulasi prompt rekayasa visual (Midjourney / DALL-E)
         |
         +---> [ Persistence Layer: MongoDB & Mongoose ]
                 - Data sesi analisis & riwayat pengguna
                 - Manajemen kuota tamu & pengguna terautentikasi (Clerk)
`

---

## 2. Tech Stack Backend

* **Runtime Environment**: Node.js (ES Modules)
* **Web Framework**: Express.js
* **Database & ODM**: MongoDB Atlas & Mongoose
* **Asset Upload & Management**: Multer (In-Memory Processing) & Cloudinary SDK
* **Computer Vision & Pixel Extraction**: Jimp, Node-Vibrant
* **AI Integration**: OpenRouter API (Multimodal Vision Engine dengan Structured JSON Schema)
* **Security & Auth**: Clerk SDK, JSON Web Token (JWT), Helmet, Express Rate Limit, BcryptJS

---

## 3. Pipeline Pemrosesan Visual

1. **Ingestion & Sanitization**: Berkas gambar diterima melalui Multer ke dalam memory buffer tanpa menyimpannya ke disk lokal server untuk menjaga latensi tetap optimal.
2. **CDN Upload**: Gambar diunggah ke Cloudinary untuk memperoleh URL aset permanen dengan optimasi format otomatis (WebP/AVIF).
3. **Local Pixel Quantization**:
   - Gambar dipindai secara lokal untuk mendeteksi warna dasar kanvas atau kertas desain.
   - Algoritma melakukan clustering warna nyata untuk menghasilkan palet swatch yang akurat beserta persentase coverage dan rasio kontras WCAG.
4. **Multimodal Visual DNA Inference**:
   - Gambar dikirimkan ke model vision melalui OpenRouter dengan prompt engineering terstruktur.
   - Model mengembalikan metadata JSON terstruktur mencakup klasifikasi media, era/aliran desain, deteksi tipografi, saran padanan Google Fonts gratis, dan prompt generator.
5. **Session & Quota Management**: Sesi dicatat ke MongoDB, melacak pemakaian kuota tamu berbasis session hash serta sinkronisasi profil Clerk saat login.

---

## 4. Spesifikasi Kontrak API Utama

### A. Analisis Gambar
* **Endpoint**: POST /api/analyze
* **Content-Type**: multipart/form-data
* **Payload**:
  * image: Berkas gambar (JPG, PNG, WebP, maks 10MB)
* **Response Ringkas**:
  `json
  {
    "success": true,
    "data": {
      "id": "analysis_id_uuid",
      "imageUrl": "https://res.cloudinary.com/.../sample.webp",
      "style": {
        "movement": "Swiss International Style",
        "description": "Desain dengan tata letak grid rasional, tipografi sans-serif bersih, dan kontras visual yang kuat.",
        "moodKeywords": ["Minimalis", "Rasional", "Terstruktur"]
      },
      "palette": [
        { "hex": "#E63946", "role": "Dominant Accent", "percentage": 42 },
        { "hex": "#1D3557", "role": "Primary Base", "percentage": 35 }
      ],
      "typography": {
        "identifiedFont": "Helvetica Bold",
        "category": "Neo-Grotesque Sans",
        "googleFontRecommendation": "Inter",
        "googleFontUrl": "https://fonts.google.com/specimen/Inter"
      },
      "recreatePrompt": {
        "midjourney": "/imagine prompt: swiss style minimalist poster, bold geometric grid ...",
        "pinterestKeywords": ["Swiss Graphic Design", "Grid System Poster"]
      }
    }
  }
  `

### B. Cek Kuota & Status Sesi
* **Endpoint**: GET /api/quota
* **Headers**: Authorization: Bearer <token> atau X-Guest-Session: <session_id>
* **Response**:
  `json
  {
    "success": true,
    "creditsRemaining": 3,
    "isGuest": true,
    "canAnalyze": true
  }
  `

---

## 5. Hubungan dengan Repository Showcase

Folder ini disediakan secara khusus sebagai referensi arsitektural bagi peninjau teknis, perekrut, dan kolaborator untuk memahami kompleksitas backend sistem NEMU tanpa membuka rahasia dagang, model prompt internal, serta kredensial produksi.
