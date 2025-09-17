import '@testing-library/jest-native/extend-expect';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}), {
  virtual: true,
});

jest.mock(
  'react-native-reanimated',
  () => {
    const Reanimated = {
      default: {},
      useSharedValue: (v?: any) => ({ value: v ?? 0 }),
      useAnimatedStyle: () => ({}),
      withTiming: (v: any) => v,
      withSpring: (v: any) => v,
      Easing: { inOut: (x: any) => x, linear: (x: any) => x },
      runOnJS: (fn: any) => fn,
      runOnUI: (fn: any) => fn,
      createAnimatedComponent: (c: any) => c,
    };
    return Reanimated;
  },
  { virtual: true }
);

jest.mock('react-native-gesture-handler', () => ({}), { virtual: true });

jest.mock('react-native-screens', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockScreen = React.forwardRef((props: any, ref: any) =>
    React.createElement(View, { ...props, ref })
  );
  const MockScreenContainer = React.forwardRef((props: any, ref: any) =>
    React.createElement(View, { ...props, ref })
  );

  return {
    enableScreens: jest.fn(),
    screensEnabled: jest.fn().mockReturnValue(true),
    Screen: MockScreen,
    ScreenContainer: MockScreenContainer,
    NativeScreen: MockScreen,
    NativeScreenContainer: MockScreenContainer,
    shouldUseActivityState: jest.fn().mockReturnValue(false),
    useScreens: jest.fn(),
  };
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');

  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 0, height: 0 };

  const SafeAreaInsetsContext = React.createContext(insets);
  const SafeAreaFrameContext = React.createContext(frame);

  const SafeAreaProvider = ({ children }: any) =>
    React.createElement(View, null, children);

  return {
    SafeAreaProvider,
    SafeAreaView: View,
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    initialWindowMetrics: { frame, insets },
  };
});

import { Image as RNImage } from 'react-native';

jest.spyOn(RNImage, 'getSize').mockImplementation((...args: any[]) => {
  const onSuccess = args[1] as (w: number, h: number) => void;
  if (typeof onSuccess === 'function') onSuccess(300, 300);
});

const anyImage = RNImage as any;
if (typeof anyImage.getSizeWithHeaders === 'function') {
  jest.spyOn(anyImage, 'getSizeWithHeaders').mockImplementation((...args: any[]) => {
    const onSuccess = args[2] as (w: number, h: number) => void;
    if (typeof onSuccess === 'function') onSuccess(300, 300);
  });
}

jest.mock('react-native-video', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockVideo = (props: any) => React.createElement(View, { testID: 'mock-video', ...props });
  MockVideo.displayName = 'MockVideo';
  return MockVideo;
});

export {};
