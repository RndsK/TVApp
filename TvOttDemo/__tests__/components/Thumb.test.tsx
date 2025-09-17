import React from 'react';
import { render } from '@testing-library/react-native';
import { Image as RNImage } from 'react-native';
import Thumb from '../../src/components/Thumb';

describe('Thumb', () => {
    it('renders the image when size is sufficient', () => {
        const { queryByText, getByLabelText } = render(
            <Thumb uri="https://example.com/img.jpg" height={200} accessibilityLabel="Poster" />
        );
        expect(queryByText(/No preview/i)).toBeNull();
        expect(getByLabelText('Poster')).toBeTruthy();
    });

    it('shows fallback when getSize reports a too-small image', () => {
        const spy = jest
            .spyOn(RNImage, 'getSize')
            .mockImplementationOnce((_u: string, success: any) => success(50, 50));
        const { getByText } = render(<Thumb uri="u" height={200} />);
        expect(getByText(/No preview/i)).toBeTruthy();
        spy.mockRestore();
    });

    it('shows fallback when getSize fails', () => {
        const spy = jest
            .spyOn(RNImage, 'getSize')
            .mockImplementationOnce((_u: string, _s: any, fail: any) => fail(new Error('oops')));
        const { getByText } = render(<Thumb uri="u" height={200} />);
        expect(getByText(/No preview/i)).toBeTruthy();
        spy.mockRestore();
    });
});
