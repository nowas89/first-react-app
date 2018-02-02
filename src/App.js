import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultColor = '#fff';

let defaultStyle = {
color: defaultColor
}

let fakeServerData = {
	user: {
		name: 'PAWEŁ',
		playlists: [
			{
				name: 'my favorites',
				songs: [
					{name: '1', duration: 123}, {name: '2', duration: 123}, {name: '3', duration: 123}, {name: '4', duration: 123}
				]
			},
			{
				name: 'discover weekly',
				songs: [{name: '5', duration: 13}, {name: '6', duration: 123}, {name: '7', duration: 123}, {name: '8', duration: 123}]
			},
			{
				name: 'second',
				songs: [{name: '9', duration: 123}, {name: '10', duration: 3}, {name: '11', duration: 123}, {name: '12', duration: 129}]
			},
			{
				name: 'third',
				songs: [{name: '13', duration: 123}, {name: '14', duration: 123}, {name: '15', duration: 123}, {name: '16', duration: 123}]
			}
		]
	}

}

class PlaylistCounter extends Component {
	render() {
	return (
		<div style={ { width: '40%', display: 'inline-block'}}>
			<h2 style={defaultStyle} >
			{this.props.playlists 
			 && this.props.playlists.length} Playlists</h2>
		</div>
		);
	  }
	}
	
	class HourCounter extends Component {
	render() {
		let allSongs = this.props.playlists.reduce((songs, eachPlalist) => {
		return songs.concat(eachPlalist.songs);
		}, [])

		let totalDuration = allSongs.reduce (
			(sum, eachSong) => {
				return sum + eachSong.duration;
			}, 0
		)
	return (
		<div style={ { width: '40%', display: 'inline-block'}}>
			<h2 style={defaultStyle}> 
			{Math.round(totalDuration/60)} Hours</h2>
		</div>
		);
	  }
	}
class Filter extends Component {
  render() {
   return (
 
   		<div style={defaultStyle}>
     			<img/>
     			<input type="text"/>
      			FILTER
       </div>
       );
    }
  } 

  class Playlist extends Component {
	  render() {
		  return (
			  <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
				  <img/>
				  <h3>playlist name</h3>
				  <ul>
					  <li>song 1</li>
					  <li>song 2</li>
					  <li>song 3</li>
					  <li>song 4</li>
				  </ul>
			  </div>
		  )
	  }
  }
  


class App extends Component {

	constructor() {
		super();
		this.state = {serverData: {}}
	}
  		componentDidMount() {
		setTimeout(() => {
		this.setState({serverData: fakeServerData});

}, 2000);


}
	render() {
    return (
      <div className="App">

		  {this.state.serverData.user ?
		   <div>
        	<h1 style={{...defaultStyle, 'font-size': '34px'}}>Przeboje uzytkownika {this.state.serverData.user.name}
			</h1>
			<PlaylistCounter playlists={
			this.state.serverData.user.playlists}   />
        	<HourCounter playlists={
			this.state.serverData.user.playlists} />
        <Filter />
		<Playlist />
		<Playlist />
		<Playlist />
		<Playlist />
		</div> : <h1 style={{...defaultStyle, "padding-top": "300px"}}> loading . . . </h1>
		}
      </div>
    );
  }
}

export default App; 
