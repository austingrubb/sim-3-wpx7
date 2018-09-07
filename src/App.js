import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ReduxCheck from './components/reduxcheck';
import { Header } from './components/Header';

class App extends Component {
  state = {
    client: null,
    showRegister: false,
    message: null,
    fetchedDataMessage: null
  };

  getMessage = error => error.response
  ? error.response.data
     ? error.response.data.message
     : JSON.stringify(error.response.data, null, 2)
  : error.message;  

  signup = () => {
    this.setState({message: null})
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.post('/signup' , {
      username,
      password
    }).then(response => {
      this.setState({client: response.data})
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  }

  login = () => {
    this.setState({message: null})
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.post('/login', {
      username,
      password
    }).then(response => {
      this.setState({client: response.data})
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  }

  logout = () => {
    axios.post('/logout').then(response => {
      this.setState({ client: null });
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  };

  fetchData = () => {
    this.setState({ fetchedDataMessage: null });
    axios.get('/data').then(response => {
      this.setState({ fetchedDataMessage: 'Result: ' + JSON.stringify(response.data, null, 2 )});
    }).catch(error => {
      this.setState({ fetchedDataMessage: 'Something went wrong: ' + this.getMessage(error) });
    })
  };


  render() {
    const { client, showRegister, message, fetchedDataMessage } = this.state;
    const clientData = JSON.stringify(client, null, 2)
    const inputFields = <div>
      Username: <input ref="username" />
      {' '}
      Password: <input type="password" ref="password" />
      {' '}
    </div>
    return (
      <div className="App">
        <div className="App-intro">
         <nav className="navBar">
          {!client && <div>
            <div className="login_signuplink">
                <a href="javascript:void(0)" onClick={() => this.setState({ showRegister: false })}>Login</a>
                {' '}
                <a href="javascript:void(0)" onClick={() => this.setState({ showRegister: true })}>signup</a>
            </div>
            <div className="login-or-register">
              {showRegister && <div>
                <h2>sign up</h2>
                {inputFields}
                <button onClick={this.signup}>sign up</button>
              </div>}
              {!showRegister && <div>
                <h2>Log in</h2>
                {inputFields}
                <button onClick={this.login}>Log in</button>
              </div>}
              {message}
            </div>
          </div>}
         </nav>
        <div className="App-header">
          <Header/>
        </div>
          {client && <div className="user-info">
            <h2>client data:</h2>
            <div>{ clientData }</div>
            <button onClick={this.logout}>Log out</button>
          </div>}
          <div className="data-fetch">
            <button onClick={this.fetchData}>Fetch data</button>
            <div>{fetchedDataMessage}</div>
          </div>
        </div>
        <div className="hit-button">
          <ReduxCheck/>
        </div>
        <div className="boxs">
          <div className="box1">
              <h6>hello</h6>
          </div>
          <div className="box2">
              <h6>hello</h6>
          </div>
          <div className="box3">
              <h6>hello</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
