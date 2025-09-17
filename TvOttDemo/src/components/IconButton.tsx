import * as React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { C } from '../theme/theme';

type Props = {
    onPress: () => void;
    accessibilityLabel: string;
    accessibilityHint?: string;
    icon?: ImageSourcePropType;
    size?: number;
    mirrored?: boolean;
    preferredFocus?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

export default function IconButton({
    onPress,
    accessibilityLabel,
    accessibilityHint,
    icon,
    size = 28,
    mirrored,
    preferredFocus,
    style,
    children,
}: Props) {
    const [focused, setFocused] = React.useState(false);

    return (
        <Pressable
            focusable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            hasTVPreferredFocus={preferredFocus}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onPress={onPress}
            style={[s.iconBtn, focused && s.iconBtnFocused, style]}
        >
            {icon ? (
                <Image
                    source={icon}
                    style={[s.icon, { width: size, height: size }, mirrored && s.mirrorH, focused && s.iconFocused]}
                />
            ) : (
                <Text style={[s.textIcon, focused && s.textIconFocused]}>{children}</Text>
            )}
        </Pressable>
    );
}

const s = StyleSheet.create({
    iconBtn: {
        padding: 10,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: 1 }],
    },
    iconBtnFocused: {
        borderWidth: 2,
        borderColor: C.accent,
        shadowColor: C.accent,
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 8,
        transform: [{ scale: 1.12 }],
    },
    icon: {
        tintColor: C.text,
    },
    iconFocused: {
        tintColor: C.accent,
    },
    mirrorH: { transform: [{ scaleX: -1 }] },
    textIcon: { color: C.text, fontSize: 20, fontWeight: '900', lineHeight: 24 },
    textIconFocused: { color: C.accent },
});
