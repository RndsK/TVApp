import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Image as RNImage } from 'react-native';
import { C } from '../theme/theme';

type MinSize = { w: number; h: number };

type Props = {
    uri: string;
    height: number;
    minSize?: MinSize;
    accessibilityLabel?: string;
};

export default function Thumb({ uri, height, minSize = { w: 120, h: 120 }, accessibilityLabel = 'Thumbnail' }: Props) {
    const [loading, setLoading] = React.useState(true);
    const [bad, setBad] = React.useState(false);

    React.useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setBad(false);

        RNImage.getSize(
            uri,
            (w, h) => {
                if (cancelled) return;
                if (w < minSize.w || h < minSize.h) {
                    setBad(true);
                    setLoading(false);
                }
            },
            () => {
                if (cancelled) return;
                setBad(true);
                setLoading(false);
            }
        );

        return () => {
            cancelled = true;
        };
    }, [uri, minSize.w, minSize.h]);

    if (bad) {
        return (
            <View style={[s.thumbFallback, { height }]} accessible accessibilityLabel={`${accessibilityLabel} unavailable`}>
                <Text style={s.fallbackEmoji}>🖼️</Text>
                <Text style={s.fallbackText}>No preview</Text>
            </View>
        );
    }

    return (
        <>
            <Image
                source={{ uri }}
                style={[s.thumb, { height }]}
                accessibilityLabel={accessibilityLabel}
                onError={() => {
                    setBad(true);
                    setLoading(false);
                }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            />
            {loading && (
                <View style={[s.thumbOverlay, { height }]} pointerEvents="none">
                    <ActivityIndicator />
                </View>
            )}
        </>
    );
}

const s = StyleSheet.create({
    thumb: {
        width: '100%',
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: '#142247',
        resizeMode: 'cover',
    },
    thumbOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbFallback: {
        width: '100%',
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: '#132650',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallbackEmoji: { fontSize: 28, marginBottom: 6, color: C.sub },
    fallbackText: { color: C.sub, fontSize: 12 },
});
