import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class SearchScreen extends Component {
  render() {
    const users = [
      {
        firstName: 'Amy',
        lastName: 'Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        title: 'VP',
        email: 'amy.farha@piedpiper.com',
        company: 'Pied Piper',
      },
      {
        firstName: 'Chris',
        lastName: 'Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        title: 'VC',
        email: 'chris.jackson@araknet.com',
        company: 'Araknet',
      },
      {
        firstName: 'Emily',
        lastName: 'Carpenter',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        title: 'COO',
        email: 'emily.carpenter@gencoin.com',
        company: 'Gencoin',
      },
    ];

    const userList = users.map((user, i) => {
      return (
        <ListItem
          key={i}
          leftAvatar={{
            source: { uri: user.avatar_url },
            title: `${user.firstName[0]}${user.lastName[0]}`,
            rounded: true,
          }}
          title={`${user.firstName} ${user.lastName}`}
          subtitle={
            <View>
              <Text style={styles.text}>{user.title}</Text>
              <Text style={styles.text}>{user.company}</Text>
            </View>
          }
          onPress={() => this.props.handleContact(
            user.firstName,
            user.lastName,
            user.email,
            user.company,
            user.avatar_url
          )}
        />
      );
    });

    return (
      <ScrollView style={styles.container}>
        { userList }
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

const mapDispatchToProps = dispatch => {
  return {
    handleContact: (firstName, lastName, email, company, avatar) => {
      dispatch({
        type: 'ADD_CONTACT',
        firstName: firstName,
        lastName: lastName,
        email: email,
        company: company,
        avatar: avatar
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchScreen);
