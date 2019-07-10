/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.ignoredYellowBox = ['Remote debugger'];
import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity,
  Animated, YellowBox} from 'react-native';
import { Container, Content } from 'native-base';
import { WaterIndicator } from '../components/WaterIndicator';
import { HeaderMenu } from '../components/HeaderMenu';
import SocketIOClient from 'socket.io-client';

console.disableYellowBox = true;
YellowBox.ignoreWarnings = [
  'Unrecognized WebSocket connection',
  'Warning:'
];

const socket = SocketIOClient('http://micasitatucasita.com:3000');

socket.on('made riego', (msg) => {
  console.log(msg);
});
type Props = {};
export class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { info: 'Bienvenido a mi aplicación de riego en remoto' };
  }
  onPress(event) {
    fetch('http://riego.home.es/api/riegos')
    .then((response) => response.json())
    .then(json=> {
      this.setState(()=> ({info: `{ VOLUMEN: ${json.volumen}, DATE:${json.date} }` }));
    });
  }
  madeRiego(wich) {
    socket.emit('made riego', wich);
  }
  render() {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    return (
    <View style={styles.view}>
      <Container>
        <HeaderMenu title="Riego en Casa" {...this.props.navigation} />
        <Content contentContainerStyle={styles.container}>
          <AnimatedTouchable
            onPress={() => this.madeRiego('all')}>
            <WaterIndicator />
          </AnimatedTouchable>
        </Content>
      </Container>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '100%'
  },
  center: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    marginRight: 10,
    marginBottom: 10
  }
});
