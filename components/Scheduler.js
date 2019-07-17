import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { formatHour } from './../utils/string';
import Irrigation from './Irrigation';
import {Timer} from './Timer';
import { Content } from 'native-base';
import {} from './../actions/kalendar';
import { connect } from 'react-redux';


const mapStateToProps = state => ({kalendar: state.kalendar});
const mapDispatchToProps = dispatch => ({
});


const height = 130;
const Props = {};
class Scheduler extends Component<Props> {
  top(hour, minute) {
    const m = height * minute / 60;
    const distance = (height*(24-hour)) - m;
    return distance;
  }
  render() {
    const {hours, kalendar: {riegosToday}} = this.props;
    return (
      <Content contentContainerStyle={styles.view}>
        {riegosToday.map(({date, day, hour, minute, duration, uuid}, _i) =>
          <View style={{position: 'absolute',
            top: this.top(hour, minute), left: _i % 2 === 0 ? '23%' : '60%', zIndex: 100}}
            key={date}>
            <Irrigation
              hour={hour}
              minute={minute}
              day={day}
              uuid={uuid}
              duration={duration} />
          </View>
        )}
        <Timer />
        { Array.from({length: hours }, (_, hour) => 
          <Content contentContainerStyle={styles.contentHour}
            key={`${hour + 1}_h--12`}>
            <View style={Object.assign({}, styles.hour, 
                hour %2 === 0 ? styles.hourDark : styles.hourGey) }>
              <Text style={styles.hourText}>{formatHour(hours - (hour + 1))}</Text>
            </View>
          </Content>
        )}
      </Content>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
const styles = StyleSheet.create({
  view: {
    width: '100%',
  },
  contentHour: {
    borderBottomWidth: 1,
    borderBottomColor: '#BCDAE5'
  },
  hour: {
    flexDirection: 'row',
    height,
    width: '20%',
    paddingLeft: '11%',
  },
  hourGey: {
    backgroundColor:'#6E8898',
  },
  hourDark: {
    backgroundColor:'#2E4057',
  },
  hourText: {
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    color:'#F2F2F2', 
    fontSize: 32,
    left: 33,
    top: 20, 
    position: 'absolute',
  }
});