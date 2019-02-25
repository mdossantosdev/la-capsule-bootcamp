import React, { Component } from 'react';
import { View, ImageBackground, Modal, StyleSheet } from 'react-native';
import { ListItem, Avatar, Text, Button, Badge } from 'react-native-elements';

export default class ModalCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  setModalInvisible = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <View>
        <ListItem
          onPress={this.setModalVisible}
          leftAvatar={
            <Avatar size='medium' rounded source={{ uri: this.props.img }} />
          }
          title={
            <View>
              <Text style={styles.titleText}>
                Pic: #{this.props.item}
              </Text>
            </View>
          }
          subtitle={
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitleText}>
                Gender: {this.props.gender}
              </Text>
              <Text style={styles.subtitleText}>Age: {this.props.age}</Text>
            </View>
          }
          rightIcon={{
            name: 'chevron-forward',
            type: 'ionicon',
          }}
          bottomDivider
        />

        <View>
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.modalVisible}
          >
            <ImageBackground
              style={{ flex: 1 }}
              source={{ uri: this.props.img }}
            >
              <View style={styles.modalContainer}>
                <Button
                  title='Go back'
                  style={{ width: 150 }}
                  backgroundColor='#022f40'
                  color='#ffffff'
                  onPress={this.setModalInvisible}
                />
                <Text style={styles.modalTitle}>Pic #{this.props.item}</Text>
                <View style={styles.badgeContainer}>
                  <Badge
                    containerStyle={{ margin: 5 }}
                    badgeStyle={{ paddingHorizontal: 10 }}
                    value={
                      <Text style={{ color: '#ffffff' }}>
                        {this.props.gender}
                      </Text>
                    }
                  />
                  <Badge
                    containerStyle={{ margin: 5 }}
                    badgeStyle={{ paddingHorizontal: 10 }}
                    value={
                      <Text style={{ color: '#ffffff' }}>
                        {this.props.age}y
                      </Text>
                    }
                  />
                </View>
              </View>
            </ImageBackground>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    paddingLeft: 10,
    fontWeight: '600',
    fontSize: 18,
  },
  subtitleContainer: {
    paddingTop: 5,
    paddingLeft: 10,
  },
  subtitleText: {
    color: 'grey',
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 35,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 15,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
});
