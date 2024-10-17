# React Native Chat App

## Project Overview

This project is a mobile chat application built using **React Native**. The app allows users to exchange messages, share images, and send their current location. It also offers offline message storage and accessibility features.

The app is developed using **React Native** and **Expo**, with **Google Firestore** for storing chat messages and **Firebase Cloud Storage** for image uploads.

---

## Features

- **Anonymous User Authentication**: Users can join the chat anonymously via Firebase.
- **Real-Time Messaging**: Users can exchange text messages in real-time.
- **Image Sharing**: Users can select images from their gallery or take new photos to send in the chat.
- **Location Sharing**: Users can share their current location through a map view.
- **Offline Support**: Messages are stored locally, allowing users to view chats even without an internet connection.
- **Accessibility**: The app is compatible with screen readers to ensure accessibility for users with visual impairments.

---

## User Stories

- As a new user, I want to easily join a chat room to start chatting with friends and family.
- As a user, I want to send messages, images, and my location.
- As a user, I want to view messages offline.
- As a user with a visual impairment, I want the app to be screen reader-compatible.

---

## Technologies Used

- **React Native**: For building the mobile app for both Android and iOS.
- **Expo**: For easy app development and testing across platforms.
- **Firebase Authentication**: For anonymous user authentication.
- **Google Firestore**: For storing chat messages in the cloud.
- **Firebase Cloud Storage**: For storing images shared via chat.
- **AsyncStorage**: For local data storage when the user is offline.
- **Gifted Chat Library**: For building the chat interface.

---

## Development Environment

### Prerequisites

- **Node.js** installed on your machine.
- **Expo CLI** installed globally (`npm install -g expo-cli`).
- **Firebase Account**: for setting up Firestore and Cloud Storage.
- **Android Studio**: To run the app on an Android emulator
- **Xcode**(macOS only): To run the app on an iOS simulator
- **Expo Go** (installed on an physical device) to run the app on an physical device

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

#### 3. Set up Firestore & Firbase Storage.

#### 4. Add your Firebase configuration.

Replace the values inside firebase.js with your own Firebase configuration.

#### 5.1. Run the app on Android Studio (Emulator)

Run the following command:

```bash
npx expo start --android
```

#### 5.2. Run the app on Xcode (Simulator)

Run the following command:

```bash
npx expo start --ios
```

#### 5.3. Run the App on a physical device

Open the app directly with Expo Go.
