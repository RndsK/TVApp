import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import DetailsScreen from '../../src/screens/DetailsScreen/DetailsScreen';
import PlayerScreen from '../../src/screens/PlayerScreen/PlayerScreen';
import type { MediaItem } from '../../src/navigation';

type Route =
    | { name: 'Home' }
    | { name: 'Details'; params: { item: MediaItem } }
    | { name: 'Player'; params: { uri: string; title?: string } };

function TestHost() {
    const item: MediaItem = {
        id: '1',
        title: 'Sintel (MP4)',
        thumb: 'https://example.com/thumb.jpg',
        videoUrl: 'https://example.com/video.mp4',
        description: 'Open movie — MP4 fallback.',
        duration: 600,
    };

    const [route, setRoute] = React.useState<Route>({ name: 'Home' });

    const navigation = React.useMemo(
        () => ({
            navigate: (name: string, params?: any) =>
                setRoute({ name: name as any, params } as Route),
            goBack: () => setRoute({ name: 'Home' }),
            setOptions: () => { },
            addListener: () => () => { },
            removeListener: () => { },
            canGoBack: () => true,
        }),
        []
    );

    React.useEffect(() => {
        if (route.name === 'Home') {
            setRoute({ name: 'Details', params: { item } });
        }
    }, [route.name]);

    if (route.name === 'Details') {
        return (
            <DetailsScreen
                route={{ key: 'details', name: 'Details', params: route.params }}
                navigation={navigation as any}
            />
        );
    }

    if (route.name === 'Player') {
        return (
            <PlayerScreen
                route={{ key: 'player', name: 'Player', params: route.params }}
                navigation={navigation as any}
            />
        );
    }

    return null;
}

describe('Flow: Home → Details → Play', () => {
    it('navigates through the stack and renders Player', async () => {
        const { getByLabelText, getByText, queryByTestId } = render(<TestHost />);

        const playBtn = await waitFor(() => getByLabelText('Play'));
        fireEvent.press(playBtn);

        await waitFor(() => {
            expect(getByText('Sintel (MP4)')).toBeTruthy();
            expect(queryByTestId('mock-video')).toBeTruthy();
        });
    }, 10000);
});
