import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {ReactComponent as Left} from "../assets/circle-chevron-left-solid.svg";
import {ReactComponent as Right} from "../assets/circle-chevron-right-solid.svg";

const spotifyApi = new SpotifyWebApi();
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const SpotifyTrackSearch = ({ currentSong }) => {
	const [albumCover, setAlbumCover] = useState('');

	useEffect(() => {
		authenticateSpotify();
		if (currentSong.artist && currentSong.track) {
			searchTrack(currentSong);
		}
	}, [currentSong]);

	const authenticateSpotify = async () => {
		try {
			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
				},
				body: 'grant_type=client_credentials',
			});
			const data = await response.json();
			spotifyApi.setAccessToken(data.access_token);
		} catch (error) {
			console.error('Error authenticating with Spotify:', error);
		}
	};

	const searchTrack = async ({ artist, track }) => {
		try {
			const response = await spotifyApi.searchTracks(`${artist} ${track}`);
			const firstTrack = response.tracks.items[0];
			const coverUrl = firstTrack.album.images[1].url;
			setAlbumCover(coverUrl);
		} catch (error) {
			console.error('Error searching track:', error);
		}
	};

	return (
		<div className={'current_wrapper'}>
			<Left className={'arrow'}/>
			<div>
				<div className={'title'}>Сейчас на стриме:</div>
					<div className={'current_song_wrapper'}>
						<div>{albumCover && <img src={albumCover} alt="Album Cover" />}</div>
					<div>
						<div className={'title'}>{currentSong.artist}</div>
						<div className={'title'}>{currentSong.track}</div>
					</div>
				</div>
			</div>
			<Right className={'arrow'}/>
		</div>
	);
};

export default SpotifyTrackSearch;
