import os
import cv2
from tqdm import tqdm
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from tensorflow.keras.utils import to_categorical, plot_model
from tensorflow.keras.models import Sequential, Model, load_model
from tensorflow.keras.layers import (
    Dense, Dropout, Flatten, Conv2D, MaxPooling2D, LeakyReLU, LSTM, Input, concatenate
)
from tensorflow.keras.callbacks import ModelCheckpoint, CSVLogger
import time

# Paths setup
test_dir = './Test'
train_dir = './Train'
output_dir = './output'

os.makedirs(output_dir, exist_ok=True)

# Categories definition
categories_labels = {
    'Abuse': 0, 'Arrest': 1, 'Arson': 2,
    'Assault': 3, 'Burglary': 4, 'Explosion': 5,
    'Fighting': 6, 'NormalVideos': 7, 'RoadAccidents': 8,
    'Robbery': 9, 'Shooting': 10, 'Shoplifting': 11,
    'Stealing': 12, 'Vandalism': 13
}

def load_data(base_dir, categories_labels):
    data = []
    for category, label in categories_labels.items():
        path = os.path.join(base_dir, category)
        if os.path.isdir(path):
            for file in tqdm(os.listdir(path), desc=f"Loading {category}"):
                if file.endswith(".jpg") or file.endswith(".png"):
                    img_path = os.path.join(path, file)
                    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
                    if img is not None:  # Check that the image is not empty
                        img = cv2.resize(img, (50, 50))
                        img = np.expand_dims(img, axis=-1)
                        data.append([img, label])
                    else:
                        print(f"Unable to load image at {img_path}")
    return data


train_data = load_data(train_dir, categories_labels)
test_data = load_data(test_dir, categories_labels)

total_data = train_data + test_data
images = np.array([i[0] for i in total_data])
labels = np.array([i[1] for i in total_data])

# Reshape for LSTM
images_lstm = images.reshape(images.shape[0], -1, 1)

# Split data
X_train_cnn, X_test_cnn, y_train_cnn, y_test_cnn = train_test_split(images, labels, test_size=0.2, random_state=42)
X_train_lstm, X_test_lstm, y_train_lstm, y_test_lstm = train_test_split(images_lstm, labels, test_size=0.2, random_state=42)

y_train_cnn = to_categorical(y_train_cnn, num_classes=len(categories_labels))
y_test_cnn = to_categorical(y_test_cnn, num_classes=len(categories_labels))

# CNN Model
input_cnn = Input(shape=(50, 50, 1))
x = Conv2D(32, (3, 3), activation='relu')(input_cnn)
x = MaxPooling2D((2, 2))(x)
x = Flatten()(x)
x = Dense(64, activation='relu')(x)
cnn_out = Model(inputs=input_cnn, outputs=x)

# LSTM Model
input_lstm = Input(shape=(2500, 1))
y = LSTM(64, return_sequences=True)(input_lstm)
y = LSTM(32)(y)
y = Dense(16, activation='relu')(y)
lstm_out = Model(inputs=input_lstm, outputs=y)

# Combined Model
combinedInput = concatenate([cnn_out.output, lstm_out.output])
z = Dense(len(categories_labels), activation="softmax")(combinedInput)
model = Model(inputs=[cnn_out.input, lstm_out.input], outputs=z)

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Callbacks
checkpoint = ModelCheckpoint(filepath=os.path.join(output_dir, 'model.keras'), save_best_only=True, monitor='val_loss', mode='min')
csv_logger = CSVLogger(os.path.join(output_dir, 'training_log.csv'))

# Training
history = model.fit(
    [X_train_cnn, X_train_lstm],
    y_train_cnn,
    validation_data=([X_test_cnn, X_test_lstm], y_test_cnn),
    epochs=5,  # Change epochs back to a higher number for actual training
    batch_size=64,
    callbacks=[checkpoint, csv_logger]
)

# Corrected section for plotting
epochs_range = range(1, len(history.history['accuracy']) + 1)

plt.figure(figsize=(14, 5))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, history.history['accuracy'], label='Training Accuracy')
plt.plot(epochs_range, history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Training and Validation Accuracy')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(epochs_range, history.history['loss'], label='Training Loss')
plt.plot(epochs_range, history.history['val_loss'], label='Validation Loss')
plt.title('Training and Validation Loss')
plt.legend()
plt.show()
