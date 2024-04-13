import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Define categories for predictions
categories_labels = {
    0: 'Abuse', 1: 'Arrest', 2: 'Arson',
    3: 'Assault', 4: 'Burglary', 5: 'Explosion',
    6: 'Fighting', 7: 'NormalVideos', 8: 'RoadAccidents',
    9: 'Robbery', 10: 'Shooting', 11: 'Shoplifting',
    12: 'Stealing', 13: 'Vandalism'
}

# Load your model
model_path = './output/model.keras'  # Update this with your actual model file path
model = load_model(model_path)

def preprocess_frame(frame, size=(50, 50)):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    resized_frame = cv2.resize(gray_frame, size)
    return np.array(resized_frame)

def preprocess_frames(frames):
    frames_cnn = frames.reshape(-1, 50, 50, 1)  # Correctly reshape to have a single color channel

    # Assuming frames_lstm needs to maintain its original reshaping logic
    frames_lstm = frames.reshape(1, frames.shape[0], -1)  # Keep as is, assuming it's correct for your LSTM component
    
    return frames_cnn, frames_lstm
   

def predict_video(model, frames_cnn, frames_lstm):
    predictions = model.predict([frames_cnn, frames_lstm])  # Removed np.array wrapping which was redundant and potentially misshaping
    predicted_class = np.argmax(predictions, axis=1)[0]
    predicted_category = categories_labels.get(predicted_class, "Unknown Category")
    print(f"Predicted category: {predicted_category}")
    return predicted_category

def capture_and_analyze():
    cap = cv2.VideoCapture(0)  # 0 for the default camera

    if not cap.isOpened():
        print("Error: Could not open camera.")
        return

    frames = []
    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

        # Process every Nth frame to maintain performance
        if frame_count % 10 == 0:
            processed_frame = preprocess_frame(frame)
            frames.append(processed_frame)
            
            if len(frames) == 30:  # Assuming we want to predict every 30 frames
                frames_cnn, frames_lstm = preprocess_frames(np.array(frames))
                predict_video(model, frames_cnn, frames_lstm)
                frames = []  # Reset frames list for next batch

        frame_count += 1

        # Display the resulting frame
        cv2.imshow('Live', frame)

        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    capture_and_analyze()
