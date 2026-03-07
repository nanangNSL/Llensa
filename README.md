
# 👁️ Llensa: Large Vision-Document Intelligence

<p align="center">
  <img src="https://img.shields.io/badge/Model-VLM--1.2-blueviolet?style=for-the-badge&logo=ai" alt="VLM Model">
  <img src="https://img.shields.io/badge/Logic-Agentic--Reasoner-emerald?style=for-the-badge" alt="Logic">
  <img src="https://img.shields.io/badge/Architecture-Neural--Transformer-blue?style=for-the-badge" alt="Architecture">
</p>

**Llensa** (dibaca: *Len-sa*) adalah sebuah *Large Vision-Language Model* (VLM) mutakhir yang dirancang khusus untuk memahami dokumen sebagai entitas visual dan logis. Mengadopsi filosofi **Large Model (LL)**, Llensa melampaui batas OCR tradisional dengan menghadirkan kemampuan "melihat", memahami konteks, dan mengekstraksi kecerdasan dari data tidak terstruktur secara instan.

[Explore Documentation](#) • [Request Demo](#) • [API Reference](#)

 

## 🚀 Kenapa Llensa?

Di era AI generatif, dokumen bukan lagi sekadar tumpukan karakter, melainkan data spasial yang penuh makna. **Llensa** menjembatani gambar mentah dengan keputusan bisnis melalui arsitektur saraf yang presisi.

- **🧠 Neural Reasoning:** Memahami hierarki dan konteks (misal: membedakan antara "Total Pajak" dan "Total Bayar" tanpa instruksi eksplisit).
- **📷 Zero-Shot Extraction:** Langsung bekerja untuk Invoice, KTP, NPWP, hingga formulir kompleks tanpa perlu konfigurasi template manual.
- **⚡ High-Fidelity Output:** Menghasilkan struktur data JSON yang bersih, divalidasi dengan logika *human-like reasoning*.
- **🌐 Localized Intelligence:** Optimal dalam mengenali format dokumen Nusantara dengan standar kualitas global.

 

## 🛠️ Arsitektur Kecerdasan

Llensa bekerja melalui tiga lapisan prosesor saraf:

1.  **Vision Encoder:** Mengidentifikasi elemen visual seperti tabel, segel, tanda tangan, dan struktur spasial.
2.  **Contextual Decoder:** Memahami hubungan semantik antar elemen (mengaitkan label dengan nilai datanya).
3.  **Logic Validator:** Melakukan penalaran aritmatika (Reasoning) untuk memastikan validitas data hasil ekstraksi.

### Contoh Output Intelijen
```json
{
  "model": "llensa-vlm-1.2",
  "document_type": "invoice",
  "confidence": 0.998,
  "extracted_data": {
    "merchant_name": "PT. Teknologi Nusantara",
    "total_amount": 1500000,
    "tax_logic": "passed",
    "reasoning": "VLM detected subtotal 1.35M + PPN 11% (150k) = 1.5M. Logic check confirmed."
  }
}

```

 

## 💻 Integrasi Cepat (Developer First)

Llensa dirancang untuk kemudahan implementasi. Hubungkan alur kerja Anda hanya dalam beberapa baris kode:

```python
import llensa

# Inisialisasi Llensa Vision Engine
engine = llensa.load("vlm-premium")

# Ekstraksi dengan Satu Perintah: Focus
intelligence = engine.focus("path/to/document.jpg")

# Dapatkan data terstruktur secara instan
print(intelligence.to_json())

```

 

## 🎨 Filosofi Nama

Nama **Llensa** merepresentasikan penggabungan identitas **LLM** (Large Language Model) dengan fungsi optik **Lensa**. Huruf **"LL"** ganda di depan merupakan simbol dari kapasitas model raksasa yang mampu memberikan fokus tajam pada detail terkecil dalam dokumen, mengubah kekacauan visual menjadi kejernihan data.

 

## 📅 Roadmap Pengembangan

* [x] **V1.0-Alpha:** Core VLM Document Engine.
* [x] **V1.2-Beta:** Multi-language Support (Indonesian & English).
* [ ] **V1.5:** Handwritten Financial Recognition.
* [ ] **V2.0:** Agentic Workflow Integration (Auto-reconciliation & Verification).

 

<p align="center">
Built with ❤️ by the Llensa Team




<i>"See the Logic, Focus on Data."</i>
</p>



 

**Saran saya:** Simpan kode di atas dengan nama file `README.md`. Kalau Anda pakai VS Code, tekan `Ctrl+Shift+V` untuk melihat hasil rendernya yang cakep.

Ada bagian lain yang mau dikerjakan? Mungkin **struktur folder project** biar makin rapi?
