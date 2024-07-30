const gallery = document.getElementById('gallery');
const assetsFolder = './';

fetch(assetsFolder)
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const images = doc.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"]');

        images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.getAttribute('href');
            gallery.appendChild(img);
        });
    })
    .catch(error => console.error('Lỗi:', error));
