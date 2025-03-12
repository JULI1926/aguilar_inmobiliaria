const selectedFiles = [];

document.getElementById('img').addEventListener('change', function (event) {
  const files = event.target.files;
  const previewContainer = document.getElementById('image-preview');
  previewContainer.innerHTML = ''; // Clear previous previews

  if (files) {
    Array.from(files).forEach((file, index) => {
      selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.style.maxWidth = '150px';
        imgElement.style.margin = '10px';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.display = 'block';
        removeButton.onclick = function () {
          selectedFiles.splice(index, 1);
          updateFileInput();
          previewContainer.removeChild(imgElement);
          previewContainer.removeChild(removeButton);
        };

        previewContainer.appendChild(imgElement);
        previewContainer.appendChild(removeButton);
      };
      reader.readAsDataURL(file);
    });
  }

  updateFileInput();
});

function updateFileInput() {
  const dataTransfer = new DataTransfer();
  selectedFiles.forEach(file => dataTransfer.items.add(file));
  document.getElementById('img').files = dataTransfer.files;
}