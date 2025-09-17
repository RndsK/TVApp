# TV OTT Demo (React Native · Android TV)

A tiny Android TV demo built with React Native **0.81** showing a catalog (Home), item details, and a custom video player with DPAD focus.

## Setup

**Prereqs**
- Node **≥ 20**, JDK **17**
- Android Studio + SDK/Build tools

**Install**
npm i
Start Metro

npm start
Run Android

npm run android
Android TV Emulator
Create AVD → Device Manager → Android TV (1080p) → image with Google APIs (API 33+).

Launch the TV emulator.

DPAD: arrow keys = navigate, Enter/Space = select, Esc/Backspace = back.

Libraries Used & Why
@react-navigation/native + @react-navigation/native-stack — simple stack navigation suitable for TV.

react-native-video — ExoPlayer-based video playback (play/pause/seek/HUD).

react-native-screens — native primitives for faster navigation.

react-native-safe-area-context — safe insets / overscan padding.

react-native-vector-icons — icon support (optional).

jest, @testing-library/react-native, @testing-library/jest-native — unit/integration tests.

Tests
Run all tests:

npm test


Recording 
<video src="./20250917-2201-19.7261648.mp4?raw=1" width="800" controls muted playsinline></video>


