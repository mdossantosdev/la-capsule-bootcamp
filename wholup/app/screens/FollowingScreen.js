import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class FollowingScreen extends Component {
  render() {
    const contactListItem = this.props.contacts.map((contact, i) => {
      return (
        <ListItem
          key={i}
          leftAvatar={{
            source: { uri: contact.avatar },
            title: `${contact.firstName[0]}${contact.lastName[0]}`,
            rounded: true
          }}
          title={`${contact.firstName} ${contact.lastName}`}
          subtitle={
            <View>
              <Text style={styles.text}>{contact.email}</Text>
              <Text style={styles.text}>{contact.company}</Text>
            </View>
          }
        />
      );
    });

    return (
      <ScrollView style={styles.container}>
        {this.props.contacts.length < 1 ? (
          <Text style={{ textAlign: 'center' }}>
            You are not following any contact
          </Text>
        ) : (
          contactListItem.reverse()
        )}
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

const mapStateToProps = state => {
  return {
    contacts: state.contact
  };
};

export default connect(
  mapStateToProps,
  null
)(FollowingScreen);
