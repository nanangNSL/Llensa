# 📄 Product Summary: Llensa (Large Vision-Document Intelligence)

**Llensa** adalah platform *Large Vision-Language Model* (VLM) mutakhir yang dirancang untuk memahami dokumen sebagai data visual dan logis. Platform ini melampaui OCR tradisional dengan menggunakan *Neural Reasoning* untuk ekstraksi data yang lebih akurat tanpa *template* manual.

---

## 🏗️ Status Pengembangan Aplikasi (Current Progress)

Saat ini, aplikasi telah mencapai tahap **V1.2-Beta** dengan antarmuka yang sudah fungsional dan desain premium. Berikut adalah analisis fitur yang sudah diimplementasikan:

### 1. **Arsitektur Dashboard (Main Interface)**
- **Dashboard Overview**: Menampilkan *Key Performance Indicators* (KPI) seperti total dokumen yang diproses, sisa kredit ekstraksi, dan akurasi model.
- **Visualisasi Data**: Grafik volume ekstraksi dan log aktivitas real-time sudah tersedia.
- **Sistem Navigasi**: Navigasi berbasis sidebar yang responsif untuk berpindah antar modul (SPA style).

### 2. **Intelligence Processors**
- **Pre-trained Models**: Sudah memiliki model siap pakai untuk **KTP Indonesia** dan **Invoice Standard**.
- **Custom Models**: Pengguna dapat membuat ekstraktor khusus untuk dokumen yang tidak terstandarisasi.
- **Integration Ready**: Tersedia tombol "Use API" untuk integrasi developer langsung ke sistem *backend*.

### 3. **Training Lab & Training Pipeline**
- Antarmuka untuk membuat ekstraktor baru sudah tersedia.
- Mendukung penyesuaian template untuk kebutuhan spesifik bisnis (misal: *Vendor-X Invoice*).

### 4. **Developer & Business Ops**
- **API Keys Management**: Modul untuk mengelola akses programatik bagi pengembang.
- **Usage Logs**: Pencatatan riwayat ekstraksi dokumen untuk keperluan audit dan monitoring performa.
- **Billing System**: Manajemen kredit ekstraksi dengan pembedaan paket (Free vs Pro) dan status pembayaran.

---

## 🛠️ Tech Stack & Design System

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Engine**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) dengan sistem desain kustom.
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/) (Shadcn UI base).
- **Aesthetic**: Modern Light Theme dengan aksen warna Indigo dan desain kartu premium.

---

## 🚀 Roadmap & Target Berikutnya

- [x] **V1.0**: Core VLM Engine & Dashboard Dasar.
- [x] **V1.2**: Dukungan Multi-bahasa (ID/EN) & UI Redesign.
- [ ] **V1.5**: *Handwritten Financial Recognition* (Mengenali tulisan tangan pada dokumen keuangan).
- [ ] **V2.0**: *Agentic Workflow* (Otomatisasi rekonsiliasi data dan verifikasi lintas dokumen).

---

## 📂 Struktur File Utama
- `/app`: Kontrol utama routing dan layout.
- `/components/pages`: Implementasi logika per halaman (Dashboard, Processors, dll).
- `/components/ui`: Library komponen UI yang dapat digunakan kembali.
- `DESIGN_OVERVIEW.md`: Dokumentasi filosofi desain visual.

---
*Dokumen ini diperbarui secara otomatis berdasarkan progress pengembangan terbaru.*
