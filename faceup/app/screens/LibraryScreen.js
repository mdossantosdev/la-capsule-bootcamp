import React, { Component } from 'react';
import { ImageBackground, View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Modal from '../components/Modal';

class LibraryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item, index }) => (
      <Modal
        item={index + 1}
        key={index}
        img={item.imageUrl}
        gender={item.imageGender}
        age={item.imageAge}
      />
    );

    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/library-background.jpg')}
      >
        <View style={styles.container}>
          <FlatList
            keyExtractor={keyExtractor}
            data={this.props.images}
            renderItem={renderItem}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    opacity: 0.8,
  },
});

const mapStateToProps = (state) => {
  return {
    images: state.image,
  };
};

export default connect(
  mapStateToProps,
  null
)(LibraryScreen);
