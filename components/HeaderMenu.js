import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
// import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Button, Header, Left, Body, Title, Right} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
const Props = {};
export class HeaderMenu extends Component<Props> {
  render() {
    const {title ='Home', openDrawer} = this.props;
    return (
      <View style={styles.view}>
        <Header style={styles.header}>
          <Left>
            <Button 
              onPress = {() => openDrawer()}
              transparent>
              <Icon name="rocket" size={24} color="#fff" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    width: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    width: '100%'
  }
});