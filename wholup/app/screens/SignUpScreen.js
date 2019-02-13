import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import { url } from '../config';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  handleSumbit = () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    });

    axios
      .post(`${url}/signup`, body, config)
      .then((response) => {
        if (response.data.result) {
          this.props.navigation.navigate('Account');
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
          label='First Name'
          placeholder='John'
          onChangeText={(firstName) => this.setState({ firstName })}
        />
        <Input
          label='Last Name'
          placeholder='Doe'
          onChangeText={(lastName) => this.setState({ lastName })}
        />
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
        />

        <Button
          style={styles.button}
          title='Sign Up'
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
