import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { API_URL } from '../config';

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { latitude: 0, longitude: 0 },
      locationLog: [],
      displayHistory: true,
      errorMessage: '',
    };
  }

  componentDidMount = () => {
    this._getLocation();
    this._getLocationHistory();
  };

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    Location.watchPositionAsync({ distanceInterval: 5 }, (location) => {
      if (
        this.state.currentLocation.latitude != 0 &&
        this.state.currentLocation.longitude != 0
      ) {
        const locationLogCopy = [...this.state.locationLog];

        locationLogCopy.push({
          latitude: this.state.currentLocation.latitude,
          longitude: this.state.currentLocation.longitude,
        });

        this.setState({ locationLog: locationLogCopy });

        fetch(`${API_URL}/locationLog`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `
            facebookid=${this.props.user.facebookid}
            &latitude=${this.state.currentLocation.latitude}
            &longitude=${this.state.currentLocation.longitude}
          `,
        });
      }

      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      this.setState({ currentLocation });
    });
  };

  _getLocationHistory = () => {
    fetch(`${API_URL}/locationLog?facebookid=${this.props.user.facebookid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ locationLog: data.locationHistory });
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  };

  render() {
    let markerList = [];

    if (this.state.displayHistory) {
      markerList = this.state.locationLog.map((data, i) => (
        <Marker
          key={i}
          pinColor='blue'
          coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        />
      ));
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 48.866667,
            longitude: 2.333333,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markerList}

          <Marker
            key={'currentLoc'}
            pinColor='red'
            title='Hello'
            description="I'am here"
            coordinate={{
              latitude: this.state.currentLocation.latitude,
              longitude: this.state.currentLocation.longitude,
            }}
          />
        </MapView>

        <Button
          title='History'
          onPress={() =>
            this.setState({ displayHistory: !this.state.displayHistory })
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(MapScreen);
