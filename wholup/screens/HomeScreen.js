import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';

export default class HomeScreen extends Component {
  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/images/background.jpg')}
      >
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text h1 style={styles.text}>
              Whol'Up
            </Text>
            <Text h3 style={styles.text}>
              Start your networking
            </Text>
            <Text h3 style={styles.text}>
              now and everywhere
            </Text>
          </View>

          <Button
            title='Sign In'
            style={styles.button}
            backgroundColor='#3498db'
            onPress={() => this.props.navigation.navigate('SignIn')}
          />
          <Divider style={{ height: 20 }} />
          <Button
            title='Sign Up'
            style={styles.button}
            backgroundColor='#3498db'
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    color: '#ffffff',
  },
  button: {
    width: 200,
  },
});
