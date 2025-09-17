import * as React from 'react';
import { Animated } from 'react-native';

type UseHudArgs = {
    hideAfterMs: number;
    paused: boolean;
    loading: boolean;
};

export function useHud({ hideAfterMs, paused, loading }: UseHudArgs) {
    const opacity = React.useRef(new Animated.Value(1)).current;
    const [interactive, setInteractive] = React.useState(true);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const clear = React.useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const animate = React.useCallback(
        (to: 0 | 1, cb?: () => void) => {
            Animated.timing(opacity, {
                toValue: to,
                duration: to ? 220 : 200,
                useNativeDriver: true,
            }).start(() => cb?.());
        },
        [opacity]
    );

    const show = React.useCallback(() => {
        clear();
        setInteractive(true);
        animate(1);
        if (!paused && !loading) {
            timerRef.current = setTimeout(() => {
                animate(0, () => setInteractive(false));
            }, hideAfterMs);
        }
    }, [animate, clear, hideAfterMs, loading, paused]);

    React.useEffect(() => {
        if (paused || loading) {
            show();
        } else {
            clear();
            timerRef.current = setTimeout(() => {
                animate(0, () => setInteractive(false));
            }, hideAfterMs);
        }
        return clear;
    }, [paused, loading, show, clear, hideAfterMs]);

    return { opacity, interactive, show };
}
