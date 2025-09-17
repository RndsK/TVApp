import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IconButton from '../../src/components/IconButton';

describe('IconButton', () => {
    it('fires onPress and renders fallback text child', () => {
        const onPress = jest.fn();
        const { getByLabelText, getByText } = render(
            <IconButton accessibilityLabel="Back" onPress={onPress}>
                ✕
            </IconButton>
        );
        expect(getByText('✕')).toBeTruthy();
        fireEvent.press(getByLabelText('Back'));
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
