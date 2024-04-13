import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

categories_labels = {
    0: 'Abuse', 1: 'Arrest', 2: 'Arson',
    3: 'Assault', 4: 'Burglary', 5: 'Explosion',
    6: 'Fighting', 7: 'NormalVideos', 8: 'RoadAccidents',
    9: 'Robbery', 10: 'Shooting', 11: 'Shoplifting',
    12: 'Stealing', 13: 'Vandalism'
}

def extract_frames(video_path, size=(50, 50), frame_step=1):
    """
    Extracts frames from a video file.
    
    :param video_path: Path to the video file.
    :param size: The target size of frames as a tuple (width, height).
    :param frame_step: Interval between frames to capture. Smaller values increase the number of frames.
    """
    cap = cv2.VideoCapture(video_path)
    frames = []
    frame_id = 0  # Frame counter

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if frame_id % frame_step == 0:  # Capture frames based on the interval
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            resized_frame = cv2.resize(gray_frame, size)
            frames.append(resized_frame)
        frame_id += 1

    cap.release()
    return np.array(frames)


def preprocess_frames(frames):
    frames_cnn = frames.reshape(frames.shape[0], 50, 50, 1)
    frames_lstm = frames.reshape(frames.shape[0], -1, 1)
    return frames_cnn, frames_lstm

def predict_video(model, frames_cnn, frames_lstm):
    if len(frames_cnn) == 0 or len(frames_lstm) == 0:
        print("No frames to predict.")
        return None

    predictions = model.predict([frames_cnn, frames_lstm])
    predicted_classes = np.argmax(predictions, axis=1)

    # Determine the frequency of each predicted class
    unique, counts = np.unique(predicted_classes, return_counts=True)
    frequencies = dict(zip(unique, counts))
    
    # Print out the frequency of each category
    print("Category frequencies:")
    for index, freq in frequencies.items():
        category = categories_labels.get(index, "Unknown Category")
        print(f"{category}: {freq}")

    # Find the most frequent class, considering the condition for 'NormalVideos'
    most_common = sorted(frequencies.items(), key=lambda x: x[1], reverse=True)
    
    # Initialize variables to track the most frequent non-normal category and its frequency
    non_normal_most_common = None
    non_normal_freq = 0
    
    for index, freq in most_common:
        # Find the most frequent non-normal category
        if index != 7:  # Skip 'NormalVideos'
            non_normal_most_common = index
            non_normal_freq = freq
            break
    
    # Decide the final prediction based on the frequency condition
    if non_normal_most_common is not None and non_normal_freq > 200:
        video_prediction = non_normal_most_common
    else:
        # If no non-normal category meets the condition, default to 'NormalVideos' if it's in the predictions
        video_prediction = 7 if 7 in frequencies else non_normal_most_common

    if video_prediction is None:
        print("Unable to make a prediction.")
        return None

    predicted_category = categories_labels.get(video_prediction, "Unknown Category")
    print(f'\nPredicted category index: {video_prediction}')
    print(f'Predicted category: {predicted_category} ({frequencies.get(video_prediction, 0)} times)')
    return video_prediction

@app.route('/classify-video', methods=['POST'])
def classify_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file uploaded'}), 400
    
    video_file = request.files['video']
    
    # Load your pre-trained Keras model
    model_path = './output/model.keras'  # Update this with your model file path
    model = load_model(model_path)
    print("Model loaded successfully.")
    
    # Save the uploaded video file temporarily
    video_path = 'temp_video.mp4'
    video_file.save(video_path)
    
    # Extract frames from the uploaded video
    frames = extract_frames(video_path)
    
    # Preprocess frames
    frames_cnn, frames_lstm = preprocess_frames(frames)
    
    # Get predicted category index
    predicted_category_index = predict_video(model, frames_cnn, frames_lstm)

    
    
    # Remove the temporary video file
    os.remove(video_path)
    
    if predicted_category_index is not None:
        predicted_category = categories_labels.get(predicted_category_index, "Unknown")
        return jsonify({'predicted_category': predicted_category}), 200
    else:
        return jsonify({'error': 'Failed to process video'}), 500

@app.errorhandler(500)
def internal_server_error(e):
    return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == "__main__":
    app.run(debug=True)