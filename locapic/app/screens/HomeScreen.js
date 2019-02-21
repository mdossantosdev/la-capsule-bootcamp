import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { AuthSession } from 'expo';
import { API_URL } from '../config';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    AsyncStorage.getItem('user', (err, data) => {
      const userJSON = JSON.parse(data);
      this.props.signin(userJSON);
    });
  };

  _handlePressAsync = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();

    const result = await AuthSession.startAsync({
      authUrl: `${API_URL}/auth/facebook?redirectUrl=${redirectUrl}`,
    });

    const userString = JSON.stringify(result.params);
    AsyncStorage.setItem('user', userString);
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
        {this.props.user ? (
          <View style={styles.container}>
            <Avatar rounded source={{ uri: this.props.user.picture }} />
            <Button
              title={`Welcome back ${this.props.user.firstName}`}
              onPress={() => this.props.navigation.navigate('Map')}
            />
          </View>
        ) : (
          <Button title='Sign In' onPress={this._handlePressAsync} />
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

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
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
