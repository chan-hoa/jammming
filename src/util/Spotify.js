export const Spotify = {

    accessToken: "",
    tokenExpiry: 0,
    // my_client_id: bdcd2585173a441cb10c78262fadcf68,
    redirect_uri: 'https://jammming_hoa.surge.sh/',
    //redirect_uri: 'http://localhost:3000/',

    getAccessToken() {
        //check if the access token variable is not empty
        if (this.accessToken) {
            //alert("access token variable is not empty");
            return this.accessToken;
            //check if the access token variable is in the URL
        } else if (window.location.href.match(/access_token=([^&]*)/)) {
            //alert("access token variable is in the url");
            this.accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            this.tokenExpiry = window.location.href.match(/expires_in=([^&]*)/)[1];
            //const expiresIn = Date.now() + (this.tokenExpiry * 1000);
            window.setTimeout(() => this.accessToken = '', this.tokenExpiry * 1000);
            window.history.pushState('Access Token', null, '/');
            return this.accessToken;

            //check if the access token variable is empty and is not in the url
        } else {
            //alert("access token variable is empty and is not in the url");
            try {
                window.location = `https://accounts.spotify.com/authorize?client_id=bdcd2585173a441cb10c78262fadcf68&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirect_uri}`;
            } catch (e) {
                alert(e.message);
            }
        }
    },
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        },
   /* search(term) {
        this.accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
            .then(response => {
                if (response.ok) {
                    //alert(`response = ${response}`);
                    return response.json();
                }
                throw new Error('Request failed');
            }, networkError => alert(networkError.message))
            .then(jsonResponse => {
                if (!jsonResponse) {

                    return [];
                } else {
                    //alert("dans le else");
                    return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
                }
            });
    },*/

    savePlaylist(playlistName, tracksURIs) {

        if (playlistName && tracksURIs.length) {

            const accessToken = Spotify.getAccessToken();
            const userIDEndpoint = "https://api.spotify.com/v1/me";
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };
            let userID = "";
            let playlistID = "";

            //get an userID
            return fetch(userIDEndpoint, { headers: headers })
                .then(response => response.json())
                .then(jsonResponse => {
                    userID = jsonResponse.id;
                    //alert(`dans le userID= ${userID}`);
                    const playlistIDEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
                    //create a playlist and get the playlistID
                    return fetch(playlistIDEndpoint, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name: playlistName })
                    })
                        .then(response => response.json())
                        .then(jsonResponse => {
                            playlistID = jsonResponse.id;
                            //alert(`dans le playlistID= ${playlistID}`);
                            // add tracks in playlist
                            const addTracksEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
                            return fetch(addTracksEndpoint, {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({ uris: tracksURIs })
                            })
                        })
                })

        }


    }

};
