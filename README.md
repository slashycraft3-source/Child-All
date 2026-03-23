# Slashy Control - Setup Instructions

Because this environment is optimized for generating Web Applications, I have provided the **Admin Dashboard** as a fully functional React web application, alongside the architectural files for the Android application.

## What is included in this workspace:
1. **Web Admin Dashboard (`src/`):** A React/Vite web application that serves as the "Admin Panel" you requested. It connects to the Firebase structure to view locations, media, logs, and send commands.
2. **Firebase Structures (`*.json`, `*.txt`):** The exact database schemas and security rules needed for your Firebase project.
3. **Android Core Reference (`SlashyControl_Android_Core.kt`):** The Kotlin architectural blueprint for the Android foreground service, WorkManager, and Firebase listeners.

## How to export and use this:
1. Click the **Settings (Gear) Icon** in the AI Studio UI.
2. Select **Export to ZIP**.
3. Extract the ZIP on your local machine.

## Android App Setup (Local Machine)
To build the native Android app:
1. Open Android Studio and create a new "Empty Views Activity" project (Kotlin).
2. Add Firebase to your Android project (Tools -> Firebase).
3. Add the required permissions to your `AndroidManifest.xml` (INTERNET, ACCESS_FINE_LOCATION, CAMERA, RECORD_AUDIO, READ_SMS, READ_CALL_LOG, FOREGROUND_SERVICE).
4. Use the `SlashyControl_Android_Core.kt` file as a guide to implement your background services.
5. Ensure you implement a transparent onboarding flow to comply with Google Play's Stalkerware/Parental Control policies.

## Web Admin Dashboard Setup
The web dashboard is already running in this preview! It features a clean, blue/white modern UI to monitor devices, view logs, and send remote commands.
