import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class SearchScreen extends Component {
  render() {
    const users = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        title: 'VP',
        email: 'amy.farha@gmail.com',
        company: 'Pied Pier',
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        title: 'VC',
        email: 'chris.jackson@gmail.com',
        company: 'Araknet',
      },
      {
        name: 'Emily Carpenter',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        title: 'COO',
        email: 'emily.carpenter@gmail.com',
        company: 'Gencoin',
      },
    ];

    const usersList = users.map((user, i) => {
      return (
        <ListItem
          key={i}
          leftAvatar={{
            source: { uri: user.avatar_url },
            title: user.title,
            rounded: true
          }}
          title={user.name}
          subtitle={
            <View>
              <Text style={styles.text}>{user.email}</Text>
              <Text style={styles.text}>{user.company}</Text>
            </View>
          }
        />
      );
    });

    return (
      <ScrollView style={styles.container}>
        { usersList }
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
