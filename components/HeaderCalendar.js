import React, {Component} from 'react';
import {fromEither} from './../utils';
import {plusDays} from './../utils/date.utils';

import {getWeek, getNextWeek, m, DD, YYYY,
  getPrevWeek, isSameAs} from './../utils/kalendar';
import { StyleSheet, Text, View, Animated, TouchableOpacity,
  PanResponder, Dimensions } from 'react-native';
import { Content, Button } from 'native-base';
import {setDay} from './../actions/kalendar';
import { connect } from 'react-redux';


const mapStateToProps = state => ({riegos: state.kalendar});
const mapDispatchToProps = dispatch => ({
  setDay: date => dispatch(setDay(date))
});
const Props = {};
class HeaderCalendar extends Component<Props> {
  state = {week: getWeek(), day: '', date: new Date(), dayWeek: new Date()};
  translateX = new Animated.Value(0);
  constructor(props) {
    super(props);
  }

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: (e, {vx, dx}) => vx!=0 && dx!=0,
    onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
    onPanResponderRelease: (e, {vx, dx}) => {
      const {width: screenWidth } = Dimensions.get("window");
      if (vx>= 0.5 || dx >= 0.5 * screenWidth) {
        const week = getNextWeek(new Date(this.state.dayWeek));
        const dayWeek = plusDays(7)(this.state.dayWeek);
        this.setState(()=>({week, dayWeek}));
      }
      if (vx<= -0.5 || dx <= -0.5 * screenWidth ) {
        const week = getPrevWeek(new Date(this.state.dayWeek));
        const dayWeek = plusDays(-7)(this.state.dayWeek);
        this.setState(()=>({ week, dayWeek}));
      }
      // siempre animate
      Animated.spring(this.translateX, {
        toValue: 0,
        bounciness: 10
      }).start();
    }
  });
  render() {
    const {week} = this.state;
    const {setDay} = this.props;
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const bgDot = fromEither('white')('#dffaff')(isSameAs);
    const opacityDot = fromEither(0)(1)(isSameAs);

    return (
      <Content contentContainerStyle={styles.view}>
          <View style={styles.header}>
            <Text style={styles.monthName}>{DD(new Date(this.state.date))} {m(this.state.date)} {YYYY(new Date(this.state.date))}</Text>
            <Button
              style={{textAlign: 'right'}}
              success 
              transparent 
              onPress={() => {
                setDay(new Date());
                this.setState(()=> ({week: getWeek(), date: new Date()}));
              }}>
              <Text>Today</Text>
            </Button>
          </View>  
        <Animated.View
          style={{transform: [{translateX: this.translateX}], height: 45}} {...this._panResponder.panHandlers}>
          <View style={styles.weekDays}>
            { week.map(({date, isToday}, index)=>
            <AnimatedTouchable 
              key={`${date}_d` }
              onPress={() => {
                setDay(date)
                this.setState(()=> ({date}));
              }}>
              <Text 
                style={Object.assign({}, styles.weekDay, 
                  isToday ? {backgroundColor: '#0583F2'} : {},
                  index === 6 ? {backgroundColor: '#BF5D39'}: {})}>
                { DD(date) }
              </Text>
              <View style={{...styles.dot,
                backgroundColor : bgDot([this.state.date, date]),
                opacity: opacityDot([this.state.date, date])}}/>
            </AnimatedTouchable>
            )}
          </View>
          </Animated.View>
      </Content>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderCalendar);
const styles = StyleSheet.create({
  view: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthName: {
    width: '70%',
    fontFamily: "ostrich-regular",
    fontSize: 22,
    textAlign: 'center',
    paddingLeft: 15,
    marginBottom: 10
  },
  weekDays: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    width: 6,
    height: 6,
    top: -10,
    left: 14,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 4,
  },
  weekDay: {
    color: '#003087',
    fontFamily: "ostrich-regular",
    fontSize: 18,
    paddingLeft: 7,
    paddingTop: 4,
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#05DBF2',
  }
});