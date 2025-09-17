import * as React from 'react';
import { Platform } from 'react-native';

export type TVEvent =
  | { eventType: 'up' | 'down' | 'left' | 'right' | 'select' | 'menu' | 'playPause' | 'back' }
  | { eventType: string };

export function useTVEvents(handler: (evt: TVEvent) => void) {
  const handlerRef = React.useRef<{ disable: () => void } | null>(null);

  React.useEffect(() => {
    if (!Platform.isTV) return;

    try {
      const RN: any = require('react-native');
      const TVEventHandler = RN?.TVEventHandler;
      if (!TVEventHandler) return;

      const instance = new TVEventHandler();
      instance.enable(null, (_cmp: unknown, evt: TVEvent) => {
        if (evt && typeof (evt as any).eventType === 'string') {
          handler(evt);
        }
      });

      handlerRef.current = { disable: () => instance.disable() };
    } catch {
    }

    return () => {
      try {
        handlerRef.current?.disable();
      } finally {
        handlerRef.current = null;
      }
    };
  }, [handler]);
}
