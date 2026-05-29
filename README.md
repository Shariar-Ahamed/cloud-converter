# ⚡ Cloud File Converter

A premium, client-side, all-in-one file converter SaaS dashboard built for speed, security, and visual excellence. Convert documents, images, audio, and videos instantly inside your browser sandbox.

💻 **Live Application URL**: [Live View](https://cloud-converter.vercel.app/)  

---

## ✨ Features

- **🔒 100% Client-Side Isolated Processing**: PDF formatting, image manipulation, and text conversions occur locally in your browser. Files are never uploaded to any remote server, ensuring absolute privacy.
- **📂 Real Client-Side Document Conversion**:
  - **Word to PDF (.docx ➔ .pdf)**: Uses Mammoth.js to parse document structures and render layout-retaining PDF outputs.
  - **Excel to PDF (.xlsx ➔ .pdf)**: Parses workbook pages using SheetJS and compiles formatted landscape PDF tables.
- **🖼️ Pixel-Perfect Image-to-PDF**: Creates PDFs that dynamically match your input images' exact pixel dimensions, preventing stretch scaling or empty margins.
- **📦 Multi-File Upload & Dual-Mode Downloads**:
  - Upload multiple files simultaneously.
  - Toggle between downloading a **Single Merged PDF** or a **ZIP Archive** containing individual converted files.
- **🔮 SaaS Utilities**: Includes PDF Merging, Split, Rotations, Lock protection, Image compressor, resizing, and Audio volume booster.
- **🎨 Ultra-Premium UI/UX Design**: Locked permanently in a dark purple night theme with glassmorphic cards, glowing backdrop blobs, and the elegant **Poppins** font.

---

## 🛠️ Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+ Modules)
- **Styling**: Tailwind CSS v4, Custom CSS Animations
- **Bundler & Server**: Vite
- **Parsing & PDF Generation Libraries**:
  - [jsPDF](https://github.com/parallax/jsPDF) — Client-side PDF generation
  - [pdf-lib](https://pdf-lib.js.org/) — Client-side PDF page merging and rotation adjustments
  - [Mammoth.js](https://github.com/mwilliamson/mammoth.js) — Word (.docx) HTML parsing
  - [SheetJS (XLSX)](https://sheetjs.com/) — Excel spreadsheet parsing
  - [JSZip](https://stuk.github.io/jszip/) — Client-side ZIP archive packaging
  - [html2canvas](https://html2canvas.hertzen.com/) — Layout capture rendering

---

## 🚀 Getting Started Locally

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed, and then follow these commands:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shariar-Ahamed/cloud-converter.git
   cd cloud-converter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. **Build production build**:
   ```bash
   npm run build
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
