import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class SignInScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Input label='Email' placeholder='johndoe@gmail.com' />
        <Input
          label='Password'
          placeholder='8 characters mini'
          secureTextEntry={true}
        />

        <Button
          style={styles.button}
          title='Sign In'
          backgroundColor='#3498db'
          onPress={() => this.props.navigation.navigate('Account')}
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
