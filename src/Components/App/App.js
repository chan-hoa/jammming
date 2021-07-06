import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    /*let arr = [];
    for (let i=0; i < this.state.playlistTracks.length;i++ ){
    
       arr.push(this.state.playlistTracks[i].id);
     }  
  if(!arr.includes(track.id)){
    const tracks = this.state.playlistTracks;
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }*/


    if (this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id
    )) {
      return;
    }
    const tracks = this.state.playlistTracks;
    tracks.push(track);
    this.setState({ playlistTracks: tracks });

  }
  removeTrack(track) {
    const tracks = this.state.playlistTracks.filter(savedTrack =>
      savedTrack.id !== track.id
    );
    this.setState({ playlistTracks: tracks });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }
  savePlaylist() {
    const tracksURIs = this.state.playlistTracks.map(track => track.uri);
    const playlistName = this.state.playlistName;

    Spotify.savePlaylist(playlistName, tracksURIs)
      .then(() => {
        this.setState({ playlistName: "New Playlist" });
        this.setState({ playlistTracks: [] });
      });

  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(tracks =>
      this.setState({ searchResults: tracks })
    );

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div class="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );

  }

}

export default App;
