import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import { url } from '../config';

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleSumbit = () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });

    axios
      .post(`${url}/signin`, body, config)
      .then((response) => {
        if (response.data.isUser) {
          this.props.navigation.navigate('Account');
        } else {
          this.setState({ error: 'User or password is incorrect!' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          label='Email'
          placeholder='johndoe@gmail.com'
          autoCapitalize='none'
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          label='Password'
          placeholder='8 characters mini'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          errorStyle={{ color: 'red' }}
          errorMessage={this.state.error}
        />

        <Button
          style={styles.button}
          title='Sign In'
          backgroundColor='#3498db'
          onPress={this.handleSumbit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    marginTop: 30,
  },
});
