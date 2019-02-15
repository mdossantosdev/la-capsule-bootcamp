import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class AccountScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar
          size='large'
          rounded
          title={`${this.props.user.firstName[0]}${this.props.user.lastName[0]}`}
          overlayContainerStyle={{ backgroundColor: '#e67e22' }}
        />
        <View style={styles.containerText}>
          <Text h5>{this.props.user.firstName} {this.props.user.lastName}</Text>
          <Text h5>{this.props.user.email}</Text>
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(AccountScreen);
