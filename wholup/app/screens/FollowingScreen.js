import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class FollowingScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ListItem
          leftAvatar={{
            source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' },
            title: 'EC',
            rounded: true
          }}
          title='Emilie Carpenter'
          subtitle={
            <View>
              <Text style={styles.text}>emily.carpenter@gmail.com</Text>
              <Text style={styles.text}>Deckow-Crist</Text>
            </View>
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ffffff',
  },
  text: {
    color: 'grey',
  },
});
