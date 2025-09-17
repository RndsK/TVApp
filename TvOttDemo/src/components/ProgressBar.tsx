import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { C } from '../theme/theme';

type Props = {
    progress: number;
    height?: number;
};

export default function ProgressBar({ progress, height = 6 }: Props) {
    const pct = Math.max(0, Math.min(1, isFinite(progress) ? progress : 0)) * 100;
    return (
        <View style={[s.wrap, { height }]}>
            <View style={[s.fill, { width: `${pct}%` }]} />
        </View>
    );
}

const s = StyleSheet.create({
    wrap: {
        backgroundColor: '#132650',
        borderRadius: 4,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: C.accent,
    },
});
