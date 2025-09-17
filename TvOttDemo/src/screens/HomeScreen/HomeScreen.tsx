import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, MediaItem } from '../../navigation';
import { loadCatalog } from '../../api/catalog';
import { C } from '../../theme/theme';
import HomeHeader from '../../components/HomeHeader';
import CatalogCard from '../../components/CatalogCard';
import { CELL_W, FOCUS_PAD_X, FOCUS_PAD_Y, GAP, CARD_W, THUMB_H, FOCUS_SCALE, MIN_IMG } from './homeConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(0);
  const [data, setData] = React.useState<MediaItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const items = await loadCatalog();
        if (isMounted) setData(items);
      } catch (e: any) {
        if (isMounted) setError(String(e?.message ?? e));
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const contentStyle = React.useMemo(
    () => ({ paddingHorizontal: 32, paddingTop: FOCUS_PAD_Y, paddingBottom: FOCUS_PAD_Y, gap: GAP }),
    []
  );
  const keyExtractor = React.useCallback((i: MediaItem) => i.id, []);
  const getItemLayout = React.useCallback(
    (_: unknown, index: number) => ({ length: CELL_W + GAP, offset: (CELL_W + GAP) * index, index }),
    []
  );
  const renderItem = React.useCallback(
    ({ item, index }: { item: MediaItem; index: number }) => (
      <View style={s.cell}>
        <CatalogCard
          item={item}
          focused={focusedIndex === index}
          onFocus={() => setFocusedIndex(index)}
          onPress={() => navigation.navigate('Details', { item })}
          cardWidth={CARD_W}
          thumbHeight={THUMB_H}
          focusScale={FOCUS_SCALE}
          minImg={MIN_IMG}
        />
      </View>
    ),
    [focusedIndex, navigation]
  );

  if (error) {
    return (
      <View style={[s.container, s.center]}>
        <HomeHeader />
        <Text style={s.error}>Oops! {error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[s.container, s.center]}>
        <HomeHeader />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <HomeHeader />
      <FlatList
        horizontal
        data={data}
        keyExtractor={keyExtractor}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={contentStyle}
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        snapToInterval={CELL_W + GAP}
        decelerationRate="fast"
        renderItem={renderItem}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingTop: 16, paddingBottom: 36 },
  center: { alignItems: 'center', justifyContent: 'center' },
  cell: { width: CELL_W, paddingHorizontal: FOCUS_PAD_X, paddingVertical: FOCUS_PAD_Y },
  error: { color: '#ff9b9b', fontSize: 18, marginTop: 12 },
});
