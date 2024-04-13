from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import tempfile
from collections import Counter

app = Flask(__name__)
CORS(app)

model_path = 'D:\\s0cketXL\\survillence\\backend\\model.keras'
model = load_model(model_path)
print("Model loaded successfully.")

categories_labels = {
    0: 'AnomalySamples',
    1: 'NormalVideos'
}

@app.route('/predict_video', methods=['POST'])
def predict_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video part'}), 400
    
    video_file = request.files['video']
    temp_dir = tempfile.TemporaryDirectory()
    video_path = f"{temp_dir.name}/video.webm"
    video_file.save(video_path)

    prediction_summary, predictions_per_second = process_video_and_predict(video_path)
    temp_dir.cleanup()
    
    return jsonify({
        'most_common_prediction': prediction_summary,
        'predictions_per_second': predictions_per_second
    })

def process_video_and_predict(video_path):
    cap = cv2.VideoCapture(video_path)
    predictions = []
    frames_cnn = []
    frames_lstm = []
    fps = cap.get(cv2.CAP_PROP_FPS)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        resized_frame = cv2.resize(gray_frame, (50, 50))
        frames_cnn.append(resized_frame.reshape(50, 50, 1))
        frames_lstm.append(resized_frame.flatten())

    # Release the video capture object
    cap.release()

    frames_cnn = np.array(frames_cnn)
    frames_lstm = np.array(frames_lstm).reshape(-1, 2500, 1)  # Assuming LSTM expects 2500 features per timestep

    # Ensure there's at least one frame to predict
    if len(frames_cnn) > 0:
        predictions = model.predict([frames_cnn, frames_lstm])
        predicted_classes = np.argmax(predictions, axis=1)

        most_common_pred = Counter(predicted_classes).most_common(1)[0][0]
        prediction_summary = categories_labels[most_common_pred]

        predictions_per_second = [{
            'second': i // fps,
            'prediction': categories_labels[pred]
        } for i, pred in enumerate(predicted_classes)]

        return prediction_summary, predictions_per_second
    else:
        return "No frames to predict", {}

if __name__ == "__main__":
    app.run(debug=True)
