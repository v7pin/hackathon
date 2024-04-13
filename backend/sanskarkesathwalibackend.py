from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

model_path = r'D:\s0cketXL\survillence\backend\model.keras'
model = load_model(model_path)
print("Model loaded successfully.")

categories_labels = {
    0: 'AnomalySamples',
    1: 'NormalVideos'
}

@app.route('/predict', methods=['POST'])
def predict():
    if 'frame' not in request.files:
        return jsonify({'error': 'No frame provided'}), 400
    
    frame = request.files['frame'].read()
    image = preprocess_image(frame, target_size=(50, 50))

    # Since we're simplifying, we only prepare one frame at a time
    cnn_input = image.reshape(-1, 50, 50, 1)  # Reshape for CNN input
    lstm_input = image.flatten().reshape(1, -1, 1)  # Flatten and reshape for LSTM input

    prediction = model.predict([cnn_input, lstm_input])
    predicted_class = np.argmax(prediction, axis=1)[0]
    predicted_label = categories_labels[predicted_class]

    return jsonify({'prediction': predicted_label})

def preprocess_image(image_bytes, target_size):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(target_size)
    image = np.array(image).astype(np.float32) / 255.0
    image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    return image.reshape(target_size[0], target_size[1], 1)

if __name__ == "__main__":
    app.run(debug=True)
