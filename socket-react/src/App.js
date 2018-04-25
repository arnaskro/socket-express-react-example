import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as socket from './ChatSocket';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: ""
    }

    this._send = this._send.bind(this);
  }


  componentDidMount() {
    if (!this.props.loaded && !this.props.loading && this.props.error === null) {
      this.props.actions.getMessages();
      socket.init(this.props.actions.receiveMessage, this.props.actions.newConnection, this.props.actions.disconnect)
    }
  }

  _send() {
    this.props.actions.sendMessage(this.state.input)
    this.setState({input: ""})
  }


  render() {
    if (this.props.loading)
      return (
        <div>
            Loading...
        </div>
      );
    else return (
      <div>
          <ul>
            {this.props.data.map((x, i) => <li key={i} className="wrap"><span className="name">{x.name}</span><span className="message">{x.message}</span></li>)}
          </ul><br/>
          <div className="footer"> 
            <textarea onChange={(x) => {
              this.setState({input: x.target.value})
            }} className="messageInput" placeholder="your message" value={this.state.input}/><br/>
            <input onClick={this._send} className="messageSubmit" type="submit" value="Send" />
          </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
	return {...state.chats};
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(App);

