# KraftChat - A React Native Chat Application

KraftChat is a mobile chat application built using React Native, Firebase, and Expo. The app enables real-time chat functionality with support for text, images, and location sharing. It uses Firebase for user authentication, Firestore for data storage, and Firebase Storage for uploading and storing media files like images. The app also caches messages locally when offline and restores them when the user is back online.

## Project Overview

This project is a mobile chat application built using **React Native**. The app allows users to exchange messages, share images, and send their current location. It also offers offline message storage and accessibility features.

The app is developed using **React Native** and **Expo**, with **Google Firestore** for storing chat messages and **Firebase Cloud Storage** for image uploads.

---

## Key Features

- **Anonymous User Authentication**: Users are signed in anonymously using Firebase Authentication.
- **Real-Time Messaging**: Messages are synced in real-time using Firebase Firestore.
- **Offline Support**: Messages are cached locally using AsyncStorage, allowing users to view them even without an internet connection.
- **Image and Location Sharing**: Users can send images from their gallery or camera and share their current location.
- **Customizable Chat Background**: Users can choose a chat background color on the start screen.
- **Cross-Platform**: Built using React Native, the app works on both iOS and Android.

---

## User Stories

- As a new user, I want to easily join a chat room to start chatting with friends and family.
- As a user, I want to send messages, images, and my location.
- As a user, I want to view messages offline.
- As a user with a visual impairment, I want the app to be screen reader-compatible.

---

## Technologies Used

- **React Native**: Frontend/UI framework for building cross-platform mobile applications.
- **Expo**: Open-source platform for developing and testing universal native apps for Android, iOS and the web with JavaScript and React.
- **Firebase**: Backend-as-a-Service (BaaS) platform providing user authentication, database, and storage.

### Firebase Services

- **Firebase Authentication**: Used for anonymous user sign-in.
- **Firestore**: Used for real-time storage and syncing of chat messages.
- **Firebase Storage**: Used for storing and retrieving uploaded images.

### Libraries & Modules

- **react-native-gifted-chat**: A customizable chat UI component library for React Native.
- **react-native-maps**: Used for displaying shared location data in messages.
- **expo-image-picker**: Used for selecting images from the gallery or taking new photos.
- **expo-location**: Used for retrieving the user's current location.
- **@react-native-async-storage/async-storage**: Used for caching messages when the user is offline.
- **@react-native-community/netinfo**: Detects the device's network connection status.
- **expo-font**: Loads custom fonts (Poppins) for the app's UI.
- **firebase**: Firebase SDK for interacting with Firebase services.

## Development Environment

### Prerequisites

- **Node.js** installed on your machine.
- **Expo CLI** installed globally (`npm install -g expo-cli`).
- **Firebase Account**: For setting up Firestore, Authentication and Cloud Storage.
- **Android Studio**: To run the app on an Android emulator
- **Xcode** (macOS only): To run the app on an iOS simulator
- **Expo Go** To run the app on an physical device (installed on device)

### Installation & Setup

#### 1. Clone the repository

Run the following command:

```bash
git clone https://github.com/TK1893/kraft-chat.git
cd kraft-chat
```

#### 2. Install required dependencies

Run the following command:

```bash
npm install
```

#### 3. Set up Firebase

- Create a Firebase project and enable Firestore, Firebase Authentication (Anonymous), and Firebase Storage.
- Update the firebase.js file with your Firebase project configuration.

#### 4. Run the app

Run the following command:

```bash
npx expo start
```

##### `on Android Studio (Emulator)`

Run the following command:

```bash
npx expo start --android
```

##### `on Xcode (Simulator)`

Run the following command:

```bash
npx expo start --ios
```

##### `on a physical device`

Open the app directly with Expo Go.

---

## App Structure

Here is an overview of the app’s components and functionality:

### `App.js`

- **Purpose**: The entry point of the app.
- **Functionality**:
  - Initializes Firebase services (Authentication, Firestore, Storage).
  - Manages global app state (like connection status and font loading).
  - Sets up navigation between the `Start` and `Chat` screens.

### `components/Start.js`

- **Purpose**: The app’s landing screen where users enter their name and select a background color.
- **Functionality**:
  - Allows users to input their name.
  - Lets users choose a background color for the chat screen.
  - Signs in the user anonymously using Firebase Authentication.
  - Navigates to the `Chat` screen with the provided details.

### `components/Chat.js`

- **Purpose**: The main chat interface where users can send and receive messages.
- **Functionality**:
  - Displays messages in real-time using Firebase Firestore.
  - Caches messages locally using AsyncStorage when offline.
  - Renders a map view for location messages and displays images when sent.
  - Includes custom chat bubbles and input toolbar.
  - Implements sending text, images, and location.

### `components/CustomActions.js`

- **Purpose**: Custom component for additional chat actions (e.g., sending images or location).
- **Functionality**:
  - Presents an action sheet with options for sending a photo from the gallery, taking a photo, or sharing the current location.
  - Handles permissions for accessing the camera, gallery, and location.
  - Uploads selected images to Firebase Storage and sends the image URL in the chat.

### `firebase.js`

- **Purpose**: Initializes Firebase services.
- **Functionality**:
  - Exports initialized instances of Firebase Authentication, Firestore, and Firebase Storage.

## File Structure

```bash
KRAFT-CHAT
├── App.js
├── app.json
├── babel.config.js
├── firebase.js
├── package-lock.json
├── package.json
├── README.md
├── assets
     ├── fonts
     └── images
├── components
     ├── Chat.js
     ├── CustomActions.js
     └── Start.js
```
