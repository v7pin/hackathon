import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os

# Define category labels with correct indexing
categories_labels = {
    'AnomalySamples': 0,
    'NormalVideos': 1
}

def extract_frames(video_path, size=(50, 50), frame_interval=1):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)  # Frames per second
    frames = []
    timestamps = []  # To keep track of each frame's timestamp
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % int(fps * frame_interval) == 0:  # Extract frame at specific interval
            timestamp = frame_count / fps  # Calculate the timestamp
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            resized_frame = cv2.resize(gray_frame, size)
            frames.append(resized_frame)
            timestamps.append(timestamp)
        frame_count += 1
    cap.release()
    return np.array(frames), np.array(timestamps)

def preprocess_frames(frames):
    frames_cnn = frames.reshape(frames.shape[0], 50, 50, 1)
    frames_lstm = frames.reshape(frames.shape[0], -1, 1)
    return frames_cnn, frames_lstm

def predict_video(model, frames_cnn, frames_lstm, timestamps):
    if len(frames_cnn) == 0 or len(frames_lstm) == 0:
        print("No frames to predict.")
        return None

    predictions = model.predict([frames_cnn, frames_lstm])
    predicted_classes = np.argmax(predictions, axis=1)
    
    # Initialize a dictionary to count occurrences of each category
    category_count = {category: 0 for category in categories_labels}

    for i, prediction in enumerate(predicted_classes):
        predicted_category = next((category for category, index in categories_labels.items() if index == prediction), "Unknown Category")
        category_count[predicted_category] += 1  # Increment the count for the predicted category
        print(f"Timestamp: {timestamps[i]:.2f} seconds, Predicted category: {predicted_category}")

    return category_count

def main(video_path, model_path, frame_interval):
    # Check if the model file exists before trying to load it
    if not os.path.exists(model_path):
        print(f"Model file not found at {model_path}. Please check the file path.")
        return
    
    try:
        model = load_model(model_path)
    except Exception as e:
        print(f"An error occurred while loading the model: {e}")
        return

    # Continue with the rest of your code if the model is loaded successfully
    frames, timestamps = extract_frames(video_path, frame_interval=frame_interval)
    if frames.size == 0:
        print("No frames extracted.")
        return
    frames_cnn, frames_lstm = preprocess_frames(frames)
    category_count = predict_video(model, frames_cnn, frames_lstm, timestamps)
    if category_count:
        print("Summary of Predicted Categories:")
        for category, count in category_count.items():
            print(f"{category}: {count}")

if __name__ == "__main__":
    VIDEO_PATH = './testvideos/CCTV5.mp4'  # Update this with your video file path
    MODEL_PATH = './model.keras'  # Specify the path to your model here
    FRAME_INTERVAL = 1  # Extract one frame every second
    main(VIDEO_PATH, MODEL_PATH, FRAME_INTERVAL)