import React, { Component } from 'react';
import { ImageBackground, View, FlatList, StyleSheet } from 'react-native';
import Modal from '../components/Modal';

export default class LibraryScreen extends Component {
  render() {
    const list = [
      {
        img:
          'https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2681&q=80',
        gender: 'Female',
        age: 26,
        eyes: 'Brown',
        glasses: 'No',
      },
      {
        img:
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        gender: 'Male',
        age: 35,
        eyes: 'Brown',
        glasses: 'Yes',
      },
      {
        img:
          'https://images.unsplash.com/photo-1519362909365-f8591adb630e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        gender: 'Female',
        age: 24,
        eyes: 'Blue',
        glasses: 'Yes',
      },
    ];

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item, index }) => (
      <Modal
        item={index + 1}
        key={index}
        img={item.img}
        gender={item.gender}
        age={item.age}
        eyes={item.eyes}
        glasses={item.glasses}
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
            data={list}
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
