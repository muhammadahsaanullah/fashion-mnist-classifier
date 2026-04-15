import os
import joblib
import numpy as np
from flask import Flask, render_template, request, jsonify
from PIL import Image, ImageOps

app = Flask(__name__)

# Load models
# We wrap this in try-except in case the files are moved or missing
models = {}
try:
    models['knn'] = joblib.load('knn_model.pkl')
    models['dt'] = joblib.load('dt_model.pkl')
    models['nb'] = joblib.load('nb_model.pkl')
    print("Models loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")

# Fashion MNIST Class Names
CLASS_NAMES = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat', 'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

def preprocess_image(file):
    # Open image and convert to grayscale
    img = Image.open(file).convert('L')
    
    # Resize to 28x28 (Fashion MNIST shape)
    img = img.resize((28, 28))
    
    # Check if we need to invert colors
    # Fashion MNIST expects black background and white item.
    # Most user uploads will be on a white background.
    # If the corners (background) are mostly white, we invert.
    img_array_temp = np.array(img)
    corners = [
        img_array_temp[0, 0], img_array_temp[0, -1],
        img_array_temp[-1, 0], img_array_temp[-1, -1]
    ]
    if np.mean(corners) > 127:
        img = ImageOps.invert(img)
    
    # Convert back to array after possible inversion
    img_array = np.array(img)
    
    # Flatten and normalize
    img_flat = img_array.reshape(1, 28 * 28).astype('float32') / 255.0
    
    return img_flat

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    model_choice = request.form.get('model', 'knn')
    
    if model_choice not in models or models[model_choice] is None:
        return jsonify({'error': 'Selected model is not available'}), 400
        
    try:
        # Preprocess the image
        img_processed = preprocess_image(file)
        
        # Predict
        prediction = models[model_choice].predict(img_processed)
        class_index = int(prediction[0])
        class_name = CLASS_NAMES[class_index]
        
        return jsonify({
            'success': True,
            'prediction': class_name,
            'model_used': model_choice
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
