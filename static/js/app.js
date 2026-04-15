document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const predictBtn = document.getElementById('predictBtn');
    const uploadForm = document.getElementById('uploadForm');
    const resultArea = document.getElementById('resultArea');
    const resultValue = document.getElementById('resultValue');
    const modelInfo = document.getElementById('modelInfo');
    const loadingArea = document.getElementById('loadingArea');

    // Handle Drag & Drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
            // Manually set input file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(e.dataTransfer.files[0]);
            fileInput.files = dataTransfer.files;
        }
    });

    // Handle Click
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            handleFile(this.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            uploadPlaceholder.classList.add('hidden');
            predictBtn.disabled = false;
            
            // Hide previous results
            resultArea.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    // Handle Form Submit
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const file = fileInput.files[0];
        if (!file) return;

        const modelChoice = document.getElementById('modelChoice').value;
        const modelName = document.getElementById('modelChoice').options[document.getElementById('modelChoice').selectedIndex].text;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('model', modelChoice);

        // Show loading state
        predictBtn.disabled = true;
        resultArea.classList.add('hidden');
        loadingArea.classList.remove('hidden');

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Server error');
            }

            // Display results
            resultValue.textContent = data.prediction;
            modelInfo.textContent = `Predicted by: ${modelName}`;
            
            resultValue.style.color = 'var(--success-color)';
            resultArea.classList.remove('hidden');

        } catch (error) {
            console.error('Error:', error);
            resultValue.textContent = 'Error';
            modelInfo.textContent = error.message;
            resultValue.style.color = 'var(--error-color)';
            resultArea.classList.remove('hidden');
        } finally {
            loadingArea.classList.add('hidden');
            predictBtn.disabled = false;
        }
    });
});
