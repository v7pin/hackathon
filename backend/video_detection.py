import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Define category labels with correct indexing
categories_labels = {
    0: 'Abuse', 1: 'Arrest', 2: 'Arson',
    3: 'Assault', 4: 'Burglary', 5: 'Explosion',
    6: 'Fighting', 7: 'NormalVideos', 8: 'RoadAccidents',
    9: 'Robbery', 10: 'Shooting', 11: 'Shoplifting',
    12: 'Stealing', 13: 'Vandalism'
}

def extract_frames(video_path, size=(50, 50)):
    cap = cv2.VideoCapture(video_path)
    frames = []
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        resized_frame = cv2.resize(gray_frame, size)
        frames.append(resized_frame)
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
    print("Predicted class frequencies:", frequencies)

    # Find the most frequent class that is not 'NormalVideos' (index 7)
    most_common = sorted(frequencies.items(), key=lambda x: x[1], reverse=True)
    non_normal_most_common = next(((index, freq) for index, freq in most_common if index != 7), None)

    if non_normal_most_common is not None:
        video_prediction = non_normal_most_common[0]
    else:
        print("No non-'NormalVideos' predictions made.")
        return None

    predicted_category = categories_labels.get(video_prediction, "Unknown Category")
    print(f'Predicted category index: {video_prediction}')
    print(f'Predicted category: {predicted_category}')
    return video_prediction



def main(video_path, model_path):
    model = load_model(model_path)
    frames = extract_frames(video_path)
    frames_cnn, frames_lstm = preprocess_frames(frames)
    video_prediction = predict_video(model, frames_cnn, frames_lstm)

    if video_prediction is not None and video_prediction in categories_labels:
        predicted_category = categories_labels[video_prediction]
        print(f'Predicted category index: {video_prediction}')
        print(f'Predicted category: {predicted_category}')
    else:
        print("Unable to make a prediction or invalid video prediction index.")

if __name__ == "__main__":
    VIDEO_PATH = './testvideos/CCTV2.mp4'  # Specify your video path
    MODEL_PATH = '../output/model.keras'  # Specify the path to your model
    main(VIDEO_PATH, MODEL_PATH)
