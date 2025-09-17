import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import DetailsScreen from './screens/DetailsScreen/DetailsScreen';
import PlayerScreen from './screens/PlayerScreen/PlayerScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: { item: MediaItem };
  Player: { uri: string; title?: string };
};

export type MediaItem = {
  id: string;
  title: string;
  thumb: string;
  videoUrl: string;
  description?: string;
  duration?: number; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
