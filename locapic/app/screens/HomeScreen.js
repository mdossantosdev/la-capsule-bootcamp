import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { AuthSession } from 'expo';
import { FB_AUTH_URL } from '../config';

class HomeScreen extends Component {

  _handlePressAsync = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();

    const result = await AuthSession.startAsync({
      authUrl: FB_AUTH_URL,
    });

    this.props.signin(result.params);

    if (result.type == 'success') {
      this.props.navigation.navigate('Map');
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.container}
      >
        <Button title='Sign In' onPress={this._handlePressAsync} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    signin: (user) => {
      dispatch({
        type: 'SIGN_IN',
        user: user,
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(HomeScreen);
