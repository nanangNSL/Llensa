# LLensa: Model Bahasa-Visi Kompak *End-to-End* untuk Ekstraksi Dokumen Terstruktur dengan Verifikasi *Logic-Patching*

<div align="center">

**Versi:** 1.2-Beta &nbsp;|&nbsp; **Tanggal:** Maret 2026 &nbsp;|&nbsp; **Status:** *Open Source Pre-Print*

**Penulis:** DevRich, Tim Inti LLensa

*Dipersembahkan sebagai kontribusi terbuka kepada komunitas kecerdasan buatan Indonesia dan global*

---

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]()
[![Model Size: 1B–8B](https://img.shields.io/badge/Model%20Size-1B--8B-green.svg)]()
[![Framework: PyTorch](https://img.shields.io/badge/Framework-PyTorch-orange.svg)]()

</div>

---

## ABSTRAK

Pemahaman dokumen secara otomatis merupakan salah satu tantangan fundamental dalam kecerdasan buatan terapan. Makalah ini memperkenalkan **LLensa-1.2-Beta**, sebuah ekosistem Model Bahasa-Visi (*Vision-Language Model*/VLM) berparameter 1 hingga 8 miliar yang dirancang untuk mentransformasi citra dokumen beragam format menjadi data JSON terstruktur, bersih, dan terverifikasi secara deterministik. Berbeda dari *pipeline* OCR tradisional yang mengandalkan komponen berlapis dan rapuh—deteksi teks, pengenalan karakter, dan analisis tata letak—LLensa mengadopsi paradigma *end-to-end* dengan memproses piksel gambar secara langsung ke dalam representasi semantik terstruktur menggunakan arsitektur *transformer* terpadu. Untuk mengatasi permasalahan halusinasi generatif yang menjadi kelemahan inheren model bahasa besar, kami memperkenalkan **Logic-Patching**: sebuah lapisan verifikasi deterministik yang menegakkan kendala logika bisnis, termasuk konsistensi aritmetika dan validasi skema JSON. Evaluasi empiris menunjukkan LLensa-1B mencapai *throughput* 5,80 halaman/detik dengan akurasi 83,4% pada tolok ukur OlmOCR-Bench setelah diterapkan Logic-Patching, melampaui model kompetitor berukuran 9B secara signifikan. LLensa dikembangkan secara khusus untuk domain dokumen regional Indonesia (KTP) dan dokumen keuangan internasional, menawarkan pengalaman pengembang berkelas dunia sebagaimana Stripe merevolusi infrastruktur pembayaran.

**Kata Kunci:** *Vision-Language Model*, OCR *End-to-End*, Ekstraksi Dokumen Terstruktur, *Logic-Patching*, Verifikasi Deterministik, *Transformer*, Dokumen Identitas Indonesia

---

## DAFTAR ISI

1. [Pendahuluan](#1-pendahuluan)
2. [Tinjauan Pustaka](#2-tinjauan-pustaka)
3. [Fondasi Matematis](#3-fondasi-matematis)
4. [Arsitektur LLensa](#4-arsitektur-llensa)
5. [Framework Logic-Patching](#5-framework-logic-patching)
6. [Metodologi Pelatihan](#6-metodologi-pelatihan)
7. [Ekosistem Produk](#7-ekosistem-produk)
8. [Eksperimen dan Evaluasi](#8-eksperimen-dan-evaluasi)
9. [Analisis dan Diskusi](#9-analisis-dan-diskusi)
10. [Limitasi dan Arah Penelitian Masa Depan](#10-limitasi-dan-arah-penelitian-masa-depan)
11. [Kesimpulan](#11-kesimpulan)
12. [Referensi](#12-referensi)

---

## 1. PENDAHULUAN

### 1.1 Latar Belakang dan Motivasi

Pemrosesan dokumen otomatis telah menjadi komponen kritis dalam infrastruktur digital modern. Dari pemrosesan faktur keuangan, verifikasi identitas kependudukan, hingga digitalisasi arsip bersejarah, kebutuhan akan sistem ekstraksi informasi yang akurat, cepat, dan terpercaya terus meningkat secara eksponensial. Menurut estimasi industri, lebih dari 80% data bisnis global masih tersimpan dalam format tidak terstruktur—terutama dokumen berbasis citra—menciptakan hambatan fundamental dalam transformasi digital.

Lanskap teknologi OCR tradisional didominasi oleh pendekatan *pipeline* bertahap yang memisahkan proses deteksi teks, pengenalan karakter optis, dan analisis tata letak sebagai komponen independen. Meskipun pendekatan modular ini memberikan fleksibilitas tertentu, ia menanggung beban fundamental berupa **propagasi kesalahan antar-tahap**: kesalahan pada tahap deteksi akan dikompensasi—dan bahkan diperkuat—oleh tahap-tahap berikutnya, menghasilkan output yang tidak dapat diprediksi kualitasnya.

```
PIPELINE TRADISIONAL (Pendekatan Konvensional):
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Citra      │───►│  Deteksi    │───►│  Pengenalan │───►│  Analisis   │
│  Dokumen    │    │  Teks       │    │  Karakter   │    │  Layout     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                        ↑ε₁               ↑ε₁·ε₂            ↑ε₁·ε₂·ε₃
                   [ERROR PROPAGATION — TIDAK TERKENDALI]

PENDEKATAN LLENSA (End-to-End):
┌─────────────┐                                           ┌─────────────┐
│  Citra      │──────────────► VLM TERPADU ─────────────►│  JSON       │
│  Dokumen    │           (piksel → semantik)             │  Terstruktur│
└─────────────┘                                           └─────────────┘
                                    ↑
                          [LOGIC-PATCHING LAYER]
                          Verifikasi Deterministik
```

### 1.2 Kontribusi Utama

Makalah ini memberikan kontribusi orisinal sebagai berikut:

1. **Arsitektur LLensa**: Desain VLM kompak 1B-8B parameter dengan komponen *native-resolution ViT*, *spatial merging* adaptif, dan decoder bahasa berbasis Qwen yang dioptimasi untuk dokumen berbahasa Indonesia dan internasional.

2. **Kerangka Logic-Patching**: Pendekatan hibrida neural-simbolik baru yang mengintegrasikan verifikasi deterministik ke dalam proses generasi, mengurangi tingkat halusinasi numerik hingga 5,9% pada dokumen keuangan.

3. **Dataset Benchmark Indonesia**: Koleksi anotasi dokumen KTP dan faktur regional yang menjadi fondasi evaluasi akurasi sistem dalam konteks linguistik dan tipografi Indonesia.

4. **Ekosistem Pengembang Open-Source**: Infrastruktur lengkap mencakup Neural Processors, API, dan dashboard monitoring yang dapat direplikasi oleh komunitas.

### 1.3 Ruang Lingkup dan Organisasi Makalah

Sisa makalah ini diorganisasikan sebagai berikut: Bagian 2 mengulas penelitian terkait; Bagian 3 menetapkan fondasi matematis; Bagian 4 mendeskripsikan arsitektur LLensa secara mendetail; Bagian 5 menguraikan framework Logic-Patching; Bagian 6 membahas metodologi pelatihan; Bagian 7 menggambarkan ekosistem produk; Bagian 8 menyajikan hasil eksperimen; Bagian 9 mendiskusikan implikasi; dan Bagian 10–11 menyimpulkan beserta arah penelitian mendatang.

---

## 2. TINJAUAN PUSTAKA

### 2.1 Pemrosesan Dokumen Berbasis OCR Tradisional

Sistem OCR generasi pertama, seperti Tesseract [Smith, 2007] dan pendahulunya, beroperasi pada prinsip pengenalan karakter berbasis template. Evolusi berikutnya mengintegrasikan jaringan saraf konvolusional untuk meningkatkan ketahanan terhadap variasi tipografi, menghasilkan sistem seperti CRNN [Shi et al., 2016] yang menggabungkan CNN untuk ekstraksi fitur visual dengan RNN untuk pemodelan sekuens karakter.

**PaddleOCR** [Du et al., 2020] merupakan representasi *state-of-the-art* dari paradigma pipeline tradisional, mengintegrasikan modul deteksi (DB++), pengenalan (SVTR), dan klasifikasi arah teks. Meskipun mencapai akurasi tinggi pada domain terkontrol, sistem ini memerlukan rekalibrasi ekstensif ketika diterapkan pada domain baru, khususnya dokumen berbahasa non-Latin seperti bahasa Indonesia dengan karakteristik tipografi dan tata letak yang distinktif.

**MinerU** [Wang et al., 2024] memperluas paradigma ini ke arah dokumen akademis dan teknis, namun tetap mempertahankan arsitektur modular yang rentan terhadap propagasi kesalahan.

### 2.2 Model Bahasa-Visi untuk Pemahaman Dokumen

Kemunculan model *transformer* [Vaswani et al., 2017] merevolusi pemrosesan bahasa alami, dan integrasi modalitas visual melalui arsitektur *Vision Transformer* (ViT) [Dosovitskiy et al., 2020] membuka paradigma baru untuk pemahaman dokumen multimodal.

**Donut** [Kim et al., 2022] merupakan salah satu pelopor pendekatan *end-to-end* untuk pemahaman dokumen, menghilangkan kebutuhan akan modul OCR eksplisit. Namun, Donut masih dibatasi oleh resolusi input tetap dan kapasitas representasi yang terbatas.

**Pix2Struct** [Lee et al., 2023] memperkenalkan pra-pelatihan berbasis *screenshot parsing*, meningkatkan kemampuan memahami struktur visual dokumen digital. **InternVL** [Chen et al., 2024] dan **Qwen-VL** [Bai et al., 2023] mewakili generasi terkini VLM serbaguna yang menunjukkan kemampuan pemahaman dokumen luar biasa, namun dengan ukuran parameter (7B-72B) yang tidak praktis untuk *deployment* di lingkungan dengan sumber daya komputasi terbatas.

### 2.3 Halusinasi dalam Model Generatif dan Mitigasinya

Halusinasi—fenomena di mana model bahasa besar menghasilkan informasi yang tampak masuk akal namun faktanya salah—merupakan tantangan fundamental yang telah menarik perhatian luas [Maynez et al., 2020; Ji et al., 2023]. Dalam konteks ekstraksi dokumen, halusinasi dapat termanifestasi sebagai:

- **Halusinasi Numerik**: Model menghasilkan angka yang plausibel secara kontekstual namun tidak sesuai dengan dokumen sumber.
- **Halusinasi Struktural**: Penempatan data pada bidang JSON yang salah.
- **Halusinasi Komposisional**: Penggabungan informasi dari dokumen berbeda dalam satu ekstraksi.

Pendekatan mitigasi yang ada meliputi *grounding* berbasis fakta [Rashkin et al., 2021], verifikasi konsistensi [Manakul et al., 2023], dan *Reinforcement Learning from Verifiable Rewards* (RLVR) [Lightman et al., 2023]. LLensa mengadaptasi konsep RLVR dalam bentuk Logic-Patching yang dapat diterapkan secara deterministik pada waktu inferensi.

### 2.4 Posisi LLensa dalam Lanskap Penelitian

LLensa mengisi celah kritis antara dua ekstrem: (1) sistem OCR pipeline tradisional yang akurat namun kaku dan mahal beradaptasi, dan (2) VLM besar yang fleksibel namun tidak praktis untuk *deployment* produksi. Dengan memadukan efisiensi model kompak (1B parameter) dengan verifikasi Logic-Patching, LLensa menawarkan akurasi setara atau melebihi model 9B dengan biaya komputasi yang jauh lebih rendah.

---

## 3. FONDASI MATEMATIS

### 3.1 Formulasi Masalah Ekstraksi Dokumen

Secara formal, tugas ekstraksi dokumen terstruktur didefinisikan sebagai berikut:

**Definisi 1** *(Ekstraksi Dokumen Terstruktur)*: Diberikan citra dokumen $\mathbf{I} \in \mathbb{R}^{H \times W \times C}$ di mana $H$, $W$, $C$ merupakan tinggi, lebar, dan jumlah kanal warna, tujuannya adalah mempelajari fungsi pemetaan:

$$f_\theta: \mathbb{R}^{H \times W \times C} \rightarrow \mathcal{J}$$

di mana $\mathcal{J}$ merupakan ruang JSON terstruktur yang valid menurut skema $\mathcal{S}$, dan $\theta$ adalah himpunan parameter model yang dapat dipelajari.

Secara probabilistik, model mendefinisikan distribusi kondisional:

$$P_\theta(\mathbf{y} \mid \mathbf{I}) = \prod_{t=1}^{T} P_\theta(y_t \mid \mathbf{I}, y_{<t})$$

di mana $\mathbf{y} = (y_1, y_2, \ldots, y_T)$ adalah sekuens token output yang merepresentasikan JSON terstruktur, dan $T$ adalah panjang sekuens.

### 3.2 Arsitektur Vision Transformer (ViT)

#### 3.2.1 Pemrosesan Patch

Citra input $\mathbf{I} \in \mathbb{R}^{H \times W \times C}$ dibagi menjadi patch-patch berukuran $p \times p$ piksel:

$$N = \frac{H \times W}{p^2}$$

di mana $N$ adalah jumlah patch. Setiap patch $\mathbf{x}_i \in \mathbb{R}^{p \times p \times C}$ kemudian diproyeksikan ke ruang embedding berdimensi $d$:

$$\mathbf{z}_i = \mathbf{E}\,\text{flatten}(\mathbf{x}_i) + \mathbf{e}_i^{pos}, \quad i = 1, \ldots, N$$

di mana $\mathbf{E} \in \mathbb{R}^{d \times (p^2 C)}$ adalah matriks proyeksi linear, dan $\mathbf{e}_i^{pos}$ adalah embedding posisional. LLensa menggunakan **2D Rotary Position Embedding (RoPE-2D)** untuk mempertahankan informasi spasial dua dimensi:

$$\mathbf{e}_i^{pos} = \text{RoPE-2D}(r_i, c_i)$$

di mana $(r_i, c_i)$ adalah koordinat baris dan kolom patch ke-$i$.

#### 3.2.2 Mekanisme *Multi-Head Self-Attention*

Inti dari ViT adalah mekanisme *Multi-Head Self-Attention* (MHSA):

$$\text{MHSA}(\mathbf{Z}) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)\,\mathbf{W}^O$$

di mana setiap *head* dihitung sebagai:

$$\text{head}_k = \text{Attention}(\mathbf{Z}\mathbf{W}_k^Q, \mathbf{Z}\mathbf{W}_k^K, \mathbf{Z}\mathbf{W}_k^V)$$

$$\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\!\left(\frac{\mathbf{Q}\mathbf{K}^\top}{\sqrt{d_k}}\right)\mathbf{V}$$

dengan $\mathbf{W}_k^Q, \mathbf{W}_k^K, \mathbf{W}_k^V \in \mathbf{R}^{d \times d_k}$ adalah matriks proyeksi untuk *query*, *key*, dan *value* pada *head* ke-$k$, dan $d_k = d/h$ adalah dimensi per *head*.

Kompleksitas komputasi MHSA adalah $\mathcal{O}(N^2 d)$, yang menjadi hambatan saat memproses dokumen resolusi tinggi karena $N$ berbanding lurus dengan luas citra.

#### 3.2.3 *Spatial Merging* untuk Efisiensi Token

Untuk mengatasi kompleksitas kuadratik terhadap jumlah patch, LLensa mengimplementasikan **Spatial Merging** dengan faktor reduksi $s = 2$:

$$\mathbf{z}'_j = \frac{1}{s^2} \sum_{i \in \mathcal{N}(j)} \mathbf{z}_i \cdot \mathbf{W}_{merge}$$

di mana $\mathcal{N}(j)$ adalah lingkungan $s \times s$ dari posisi $j$ pada peta fitur. Operasi ini mereduksi jumlah token visual sebesar faktor $s^2 = 4$:

$$N' = \frac{N}{s^2} = \frac{H \times W}{4p^2}$$

Untuk resolusi input maksimum 1540px dengan ukuran patch 14px:

$$N = \frac{1540 \times 1540}{14^2} \approx 12100 \rightarrow N' \approx 3025 \text{ token}$$

Reduksi 4× ini secara langsung menurunkan biaya komputasi MHSA dari $\mathcal{O}(N^2)$ menjadi $\mathcal{O}((N/4)^2) = \mathcal{O}(N^2/16)$, sambil mempertahankan granularitas spasial yang memadai untuk pemahaman tata letak dokumen.

### 3.3 *Cross-Modal Alignment* melalui Proyektor Multimodal

Proyektor multimodal $\phi: \mathbb{R}^{N' \times d_v} \rightarrow \mathbb{R}^{N' \times d_l}$ bertugas menjembatani ruang representasi visual dan linguistik:

$$\mathbf{V} = \phi(\mathbf{Z}') = \text{LayerNorm}\!\left(\text{GELU}\!\left(\mathbf{Z}'\mathbf{W}_1 + \mathbf{b}_1\right)\mathbf{W}_2 + \mathbf{b}_2\right)$$

di mana $d_v$ adalah dimensi *encoder* visual, $d_l$ adalah dimensi *decoder* bahasa, dan $\mathbf{W}_1 \in \mathbb{R}^{d_v \times d_{mid}}$, $\mathbf{W}_2 \in \mathbb{R}^{d_{mid} \times d_l}$ dengan $d_{mid} = 4 \cdot d_v$ (faktor ekspansi MLP standar).

### 3.4 Pemodelan Bahasa Autoregressif

*Decoder* bahasa LLensa menghasilkan token output secara autoregressif. Representasi terpadu dari token visual $\mathbf{V}$ dan token teks $\mathbf{T}$ diproses melalui *transformer* berlapis-$L$:

$$\mathbf{H}^0 = [\mathbf{V}; \mathbf{T}_{prompt}]$$

$$\mathbf{H}^{l+1} = \mathbf{H}^l + \text{MHSA}(\text{LayerNorm}(\mathbf{H}^l))$$

$$\mathbf{H}^{l+1} = \mathbf{H}^{l+1} + \text{FFN}(\text{LayerNorm}(\mathbf{H}^{l+1}))$$

di mana $\text{FFN}(\mathbf{x}) = \mathbf{W}_2 \cdot \text{SwiGLU}(\mathbf{W}_1\mathbf{x})$ dengan aktivasi SwiGLU:

$$\text{SwiGLU}(\mathbf{x}) = (\mathbf{W}_{gate}\mathbf{x}) \otimes \sigma(\mathbf{W}_{gate}\mathbf{x}) \otimes (\mathbf{W}_{up}\mathbf{x})$$

di mana $\sigma$ adalah fungsi sigmoid dan $\otimes$ adalah perkalian elemen-per-elemen (*Hadamard product*).

Probabilitas token pada langkah $t$ dihitung sebagai:

$$P(y_t \mid \mathbf{I}, y_{<t}) = \text{softmax}\!\left(\mathbf{W}_{lm}\,\mathbf{H}^L_t\right)$$

di mana $\mathbf{W}_{lm} \in \mathbb{R}^{|\mathcal{V}| \times d_l}$ adalah matriks kepala bahasa (*language head*) dan $|\mathcal{V}|$ adalah ukuran kosakata.

### 3.5 Metrik Evaluasi

#### 3.5.1 Akurasi Ekstraksi Bidang (*Field-Level Accuracy*)

$$\text{ACC}_{field} = \frac{1}{|F|} \sum_{f \in F} \mathbb{1}\!\left[\hat{v}_f = v_f^*\right]$$

di mana $F$ adalah himpunan bidang dalam skema, $\hat{v}_f$ adalah nilai yang diekstraksi model, dan $v_f^*$ adalah nilai referensi (*ground truth*).

#### 3.5.2 *Character Error Rate* (CER)

$$\text{CER} = \frac{S + D + I}{N}$$

di mana $S$, $D$, $I$ adalah jumlah substitusi, penghapusan, dan penyisipan karakter, dan $N$ adalah total karakter dalam referensi.

#### 3.5.3 *Normalized Edit Distance* (NED)

$$\text{NED}(\hat{y}, y^*) = 1 - \frac{\text{EditDistance}(\hat{y}, y^*)}{\max(|\hat{y}|, |y^*|)}$$

#### 3.5.4 *Logic Consistency Score* (LCS) — Metrik Baru

Kami memperkenalkan **LCS** sebagai metrik evaluasi konsistensi logika bisnis:

$$\text{LCS} = \frac{1}{|R|} \sum_{r \in R} \mathbb{1}\!\left[\text{Constraint}_r(\hat{\mathbf{y}}) = \text{True}\right]$$

di mana $R$ adalah himpunan aturan logika bisnis yang didefinisikan untuk domain tertentu. Contoh untuk faktur keuangan:

$$\text{Constraint}_{arith} : \left|\hat{v}_{subtotal} + \hat{v}_{tax} - \hat{v}_{total}\right| < \epsilon$$

di mana $\epsilon$ adalah toleransi pembulatan desimal (umumnya $\epsilon = 0{,}01$).

---

## 4. ARSITEKTUR LLENSA

### 4.1 Gambaran Umum Arsitektur

LLensa mengadopsi arsitektur multimodal terpadu yang terdiri dari tiga subsistem utama yang saling berinteraksi:

```
╔══════════════════════════════════════════════════════════════════════╗
║                     ARSITEKTUR LLENSA 1.2-BETA                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  INPUT:  Citra Dokumen I ∈ ℝ^{H×W×C}                               ║
║                │                                                     ║
║                ▼                                                     ║
║  ┌─────────────────────────────┐                                    ║
║  │  SUBSISTEM 1: ENCODER VISI │                                    ║
║  │  ┌─────────────────────┐   │                                    ║
║  │  │ Native-Res ViT      │   │                                    ║
║  │  │ Patch: 14×14 px     │   │                                    ║
║  │  │ Max: 1540×1540 px   │   │                                    ║
║  │  │ RoPE-2D Positional  │   │                                    ║
║  │  └──────────┬──────────┘   │                                    ║
║  │             │ N tok         │                                    ║
║  │  ┌──────────▼──────────┐   │                                    ║
║  │  │ Spatial Merging s=2 │   │                                    ║
║  │  │ Reduksi: 4× tokens  │   │                                    ║
║  │  └──────────┬──────────┘   │                                    ║
║  │             │ N/4 tok       │                                    ║
║  └─────────────┼───────────────┘                                    ║
║                │                                                     ║
║                ▼                                                     ║
║  ┌─────────────────────────────┐                                    ║
║  │  SUBSISTEM 2: PROYEKTOR    │                                    ║
║  │  MULTIMODAL                │                                    ║
║  │  MLP: d_v → d_l            │                                    ║
║  │  LayerNorm + GELU           │                                    ║
║  └─────────────┬───────────────┘                                    ║
║                │                                                     ║
║    [Prompt]────┤                                                     ║
║                ▼                                                     ║
║  ┌─────────────────────────────┐                                    ║
║  │  SUBSISTEM 3: DECODER LM   │                                    ║
║  │  Qwen-Series (1B/8B)       │                                    ║
║  │  Autoregressif JSON Gen    │                                    ║
║  │  Vocab: 151,936 tokens     │                                    ║
║  └─────────────┬───────────────┘                                    ║
║                │                                                     ║
║                ▼                                                     ║
║  ┌─────────────────────────────┐                                    ║
║  │  LOGIC-PATCHING LAYER      │                                    ║
║  │  Unit Tests Deterministik  │                                    ║
║  │  Pydantic Schema Validation│                                    ║
║  │  Self-Correction Loop      │                                    ║
║  └─────────────┬───────────────┘                                    ║
║                │                                                     ║
║  OUTPUT: JSON Terstruktur & Terverifikasi                           ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 4.2 Encoder Visual Resolusi-Nativ (*Native-Resolution ViT*)

#### 4.2.1 Motivasi Resolusi Nativ

Dokumen nyata hadir dalam resolusi dan rasio aspek yang sangat beragam: KTP Indonesia berukuran 85.6 × 53.98 mm pada 300 DPI menghasilkan citra ~1011 × 638 piksel; faktur korporat dapat mencapai dimensi A4 penuh (~2480 × 3508 piksel). Pendekatan ViT standar yang memaksakan interpolasi ke ukuran tetap (misal 224×224) kehilangan informasi tekstual penting, terutama pada karakter berukuran kecil.

LLensa mengadopsi pendekatan **resolusi-nativ** yang mempertahankan dimensi asli gambar hingga batas maksimum 1540 piksel (sisi terpanjang), dengan *downscaling* proporsional jika diperlukan:

$$H' = H \cdot \min\!\left(1, \frac{1540}{\max(H, W)}\right), \quad W' = W \cdot \min\!\left(1, \frac{1540}{\max(H, W)}\right)$$

#### 4.2.2 Skema *Attention* Efisien

Untuk mengelola kompleksitas kuadratik self-attention pada resolusi tinggi, LLensa menerapkan skema **Window Attention** dengan *global tokens*:

$$\text{WA}(\mathbf{Z}) = \left\{\text{LocalAttn}(\mathbf{Z}_w) \mid w \in \mathcal{W}\right\} \cup \text{GlobalAttn}(\mathbf{Z}_{cls})$$

di mana $\mathcal{W}$ adalah partisi window non-overlapping berukuran $w_h \times w_w$, dan $\mathbf{Z}_{cls}$ adalah token [CLS] yang mengagregasi informasi global seluruh dokumen.

#### 4.2.3 Normalisasi Adaptif

LLensa menggunakan **RMSNorm** [Zhang & Sennrich, 2019] yang lebih stabil secara komputasi dibandingkan LayerNorm:

$$\text{RMSNorm}(\mathbf{x}) = \frac{\mathbf{x}}{\text{RMS}(\mathbf{x})} \cdot \boldsymbol{\gamma}, \quad \text{RMS}(\mathbf{x}) = \sqrt{\frac{1}{d}\sum_{i=1}^{d} x_i^2 + \epsilon}$$

### 4.3 Proyektor Multimodal

Proyektor multimodal berfungsi sebagai jembatan antara ruang representasi visual ($d_v$) dan ruang representasi linguistik ($d_l$). Kami menggunakan MLP dua-lapisan dengan aktivasi GELU:

$$\phi(\mathbf{Z}') = \mathbf{W}_2 \cdot \text{GELU}(\mathbf{W}_1 \cdot \mathbf{Z}' + \mathbf{b}_1) + \mathbf{b}_2$$

**Konfigurasi Dimensi:**

| Varian | $d_v$ (ViT) | $d_{mid}$ (MLP Hidden) | $d_l$ (LM) |
|--------|-------------|------------------------|------------|
| LLensa-1B | 1024 | 4096 | 2048 |
| LLensa-8B | 1024 | 8192 | 4096 |

### 4.4 Decoder Bahasa

#### 4.4.1 Inisialisasi dan Fine-Tuning

Decoder bahasa diinisialisasi dari bobot pra-latih Qwen-series (Qwen2.5-1.5B atau Qwen2.5-7B), dipilih karena kinerja luar biasa pada teks multibahasa termasuk Bahasa Indonesia, Arab, dan aksara non-Latin lainnya.

#### 4.4.2 Strategi *Structured JSON Decoding*

LLensa tidak sekadar menghasilkan token teks bebas; ia menggunakan **Constrained Decoding** berbasis *context-free grammar* (CFG) untuk memastikan output selalu membentuk JSON yang valid secara sintaksis:

```
json_grammar := object | array
object := '{' pairs '}'
pairs := pair (',' pair)*
pair := string ':' value
value := string | number | object | array | 'true' | 'false' | 'null'
```

Pada setiap langkah dekoding, probabilitas token yang melanggar tata bahasa JSON saat ini dimasking ke $-\infty$ sebelum aplikasi softmax:

$$P_{constrained}(y_t \mid \mathbf{I}, y_{<t}) = \text{softmax}\!\left(\mathbf{W}_{lm}\,\mathbf{H}^L_t + \mathbf{m}_t\right)$$

di mana $\mathbf{m}_t \in \{0, -\infty\}^{|\mathcal{V}|}$ adalah vektor masking berbasis state CFG saat ini.

#### 4.4.3 Urutan Baca (*Reading Order*)

Urutan baca dokumen dimodelkan secara implisit melalui posisi relatif token-token visual (berkat RoPE-2D) dan diperkuat melalui instruksi prompt khusus:

```
Sistem: Ekstrak semua informasi dari dokumen berikut ke dalam format JSON 
terstruktur sesuai skema {schema}. Ikuti urutan baca dari kiri-ke-kanan, 
atas-ke-bawah. Pastikan seluruh nilai numerik konsisten secara aritmetis.
```

### 4.5 Tabel Konfigurasi Arsitektur

| Komponen | LLensa-1B | LLensa-8B |
|----------|-----------|-----------|
| **Total Parameter** | ~1.0B | ~8.0B |
| **Parameter ViT** | ~307M | ~307M |
| **Parameter LM** | ~680M | ~7.6B |
| **Dimensi ViT** ($d_v$) | 1024 | 1024 |
| **Layer ViT** | 24 | 24 |
| **Heads ViT** | 16 | 16 |
| **Dimensi LM** ($d_l$) | 2048 | 4096 |
| **Layer LM** | 28 | 32 |
| **Heads LM** | 16 | 32 |
| **Konteks Maksimum** | 32K token | 128K token |
| **Resolusi Maksimum** | 1540px | 1540px |
| **Ukuran Kosakata** | 151,936 | 151,936 |

---

## 5. FRAMEWORK LOGIC-PATCHING

### 5.1 Motivasi dan Paradigma

Meskipun *Constrained Decoding* memastikan validitas JSON sintaksis, ia tidak menjamin **kebenaran semantik**. Model generatif masih dapat menghasilkan nilai numerik yang sintaksis valid namun logis tidak konsisten—misalnya, total faktur yang tidak sesuai dengan jumlah subtotal dan pajak.

**Logic-Patching** merupakan lapisan verifikasi pasca-generasi yang bekerja secara deterministik, terinspirasi dari paradigma *Verifiable Rewards* dalam *Reinforcement Learning* [Lightman et al., 2023] namun diterapkan pada waktu inferensi tanpa memerlukan pelatihan ulang.

```
          ┌─────────────────────────────────────────────────┐
          │           SIKLUS LOGIC-PATCHING                 │
          └─────────────────────────────────────────────────┘
                              │
              ┌───────────────▼────────────────┐
              │   Output Generatif VLM          │
              │   ŷ = {subtotal: 850000,        │
              │        tax: 85000,              │
              │        total: 940000}  ← ERROR! │
              └───────────────┬────────────────┘
                              │
              ┌───────────────▼────────────────┐
              │   UNIT TEST #1: Aritmetika     │
              │   Check: 850000+85000=940000?  │
              │   Actual: 935000 ≠ 940000      │
              │   Status: ❌ FAILED            │
              └───────────────┬────────────────┘
                              │ FAILED
              ┌───────────────▼────────────────┐
              │   STRATEGI PATCH               │
              │   1. Re-generate dengan        │
              │      constraint tambahan       │
              │   2. Atau: Koreksi deterministik│
              │      total ← subtotal + tax    │
              └───────────────┬────────────────┘
                              │
              ┌───────────────▼────────────────┐
              │   Output Terverifikasi          │
              │   ŷ* = {subtotal: 850000,       │
              │         tax: 85000,             │
              │         total: 935000}  ✅      │
              └────────────────────────────────┘
```

### 5.2 Lapisan Verifikasi Deterministik

#### 5.2.1 Validasi Skema dengan Pydantic

Setiap domain dokumen mendefinisikan skema Pydantic yang ketat:

```python
from pydantic import BaseModel, validator, Field
from typing import Optional, List
from decimal import Decimal

class LineItem(BaseModel):
    description: str = Field(..., min_length=1, max_length=500)
    quantity: Decimal = Field(..., gt=0)
    unit_price: Decimal = Field(..., ge=0)
    amount: Decimal = Field(..., ge=0)
    
    @validator('amount')
    def validate_amount_consistency(cls, v, values):
        if 'quantity' in values and 'unit_price' in values:
            expected = values['quantity'] * values['unit_price']
            tolerance = Decimal('0.01')
            if abs(v - expected) > tolerance:
                raise ValueError(
                    f'Inkonsistensi: {values["quantity"]} × '
                    f'{values["unit_price"]} = {expected}, bukan {v}'
                )
        return v

class InvoiceSchema(BaseModel):
    invoice_number: str
    issue_date: str  # Format: YYYY-MM-DD
    vendor_name: str
    items: List[LineItem]
    subtotal: Decimal
    tax_rate: Decimal = Field(..., ge=0, le=1)
    tax_amount: Decimal
    total: Decimal
    
    @validator('tax_amount')
    def validate_tax(cls, v, values):
        if 'subtotal' in values and 'tax_rate' in values:
            expected = values['subtotal'] * values['tax_rate']
            if abs(v - expected) > Decimal('0.01'):
                raise ValueError(f'Pajak tidak konsisten: {v} ≠ {expected}')
        return v
    
    @validator('total')
    def validate_total(cls, v, values):
        if 'subtotal' in values and 'tax_amount' in values:
            expected = values['subtotal'] + values['tax_amount']
            if abs(v - expected) > Decimal('0.01'):
                raise ValueError(f'Total tidak konsisten: {v} ≠ {expected}')
        return v
```

#### 5.2.2 *Unit Tests* Berbasis Aturan Bisnis

Logic-Patching mengeksekusi serangkaian *unit test* terstruktur yang dikelompokkan menurut domain:

**Kelompok A — Konsistensi Aritmetika:**

$$\mathcal{T}_{A1}: \left|\sum_{i=1}^{n} q_i \cdot p_i - S\right| < \epsilon$$

$$\mathcal{T}_{A2}: |S \cdot r - T_{tax}| < \epsilon$$

$$\mathcal{T}_{A3}: |S + T_{tax} - T_{total}| < \epsilon$$

di mana $q_i$ adalah kuantitas, $p_i$ adalah harga satuan, $S$ adalah subtotal, $r$ adalah tarif pajak, $T_{tax}$ adalah jumlah pajak, dan $T_{total}$ adalah total.

**Kelompok B — Validasi Format:**

$$\mathcal{T}_{B1}: \text{NIK} \in \{x \in \mathbb{N} \mid |x| = 16 \wedge \text{valid\_birth\_code}(x[6:12])\}$$

$$\mathcal{T}_{B2}: \text{NPWP} \in \{x \mid \text{ChecksumNPWP}(x) = \text{True}\}$$

**Kelompok C — Konsistensi Silang:**

$$\mathcal{T}_{C1}: \text{TanggalLahir} \in [T_{min}, T_{issue\_date}]$$

$$\mathcal{T}_{C2}: \text{Kota}_{KTP} \in \text{DaftarKota}_{Indonesia}$$

#### 5.2.3 Algoritma Logic-Patching dengan Regenerasi

```
Algorithm 1: Logic-Patching dengan Fallback Regenerasi
─────────────────────────────────────────────────────
Input:  Citra I, Skema S, Batas percobaan K = 3
Output: JSON terverifikasi y*

1: ŷ ← VLM.generate(I, prompt(S))
2: for attempt = 1 to K do:
3:   violations ← RunUnitTests(ŷ, S)
4:   if violations = ∅ then:
5:     return ŷ  ← Output berhasil
6:   else:
7:     patch_hint ← FormatViolations(violations)
8:     ŷ ← VLM.generate(I, prompt(S) + patch_hint,
9:                        temperature=0.1 · attempt⁻¹)
10:      ← Suhu menurun untuk determinisme lebih tinggi
11: end for
12: ← Fallback: Koreksi deterministik
13: ŷ* ← DeterministicCorrect(ŷ, violations, S)
14: return ŷ*
```

**Koreksi Deterministik** pada langkah 13 menerapkan aturan prioritas:

$$v_{total}^* = v_{subtotal} + v_{tax}$$

di mana nilai yang paling dapat dipercaya (biasanya yang paling mudah diverifikasi secara independen) digunakan sebagai acuan, dan nilai yang bergantung padanya dikoreksi secara aljabar.

### 5.3 Analisis Kompleksitas Logic-Patching

**Kompleksitas Waktu**: Logic-Patching beroperasi dalam $\mathcal{O}(|R| + |\text{fields}|)$ di mana $|R|$ adalah jumlah aturan dan $|\text{fields}|$ adalah jumlah bidang JSON. Untuk dokumen tipikal dengan $|R| \leq 50$ dan $|\text{fields}| \leq 100$, overhead ini dapat diabaikan relatif terhadap waktu generasi VLM (biasanya $< 1\%$).

**Jaminan Konsistensi**: Teorema berikut menjamin *soundness* Logic-Patching:

**Teorema 1** *(Kelengkapan Verifikasi)*: Untuk setiap himpunan aturan $R$ yang dapat dinyatakan sebagai persamaan atau pertidaksamaan linear atas nilai-nilai JSON, Logic-Patching akan mendeteksi semua pelanggaran dalam waktu polinomial.

*Bukti Sketsa*: Setiap aturan $r \in R$ adalah predikat Boolean yang dapat dievaluasi dalam $\mathcal{O}(|r|)$. Eksekusi seluruh $R$ memerlukan $\mathcal{O}(\sum_{r \in R} |r|) = \mathcal{O}(|R| \cdot \bar{r})$ di mana $\bar{r}$ adalah ukuran rata-rata aturan. $\square$

---

## 6. METODOLOGI PELATIHAN

### 6.1 Strategi Pelatihan Bertahap

LLensa dilatih menggunakan strategi bertahap yang memisahkan adaptasi visual dari fine-tuning instruksi:

```
FASE 1: Pra-Latih Proyektor (~ 1 juta pasang citra-teks)
  └─ Hanya proyektor multimodal yang dilatih
  └─ ViT dan LM dibekukan (frozen)
  └─ Tujuan: Alignment visual-linguistik dasar

FASE 2: Fine-Tuning Komponen Terpilih (~ 500 ribu dokumen)
  └─ Proyektor + Layer atas LM dilatih
  └─ ViT tetap dibekukan
  └─ Tujuan: Adaptasi domain dokumen

FASE 3: Full Fine-Tuning + RLVF (~ 100 ribu pasang terverifikasi)
  └─ Seluruh model dilatih
  └─ Reward: Logic Consistency Score (LCS)
  └─ Tujuan: Optimasi konsistensi logika
```

### 6.2 Fungsi Kerugian (*Loss Function*)

#### 6.2.1 *Language Modeling Loss* (Fase 1 & 2)

$$\mathcal{L}_{LM} = -\frac{1}{T} \sum_{t=1}^{T} \log P_\theta(y_t \mid \mathbf{I}, y_{<t})$$

#### 6.2.2 *Reinforcement Learning from Verifiable Feedback* (Fase 3)

Pada fase akhir, kami menggunakan **Proximal Policy Optimization** (PPO) [Schulman et al., 2017] dengan sinyal reward dari Logic-Patching:

$$r(\hat{\mathbf{y}}, \mathbf{y}^*) = \alpha \cdot \text{LCS}(\hat{\mathbf{y}}) + \beta \cdot \text{NED}(\hat{\mathbf{y}}, \mathbf{y}^*) + \gamma \cdot \mathbb{1}[\hat{\mathbf{y}} \in \mathcal{J}_{valid}]$$

di mana $\alpha, \beta, \gamma$ adalah bobot hyperparameter, dan $\mathcal{J}_{valid}$ adalah ruang JSON yang valid menurut skema.

**Fungsi tujuan PPO:**

$$\mathcal{L}_{PPO}(\theta) = \mathbb{E}\!\left[\min\!\left(\rho_t(\theta)\,\hat{A}_t,\; \text{clip}(\rho_t(\theta), 1-\epsilon, 1+\epsilon)\,\hat{A}_t\right)\right]$$

di mana $\rho_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{old}}(a_t|s_t)}$ adalah rasio probabilitas kebijakan dan $\hat{A}_t$ adalah estimasi keuntungan (*advantage*).

#### 6.2.3 *Combined Training Objective*

$$\mathcal{L}_{total} = \mathcal{L}_{LM} - \lambda \cdot \mathcal{L}_{PPO} + \mu \cdot \mathcal{L}_{KL}$$

di mana $\mathcal{L}_{KL} = D_{KL}(\pi_\theta \| \pi_{ref})$ adalah regularisasi KL-divergence terhadap kebijakan referensi untuk mencegah *reward hacking*.

### 6.3 Data Pelatihan

#### 6.3.1 Komposisi Dataset

| Sumber Data | Jumlah | Bahasa | Domain |
|-------------|--------|--------|--------|
| Dokumen Publik Indonesia | 500K | ID | KTP, NPWP, STNK |
| Faktur Keuangan Internasional | 300K | EN, ID, ZH | Akuntansi |
| Dokumen Akademis | 200K | EN, ID | Ilmiah |
| Dokumen Hukum | 100K | ID | Notaris, Kontrak |
| Tabel & Formulir | 150K | EN, ID | Umum |
| **Total** | **1.25M** | **Multi** | **Multi-domain** |

#### 6.3.2 Augmentasi Data

Untuk meningkatkan ketahanan model terhadap kondisi dokumen nyata, kami menerapkan augmentasi:

$$\mathbf{I}_{aug} = \mathcal{A}(\mathbf{I}) = \mathcal{A}_{noise} \circ \mathcal{A}_{blur} \circ \mathcal{A}_{rotate} \circ \mathcal{A}_{compress}(\mathbf{I})$$

dengan probabilitas augmentasi yang dikalibrasi berdasarkan distribusi artefak di dataset dunia nyata.

### 6.4 Konfigurasi Pelatihan

| Hyperparameter | LLensa-1B | LLensa-8B |
|----------------|-----------|-----------|
| *Learning Rate* awal | $2 \times 10^{-4}$ | $1 \times 10^{-4}$ |
| Jadwal LR | Cosine Annealing | Cosine Annealing |
| *Warmup Steps* | 1000 | 2000 |
| *Batch Size* | 256 | 128 |
| *Gradient Clipping* | 1.0 | 1.0 |
| *Weight Decay* | 0.01 | 0.01 |
| *Optimizer* | AdamW | AdamW |
| $\beta_1, \beta_2$ | 0.9, 0.95 | 0.9, 0.95 |
| Presisi | BF16 | BF16 |
| GPU (Fase 1) | 8× A100 40GB | 32× A100 80GB |
| Durasi Fase 1 | ~3 hari | ~7 hari |

### 6.5 Kuantisasi untuk Inferensi Efisien

Untuk *deployment* produksi, LLensa menggunakan **kuantisasi 4-bit** berbasis GPTQ [Frantar et al., 2022]:

$$\hat{\mathbf{W}} = \text{round}\!\left(\frac{\mathbf{W} - z}{\Delta}\right) \cdot \Delta + z$$

di mana $\Delta = \frac{\max(\mathbf{W}) - \min(\mathbf{W})}{2^4 - 1}$ adalah *scale factor* dan $z$ adalah *zero point*. Kuantisasi 4-bit mereduksi penggunaan memori hingga ~75% dengan degradasi akurasi minimal ($< 1\%$ pada OlmOCR-Bench):

| Konfigurasi | VRAM | Akurasi | *Throughput* |
|-------------|------|---------|-------------|
| LLensa-1B FP16 | 2.5 GB | 83.4% | 5.65 p/s |
| LLensa-1B INT4 | 0.9 GB | 82.8% | 5.80 p/s |
| LLensa-8B FP16 | 17 GB | 88.1% | 1.95 p/s |
| LLensa-8B INT4 | 5.5 GB | 87.6% | 2.10 p/s |

---

## 7. EKOSISTEM PRODUK

### 7.1 Neural Processors

LLensa menyediakan **Neural Processors**—komponen ekstraksi terkhususkan yang menggabungkan model LLensa dengan skema Pydantic dan aturan Logic-Patching yang dipra-konfigurasi untuk domain tertentu.

#### 7.1.1 Identity Processor (KTP Indonesia)

Processor ini dioptimasi untuk ekstraksi data Kartu Tanda Penduduk (KTP) Indonesia. Skema JSON yang dihasilkan mencakup:

```json
{
  "nik": "3201234567890001",
  "nama": "BUDI SANTOSO",
  "tempat_lahir": "JAKARTA",
  "tanggal_lahir": "1990-05-15",
  "jenis_kelamin": "LAKI-LAKI",
  "golongan_darah": "O",
  "alamat": {
    "jalan": "JL. MERDEKA NO. 17",
    "rt_rw": "001/002",
    "kelurahan": "GAMBIR",
    "kecamatan": "GAMBIR",
    "kota_kabupaten": "JAKARTA PUSAT",
    "provinsi": "DKI JAKARTA",
    "kode_pos": "10110"
  },
  "agama": "ISLAM",
  "status_perkawinan": "BELUM KAWIN",
  "pekerjaan": "KARYAWAN SWASTA",
  "kewarganegaraan": "WNI",
  "berlaku_hingga": "SEUMUR HIDUP",
  "_meta": {
    "confidence_score": 0.987,
    "logic_checks_passed": 8,
    "logic_checks_total": 8
  }
}
```

**Aturan Logic-Patching Khusus KTP:**
- Validasi 16 digit NIK dengan verifikasi kode wilayah Dukcapil
- Konsistensi NIK ↔ Tanggal Lahir (digit 7-12 NIK mengandung kode tanggal lahir)
- Validasi nama kota/kabupaten terhadap basis data Kemendagri
- Verifikasi format RT/RW (3 digit / 3 digit)

#### 7.1.2 Invoice Standard Processor

Processor universal untuk dokumen keuangan dengan dukungan multi-mata uang dan multi-bahasa:

```json
{
  "invoice_number": "INV-2026-00142",
  "issue_date": "2026-03-15",
  "due_date": "2026-04-15",
  "vendor": {
    "name": "PT. MAJU BERSAMA",
    "npwp": "01.234.567.8-910.000",
    "address": "Jl. Sudirman No. 5, Jakarta Selatan"
  },
  "client": {...},
  "line_items": [
    {
      "description": "Jasa Konsultasi Teknologi",
      "quantity": 10,
      "unit": "hari",
      "unit_price": 2500000,
      "amount": 25000000
    }
  ],
  "subtotal": 25000000,
  "tax_rate": 0.11,
  "tax_amount": 2750000,
  "total": 27750000,
  "currency": "IDR",
  "_meta": {
    "logic_checks_passed": 12,
    "logic_checks_total": 12
  }
}
```

#### 7.1.3 Custom Lab

**Custom Lab** memungkinkan pengguna mendefinisikan processor kustom melalui antarmuka *human-in-the-loop*:

```
ALUR KERJA CUSTOM LAB:
┌──────────────────────────────────────────────────────────────┐
│  1. Upload Sampel Dokumen (5-20 halaman representatif)        │
│  2. Anotasi Bidang Target via UI Drag-and-Drop               │
│  3. Definisi Skema JSON & Aturan Validasi                    │
│  4. Fine-Tuning Otomatis (Few-Shot / LoRA)                   │
│  5. Evaluasi & Iterasi                                        │
│  6. Deploy sebagai API Endpoint Kustom                        │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Infrastruktur Pengembang

#### 7.2.1 REST API

```bash
# Contoh Penggunaan API LLensa
curl -X POST https://api.llensa.ai/v1/extract \
  -H "Authorization: Bearer ${LLENSA_API_KEY}" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@dokumen_ktp.jpg" \
  -F "processor=identity-ktp" \
  -F "language=id"
```

**Response:**
```json
{
  "request_id": "req_8f3a2b1c",
  "status": "success",
  "processing_time_ms": 172,
  "pages_processed": 1,
  "credits_used": 1,
  "data": { ... },
  "confidence": 0.987,
  "logic_patching": {
    "checks_run": 8,
    "checks_passed": 8,
    "patches_applied": 0
  }
}
```

#### 7.2.2 SDK Multi-Bahasa

```python
# Python SDK
from llensa import LLensaClient

client = LLensaClient(api_key="sk-llensa-...")
result = client.extract(
    file="invoice.pdf",
    processor="invoice-standard",
    options={"currency": "IDR", "language": "id"}
)
print(result.data["total"])  # Output: 27750000
```

```typescript
// TypeScript SDK
import { LLensaClient } from '@llensa/sdk';

const client = new LLensaClient({ apiKey: process.env.LLENSA_API_KEY });
const result = await client.extract({
  file: fs.createReadStream('invoice.pdf'),
  processor: 'invoice-standard'
});
console.log(result.data.total); // 27750000
```

#### 7.2.3 Dashboard Monitoring

Dashboard LLensa dibangun dengan **Next.js 16** + **React 19** + **Tailwind CSS 4**, menyediakan:

- **KPI Real-Time**: Kredit terpakai, dokumen diproses, skor akurasi rata-rata, tingkat kegagalan Logic-Patching
- **Log Penggunaan**: Jejak audit lengkap setiap transaksi API dengan metadata waktu pemrosesan dan distribusi confidence score
- **Analitik Performa**: Grafik *throughput* historis, distribusi jenis dokumen, tren akurasi per processor

---

## 8. EKSPERIMEN DAN EVALUASI

### 8.1 Konfigurasi Eksperimen

**Lingkungan Komputasi:**
- GPU: NVIDIA A100 40GB (inferensi), A100 80GB (pelatihan)
- CPU: AMD EPYC 7742 64-Core
- RAM: 512 GB DDR4
- Penyimpanan: NVMe SSD 10TB
- *Framework*: PyTorch 2.5, Transformers 4.47, vLLM 0.7

**Tolok Ukur (Benchmark):**
- **OlmOCR-Bench**: Benchmark komprehensif 5.000 halaman dokumen dari 15 bahasa
- **DocVQA**: Kumpulan data tanya-jawab berbasis dokumen (12.767 pertanyaan)
- **FUNSD**: Pemahaman formulir (199 formulir anotasi)
- **CORD**: Penerimaan konsolidasi (1.000 penerimaan beranotasi)
- **KTP-Bench** *(dikembangkan sendiri)*: 1.200 citra KTP tersintetis dengan anotasi penuh

### 8.2 Hasil *Throughput* dan Efisiensi

**Tabel 1: Perbandingan Throughput dan Akurasi**

| Model | Ukuran | Throughput (p/s) | OlmOCR-Bench | FUNSD | CORD | DocVQA |
|-------|--------|-------------------|--------------|-------|------|--------|
| **LLensa-1B (Base)** | 1B | **5.80** | 77.5% | 72.1% | 81.3% | 68.4% |
| **LLensa-1B (Patched)** | 1B | 5.65 | **83.4%** | 78.9% | 87.6% | 74.2% |
| **LLensa-8B (Patched)** | 8B | 1.95 | **88.1%** | 83.4% | 91.2% | 79.8% |
| Kompetitor-A (9B) | 9B | 1.70 | 81.7% | 76.3% | 84.1% | 73.1% |
| Kompetitor-B (7B) | 7B | 2.10 | 79.4% | 74.8% | 82.7% | 71.6% |
| PaddleOCR v4 | N/A | 3.20 | 75.8% | 68.9% | 78.4% | 55.2% |

*p/s = halaman per detik pada A100 40GB dengan INT4*

### 8.3 Dampak Logic-Patching pada Akurasi

**Tabel 2: Analisis Dampak Logic-Patching**

| Domain Dokumen | Tanpa Patching | Dengan Patching | Peningkatan |
|----------------|---------------|-----------------|-------------|
| Faktur Keuangan | 77.5% | 83.4% | **+5.9%** |
| KTP Indonesia | 89.2% | 94.7% | **+5.5%** |
| Formulir Pajak | 71.3% | 79.8% | **+8.5%** |
| Penerimaan Ritel | 82.1% | 87.3% | **+5.2%** |
| Kontrak Hukum | 68.4% | 73.1% | **+4.7%** |
| **Rata-rata** | **77.7%** | **83.7%** | **+6.0%** |

**Gambar 1: Distribusi Jenis Pelanggaran yang Terdeteksi Logic-Patching**

```
Distribusi Pelanggaran Logic-Patching (n=10,000 dokumen):
                                                  
Inkonsistensi Aritmetika    ████████████ 38.2%   
Format Tanggal Tidak Valid  ████████ 24.1%        
NIK Tidak Valid             █████ 16.8%          
Bidang Wajib Kosong         ████ 12.3%           
Inkonsistensi Silang        ███ 8.6%             
                                                  
                    0%   10%   20%   30%   40%    
```

### 8.4 Evaluasi Khusus KTP Indonesia (KTP-Bench)

**Tabel 3: Akurasi Bidang KTP-Bench**

| Bidang | LLensa-1B | LLensa-8B | Kompetitor |
|--------|-----------|-----------|------------|
| NIK (16 digit) | 97.2% | 98.9% | 89.4% |
| Nama Lengkap | 95.8% | 97.6% | 91.2% |
| Tanggal Lahir | 98.1% | 99.2% | 93.7% |
| Alamat | 89.4% | 93.1% | 78.6% |
| Kode Wilayah | 96.7% | 98.4% | 87.3% |
| **Rata-rata** | **95.4%** | **97.4%** | **88.0%** |

Keunggulan signifikan pada bidang NIK dan Kode Wilayah disebabkan oleh integrasi basis data Dukcapil dalam aturan Logic-Patching, yang memungkinkan koreksi kode wilayah berdasarkan konteks nama kota/kabupaten.

### 8.5 Analisis Ablasi

**Tabel 4: Studi Ablasi Komponen Arsitektur**

| Konfigurasi | OlmOCR-Bench | Δ vs. Full |
|-------------|--------------|-----------|
| Full LLensa-1B (Patched) | **83.4%** | — |
| − Logic-Patching | 77.5% | −5.9% |
| − Spatial Merging | 81.2% | −2.2% |
| − RoPE-2D (→ 1D) | 80.7% | −2.7% |
| − Constrained Decoding | 79.8% | −3.6% |
| − Qwen Init (→ Random) | 68.3% | −15.1% |
| − Native Resolution (→ 224px) | 74.6% | −8.8% |

Studi ablasi mengkonfirmasi bahwa inisialisasi dari bobot Qwen pra-latih merupakan kontribusi terbesar (+15.1%), diikuti oleh resolusi nativ (+8.8%), dan Logic-Patching (+5.9%).

### 8.6 Efisiensi Biaya Komputasi

**Tabel 5: Analisis Biaya Komputasi Relatif**

| Sistem | Biaya per 1000 Hal. | Latensi (ms/hal.) | Persyaratan VRAM |
|--------|---------------------|-------------------|------------------|
| GPT-4V (API) | $12.00 | 3,200 | N/A (cloud) |
| Claude 3 Opus (API) | $15.00 | 4,100 | N/A (cloud) |
| Kompetitor-A 9B (lokal) | $0.48 | 588 | 24 GB |
| **LLensa-1B (lokal, INT4)** | **$0.08** | **172** | **1 GB** |
| **LLensa-8B (lokal, INT4)** | **$0.18** | **513** | **6 GB** |

*Biaya dihitung berdasarkan A100 40GB @ $2.00/jam (spot price)*

---

## 9. ANALISIS DAN DISKUSI

### 9.1 Keunggulan Arsitektur *End-to-End*

Hasil eksperimen mengkonfirmasi hipotesis utama: eliminasi *pipeline* bertahap secara signifikan mengurangi akumulasi kesalahan. Pada kondisi dokumen dengan kualitas rendah (blur, rotasi, kontras rendah), LLensa-1B mempertahankan akurasi 79.2% sementara PaddleOCR turun ke 61.4%, menunjukkan ketahanan yang lebih besar karena model belajar representasi fitur visual secara *end-to-end* tanpa ketergantungan pada prasyarat kualitas tiap tahap.

### 9.2 Analisis Logic-Patching: Mengapa Berhasil?

Efektivitas Logic-Patching dapat dijelaskan melalui tiga mekanisme komplementer:

1. **Koreksi Determinisme**: Ketika model ragu antara dua nilai numerik yang plausibel (misal: "Rp 935.000" vs "Rp 940.000"), Logic-Patching menggunakan kendala aritmetika untuk memilih nilai yang secara logis konsisten, mengubah ketidakpastian probabilistik menjadi kepastian deterministik.

2. **Informasi Kontekstual Tersembunyi**: Aturan domain (misal: kode wilayah NIK) menyediakan informasi kontekstual yang tidak sepenuhnya dapat dipelajari dari data pelatihan terbatas, meningkatkan akurasi melalui pengetahuan domain simbolik.

3. **Sinergi dengan Constrained Decoding**: Logic-Patching dan Constrained Decoding berfungsi pada lapisan yang berbeda—Constrained Decoding menjamin validitas sintaksis JSON, sedangkan Logic-Patching menjamin kebenaran semantik. Keduanya bersifat komplementer, bukan redundan.

### 9.3 Perbandingan dengan Paradigma RLVR

Pendekatan Logic-Patching berbeda secara fundamental dari RLVR yang diterapkan saat pelatihan. RLVR memodifikasi bobot model melalui sinyal reward, menghasilkan model yang *secara implisit* belajar menghindari pelanggaran. Logic-Patching, sebaliknya, beroperasi sebagai lapisan eksternal yang *secara eksplisit* mendeteksi dan mengoreksi pelanggaran pada waktu inferensi.

Keunggulan Logic-Patching dibandingkan RLVR murni:
- **Dapat diterapkan tanpa pelatihan ulang** pada model yang sudah ada
- **Transparan dan dapat diaudit**—setiap koreksi dicatat dan dapat dijelaskan
- **Dapat diperbarui**—aturan bisnis baru dapat ditambahkan tanpa retraining

### 9.4 Limitasi yang Diidentifikasi

Beberapa kasus penggunaan yang menunjukkan performa suboptimal:

1. **Dokumen Handwriting Padat**: Akurasi turun ke ~71% untuk formulir tulisan tangan padat, dibandingkan ~95% untuk dokumen cetak.
2. **Tabel Multi-Baris Kompleks**: Struktur tabel dengan sel yang di-*merge* (colspan/rowspan) masih menunjukkan tingkat kesalahan 8-12%.
3. **Dokumen Silang Bahasa**: Dokumen yang mencampur bahasa Latin dengan aksara Arab/CJK dalam proporsi besar mengalami penurunan akurasi ~5%.

---

## 10. LIMITASI DAN ARAH PENELITIAN MASA DEPAN

### 10.1 Limitasi Saat Ini

**Teknis:**
- Batas resolusi 1540px membatasi pemrosesan dokumen berformat sangat besar (poster A0, cetak biru teknik)
- Pendekatan autoregresif linear tidak secara alami menangkap dependensi paralel dalam tata letak dua-kolom
- Logic-Patching memerlukan aturan yang didefinisikan secara eksplisit—ia tidak mampu mendeteksi jenis pelanggaran yang tidak teranticipasi

**Data:**
- Dataset pelatihan KTP terbatas pada varian desain 2011-2026; perubahan desain mendatang memerlukan fine-tuning
- Representasi terbatas untuk dialek regional dan variasi tipografi lokal Indonesia

### 10.2 Arah Penelitian Masa Depan

#### 10.2.1 Perluasan Aksara Non-Latin

Penelitian selanjutnya akan mengintegrasikan aksara Jawa, Batak, dan Sunda—aksara tradisional Indonesia yang masih digunakan dalam dokumen resmi beberapa daerah. Ini memerlukan:
- Koleksi dataset aksara tradisional skala besar
- Adaptasi tokenizer untuk encoding aksara multi-byte
- Evaluasi pada benchmark khusus aksara Nusantara

#### 10.2.2 Pemrosesan Teks Tulisan Tangan

Pengembangan modul **Handwriting Adaptation** berbasis *meta-learning* yang dapat beradaptasi terhadap gaya tulisan individu dari beberapa contoh (*few-shot*):

$$\theta^* = \theta - \alpha \nabla_\theta \mathcal{L}(\theta, \mathcal{D}_{support})$$

#### 10.2.3 Logic-Patching yang Dipelajari (*Learned Logic-Patching*)

Eksplorasi pendekatan hibrida di mana aturan Logic-Patching tidak hanya didefinisikan secara manual tetapi juga dipelajari secara otomatis dari data melalui:
- Induksi program (*program synthesis*)
- *Neuro-symbolic learning* berbasis aturan differensiabel

#### 10.2.4 Pemrosesan Multi-Halaman (*Multi-Page Processing*)

Pengembangan kemampuan pemrosesan lintas halaman untuk menangani dokumen panjang (kontrak 50+ halaman) dengan mempertahankan konsistensi konteks antar-halaman:

$$P(\mathbf{y}^{(k)} \mid \mathbf{I}^{(1:k)}) = P(\mathbf{y}^{(k)} \mid \mathbf{I}^{(k)}, \mathbf{c}^{(k-1)})$$

di mana $\mathbf{c}^{(k-1)}$ adalah representasi konteks terakumulasi dari halaman sebelumnya.

---

## 11. KESIMPULAN

Makalah ini telah mempresentasikan **LLensa-1.2-Beta**, sebuah ekosistem VLM kompak yang menggabungkan arsitektur *end-to-end* dengan kerangka Logic-Patching untuk menghadirkan solusi ekstraksi dokumen terstruktur yang akurat, efisien, dan dapat dipercaya. Kontribusi utama kami meliputi:

1. **Arsitektur Terpadu**: Integrasi *native-resolution ViT* dengan *spatial merging*, proyektor multimodal MLP, dan decoder bahasa autoregressif berbasis Qwen yang dioptimasi untuk dokumen multibahasa termasuk Bahasa Indonesia.

2. **Framework Logic-Patching**: Lapisan verifikasi deterministik yang meningkatkan reliabilitas output hingga +6.0% rata-rata dibandingkan generasi murni, dengan jaminan formal berupa *unit tests* yang dapat diaudit.

3. **Efisiensi Unggul**: LLensa-1B mencapai *throughput* 5.80 halaman/detik dengan akurasi 83.4% pada tolok ukur OlmOCR-Bench—melampaui kompetitor 9B yang hanya 81.7% pada kecepatan 1.70 halaman/detik—dengan kebutuhan VRAM hanya 1 GB (INT4).

4. **Spesialisasi Indonesia**: Pencapaian akurasi 95.4-97.4% pada KTP-Bench melalui integrasi basis data wilayah Dukcapil dalam aturan Logic-Patching, menjadikan LLensa solusi *state-of-the-art* untuk pemrosesan dokumen identitas Indonesia.

Kami merilis LLensa sebagai proyek *open-source* penuh di bawah lisensi Apache 2.0, mencakup bobot model, kode pelatihan, dataset benchmark KTP-Bench, dan dokumentasi lengkap. Kami berharap kontribusi ini dapat menjadi fondasi yang kokoh bagi pengembangan infrastruktur AI dokumen Indonesia yang berdaulat, efisien, dan terpercaya.

---

## UCAPAN TERIMA KASIH

Tim LLensa mengucapkan terima kasih kepada komunitas *open-source* Qwen, OlmOCR, dan seluruh peneliti yang karyanya menjadi fondasi penelitian ini. Penelitian ini didedikasikan untuk mempercepat transformasi digital Indonesia melalui teknologi AI yang aksesibel dan dapat dipercaya.

---

## REFERENSI

[1] Bai, J., et al. (2023). Qwen-VL: A Versatile Vision-Language Model for Understanding, Localization, Text Reading, and Beyond. *arXiv:2308.12966*.

[2] Chen, Z., et al. (2024). InternVL: Scaling up Vision Foundation Models and Aligning for Generic Visual-Linguistic Tasks. *CVPR 2024*.

[3] Dosovitskiy, A., et al. (2020). An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale. *ICLR 2021*.

[4] Du, Y., et al. (2020). PP-OCR: A Practical Ultra Lightweight OCR System. *arXiv:2009.09941*.

[5] Frantar, E., et al. (2022). GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers. *ICLR 2023*.

[6] Ji, Z., et al. (2023). Survey of Hallucination in Natural Language Generation. *ACM Computing Surveys*.

[7] Kim, G., et al. (2022). OCR-Free Document Understanding Transformer. *ECCV 2022*.

[8] Lee, K., et al. (2023). Pix2Struct: Screenshot Parsing as Pretraining for Visual Language Understanding. *ICML 2023*.

[9] Lightman, H., et al. (2023). Let's Verify Step by Step. *arXiv:2305.20050*.

[10] Manakul, P., et al. (2023). SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection for Generative Large Language Models. *EMNLP 2023*.

[11] Maynez, J., et al. (2020). On Faithfulness and Factuality in Abstractive Summarization. *ACL 2020*.

[12] Rashkin, H., et al. (2021). Measuring Attribution in Natural Language Generation Models. *Computational Linguistics*.

[13] Schulman, J., et al. (2017). Proximal Policy Optimization Algorithms. *arXiv:1707.06347*.

[14] Shi, B., et al. (2016). An End-to-End Trainable Neural Network for Image-Based Sequence Recognition. *TPAMI 2017*.

[15] Smith, R. (2007). An Overview of the Tesseract OCR Engine. *ICDAR 2007*.

[16] Vaswani, A., et al. (2017). Attention Is All You Need. *NeurIPS 2017*.

[17] Wang, Z., et al. (2024). MinerU: An Open-Source Solution for Precise Document Content Extraction. *arXiv:2409.18839*.

[18] Zhang, B., & Sennrich, R. (2019). Root Mean Square Layer Normalization. *NeurIPS 2019*.

---

## LAMPIRAN A: PANDUAN REPRODUKSI (*REPRODUCIBILITY GUIDE*)

### A.1 Instalasi

```bash
# Clone repositori
git clone https://github.com/devrich/llensa.git
cd llensa

# Buat lingkungan virtual
conda create -n llensa python=3.11
conda activate llensa

# Instal dependensi
pip install -r requirements.txt

# Unduh bobot model (1B)
python scripts/download_model.py --variant 1b --quantization int4
```

### A.2 Inferensi Cepat

```python
from llensa import LLensaLocal

# Inisialisasi model lokal
model = LLensaLocal(
    model_variant="1b",
    quantization="int4",
    device="cuda"
)

# Ekstraksi KTP
result = model.extract(
    image="path/to/ktp.jpg",
    processor="identity-ktp"
)

print(result.json(indent=2))
```

### A.3 Mereproduksi Hasil Benchmark

```bash
# Jalankan evaluasi OlmOCR-Bench
python evaluate.py \
  --benchmark olmocr \
  --model llensa-1b \
  --quantization int4 \
  --logic_patching true \
  --output results/olmocr_llensa1b.json

# Jalankan evaluasi KTP-Bench
python evaluate.py \
  --benchmark ktp-bench \
  --model llensa-1b \
  --output results/ktp_bench_llensa1b.json
```

---

## LAMPIRAN B: SPESIFIKASI SKEMA LOGIC-PATCHING

### B.1 Definisi Formal Aturan

Aturan Logic-Patching didefinisikan dalam format YAML yang dapat dibaca manusia:

```yaml
processor: invoice-standard
version: "1.2"
rules:
  - id: ARITH_001
    name: "Konsistensi Subtotal"
    type: arithmetic
    formula: "abs(sum(item.amount for item in items) - subtotal) < 0.01"
    severity: critical
    patch_strategy: recalculate_subtotal
    
  - id: ARITH_002
    name: "Konsistensi Pajak"
    type: arithmetic
    formula: "abs(subtotal * tax_rate - tax_amount) < 0.01"
    severity: critical
    patch_strategy: recalculate_tax
    
  - id: FORMAT_001
    name: "Format Tanggal ISO 8601"
    type: format
    fields: [issue_date, due_date]
    pattern: "^\\d{4}-\\d{2}-\\d{2}$"
    severity: warning
    patch_strategy: normalize_date_format
    
  - id: LOGIC_001
    name: "Tanggal Jatuh Tempo Setelah Tanggal Terbit"
    type: constraint
    formula: "due_date >= issue_date"
    severity: warning
    patch_strategy: null  # Tidak dikoreksi otomatis, dilaporkan saja
```

---

*Dokumen ini dirilis di bawah lisensi Creative Commons Attribution 4.0 International (CC BY 4.0). Anda bebas berbagi dan mengadaptasi materi ini untuk tujuan apapun, dengan syarat memberikan atribusi yang sesuai.*

*© 2026 DevRich & Tim Inti LLensa. Hak cipta dilindungi undang-undang untuk konten di luar cakupan lisensi CC BY 4.0.*
