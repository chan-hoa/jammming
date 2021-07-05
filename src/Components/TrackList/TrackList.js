import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export class TrackList extends React.Component {

    render() {
        return (
            <div className="TrackList">
               { 
                  
                (this.props.tracks) ? this.props.tracks.map(track => <Track track={track} key={track.id} onRemove={this.props.onRemove} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} />) : alert("erreur dans l'affichage des tracks")
                              
              }
            </div>
        );
    }
};