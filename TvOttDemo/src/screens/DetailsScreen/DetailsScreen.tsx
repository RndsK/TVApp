import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { C } from '../../theme/theme';
import Thumb from '../../components/Thumb';
import { POSTER_W, POSTER_H, MIN_IMG } from './detailsConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { item } = route.params;
  const [playFocused, setPlayFocused] = React.useState(false);
  const [closeFocused, setCloseFocused] = React.useState(false);

  const desc = item.description ?? '';
  const enableScroll = desc.length > 220;

  return (
    <View style={s.container}>
      <Pressable
        focusable
        accessibilityRole="button"
        accessibilityLabel="Close"
        onFocus={() => setCloseFocused(true)}
        onBlur={() => setCloseFocused(false)}
        onPress={() => navigation.goBack()}
        style={[s.closeBtn, closeFocused && s.closeBtnFocused]}
      >
        <Text style={s.closeIcon}>✕</Text>
      </Pressable>

      <View style={s.posterWrap}>
        <Thumb
          uri={item.thumb}
          height={POSTER_H}
          minSize={MIN_IMG}
          accessibilityLabel={`${item.title} poster`}
        />
      </View>

      <View style={s.right}>
        <Text style={s.title}>{item.title}</Text>

        {!!desc &&
          (enableScroll ? (
            <ScrollView
              style={s.descScroll}
              contentContainerStyle={s.descContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={s.desc}>{desc}</Text>
            </ScrollView>
          ) : (
            <Text style={[s.desc, s.descStatic]}>{desc}</Text>
          ))}

        <Pressable
          focusable
          accessibilityRole="button"
          accessibilityLabel="Play"
          accessibilityHint="Start playback"
          onFocus={() => setPlayFocused(true)}
          onBlur={() => setPlayFocused(false)}
          style={[s.playBtn, playFocused && s.playBtnFocused]}
          onPress={() => navigation.navigate('Player', { uri: item.videoUrl, title: item.title })}
        >
          <Text style={s.playLabel}>▶  Play</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: C.bg, padding: 36, gap: 28 },

  closeBtn: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: '#22345C',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeBtnFocused: { backgroundColor: C.surface2, borderColor: C.accent, elevation: 8, transform: [{ scale: 1.06 }] },
  closeIcon: { color: C.text, fontSize: 22, fontWeight: '900' },

  posterWrap: {
    width: POSTER_W,
    height: POSTER_H,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#132650',
  },

  right: { flex: 1, paddingTop: 6, minWidth: 0 },
  title: { color: C.text, fontSize: 42, fontWeight: '900', marginBottom: 10 },
  descScroll: { maxHeight: 240, marginBottom: 22, alignSelf: 'flex-start' },
  descContent: { flexGrow: 0 },
  desc: { color: C.sub, fontSize: 18, lineHeight: 26 },
  descStatic: { marginBottom: 22 },
  playBtn: {
    backgroundColor: C.surface,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#22345C',
    transform: [{ scale: 1 }],
  },
  playBtnFocused: { backgroundColor: C.surface2, borderColor: C.accent, elevation: 8, transform: [{ scale: 1.05 }] },
  playLabel: { color: C.text, fontSize: 22, fontWeight: '800' },
});
