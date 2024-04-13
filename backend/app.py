from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
from collections import deque

app = Flask(__name__)
CORS(app)

model_path = r'D:\s0cketXL\survillence\backend\output\model.keras'
model = load_model(model_path)
print("Model loaded successfully.")

categories_labels = {
    0: 'Abuse', 1: 'Arrest', 2: 'Arson',
    3: 'Assault', 4: 'Burglary', 5: 'Explosion',
    6: 'Fighting', 7: 'NormalVideos', 8: 'RoadAccidents',
    9: 'Robbery', 10: 'Shooting', 11: 'Shoplifting',
    12: 'Stealing', 13: 'Vandalism'
}

# Assuming LSTM expects sequences of 50 frames, each frame being a flattened grayscale image of shape (2500, 1)
sequence_length = 50
frame_queue = deque(maxlen=sequence_length)  # Queue to store the last N frames

@app.route('/predict', methods=['POST'])
def predict():
    if 'frame' not in request.files:
        return jsonify({'error': 'No frame provided'}), 400
    
    frame = request.files['frame'].read()
    image = preprocess_image(frame, target_size=(50, 50))
    
    # CNN input
    cnn_input = image.reshape((1, 50, 50, 1))
    
    # Correct LSTM input preparation
    # Assuming each frame should be treated as a sequence of 2500 timesteps, each with 1 feature
    lstm_input = image.reshape(-1).reshape((1, 2500, 1))  # Flatten the image and reshape to (1, 2500, 1)

    predictions = model.predict([cnn_input, lstm_input])
    predicted_class_indices = np.argmax(predictions, axis=1)
    predicted_class = predicted_class_indices[0]
    predicted_label = categories_labels[predicted_class]

    return jsonify({'prediction': predicted_label})


def preprocess_image(image_bytes, target_size):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(target_size)
    image = np.array(image).astype(np.float32) / 255.0
    image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    return image.reshape(target_size + (1,))

if __name__ == "__main__":
    app.run(debug=True)
