import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { MediaItem } from '../navigation';
import { C } from '../theme/theme';
import Thumb from './Thumb';

type Props = {
    item: MediaItem;
    focused: boolean;
    onFocus: () => void;
    onPress: () => void;
    cardWidth: number;
    thumbHeight: number;
    focusScale: number;
    minImg?: { w: number; h: number };
};

const secsToMin = (s?: number) => (typeof s === 'number' ? Math.round(s / 60) : undefined);

function CatalogCardBase({ item, focused, onFocus, onPress, cardWidth, thumbHeight, focusScale, minImg }: Props) {
    const cleanTitle = React.useMemo(() => item.title.replace(/\s*\(.*?\)\s*/g, ''), [item.title]);
    const mins = secsToMin(item.duration);
    const subtitle = mins ? `${mins} min` : '';

    return (
        <Pressable
            focusable
            accessibilityRole="button"
            accessibilityLabel={cleanTitle}
            accessibilityHint="Open details"
            onFocus={onFocus}
            onPress={onPress}
            style={[
                s.card,
                { width: cardWidth },
                focused && { transform: [{ scale: focusScale }], backgroundColor: C.surface2, borderColor: C.accent, elevation: 8 },
            ]}
        >
            <Thumb uri={item.thumb} height={thumbHeight} minSize={minImg} accessibilityLabel={`${cleanTitle} thumbnail`} />
            <Text numberOfLines={1} style={s.cardTitle}>
                {cleanTitle}
            </Text>
            {!!subtitle && (
                <Text numberOfLines={1} style={s.cardSub}>
                    {subtitle}
                </Text>
            )}
        </Pressable>
    );
}

const s = StyleSheet.create({
    card: {
        borderRadius: 18,
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 10,
        backgroundColor: C.surface,
        borderWidth: 1,
        borderColor: C.border,
    },
    cardTitle: { color: C.text, fontSize: 17, fontWeight: '800', marginBottom: 4 },
    cardSub: { color: C.sub, fontSize: 12 },
});

const CatalogCard = React.memo(CatalogCardBase);
export default CatalogCard;
