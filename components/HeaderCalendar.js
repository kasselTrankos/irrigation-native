import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity,
  PanResponder, Dimensions } from 'react-native';
import {getWeek, getNextWeek, getMonthName,
  setToday, getPrevWeek} from './../utils/kalendar';
import { Content, Button } from 'native-base';
import {setDay} from './../actions/kalendar';
import { connect } from 'react-redux';


const mapStateToProps = state => ({riegos: state.kalendar});
const mapDispatchToProps = dispatch => ({
  setDay: date => dispatch(setDay(date))
});
const Props = {};
class HeaderCalendar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {week: getWeek(), day: ''};
  }

  translateX = new Animated.Value(0);
  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: (e, {vx, dx}) => vx!=0 && dx!=0,
    onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
    onPanResponderRelease: (e, {vx, dx}) => {
      const {width: screenWidth } = Dimensions.get("window");
      if (vx>= 0.5 || dx >= 0.5 * screenWidth) {
        this.setState(()=>({ week: getPrevWeek()}));
      }
      if (vx<= -0.5 || dx <= -0.5 * screenWidth ) {
        this.setState(()=>({ week: getNextWeek()}));
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
    return (
      <Content contentContainerStyle={styles.view}>
          <View style={styles.header}>
            <Text style={styles.monthName}>{getMonthName()}</Text>
            <Button 
              style={{textAlign: 'right'}}
              success 
              transparent 
              onPress={() => {
                setToday();
                this.setState(()=> ({week: getWeek()}));
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
              onPress={() => setDay(date)}>
              <Text 
                style={Object.assign({}, styles.weekDay, 
                  isToday ? {backgroundColor: '#0583F2'} : {},
                  index === 6 ? {backgroundColor: '#BF5D39'}: {})}>
                {date.getDate()}
              </Text>
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
    width: '50%',
    fontFamily: "ostrich-regular",
    fontSize: 24,
    textAlign: 'center',
    paddingLeft: 15,
    marginBottom: 10
  },
  weekDays: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    color: 'white',
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