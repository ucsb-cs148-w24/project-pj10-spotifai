import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import YoutubeLinkButton from '../components/YoutubeLinkButton';

describe('YoutubeLinkButton', () => {
    it('should render the button with the correct label', () => {
        const label = 'Open in Youtube';
        const { getByText } = render(<YoutubeLinkButton query = {"never gonna give you up rick astley"} key = {"AIzaSyC7vMbbCmg8vx1ifDx_QFqmggU4OPJ1VYA"} />);
        const buttonElement = getByText(label);
        expect(buttonElement).toBeInTheDocument();
    });


    // it('should call window.open when clicked', () => {
    //     const openMock = jest.spyOn(window, 'open');
    //     const { getByText } = render(<YoutubeLinkButton query={"never gonna give you up rick astley"} key={"AIzaSyC7vMbbCmg8vx1ifDx_QFqmggU4OPJ1VYA"} />);
    //     const buttonElement = getByText('Open in Youtube');
    //     fireEvent.click(buttonElement);
    //     expect(openMock).toHaveBeenCalled();
    //     openMock.mockRestore();
    // });

    it('should call window.open when clicked', () => {
        const openMock = jest.fn();
        const oldWindow = window;
        window = {open: openMock};
        const { getByText } = render(<YoutubeLinkButton query={"never gonna give you up rick astley"} key={"AIzaSyC7vMbbCmg8vx1ifDx_QFqmggU4OPJ1VYA"} />);
        const buttonElement = getByText('Open in Youtube');
        fireEvent.click(buttonElement);
        expect(window.open).toHaveBeenCalled();

        window = oldWindow;
    });

});
