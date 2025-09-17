import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CatalogCard from '../../src/components/CatalogCard';
import type { MediaItem } from '../../src/navigation';

const item: MediaItem = {
    id: '1',
    title: 'Test Movie (2024)',
    thumb: 'https://example.com/thumb.jpg',
    videoUrl: 'https://example.com/video.mp4',
    duration: 125,
};

describe('CatalogCard', () => {
    it('renders title and computed minutes', () => {
        const { getByText } = render(
            <CatalogCard
                item={item}
                focused={false}
                onFocus={() => { }}
                onPress={() => { }}
                cardWidth={210}
                thumbHeight={200}
                focusScale={1.05}
            />
        );
        expect(getByText('Test Movie')).toBeTruthy();
        expect(getByText('2 min')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPress = jest.fn();
        const { getByLabelText } = render(
            <CatalogCard
                item={item}
                focused={false}
                onFocus={() => { }}
                onPress={onPress}
                cardWidth={210}
                thumbHeight={200}
                focusScale={1.05}
            />
        );
        fireEvent.press(getByLabelText('Test Movie'));
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
