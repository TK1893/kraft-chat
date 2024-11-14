# KraftChat - A React Native Chat Application

**KraftChat** is a mobile real-time chat application built using `React Native`, `Firebase`, `Expo` and various modern tools. It allows users to communicate with one another via text, images, and location sharing. The app utilizes `Firebase` for real-time database functionality, `Firebase Authentication` for anonymous sign-ins,`Firestore` for storing chat messages and `Firebase Cloud Storage` for uploading images. The app also caches messages locally when offline and restores them when the user is back online.

This project includes four main components:

1. `Chat`- Handles the main chat interface and real-time messaging functionality.

2. `CustomActions` - Allows users to send images and share locations within the chat.

3. `Start` - The onboarding screen where users set their username and background color.

4. `App` - The root component that integrates all other components and handles navigation, font loading, and network connection status.

## Table of Contents

- [Screenshots](screenshots)
- [Key Features](key-features)
- [User Stories](user-stories)
- [Technologies Used](#technologies-used)
- [Development Environment](development-environment)
  - [Prerequisites](prerequisites)
  - [Installation & Setup](#installation--setup)
- [Component Details](#component-details)
- [Folder Structure](#folder-structure)
- [License](#license)
- [Author](#author)

---

## Screenshots

<img src="https://github.com/TK1893/kraft-chat/blob/main/assets/screenshots/Screenshot_20241114_145648.png" alt="Hauptbildschirm der Anwendung" width="300">

## Key Features

- **`Anonymous User Authentication`** - Users are signed in anonymously using Firebase Authentication.

- `Real-Time Messaging` - Messages are synced in real-time using Firebase Firestore.
- **`Offline Support`** - Messages are cached locally using AsyncStorage, allowing users to view them even without an internet connection.
- **`Image and Location Sharing`** - Users can send images from their gallery or camera and share their current location.
- **`Customizable Chat Background`** - Users can choose a chat background color on the start screen.
- **`Cross-Platform`** - Built using React Native, the app works on both iOS and Android.

---

## User Stories

- As a new user, I want to easily join a chat room to start chatting with friends and family.

- As a user, I want to send messages, images, and my location.
- As a user, I want to view messages offline.
- As a user with a visual impairment, I want the app to be screen reader-compatible.

---

## Technologies Used

- **`React Native`**  
  Frontend/UI framework for building cross-platform mobile applications.

- **`Expo`**  
  Open-source platform for developing and testing universal native apps for Android, iOS and the web with JavaScript and React.
- **`Firebase`**  
  Backend-as-a-Service (BaaS) platform providing user authentication, database, and storage.

  - `Firebase Firestore` - NoSQL database used for real-time storage and syncing of chat messages.

  - `Firebase Authentication` - Handles anonymous sign-ins for users.

  - `Firebase Storage` - Used for storing and retrieving uploaded images..

- **`React Navigation`** - Used for handling navigation between screens.
- **`AsyncStorage`** - For storing cached messages when the app is offline.
- **`React Native Maps`** - For rendering map views with location data within messages.
- **`Expo Fonts`** - Used to load custom fonts in the app.

### Libraries & Modules

- **`react-native-gifted-chat`** - A customizable chat UI component library for React Native.

- **`react-native-maps`** - Used for displaying shared location data in messages.
- **`expo-image-picker`** - Used for selecting images from the gallery or taking new photos.
- **`expo-location`** - Used for retrieving the user's current location.
- **`@react-native-async-storage/async-storage`** - Used for caching messages when the user is offline.
- **`@react-native-community/netinfo`** - Detects the device's network connection status.
- **`expo-font`** - Loads custom fonts (Poppins) for the app's UI.
- **`firebase`**: Firebase SDK for interacting with Firebase services.

---

## Development Environment

### Prerequisites

- **`Node.js`** installed on your machine.

- **`Expo CLI`** installed globally (`npm install -g expo-cli`).
- **`Firebase Account`**: For setting up Firestore, Authentication and Cloud Storage.
- **`Android Studio`**: To run the app on an Android emulator
- **`Xcode`** (macOS only): To run the app on an iOS simulator
- **`Expo Go`** To run the app on an physical device (installed on device)

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

## Component Details

Here is an overview of the app’s components and functionality:

### `App.js`

The root component(entry point) of the app that integrates all other components and handles application-wide logic such as network status, font loading, and navigation.

- **`Key features`**
  - Manages global app state (like connection status and font loading).
  - Sets up navigation between the `Start` and `Chat` screens.
- **`Important functions`**

  - `loadFonts`: Loads custom fonts required for the app.

  - `useEffect`: Monitors network connectivity to adjust Firebase network status accordingly.

### `components/Start.js`

The app’s landing screen where users enter their name and select a background color.

- **`Key features`**

  - Allows users to input their name.
  - Lets users choose a background color for the chat screen.
  - Signs in the user anonymously using `Firebase Authentication`.
  - Navigates to the Chat screen with the provided details.

- **`Important functions`**
  - `signInUser`: Signs the user in anonymously and navigates to the Chat screen.

### `components/Chat.js`

This component is responsible for displaying the main chat interface and handling real-time messaging.

- **`Key features`**

  - Displays messages in real-time using Firebase Firestore.
  - Caches messages locally using AsyncStorage when offline.
  - Renders a map view for location messages and displays images when sent.
  - Includes custom chat bubbles and input toolbar.
  - Implements sending text, images, and location.

- **`Important functions`**

  - `onSend` - Handles the sending of messages to Firebase.

  - `renderBubble` - Customizes the message bubbles (e.g., background color, text color).
  - `renderInputToolbar` - Shows the input toolbar if the user is connected to the internet.
  - `loadCachedMessages` - Loads previously cached messages when the device is offline.
  - `cacheMessages` - Saves the messages locally to AsyncStorage.

### `components/CustomActions.js`

Custom component for additional chat actions (e.g., sending images or location).

- **`Key features`**

  - Presents an action sheet with options for sending a photo from the gallery, taking a photo, or sharing the current location.
  - Handles permissions for accessing the camera, gallery, and location.
  - Uploads selected images to Firebase Storage and sends the image URL in the chat.
  - Uses Expo's `ImagePicker` and `Location` API to handle image selection and location fetching.

- **`Important functions`**

  - `onActionPress`: Displays the action sheet with options.

  - `pickImage`: Allows the user to pick an image from their device's gallery.
  - `takePhoto`: Allows the user to take a photo with their device's camera.
  - `getLocation`: Fetches the user's current location.

### `firebase.js`

Initializes Firebase services.

- **`Key features`**
- Exports initialized instances of
  - Firebase Authentication
  - Firestore
  - Firebase Storage.

---

## Folder Structure

```bash
.
├── assets
│   ├── images
│   └── fonts
├── components
│   ├── Chat.js
│   ├── CustomActions.js
│   └── Start.js
├── App.js
├── firebase.js
├── package.json
└── README.md
```

---

## License

This project is open-source under the MIT License.

---

## Author

Developed by [Tobias Kraft](https://tk1893.github.io/tk-portfolio/).
