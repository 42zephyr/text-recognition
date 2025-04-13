import Tesseract from 'https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/+esm';

const image = document.getElementById('image');
const result = document.getElementById('result');
const extractBtn = document.getElementById('extract-btn');
let uploadedImage;
let resultedText;
window.previewImage = function (event) {
  const file = event.target.files[0];
  if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 2 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = () => {
      image.src = reader.result;
      uploadedImage = file;
      extractBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}}

window.extractText = async function () {
  if (uploadedImage) {
    const { data: { text } } = await Tesseract.recognize(uploadedImage, 'eng');
    console.log(text);
    resultedText=text;
    result.textContent = text;
  }
}
window.copyText = async function () {
  if (resultedText) {
    navigator.clipboard.writeText(resultedText);  }
}