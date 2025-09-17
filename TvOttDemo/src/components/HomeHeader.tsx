import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { C } from '../theme/theme';
import { HEADER_SIDE_W } from '../screens/HomeScreen/homeConfig';
import TV_ICON from '../../assets/icons/tv.png';

export default function HomeHeader() {
    return (
        <View style={s.header}>
            <View style={s.iconTouch} focusable={false} pointerEvents="none" accessible accessibilityLabel="App logo">
                <Image source={TV_ICON} style={s.iconImg} />
            </View>
            <View style={s.headerCenter}>
                <Text style={s.appTitle}>TV Demo app</Text>
                <Text style={s.section}>Featured</Text>
            </View>
            <View style={s.iconTouch} />
        </View>
    );
}

const s = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 28, marginBottom: 6 },
    iconTouch: { width: HEADER_SIDE_W, height: HEADER_SIDE_W, alignItems: 'center', justifyContent: 'center' },
    iconImg: { width: 40, height: 40, tintColor: C.accent, resizeMode: 'contain' },
    headerCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    appTitle: { color: C.sub, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase' },
    section: { color: C.text, fontSize: 36, fontWeight: '800', marginTop: 2 },
});
