const dropArea = document.querySelector('.drop-area');
const inputFile = document.getElementById('input-file');
const imgView = document.getElementById('img-view');

dropArea.addEventListener('click', () => inputFile.click());

inputFile.addEventListener('change', handleFiles);

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener('drop', handleDrop, false);
dropArea.addEventListener('paste', handlePaste, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles({ target: { files } });
}

function handleFiles(e) {
    const files = e.target.files;
    if (files.length > 0) {
        const file = files[0];
        const imgLink = URL.createObjectURL(file);
        imgView.style.backgroundImage = `url(${imgLink})`;
        imgView.innerHTML = ''; // Clear the inner HTML to remove the icon and text
    }
}

function handlePaste(e) {
    const items = e.clipboardData.items;
    for (let item of items) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            const imgLink = URL.createObjectURL(file);
            imgView.style.backgroundImage = `url(${imgLink})`;
            imgView.innerHTML = ''; // Clear the inner HTML to remove the icon and text
            break; // We only handle the first image found
        }
    }
}
