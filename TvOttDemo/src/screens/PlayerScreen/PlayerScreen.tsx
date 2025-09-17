// src/screens/PlayerScreen/PlayerScreen.tsx
import * as React from 'react';
import { ActivityIndicator, Animated, BackHandler, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Video, { OnLoadData, OnProgressData, VideoRef } from 'react-native-video';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { C } from '../../theme/theme';
import { useHud } from '../../hooks/useHud';
import { useTVEvents, type TVEvent } from '../../hooks/useTVEvents';
import IconButton from '../../components/IconButton';
import ProgressBar from '../../components/ProgressBar';
import { HUD_HIDE_MS, ICON_SIZE } from './playerConfig';

import PLAY_ICON from '../../../assets/icons/play.png';
import PAUSE_ICON from '../../../assets/icons/pause.png';
import FF_ICON from '../../../assets/icons/fastForward.png';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;
type BufferEvent = { isBuffering?: boolean };

export default function PlayerScreen({ route, navigation }: Props) {
  const { uri, title } = route.params;

  const [paused, setPaused] = React.useState(false);
  const [pos, setPos] = React.useState(0);
  const [dur, setDur] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const playerRef = React.useRef<VideoRef>(null);
  const { opacity, interactive, show } = useHud({ hideAfterMs: HUD_HIDE_MS, paused, loading });

  React.useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    return () => sub.remove();
  }, [navigation]);

  const seekBy = React.useCallback(
    (sec: number) => {
      let next = pos + sec;
      if (next < 0) next = 0;
      if (dur && next > dur) next = Math.max(0, dur - 1);
      playerRef.current?.seek(next);
      setPos(next);
      show();
    },
    [dur, pos, show]
  );

  useTVEvents((evt: TVEvent) => {
    switch (evt.eventType) {
      case 'right':
        seekBy(10);
        break;
      case 'left':
        seekBy(-10);
        break;
      case 'select':
        setPaused((p) => !p);
        show();
        break;
      case 'back':
        navigation.goBack();
        break;
      default:
        break;
    }
  });

  const onLoad = (d: OnLoadData) => {
    setDur(d.duration);
    setLoading(false);
    show();
  };

  const onProgress = (p: OnProgressData) => setPos(p.currentTime);

  return (
    <View style={s.root}>
      <Video
        ref={playerRef}
        source={{ uri }}
        style={s.video}
        resizeMode="contain"
        paused={paused}
        onLoadStart={() => {
          setLoading(true);
          show();
        }}
        onLoad={onLoad}
        onBuffer={(e: BufferEvent) => {
          setLoading(!!e?.isBuffering);
          if (e?.isBuffering) show();
        }}
        onProgress={onProgress}
        onEnd={() => {
          setPaused(true);
          show();
        }}
        onError={() => setLoading(false)}
      />

      <Pressable style={s.clickCatcher} onPress={show} />

      {loading && (
        <View pointerEvents="none" style={s.loaderWrap}>
          <ActivityIndicator size="large" />
          <Text style={s.loaderText}>Loading…</Text>
        </View>
      )}

      <Animated.View
        style={[
          s.bottomBar,
          {
            opacity,
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 0],
                }),
              },
            ],
          },
        ]}
        pointerEvents={interactive ? 'auto' : 'none'}
      >
        <View style={s.barRow}>
          <View style={s.leftCol}>
            <Text style={s.title} numberOfLines={1}>
              {title ?? 'Now Playing'}
            </Text>
            <View style={s.timeRow}>
              <Text style={s.time}>
                {format(pos)} / {format(dur)}
              </Text>
              <Image source={paused ? PLAY_ICON : PAUSE_ICON} style={s.timeIcon} accessibilityLabel={paused ? 'Play' : 'Pause'} />
            </View>
          </View>

          <View style={s.controlsRow}>
            <IconButton
              accessibilityLabel="Rewind 10 seconds"
              accessibilityHint="Skip backwards by ten seconds"
              icon={FF_ICON}
              mirrored
              size={ICON_SIZE}
              onPress={() => seekBy(-10)}
            />
            <IconButton
              accessibilityLabel={paused ? 'Play' : 'Pause'}
              accessibilityHint="Toggle playback"
              icon={paused ? PLAY_ICON : PAUSE_ICON}
              size={ICON_SIZE}
              preferredFocus
              onPress={() => {
                setPaused((p) => !p);
                show();
              }}
            />
            <IconButton
              accessibilityLabel="Fast-forward 10 seconds"
              accessibilityHint="Skip forward by ten seconds"
              icon={FF_ICON}
              size={ICON_SIZE}
              onPress={() => seekBy(10)}
            />
            <IconButton
              accessibilityLabel="Back"
              accessibilityHint="Return to previous screen"
              onPress={() => navigation.goBack()}
            >
              ✕
            </IconButton>
          </View>
        </View>

        <ProgressBar progress={dur ? pos / dur : 0} />
      </Animated.View>
    </View>
  );
}

const format = (t = 0) => {
  const m = Math.floor(t / 60).toString().padStart(2, '0');
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  video: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  clickCatcher: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  loaderWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  loaderText: { marginTop: 10, color: C.sub, fontSize: 16 },

  bottomBar: { position: 'absolute', left: 24, right: 24, bottom: 24, padding: 16, borderRadius: 16, backgroundColor: 'rgba(9,18,37,0.78)' },

  barRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 12 },
  leftCol: { flex: 1, minWidth: 0 },
  title: { color: C.text, fontSize: 24, fontWeight: '900' },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  time: { color: C.sub, fontSize: 16 },
  timeIcon: { width: 16, height: 16, marginLeft: 8, tintColor: C.text },

  controlsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
