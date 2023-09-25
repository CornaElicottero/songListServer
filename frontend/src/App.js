import React, { useState } from 'react';
import SpotifyTrackSearch from './components/SpotifyTrackSearch';
import Header from "./components/Header";
import Footer from './components/Footer';
import './index.css';

const App = () => {
    const [currentSong, setCurrentSong] = useState({ artist: 'ssshhhiiittt!', track: 'море' });

    return (
        <div>
            <Header/>
            <SpotifyTrackSearch currentSong={currentSong} />
            <Footer/>
        </div>
    );
};

export default App;
