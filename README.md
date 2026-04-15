# 👕 Fashion MNIST Web Classifier

![GitHub](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/framework-Flask-black)

A highly modern, premium Flask web application that predicts clothing categories from the Fashion MNIST dataset. It features an interactive drag-and-drop interface, allowing end-users to evaluate images using three classic Machine Learning models: **K-Nearest Neighbors (KNN)**, **Decision Tree**, and **Naive Bayes**.

---

## 🚀 Features
- **Sleek Interface**: A simple, intuitive dark mode UI built with custom CSS.
- **Asynchronous Predictions**: Image processing requests are handled dynamically via fetch APIs without page reloads.
- **Image Preprocessing Pipeline**: Automatically processes internet-downloaded images by resizing them to 28x28, applying grayscaling, and intelligently inverting backgrounds prior to flattening and Normalization.

---

## 🛠️ Step 1: Downloading the Project

To grab a local copy of this repository, open your terminal/command prompt and clone it:

```bash
git clone https://github.com/muhammadahsaanullah/fashion-mnist-classifier.git
cd fashion-mnist-classifier
```

---

## 🧠 Step 2: Generating the Machine Learning Models

> **Note:** The compiled machine learning models (`.pkl` files) are too large to be directly hosted on GitHub (e.g., the KNN model is ~188MB). You will need to regenerate them locally before running the app.

1. Open the included `notebook.ipynb` notebook using **Jupyter Notebook**, **JupyterLab**, or an IDE like **VS Code**.
2. Run all the original cells to load the Fashion MNIST dataset and successfully train the `knn_model`, `dt_model`, and `nb_model`.
3. Create a **new code cell** at the very bottom of the notebook and paste the following Python code to save the models to disk:
   ```python
   import joblib

   joblib.dump(knn_model, 'knn_model.pkl')
   joblib.dump(dt_model, 'dt_model.pkl')
   joblib.dump(nb_model, 'nb_model.pkl')
   
   print("Models saved successfully!")
   ```
4. Run that cell! You should now see three new `.pkl` files generated inside your project’s root folder.

---

## 💻 Step 3: Setting Up the Virtual Environment

It is best practice to install the requirements in an isolated Virtual Environment so they don't conflict with your global Python system.

**1. Create the Environment**
```bash
python -m venv venv
```

**2. Activate the Environment**
- **Windows (Command Prompt):**
  ```cmd
  venv\Scripts\activate
  ```
- **Windows (PowerShell):**
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
- **Mac/Linux:**
  ```bash
  source venv/bin/activate
  ```

**3. Install Dependencies**
With your environment active (you will see `(venv)` in your terminal), install the needed packages:
```bash
pip install -r requirements.txt
```

---

## 🌐 Step 4: Running the App

1. Ensure your virtual environment is activated and your three `.pkl` files are present in the folder.
2. Start the Flask server:
```bash
python app.py
```
3. Open your web browser and navigate to:
**[http://127.0.0.1:5000](http://127.0.0.1:5000)**

### How to Use the Interface:
- Find any image of an isolated piece of clothing online (preferably shirts, trousers, pullovers, dresses, coats, sandals, sneakers, bags, or ankle boots).
- Download and drop the image directly onto the Upload Box.
- Click **"Select Model"** to choose which algorithm should make the guess.
- Press **"Predict Image"**. The results will appear instantly!
