import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state= {search: ""};
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onSearch(this.state.search);
    }

    handleTermChange(e){
        this.setState({search: e.target.value});
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.handleClick}>SEARCH</button>
            </div>
        );
    }

};