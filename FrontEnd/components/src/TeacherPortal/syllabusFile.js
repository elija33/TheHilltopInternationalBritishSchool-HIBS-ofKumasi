// Turns an uploaded syllabus file into a PDF, in the browser, with no
// backend involved. A PDF is used as-is; an image is actually embedded
// into a generated PDF page; anything else (Word, PowerPoint, plain
// text…) becomes a short cover-page PDF noting the original filename —
// real document-format conversion needs a server-side converter we don't
// have, so this is the honest best effort instead of a dead link.
import { jsPDF } from "jspdf";

// Keeps the resulting base64 PDF well under localStorage's ~5-10MB quota —
// same reasoning as imageUpload.js's compression step.
const MAX_SOURCE_BYTES = 5 * 1024 * 1024;

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

const loadImage = (dataUrl) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => reject(new Error("That file doesn't look like a valid image."));
    img.onload = () => resolve(img);
    img.src = dataUrl;
  });

const renameToPdf = (name) => name.replace(/\.[^./]+$/, "") + ".pdf";

const buildImagePdf = async (dataUrl) => {
  const img = await loadImage(dataUrl);
  const doc = new jsPDF({ orientation: img.width > img.height ? "landscape" : "portrait" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const scale = Math.min((pageWidth - margin * 2) / img.width, (pageHeight - margin * 2) / img.height, 1);
  const width = img.width * scale;
  const height = img.height * scale;
  const format = dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
  doc.addImage(dataUrl, format, (pageWidth - width) / 2, (pageHeight - height) / 2, width, height);
  return doc;
};

const buildFallbackPdf = (fileName) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Syllabus document", 20, 25);
  doc.setFontSize(11);
  doc.text(`Original file: ${fileName}`, 20, 40);
  doc.text(
    doc.splitTextToSize(
      "This file type couldn't be automatically converted to PDF in the browser. For best results, " +
        "save it as a PDF yourself (e.g. “Export as PDF” / “Print to PDF”) and upload that instead.",
      170,
    ),
    20,
    52,
  );
  return doc;
};

// Resolves to { dataUrl, fileName, converted } — converted is true when the
// original wasn't already a PDF, so the caller can tell the teacher what
// happened.
export const prepareSyllabusPdf = async (file) => {
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error("That file is too large (max 5MB).");
  }

  if (file.type === "application/pdf") {
    const dataUrl = await readAsDataUrl(file);
    return { dataUrl, fileName: file.name, converted: false };
  }

  if (file.type.startsWith("image/")) {
    const sourceDataUrl = await readAsDataUrl(file);
    const doc = await buildImagePdf(sourceDataUrl);
    return { dataUrl: doc.output("datauristring"), fileName: renameToPdf(file.name), converted: true };
  }

  const doc = buildFallbackPdf(file.name);
  return { dataUrl: doc.output("datauristring"), fileName: renameToPdf(file.name), converted: true };
};
