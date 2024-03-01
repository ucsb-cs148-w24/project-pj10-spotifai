import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '.components/Login.jsx';

describe('Login component', () => {
  it('should call handleClick and redirect to Spotify authorization when the button is clicked', () => {
    const { getByText } = render(<Login />);
    const button = getByText('Connect Spotify');

    const originalLocation = window.location;
    delete window.location;
    window.location = { assign: jest.fn() };

    fireEvent.click(button);

    expect(window.location.assign).toHaveBeenCalledWith(
      'https://accounts.spotify.com/authorize?client_id=de12e2664c344d39a4d316e77cf7e74d&redirect_uri=http://localhost:3000/&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read&response_type=token&show_dialog=true'
    );

    window.location = originalLocation;
  });
});