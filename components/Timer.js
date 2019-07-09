import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
const Props = {};
export class Timer extends Component<Props> {
  interval = 0;
  state = {
    height: 0,  // Initial value for opacity: 0
  }
  getHeight() {
    const now = new Date();
    const H = now.getHours() * 60 * 1000;
    const m = now.getMinutes() * 1000;
    const h24 = 24 * 60 * 1000;
    const height =  Math.floor(100 * (H + m)  / h24);
    return `${height}%`;
  }  
  componentDidMount() {
    
    this.interval = setInterval(() => {
      this.setState(()=> ({height: this.getHeight()}));
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let { height } = this.state;
    return (
      <View style={{...styles.view, height}} />
    );
  }
}
const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    bottom: 0,
    zIndex:10,
    width: '80%',
    left: '20%',
    height: '100%',
    marginTop: 0,
    color: '#0E7186',
    backgroundColor: 'rgba(124, 118, 114, 0.4)',
    fontSize: 30,
  },
  line: {
    backgroundColor: 'blue',
  },
});