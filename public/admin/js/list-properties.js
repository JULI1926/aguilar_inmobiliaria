const selectedFiles = [];

document.getElementById('img').addEventListener('change', function (event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('image-preview');

    if (files) {
        Array.from(files).forEach(file => {
            selectedFiles.push(file);

            const reader = new FileReader();
            reader.onload = function (e) {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.style.maxWidth = '150px';
                imgElement.style.margin = '10px';
                previewContainer.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        });
    }

    // Update the input element with the selected files
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach(file => dataTransfer.items.add(file));
    document.getElementById('img').files = dataTransfer.files;
});