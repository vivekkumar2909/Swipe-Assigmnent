import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function parsePDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ");
    }
    return extractFields(text);
}

export async function parseDOCX(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return extractFields(result.value);
}

function extractFields(text) {
    const nameMatch = text.match(/Name[:\-]?\s*(\w+\s\w+)/i);
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i);
    const phoneMatch = text.match(/\+?\d{10,14}/);
    return {
        name: nameMatch ? nameMatch[1] : "",
        email: emailMatch ? emailMatch[0] : "",
        phone: phoneMatch ? phoneMatch[0] : "",
    };
}
