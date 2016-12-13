import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';
import Signup from './Signup.jsx';
import RoomList from './RoomList.jsx';
import axios from 'axios';


class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      username: 'Player1', // temporarily hardcoding in a player name, need redux to remember the username from signin/signup page
      rooms: [],
      // rooms: [
      // {
      //   roomname: 'lobby', scoreboard: [{ name: 'Josh', score: 123 }, { name: 'Will', score: 321 }]
      // },
      // {
      //   roomname: 'newroom', scoreboard: [{ name: 'Nick', score: 222 }, { name: 'Craig', score: 333 }]
      // }],
      newRoomname: '',
      selectedRoom: null,
      waiting: false,
      currentPage: 'rooms'
    };
  };

  componentWillMount() {
    console.log(this.props);
    axios.get('/rooms').then((response) => {
      console.log('response.data', response.data);
      let rooms = response.data;
      this.setState({ rooms: rooms });
    });
  }

  handleRoomnameInput(event) {
    console.log('roomname-input', this.state.newRoomname);
    this.setState({ newRoomname: event.target.value });
  };

  joinRoom() { //joinRoom needs to retrieve username from existing session or with redux, right now just using hardcoded this.state.username
    console.log(window);
    if (this.state.selectedRoom !== null) {
      console.log('this.state.username', this.state.username);
      console.log('this.state.selectedRoom', this.state.selectedRoom);
      let currentRooms = this.state.rooms;
      let selectedRoom = this.state.selectedRoom;
      currentRooms.forEach((room, i) => {
        if (room.roomname === selectedRoom.roomname) {
          currentRooms[i].players.push(this.state.username);
        }
      });
      axios.post('/rooms/:' + selectedRoom.roomname, {
        roomname: selectedRoom.roomname,
        user: this.state.username
      }).then((response) => {
        this.setState({ rooms: currentRooms });
    });
    }
  };

  createRoom() {
    console.log('roomname', this.state.newRoomname);
    let newRoom = {};
    newRoom.roomname = this.state.newRoomname;
    newRoom.players = [this.state.username];
    console.log('newRoom', newRoom);
    let currentRooms = this.state.rooms;
    currentRooms.push(newRoom);
    axios.post('/rooms', {
      roomname: this.state.newRoomname,
      user: this.state.username
    }).then((response) => {
        console.log(response);
    });
    this.setState({ rooms: currentRooms });
    console.log('rooms', this.state.rooms);
  };

  signOutPlayer() {
    console.log('sign out user', this.state.username);
    this.props.history.push('/signin'); //redirect back to signin page
  };

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="inputEmail3" className="col-sm-2 control-label">Room</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="inputEmail3" placeholder="New Room" onChange={this.handleRoomnameInput.bind(this)} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary" onClick={this.createRoom.bind(this)}>Create new room</button>
          </div>
        </div>
        <RoomList 
          onRoomSelect={ selectedRoom => this.setState({selectedRoom}) }
          rooms={this.state.rooms} 
        />
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" onClick={this.joinRoom.bind(this)}>Join selected room</button>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-danger" onClick={this.signOutPlayer.bind(this)}>Quit</button>
          </div>
        </div>
      </form>
    );
  };
};

export default Rooms;
