import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Button } from 'react-native-elements';

export default class AccountScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar
          size='large'
          rounded
          title='JD'
          overlayContainerStyle={{ backgroundColor: '#e67e22' }}
        />
        <View style={styles.containerText}>
          <Text h5>John Doe</Text>
          <Text h5>john.doe@gmail.com</Text>
        </View>

        <Button
          style={styles.button}
          title='Logout'
          onPress={() => this.props.navigation.navigate('Home')}
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
  containerText: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    width: 200,
  },
});
