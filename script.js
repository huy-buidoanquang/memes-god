const gallery = document.getElementById('gallery');
const tooltip = createTooltip();

fetchAndRenderImages();

async function fetchAndRenderImages() {
  try {
    const response = await fetch('./images.json');
    const images = await response.json();
    images.forEach(createAndAppendImage);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
}

function createTooltip() {
  const tooltip = document.createElement('div');
  tooltip.id = 'tooltip';
  document.body.appendChild(tooltip);
  return tooltip;
}

function createAndAppendImage(image) {
  const img = document.createElement('img');
  img.src = image.src;
  img.addEventListener('click', handleImageClick);
  gallery.appendChild(img);
}

async function handleImageClick(event) {
  try {
    await copyImageToClipboard(event.target);
    showTooltip(event);
  } catch (err) {
    console.error('Error handling image click:', err);
  }
}

async function copyImageToClipboard(img) {
  const canvas = createResizedCanvas(img, 250, 250);
  const blob = await canvasToBlob(canvas);
  await navigator.clipboard.write([
    new ClipboardItem({ [blob.type]: blob })
  ]);
}

function createResizedCanvas(img, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

function canvasToBlob(canvas) {
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

function showTooltip(event) {
  const { clientX: x, clientY: y } = event;
  Object.assign(tooltip.style, {
    top: `${y + 10}px`,
    left: `${x + 10}px`
  });
  tooltip.textContent = 'Dùng moẹ đi!';
  tooltip.classList.add('show');
  setTimeout(() => tooltip.classList.remove('show'), 1500);
}