export const tools = [
  // ==================== PDF TOOLS ====================
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    icon: "fa-solid fa-file-word",
    color: "text-blue-500",
    category: "pdf",
    desc: "Convert PDF documents to editable Microsoft Word DOCX files with formatting.",
    popular: true,
    options: []
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    icon: "fa-solid fa-file-pdf",
    color: "text-red-500",
    category: "pdf",
    desc: "Convert Microsoft Word DOCX documents to standard PDF files.",
    popular: false,
    realHandler: "wordToPdf",
    options: []
  },
  {
    id: "pdf-merge",
    name: "PDF Merge",
    icon: "fa-solid fa-file-medical",
    color: "text-purple-500",
    category: "pdf",
    desc: "Combine multiple PDF files into a single organized document.",
    popular: true,
    realHandler: "pdfMerge",
    options: [
      { id: "mergeOrder", type: "info", label: "Rearrange files in the sidebar and click process." }
    ]
  },
  {
    id: "pdf-split",
    name: "PDF Split",
    icon: "fa-solid fa-scissors",
    color: "text-indigo-500",
    category: "pdf",
    desc: "Extract specific pages from a PDF or split every page into separate PDFs.",
    popular: false,
    options: [
      { id: "splitRange", type: "text", label: "Extract Page Range (e.g. 1-3, 5)", placeholder: "e.g., 1-3, 5", default: "1" }
    ]
  },
  {
    id: "pdf-compress",
    name: "PDF Compress",
    icon: "fa-solid fa-file-zipper",
    color: "text-teal-500",
    category: "pdf",
    desc: "Reduce the file size of your PDF while maintaining optimal resolution.",
    popular: true,
    options: [
      { id: "compressionLevel", type: "radio", label: "Compression Mode", options: [
        { label: "Extreme (Low Quality)", value: "extreme" },
        { label: "Recommended (Good Quality)", value: "recommended", checked: true },
        { label: "Less (High Quality)", value: "low" }
      ]}
    ]
  },
  {
    id: "pdf-rotate",
    name: "PDF Rotate",
    icon: "fa-solid fa-arrows-spin",
    color: "text-orange-500",
    category: "pdf",
    desc: "Rotate pages inside a PDF document clockwise or counter-clockwise.",
    popular: false,
    realHandler: "pdfRotate",
    options: [
      { id: "rotateAngle", type: "select", label: "Rotation", options: [
        { label: "90° Clockwise", value: "90", selected: true },
        { label: "180° Rotate", value: "180" },
        { label: "270° Counter-Clockwise", value: "270" }
      ]}
    ]
  },
  {
    id: "pdf-unlock",
    name: "PDF Unlock",
    icon: "fa-solid fa-lock-open",
    color: "text-emerald-500",
    category: "pdf",
    desc: "Remove passwords, permissions, and encryptions from protected PDFs.",
    popular: false,
    options: [
      { id: "unlockPassword", type: "password", label: "Password (if known)", placeholder: "Enter PDF password", default: "" }
    ]
  },
  {
    id: "pdf-protect",
    name: "PDF Protect",
    icon: "fa-solid fa-lock",
    color: "text-rose-500",
    category: "pdf",
    desc: "Secure your PDF with passwords and restrict copy/print permissions.",
    popular: false,
    realHandler: "pdfProtect",
    options: [
      { id: "pdfPassword", type: "password", label: "Set User Password", placeholder: "Min. 6 characters", default: "" }
    ]
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    icon: "fa-solid fa-image",
    color: "text-pink-500",
    category: "pdf",
    desc: "Extract all images inside a PDF or convert each page to an image.",
    popular: false,
    options: []
  },
  {
    id: "jpg-to-pdf",
    name: "Image to PDF",
    icon: "fa-solid fa-file-image",
    color: "text-amber-500",
    category: "pdf",
    desc: "Convert JPG, PNG, WebP, GIF, and BMP images into a single PDF document.",
    popular: false,
    realHandler: "imageToPdf",
    options: []
  },

  // ==================== IMAGE TOOLS ====================
  {
    id: "image-converter",
    name: "Image Converter",
    icon: "fa-solid fa-images",
    color: "text-sky-500",
    category: "image",
    desc: "Convert image files to PNG, JPG, WebP, GIF, or BMP formats instantly.",
    popular: true,
    realHandler: "canvasConvert",
    options: [
      { id: "imageFormat", type: "select", label: "Convert To", options: [
        { label: "PNG (.png)", value: "png", selected: true },
        { label: "JPEG (.jpg)", value: "jpeg" },
        { label: "WebP (.webp)", value: "webp" }
      ]}
    ]
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG",
    icon: "fa-solid fa-photo-film",
    color: "text-blue-400",
    category: "image",
    desc: "Convert JPEG graphics to PNG format with alpha channel transparency.",
    popular: false,
    realHandler: "canvasConvert",
    options: [
      { id: "imageFormat", type: "hidden", value: "png" }
    ]
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    icon: "fa-solid fa-file-invoice-dollar",
    color: "text-yellow-500",
    category: "image",
    desc: "Convert high-fidelity PNG files to compressed JPEG formats.",
    popular: false,
    realHandler: "canvasConvert",
    options: [
      { id: "imageFormat", type: "hidden", value: "jpeg" }
    ]
  },
  {
    id: "image-compress",
    name: "Image Compressor",
    icon: "fa-solid fa-minimize",
    color: "text-cyan-500",
    category: "image",
    desc: "Reduce image file sizes (up to 80%) without losing high resolution details.",
    popular: true,
    realHandler: "canvasCompress",
    options: [
      { id: "compressQuality", type: "slider", label: "Compression Quality", min: 10, max: 100, step: 5, default: 80, unit: "%" }
    ]
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    icon: "fa-solid fa-expand",
    color: "text-purple-400",
    category: "image",
    desc: "Resize image dimensions by percentages or exact pixel height and width.",
    popular: false,
    realHandler: "canvasResize",
    options: [
      { id: "resizeWidth", type: "number", label: "Width (px)", default: 800 },
      { id: "resizeHeight", type: "number", label: "Height (px)", default: 600 },
      { id: "maintainAspect", type: "checkbox", label: "Maintain Aspect Ratio", checked: true }
    ]
  },
  {
    id: "bg-remover",
    name: "Background Remover",
    icon: "fa-solid fa-wand-magic-sparkles",
    color: "text-pink-500",
    category: "image",
    desc: "Isolate subjects and automatically remove backgrounds using edge detection.",
    popular: true,
    options: [
      { id: "bgRemoverStrength", type: "slider", label: "Edge Detection Sensitivity", min: 1, max: 10, step: 1, default: 5 }
    ]
  },
  {
    id: "image-cropper",
    name: "Image Cropper",
    icon: "fa-solid fa-crop-simple",
    color: "text-indigo-400",
    category: "image",
    desc: "Trim margins and crop photographs to standard dimensions (16:9, 4:3, 1:1).",
    popular: false,
    options: [
      { id: "cropAspect", type: "select", label: "Aspect Ratio", options: [
        { label: "Custom Freeform", value: "free", selected: true },
        { label: "1:1 Square (Profile)", value: "1-1" },
        { label: "16:9 Widescreen", value: "16-9" },
        { label: "4:3 Standard", value: "4-3" }
      ]}
    ]
  },
  {
    id: "image-rotate",
    name: "Image Rotate",
    icon: "fa-solid fa-rotate-right",
    color: "text-teal-400",
    category: "image",
    desc: "Rotate photos 90 degrees or flip them vertically and horizontally.",
    popular: false,
    realHandler: "canvasRotate",
    options: [
      { id: "imgRotateAngle", type: "select", label: "Rotate Angle", options: [
        { label: "90° Right", value: "90", selected: true },
        { label: "180° Flip", value: "180" },
        { label: "270° Left", value: "270" }
      ]}
    ]
  },
  {
    id: "image-to-webp",
    name: "Image to WebP",
    icon: "fa-solid fa-file-export",
    color: "text-emerald-400",
    category: "image",
    desc: "Convert standard images to Next-Gen Google WebP formats for web loading speed.",
    popular: false,
    realHandler: "canvasConvert",
    options: [
      { id: "imageFormat", type: "hidden", value: "webp" }
    ]
  },

  // ==================== VIDEO TOOLS ====================
  {
    id: "mp4-converter",
    name: "MP4 Converter",
    icon: "fa-solid fa-circle-play",
    color: "text-emerald-500",
    category: "video",
    desc: "Convert AVI, MKV, MOV, and WebM videos into standard web-compatible MP4 files.",
    popular: false,
    options: [
      { id: "videoFormat", type: "select", label: "Target Format", options: [
        { label: "MP4 (.mp4)", value: "mp4", selected: true },
        { label: "WebM (.webm)", value: "webm" },
        { label: "AVI (.avi)", value: "avi" }
      ]}
    ]
  },
  {
    id: "video-compress",
    name: "Video Compressor",
    icon: "fa-solid fa-compress",
    color: "text-blue-500",
    category: "video",
    desc: "Reduce heavy video gigabytes to email/message friendly file sizes.",
    popular: true,
    options: [
      { id: "videoTargetSize", type: "select", label: "Target Size Limit", options: [
        { label: "Small File (Fastest download)", value: "small", selected: true },
        { label: "Medium (Optimal resolution)", value: "medium" },
        { label: "Large (High profile)", value: "large" }
      ]}
    ]
  },
  {
    id: "video-to-gif",
    name: "Video to GIF",
    icon: "fa-solid fa-file-video",
    color: "text-pink-500",
    category: "video",
    desc: "Extract short video clips and render looping GIF memes with configurable FPS.",
    popular: true,
    options: [
      { id: "gifFps", type: "slider", label: "GIF Speed (FPS)", min: 5, max: 24, step: 1, default: 12, unit: " fps" }
    ]
  },
  {
    id: "video-trim",
    name: "Video Trimmer",
    icon: "fa-solid fa-video-slash",
    color: "text-rose-500",
    category: "video",
    desc: "Cut timelines, crop boundaries, and trim video duration boundaries.",
    popular: false,
    options: [
      { id: "timeStart", type: "text", label: "Start Timestamp (00:00)", default: "00:00" },
      { id: "timeEnd", type: "text", label: "End Timestamp (00:10)", default: "00:10" }
    ]
  },
  {
    id: "audio-extract",
    name: "Audio Extractor",
    icon: "fa-solid fa-file-audio",
    color: "text-orange-500",
    category: "video",
    desc: "Separate high-fidelity background songs and dialogue tracks from videos to MP3.",
    popular: false,
    options: []
  },
  {
    id: "video-merge",
    name: "Video Merge",
    icon: "fa-solid fa-clapperboard",
    color: "text-cyan-500",
    category: "video",
    desc: "Stitch multiple video segments together into a single continuous film clip.",
    popular: false,
    options: []
  },

  // ==================== AUDIO TOOLS ====================
  {
    id: "mp3-converter",
    name: "MP3 Converter",
    icon: "fa-solid fa-music",
    color: "text-purple-500",
    category: "audio",
    desc: "Convert audio formats like WAV, AAC, M4A, FLAC to high fidelity MP3 formats.",
    popular: false,
    options: [
      { id: "audioKbps", type: "select", label: "Bitrate Quality", options: [
        { label: "128 kbps (Standard)", value: "128" },
        { label: "192 kbps (Medium)", value: "192" },
        { label: "320 kbps (High Fidelity)", value: "320", selected: true }
      ]}
    ]
  },
  {
    id: "audio-compress",
    name: "Audio Compressor",
    icon: "fa-solid fa-volume-xmark",
    color: "text-indigo-500",
    category: "audio",
    desc: "Reduce heavy audio file size for quick distribution and easy streaming setups.",
    popular: false,
    options: []
  },
  {
    id: "audio-cut",
    name: "Audio Cutter",
    icon: "fa-solid fa-scissors",
    color: "text-amber-500",
    category: "audio",
    desc: "Trim, crop, and split audio clips to make high fidelity phone ringtones.",
    popular: false,
    options: [
      { id: "audioStart", type: "text", label: "Cut From (seconds)", default: "0" },
      { id: "audioEnd", type: "text", label: "Cut To (seconds)", default: "15" }
    ]
  },
  {
    id: "volume-booster",
    name: "Volume Booster",
    icon: "fa-solid fa-volume-high",
    color: "text-red-500",
    category: "audio",
    desc: "Increase audio file volume gain by up to 300% without quality distortion.",
    popular: true,
    realHandler: "audioBoost",
    options: [
      { id: "volumeLevel", type: "slider", label: "Gain Level", min: 100, max: 300, step: 10, default: 200, unit: "%" }
    ]
  },
  {
    id: "audio-format-converter",
    name: "Audio Format Converter",
    icon: "fa-solid fa-arrows-repeat",
    color: "text-teal-500",
    category: "audio",
    desc: "Convert audio formats between MP3, WAV, AAC, M4A, FLAC, and OGG extensions.",
    popular: false,
    options: [
      { id: "audioFormatVal", type: "select", label: "Target Ext", options: [
        { label: "WAV (.wav)", value: "wav" },
        { label: "FLAC (.flac)", value: "flac" },
        { label: "AAC (.aac)", value: "aac" },
        { label: "M4A (.m4a)", value: "m4a", selected: true }
      ]}
    ]
  },

  // ==================== DOCUMENT TOOLS ====================
  {
    id: "docx-converter",
    name: "DOCX Converter",
    icon: "fa-solid fa-file-lines",
    color: "text-blue-500",
    category: "document",
    desc: "Convert Word DOCX documents to TXT, RTF, or HTML, and vice-versa.",
    popular: false,
    options: []
  },
  {
    id: "txt-to-pdf",
    name: "TXT to PDF",
    icon: "fa-solid fa-file-prescription",
    color: "text-red-500",
    category: "document",
    desc: "Convert raw text files (.txt) into highly readable PDF documents.",
    popular: true,
    realHandler: "textToPdf",
    options: [
      { id: "pdfFontSize", type: "select", label: "Font Size", options: [
        { label: "10 pt", value: "10" },
        { label: "12 pt", value: "12", selected: true },
        { label: "14 pt", value: "14" },
        { label: "18 pt", value: "18" }
      ]}
    ]
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    icon: "fa-solid fa-file-excel",
    color: "text-green-500",
    category: "document",
    desc: "Convert Microsoft Excel tables and sheets to paginated PDF views.",
    popular: false,
    realHandler: "excelToPdf",
    options: []
  },
  {
    id: "powerpoint-to-pdf",
    name: "PowerPoint to PDF",
    icon: "fa-solid fa-file-powerpoint",
    color: "text-orange-600",
    category: "document",
    desc: "Convert Microsoft PowerPoint presentations (.pptx) to PDF slides.",
    popular: false,
    options: []
  },
  {
    id: "file-compress",
    name: "File Compression",
    icon: "fa-solid fa-file-zipper",
    color: "text-slate-500",
    category: "document",
    desc: "Compress files or folders into highly optimized ZIP or TAR archives.",
    popular: true,
    options: [
      { id: "zipFormat", type: "select", label: "Archive Type", options: [
        { label: "ZIP format", value: "zip", selected: true },
        { label: "TAR.GZ format", value: "tar" }
      ]}
    ]
  }
];

export const toPdfFormats = [
  "3fr", "abw", "ai", "arw", "avif", "azw", "azw3", "azw4", "bmp", "cbc", "cbr", "cbz", "cdr", "cgm", "chm", "cr2", "cr3", "crw", "csv", "dcr", "djvu", "dng", "doc", "docm", "docx", "dot", "dotx", "dps", "dwf", "dwg", "dxf", "emf", "eps", "epub", "erf", "et", "fb2", "gif", "heic", "heif", "htm", "html", "htmlz", "hwp", "ico", "jfif", "jpeg", "jpg", "key", "lit", "lrf", "lwp", "md", "mobi", "mos", "mrw", "nef", "numbers", "odd", "odg", "odp", "ods", "odt", "orf", "pages", "pdb", "pef", "pml", "png", "pot", "potx", "ppm", "pps", "ppsx", "ppt", "pptm", "pptx", "prc", "ps", "psb", "psd", "pub", "raf", "raw", "rb", "rst", "rtf", "rw2", "sk", "sk1", "snb", "svg", "svgz", "tcr", "tex", "tga", "tif", "tiff", "txt", "txtz", "vsd", "webp", "wmf", "wpd", "wps", "x3f", "xcf", "xls", "xlsm", "xlsx", "xps", "zabw"
];

export function getToolById(id) {
  const existing = tools.find(t => t.id === id);
  if (existing) return existing;
  
  if (id.endsWith('-to-pdf')) {
    const format = id.substring(0, id.length - 7);
    if (toPdfFormats.includes(format)) {
      const formatUpper = format.toUpperCase();
      return {
        id: id,
        name: `${formatUpper} to PDF`,
        icon: getIconForFormat(format),
        color: getColorForFormat(format),
        category: "pdf",
        desc: `Convert ${formatUpper} files into high-quality PDF documents client-side.`,
        options: []
      };
    }
  }
  return null;
}

function getIconForFormat(format) {
  if (["doc", "docx", "docm", "dot", "dotx", "odt", "rtf"].includes(format)) return "fa-solid fa-file-word";
  if (["xls", "xlsx", "xlsm", "csv", "ods"].includes(format)) return "fa-solid fa-file-excel";
  if (["ppt", "pptx", "pptm", "pps", "ppsx", "odp"].includes(format)) return "fa-solid fa-file-powerpoint";
  if (["png", "jpg", "jpeg", "webp", "gif", "bmp", "tiff", "tif", "heic", "heif", "svg", "ico"].includes(format)) return "fa-solid fa-file-image";
  if (["epub", "mobi", "azw", "azw3", "fb2", "lit"].includes(format)) return "fa-solid fa-book";
  return "fa-solid fa-file-pdf";
}

function getColorForFormat(format) {
  if (["doc", "docx", "docm", "odt"].includes(format)) return "text-blue-500";
  if (["xls", "xlsx", "xlsm", "csv"].includes(format)) return "text-emerald-500";
  if (["ppt", "pptx", "odp"].includes(format)) return "text-orange-500";
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(format)) return "text-amber-500";
  return "text-purple-400";
}

