import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';

let defaultColor = '#fff';

let defaultStyle = {
color: defaultColor
}

// let fakeServerData = {
// 	user: {
// 		name: 'PAWEŁ',
// 		playlists: [
// 			{
// 				name: 'my favorites',
// 				songs: [
// 					{name: '1', duration: 123}, {name: '2', duration: 123}, {name: '3', duration: 123}, {name: '4', duration: 123}
// 				]
// 			},
// 			{
// 				name: 'discover weekly',
// 				songs: [{name: '5', duration: 13}, {name: '6', duration: 123}, {name: '7', duration: 123}, {name: '8', duration: 123}]
// 			},
// 			{
// 				name: 'second',
// 				songs: [{name: '9', duration: 123}, {name: '10', duration: 3}, {name: '11', duration: 123}, {name: '12', duration: 129}]
// 			},
// 			{
// 				name: 'third',
// 				songs: [{name: '13', duration: 123}, {name: '14', duration: 123}, {name: '15', duration: 123}, {name: '16', duration: 123}]
// 			}
// 		]
// 	}

// }

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
     			<input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)} />
       </div>
       );
    }
  } 

  class Playlist extends Component {
	  render() {
		  return (
			  <div className="out" style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
				  <img src={this.props.playlist.imageUrl} style={{'width': '120px'}}/>
				  <h3>{this.props.playlist.name}</h3>
				  <ul>
					 {
						 this.props.playlist.songs.map( song =>
						<li>{song.name}</li>
						)
					 }
				  </ul>
			  </div>
		  )
	  }
  }
  


class App extends Component {

	constructor() { 
		super();
		this.state = {
			serverData: {},
	        filterString: ''
}
}
  		componentDidMount() {
	let parsed = queryString.parse(window.location.search)
	let acessToken = parsed.access_token

	if(!acessToken) return;
	
	fetch('https://api.spotify.com/v1/me', {
		headers: {'Authorization': 'Bearer ' + acessToken}
		}).then(response => response.json()).then(data => this.setState({user:
			 {name: data.display_name}}))
	
		fetch('https://api.spotify.com/v1/me/playlists', {
		headers: {'Authorization': 'Bearer ' + acessToken}
		}).then(response => response.json()).then(data => this.setState({
			playlists: data.items.map(item => {
				console.log(data.items)
		return {
			name: item.name,
			imageUrl: item.images[0].url,
			songs: []}})
	
	}))
	}

	

	render() {
		let playlistToRender = 
			this.state.user && 
			this.state.playlists 
				? this.state.playlists.filter(playlist => 
					playlist.name.toLowerCase().includes(this.state.filterString)) 
				: []
    return (
      <div className="App">

		  {this.state.user ?
		   <div>
        	<h1 style={{...defaultStyle, 'font-size': '34px'}}>Przeboje uzytkownika {this.state.user.name}
			</h1>
			<PlaylistCounter playlists={playlistToRender}   />
        	<HourCounter playlists={playlistToRender} />
        <Filter onTextChange={text => this.setState({filterString: text})} />
		{
			playlistToRender.map((playlist) =>
				<Playlist playlist={playlist} />
			)
		}
		</div> : <button onClick ={	() => window.location = 'http://localhost:8888/login'} 
		style={{...defaultStyle, "marginTop": "300px", "backgroundColor": "black"}}>Sing in to load youre account</button>
		}
      </div>
    );
  }
}

export default App; 
