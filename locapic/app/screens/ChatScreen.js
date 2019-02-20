import React, { Component } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Input, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { API_URL } from '../config';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageToSend: '',
      messageList: [],
    };
  }

  componentDidMount = () => {
    this.socket = socketIOClient(API_URL);

    this.socket.on('sendMessage', (data) => {
      const messageListCopy = [...this.state.messageList];
      messageListCopy.push(data);

      this.setState({
        messageToSend: '',
        messageList: messageListCopy,
      });
    });
  };

  render() {
    const renderMessage = this.state.messageList.map((data, i) => {
      return (
        <ListItem
          key={i}
          title={data.message}
          subtitle={data.user}
          leftAvatar={{ source: { uri: decodeURIComponent(data.picture) } }}
        />
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>{renderMessage}</ScrollView>

        <KeyboardAvoidingView behavior='padding' enabled>
          <Input
            value={this.state.messageToSend}
            onChangeText={(messageToSend) => this.setState({ messageToSend })}
            placeholder='Your message'
          />
          <Button
            title='Send'
            onPress={() =>
              this.socket.emit('sendMessage', {
                message: this.state.messageToSend,
                user: this.props.user.firstName,
                picture: this.props.user.picture,
              })
            }
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(ChatScreen);
