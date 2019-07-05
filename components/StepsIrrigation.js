import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Content } from 'native-base';

const Props = {};
export class StepsIrrigation extends Component<Props> {
constructor(props) {
  super(props);
}

render() {
  const { steps = [], style = {} } = this.props;
  return (
    <View style={style}>
      {steps.map((step) =>
        <Content contentContainerStyle={styles.step} 
          key={`${step}__iriirg`}>
          <Text style={Object.assign({}, styles.text, styles.stepText)}>----</Text>
          <Text style={styles.text}>{step}</Text>
        </Content>
      )}
    </View>);
  }
}
const styles = StyleSheet.create({
  step: {
    flexDirection: 'row',
    paddingBottom: 15
  },
  stepText: {
    paddingRight: 5,
    paddingLeft: 5
  },
  text: {
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    color: '#fff',
    fontSize:20
  }
});
