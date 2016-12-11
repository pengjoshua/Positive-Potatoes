import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      username: '',
      password: ''
    };
  };

  createNewPlayer(event) {
    console.log('username', this.state.username, 'password', this.state.password);
  };

  handleUsernameInput(event) {
    this.setState({
      username: event.target.value
    });
  };

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="inputEmail3" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-5">
            <input type="name" className="form-control" id="inputEmail3" placeholder="Create a new player name" onChange={this.handleUsernameInput.bind(this)} required/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
          <div className="col-sm-5">
            <input type="password" className="form-control" id="inputPassword3" placeholder="Create a new password" onChange={this.handlePasswordInput.bind(this)} required/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" onClick={this.createNewPlayer.bind(this)}>Create new player</button>
          </div>
        </div>
      </form>
    );
  };
};

export default Signup;